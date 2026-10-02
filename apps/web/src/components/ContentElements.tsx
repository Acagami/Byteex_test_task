import type { CallToAction, IconName } from '../content/schema'

const paths: Record<IconName, string> = {
  comfort: 'M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  package: 'M3 5h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L20 9H6M10 20h.01M17 20h.01M10 12h6',
  waves: 'M3 7c2.2 0 2.2 2 4.5 2S9.8 7 12 7s2.2 2 4.5 2S18.8 7 21 7M3 12c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.2 2 4.5 2 2.3-2 4.5-2M3 17c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.2 2 4.5 2 2.3-2 4.5-2',
  leaf: 'M20 4C10 4 5 7.8 5 13a6 6 0 0 0 6 6c5.2 0 9-5 9-15ZM4 21c2.6-5.2 6-8.5 11-11',
  drop: 'M12 3s7 7.1 7 12a7 7 0 0 1-14 0c0-4.9 7-12 7-12Zm-3 12a3 3 0 0 0 3 3',
  flower: 'M12 12c-2-2-5-1-5 1s3 3 5 1c2 2 5 1 5-1s-3-3-5-1Zm0 0c2-2 1-5-1-5s-3 3-1 5c-2 2-1 5 1 5s3-3 1-5Zm0 0h.01M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.8.8m11.2 11.2.8.8m0-12.8-.8.8M6.4 17.6l-.8.8',
  bag: 'M5 7h14l-1 14H6L5 7Zm4 0V5a3 3 0 0 1 6 0v2M9 13l2 2 4-4',
  truck: 'M2 5h12v12H2V5Zm12 5h4l4 4v3h-8M5 17a2 2 0 1 0 4 0m7 0a2 2 0 1 0 4 0M1 9h6M1 12h4',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  cloud: 'M7 18a5 5 0 1 1 1-10 6 6 0 0 1 11 3 3.5 3.5 0 0 1-1 7H7Zm3-7-2 3h3l-2 3m5-6-2 3h3l-2 3',
  bolt: 'm13 2-8 12h6l-1 8 9-13h-7l1-7Z',
}

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}

export function Button({ cta }: { cta: CallToAction }) {
  return <a className="button" href={cta.href}><span>{cta.label}</span><span className="button-arrow" aria-hidden="true">&rarr;</span></a>
}

export function Stars({ rating, className = 'rating-stars' }: { rating: number; className?: string }) {
  return <span className={className} aria-label={`${rating} out of 5 stars`}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
}
