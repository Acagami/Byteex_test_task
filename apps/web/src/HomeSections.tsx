import { useState } from 'react'
import white from './assets/reference/image-0.jpg'
import sage from './assets/reference/image-2.jpg'
import oat from './assets/reference/image-1.jpg'
import reading from './assets/reference/image-26.jpg'
import paymentMethods from './assets/reference/image-38.png'
import './HomeSections.css'

const communityImages = import.meta.glob<string>('./assets/reference/image-{0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23}.jpg', { eager: true, query: '?url', import: 'default' })
const communityPhotoIds = [3, 5, 7, 9, 11, 13, 0, 16, 18, 20, 22, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23]

const testimonials = [
  { name: 'Amy P.', quote: 'Honestly, my loungewear set is my new favorite. Quality, comfort and buttery-soft fabric — I want to live in it.' },
  { name: 'Jamie S.', quote: 'The fabric feels incredible, and the set is comfortable enough to wear all day. I am already planning my next order.' },
  { name: 'Nina R.', quote: 'Beautifully made and so soft. It has quickly become the first thing I reach for when I get home.' },
]

const questions = [
  { question: 'What makes your loungewear so comfortable?', answer: 'Our signature fabric feels soft against your skin, with relaxed shapes designed for everyday comfort — whether you are spending the day at home or winding down for the night.' },
  { question: 'How do I choose my outfit?', answer: 'Explore the collection gallery to find your favorite color and style. Use the arrows or select a thumbnail to take a closer look at each outfit.' },
  { question: 'Where can I see the available styles?', answer: 'The collection gallery above features our White Robe, Oat Set, Sage Set and Relaxed Set.' },
  { question: 'Is the packaging kept simple?', answer: 'We skip wasteful extras like tags and plastic packaging, keeping the focus on the pieces you will wear.' },
  { question: 'Is free shipping available?', answer: 'Free shipping is available on orders over $200.' },
  { question: 'What is the return window?', answer: 'There is a 45 day return window, giving you time to find your comfortable fit.' },
]

