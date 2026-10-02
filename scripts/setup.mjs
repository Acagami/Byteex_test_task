import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const publicAdmin = new URL('../apps/web/public/admin/', import.meta.url)
mkdirSync(publicAdmin, { recursive: true })
copyFileSync(new URL('../node_modules/decap-cms/dist/decap-cms.js', import.meta.url), new URL('../apps/web/public/admin/decap-cms.js', import.meta.url))
const webVite = new URL('../apps/web/node_modules/vite/bin/vite.js', import.meta.url)
if (!existsSync(webVite)) {
  execFileSync(process.execPath, [process.env.npm_execpath, 'ci', '--prefix', 'apps/web'], { cwd: root, stdio: 'inherit' })
}