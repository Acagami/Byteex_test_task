import { useState } from 'react'
import { Button, Icon, Stars } from './components/ContentElements'
import type { CallToAction, Homepage } from './content/schema'
import './HomeSections.css'

function OutfitLink({ cta, ratingLabel }: { cta: CallToAction; ratingLabel?: string }) {
  return <div className="outfit-action">
    <Button cta={cta} />
    {ratingLabel && <p className="outfit-rating"><Stars rating={5} />{ratingLabel}</p>}
  </div>
}

export default function HomeSections({ content }: { content: Homepage }) {
  const { comfort, testimonials, faq, impact, closing, ratingLabel } = content
  const [reviewIndex, setReviewIndex] = useState(0)
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)
  const moveReview = (direction: number) => setReviewIndex((current) => (current + direction + testimonials.reviews.length) % testimonials.reviews.length)

  return <>
    <section className="comfort-section lower-section" aria-labelledby="comfort-title">
      <h2 id="comfort-title">{comfort.title}</h2>
      <div className="comfort-steps">
        {comfort.cards.map((card, index) => <article key={index}><Icon name={card.icon} /><h3>{card.title}</h3><p>{card.description}</p></article>)}
      </div>
      <OutfitLink cta={comfort.cta} ratingLabel={ratingLabel} />
    </section>
    <section className="fans-section lower-section" aria-labelledby="fans-title">
      <div className="section-intro"><h2 id="fans-title">{testimonials.title}</h2><p>{testimonials.description}</p></div>
      <div className="community-photos" aria-label="Loungewear inspiration">
        {testimonials.gallery.map((photo, index) => <img key={index} src={photo.src} alt={photo.alt} loading="lazy" />)}
      </div>
      <div className="testimonials">
        <button type="button" className="gallery-arrow" aria-label="Previous review" onClick={() => moveReview(-1)}>&lsaquo;</button>
        <div className="testimonial-cards" aria-live="polite" aria-atomic="true">
          {testimonials.reviews.slice(0, 3).map((_, offset) => {
            const index = (reviewIndex + offset) % testimonials.reviews.length
            const review = testimonials.reviews[index]
            return <article className="testimonial-card" key={index}>
              <div className="testimonial-person"><span className="customer-avatar" aria-hidden="true">{review.name.charAt(0)}</span><div><Stars rating={review.rating} /><h3>{review.name}</h3></div></div>
              <p>{review.quote}</p>
            </article>
          })}
        </div>
        <button type="button" className="gallery-arrow" aria-label="Next review" onClick={() => moveReview(1)}>&rsaquo;</button>
      </div>
      <div className="testimonial-dots" aria-label="Choose a review">{testimonials.reviews.map((review, index) => <button key={index} type="button" aria-label={`Show review by ${review.name}`} aria-pressed={reviewIndex === index} onClick={() => setReviewIndex(index)} />)}</div>
      <OutfitLink cta={testimonials.cta} ratingLabel={ratingLabel} />
    </section>
    <section className="faq-section lower-section" aria-labelledby="faq-title">
      <div className="faq-copy">
        <h2 id="faq-title">{faq.title}</h2>
        <div className="faq-list">{faq.items.map((item, index) => <details key={index} open={openQuestion === index}><summary onClick={(event) => { event.preventDefault(); setOpenQuestion(openQuestion === index ? null : index) }}>{item.question}<span className="faq-toggle" aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
      </div>
      <div className="faq-collage">
        {faq.gallery.map((photo, index) => <img key={index} className={`faq-photo-${['top', 'main', 'bottom'][index]}`} src={photo.src} alt={photo.alt} loading="lazy" />)}
      </div>
    </section>
    <section className="impact-section" aria-labelledby="impact-title">
      <h2 id="impact-title">{impact.title}</h2>
      <div className="impact-stats">{impact.metrics.map((metric, index) => <div key={index}><Icon name={metric.icon} /><p><strong>{metric.value}</strong><span>{metric.label}</span></p></div>)}</div>
    </section>
    <section className="closing-section lower-section" aria-labelledby="closing-title">
      <div className="section-intro"><h2 id="closing-title">{closing.title}</h2><p>{closing.description}</p></div>
      <div className="closing-collage">{closing.gallery.map((photo, index) => <img key={index} src={photo.src} alt={photo.alt} loading="lazy" />)}</div>
      <OutfitLink cta={closing.cta} />
      <div className="checkout-details"><p className="shipping-note"><span aria-hidden="true">&#9679;</span> {closing.shippingNote}</p><img className="payment-methods" src={closing.paymentMethods.src} alt={closing.paymentMethods.alt} loading="lazy" /></div>
      <div className="closing-perks">{closing.perks.map((perk, index) => <p key={index}><Icon name={perk.icon} /><span>{perk.text}</span></p>)}</div>
    </section>
  </>
}