type SymbolName = 'bag' | 'truck' | 'sun' | 'cloud' | 'drop' | 'bolt'
function Symbol({ name }: { name: SymbolName }) {
  const paths: Record<SymbolName, string> = {
    bag: 'M5 7h14l-1 14H6L5 7Zm4 0V5a3 3 0 0 1 6 0v2M9 13l2 2 4-4',
    truck: 'M2 5h12v12H2V5Zm12 5h4l4 4v3h-8M5 17a2 2 0 1 0 4 0m7 0a2 2 0 1 0 4 0M1 9h6M1 12h4',
    sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
    cloud: 'M7 18a5 5 0 1 1 1-10 6 6 0 0 1 11 3 3.5 3.5 0 0 1-1 7H7Zm3-7-2 3h3l-2 3m5-6-2 3h3l-2 3',
    drop: 'M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Zm-3 13a3 3 0 0 0 3 3',
    bolt: 'm13 2-8 12h6l-1 8 9-13h-7l1-7Z',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}

function OutfitLink({ rating = false }: { rating?: boolean }) {
  return <div className="outfit-action">
    <a className="button" href="#benefits"><span>Customize Your Outfit</span><span className="button-arrow" aria-hidden="true">→</span></a>
    {rating && <p className="outfit-rating"><span aria-label="5 out of 5 stars">★★★★★</span> Over 500 5-Star Reviews Online</p>}
  </div>
}

export default function HomeSections() {
  const [reviewIndex, setReviewIndex] = useState(0)
  const moveReview = (direction: number) => setReviewIndex((current) => (current + direction + testimonials.length) % testimonials.length)

  return <>
    <section className="comfort-section lower-section" aria-labelledby="comfort-title">
      <h2 id="comfort-title">Comfort made easy</h2>
      <div className="comfort-steps">
        <article><Symbol name="bag" /><h3>You save.</h3><p>Browse our comfort sets and save 15% when you bundle.</p></article>
        <article><Symbol name="truck" /><h3>We ship.</h3><p>We ship your items within 1–2 days of receiving your order.</p></article>
        <article><Symbol name="sun" /><h3>You enjoy!</h3><p>Wear heavenly comfort around the house, out on the town, or in bed.</p></article>
      </div>
      <OutfitLink rating />
    </section>

    <section className="fans-section lower-section" aria-labelledby="fans-title">
      <div className="section-intro"><h2 id="fans-title">What are our fans saying?</h2><p>Everyday comfort, worn your way. A little inspiration from the moments that make you feel most like yourself.</p></div>
      <div className="community-photos" aria-label="Loungewear inspiration">
        {communityPhotoIds.map((id) => <img key={id} src={communityImages[`./assets/reference/image-${id}.jpg`]} alt="" loading="lazy" />)}
      </div>
      <div className="testimonials">
        <button type="button" className="gallery-arrow" aria-label="Previous review" onClick={() => moveReview(-1)}>‹</button>
        <div className="testimonial-cards" aria-live="polite" aria-atomic="true">
          {testimonials.map((_, offset) => {
            const review = testimonials[(reviewIndex + offset) % testimonials.length]
            return <article className="testimonial-card" key={review.name}>
              <div className="testimonial-person"><span className="customer-avatar" aria-hidden="true">{review.name.charAt(0)}</span><div><span className="rating-stars" aria-label="5 out of 5 stars">★★★★★</span><h3>{review.name}</h3></div></div>
              <p>{review.quote}</p>
            </article>
          })}
        </div>
        <button type="button" className="gallery-arrow" aria-label="Next review" onClick={() => moveReview(1)}>›</button>
      </div>
      <div className="testimonial-dots" aria-label="Choose a review">{testimonials.map((review, index) => <button key={review.name} type="button" aria-label={`Show review by ${review.name}`} aria-pressed={reviewIndex === index} onClick={() => setReviewIndex(index)} />)}</div>
      <OutfitLink rating />
    </section>

    <section className="faq-section lower-section" aria-labelledby="faq-title">
      <div className="faq-copy">
        <h2 id="faq-title">Frequently asked questions.</h2>
        <div className="faq-list">{questions.map((item, index) => <details key={item.question} name="faq" open={index === 0}><summary>{item.question}<span className="faq-toggle" aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
      </div>
      <div className="faq-collage">
        <img className="faq-photo-top" src={sage} alt="Sage lounge outfit" loading="lazy" />
        <img className="faq-photo-main" src={oat} alt="Soft oatmeal lounge set" loading="lazy" />
        <img className="faq-photo-bottom" src={reading} alt="Relaxing in white loungewear" loading="lazy" />
      </div>
    </section>

    <section className="impact-section" aria-labelledby="impact-title">
      <h2 id="impact-title">Our total green impact</h2>
      <div className="impact-stats">
        <div><Symbol name="cloud" /><p><strong>3,927 kg</strong><span>of CO2 saved</span></p></div>
        <div><Symbol name="drop" /><p><strong>2,546,167 days</strong><span>of drinking water saved</span></p></div>
        <div><Symbol name="bolt" /><p><strong>7,321 kWh</strong><span>of energy saved</span></p></div>
      </div>
    </section>

    <section className="closing-section lower-section" aria-labelledby="closing-title">
      <div className="section-intro"><h2 id="closing-title">Find something you love.</h2><p>Soft essentials for slow mornings, cozy evenings, and everything in between. Make yourself comfortable.</p></div>
      <div className="closing-collage"><img src={sage} alt="Sage loungewear" loading="lazy" /><img src={white} alt="Patterned yellow lounge shirt" loading="lazy" /><img src={oat} alt="Oatmeal loungewear" loading="lazy" /></div>
      <OutfitLink />
      <div className="checkout-details"><p className="shipping-note"><span aria-hidden="true">&#9679;</span> Ships in 1&ndash;2 days</p><img className="payment-methods" src={paymentMethods} alt="Accepted payment methods" loading="lazy" /></div>
      <div className="closing-perks"><p><Symbol name="truck" /><span>FREE Shipping on<br />Orders over $200</span></p><p><Symbol name="sun" /><span>Over 500 5 Star<br />Reviews Online</span></p><p><Symbol name="bag" /><span>Made ethically<br />and responsibly.</span></p></div>
    </section>
  </>
}
