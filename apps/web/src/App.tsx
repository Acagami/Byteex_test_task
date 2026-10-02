import { Fragment, useState } from 'react'
import { Button, Icon, Stars } from './components/ContentElements'
import { useHomepage } from './content/useHomepage'
import type { Homepage } from './content/schema'
import HomeSections from './HomeSections'
import './App.css'

function HomepageView({ content }: { content: Homepage }) {
  const { hero, press, benefits, story } = content
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const activePhoto = benefits.gallery[selectedPhoto % benefits.gallery.length]
  const showPhoto = (direction: -1 | 1) => {
    setSelectedPhoto((current) => (current + direction + benefits.gallery.length) % benefits.gallery.length)
  }

  return <>
    <div className="announcement">
      {content.announcement.map((text, index) => <Fragment key={index}>{index > 0 && <span aria-hidden="true">&middot;</span>}{text}</Fragment>)}
    </div>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={`${content.brandName} home`}>{content.brandName}<sup>&reg;</sup></a>
    </header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">{hero.title}</h1>
          <ul className="promise-list">
            {hero.promises.map((promise, index) => <li key={index}><span className="promise-icon"><Icon className="line-icon" name={promise.icon} /></span>{promise.text}</li>)}
          </ul>
          <Button cta={hero.cta} />
          <article className="review-note" aria-label="Customer review">
            <div className="review-content">
              <div className="review-meta"><img className="review-avatar" src={hero.review.avatar.src} alt={hero.review.avatar.alt} /><strong>{hero.review.name}</strong><Stars rating={hero.review.rating} className="stars" /><span>{hero.review.source}</span></div>
              <p>&ldquo;{hero.review.quote}&rdquo;</p>
            </div>
          </article>
        </div>
        <div className="hero-collage" aria-label="Loungewear collection photos">
          {hero.gallery.map((photo, index) => <img key={index} className={`hero-photo hero-photo-${['one', 'two', 'three'][index]}`} src={photo.src} alt={photo.alt} fetchPriority={index === 1 ? 'high' : 'auto'} />)}
        </div>
      </section>
      <section className="press-strip" aria-label={press.title}>
        <p>{press.title}</p>
        <div>{press.logos.map((logo, index) => <img key={index} src={logo.src} alt={logo.alt} loading="lazy" />)}</div>
      </section>
      <section className="benefits" id="benefits" aria-labelledby="benefits-title">
        <div className="benefit-copy">
          <h2 id="benefits-title">{benefits.title}</h2>
          {benefits.items.map((item, index) => <article className="benefit" key={index}>
            <span className="benefit-icon"><Icon className="line-icon" name={item.icon} /></span>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
          </article>)}
        </div>
        <div className="feature-gallery" aria-label="Loungewear photo gallery">
          <button className="gallery-arrow gallery-arrow-previous" type="button" aria-label="Previous photo" onClick={() => showPhoto(-1)}>&lsaquo;</button>
          <figure className="feature-photo">
            <img src={activePhoto.src} alt={activePhoto.alt} loading="lazy" />
            <div className="gallery-thumbnails" aria-label="Choose a loungewear photo">
              {benefits.gallery.map((photo, index) => <button className={index === selectedPhoto ? 'gallery-thumbnail is-selected' : 'gallery-thumbnail'} type="button" key={index} aria-label={`Show ${photo.title}`} aria-pressed={index === selectedPhoto} onClick={() => setSelectedPhoto(index)}><img src={photo.src} alt="" loading="lazy" /></button>)}
            </div>
            <figcaption aria-live="polite">{activePhoto.title}</figcaption>
          </figure>
          <button className="gallery-arrow gallery-arrow-next" type="button" aria-label="Next photo" onClick={() => showPhoto(1)}>&rsaquo;</button>
        </div>
      </section>
      <section className="story" id="story" aria-labelledby="story-title">
        <div className="story-collage" aria-label="Loungewear collection photography">
          {story.gallery.map((photo, index) => <img key={index} className={`story-photo story-photo-${['main', 'top', 'bottom'][index]}`} src={photo.src} alt={photo.alt} loading="lazy" />)}
        </div>
        <div className="story-copy">
          <h2 id="story-title">{story.title}</h2>
          {story.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <Button cta={story.cta} />
        </div>
      </section>
      <HomeSections content={content} />
    </main>
  </>
}

export default function App() {
  const { state, retry } = useHomepage()
  if (state.status === 'loading') return <main className="content-status" aria-busy="true"><p role="status">Loading your everyday comfort…</p></main>
  if (state.status === 'error') return <main className="content-status"><h1>We couldn't load this page.</h1><p role="alert">Please check your connection and try again.</p><button className="button" type="button" onClick={retry}>Try again</button></main>
  return <HomepageView content={state.content} />
}
