import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import { parse } from 'yaml'
import { homepageSchema } from '../apps/web/src/content/schema.ts'

const content = JSON.parse(readFileSync(new URL('../apps/web/public/content/homepage.json', import.meta.url), 'utf8'))
const config = parse(readFileSync(new URL('../apps/web/public/admin/config.yml', import.meta.url), 'utf8'))

test('published homepage satisfies the runtime contract', () => {
  assert.equal(homepageSchema.parse(content).hero.title, content.hero.title)
})

test('every published image is available in the local media library', () => {
  function visit(value) {
    if (!value || typeof value !== 'object') return
    if ('src' in value) {
      assert.match(value.src, /^\/media\//)
      assert.ok(existsSync(resolve('apps/web/public', value.src.slice(1))), value.src)
    }
    Object.values(value).forEach(visit)
  }
  visit(content)
})

test('CMS exposes every content field and preserves the JSON structure', () => {
  const page = config.collections[0].files[0]
  assert.equal(page.file, 'apps/web/public/content/homepage.json')
  assert.equal(page.format, 'json')
  function check(fields, value) {
    assert.deepEqual(fields.map(field => field.name).sort(), Object.keys(value).sort())
    for (const field of fields) {
      const data = value[field.name]
      if (field.widget === 'object') check(field.fields, data)
      if (field.widget === 'list' && field.fields) data.forEach(item => check(field.fields, item))
      if (field.widget === 'select') assert.ok(field.options.includes(data))
      if (field.min !== undefined && Array.isArray(data)) assert.ok(data.length >= field.min)
      if (field.max !== undefined && Array.isArray(data)) assert.ok(data.length <= field.max)
    }
  }
  check(page.fields, content)
})

test('empty galleries and reviews are rejected before rendering', () => {
  for (const path of [['benefits', 'gallery'], ['testimonials', 'reviews']]) {
    const invalid = structuredClone(content)
    invalid[path[0]][path[1]] = []
    assert.equal(homepageSchema.safeParse(invalid).success, false)
  }
})

test('invalid ratings, incomplete collages, and executable links are rejected', () => {
  const invalidRating = structuredClone(content)
  invalidRating.hero.review.rating = 6
  assert.equal(homepageSchema.safeParse(invalidRating).success, false)
  const invalidCollage = structuredClone(content)
  invalidCollage.story.gallery.pop()
  assert.equal(homepageSchema.safeParse(invalidCollage).success, false)
  const invalidLink = structuredClone(content)
  invalidLink.closing.cta.href = 'javascript:alert(1)'
  assert.equal(homepageSchema.safeParse(invalidLink).success, false)
})

test('the CMS uses the local proxy and a repository-owned media folder', () => {
  assert.equal(config.local_backend.url, 'http://127.0.0.1:8081/api/v1')
  assert.equal(config.media_folder, 'apps/web/public/media')
  assert.equal(config.public_folder, '/media')
})
