import { z } from 'zod'

const text = z.string().trim().min(1)
const localImage = z.string().regex(/^\/media\/[a-zA-Z0-9_./ -]+$/, 'Choose an image from the media library')
const link = z.string().refine((value) => /^(#[\w-]+|\/(?!\/)[^\s]*|https?:\/\/[^\s]+)$/.test(value), 'Use a page anchor, site path, or HTTP(S) URL')
export const iconNames = ['comfort', 'package', 'waves', 'leaf', 'drop', 'flower', 'bag', 'truck', 'sun', 'cloud', 'bolt'] as const
const icon = z.enum(iconNames)
export type IconName = z.infer<typeof icon>
const image = z.object({ src: localImage, alt: z.string().default('') })
const triptych = z.array(image).length(3)
const cta = z.object({ label: text, href: link })
const review = z.object({ name: text, quote: text, rating: z.number().int().min(1).max(5) })

export const homepageSchema = z.object({
  brandName: text,
  announcement: z.array(text).min(1).max(3),
  ratingLabel: text,
  hero: z.object({
    title: text,
    promises: z.array(z.object({ icon, text })).min(1),
    cta,
    review: review.extend({ avatar: image, source: text }),
    gallery: triptych,
  }),
  press: z.object({ title: text, logos: z.array(image).min(1) }),
  benefits: z.object({
    title: text,
    items: z.array(z.object({ icon, title: text, description: text })).min(1),
    gallery: z.array(image.extend({ title: text })).min(1),
  }),
  story: z.object({ title: text, paragraphs: z.array(text).min(1), gallery: triptych, cta }),
  comfort: z.object({ title: text, cards: z.array(z.object({ icon, title: text, description: text })).length(3), cta }),
  testimonials: z.object({ title: text, description: text, gallery: z.array(image).min(1), reviews: z.array(review).min(1), cta }),
  faq: z.object({ title: text, items: z.array(z.object({ question: text, answer: text })).min(1), gallery: triptych }),
  impact: z.object({ title: text, metrics: z.array(z.object({ icon, value: text, label: text })).length(3) }),
  closing: z.object({
    title: text, description: text, gallery: triptych, cta,
    shippingNote: text, paymentMethods: image,
    perks: z.array(z.object({ icon, text })).length(3),
  }),
})

export type Homepage = z.infer<typeof homepageSchema>
export type CallToAction = z.infer<typeof cta>
