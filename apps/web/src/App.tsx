import { useState } from 'react'
import whiteLoungewear from './assets/loungewear-white.png'
import sageLoungewear from './assets/loungewear-sage.png'
import oatLoungewear from './assets/loungewear-oat.png'
import readingLoungewear from './assets/loungewear-reading.png'
import './App.css'

type IconName = 'comfort' | 'package' | 'waves' | 'leaf' | 'drop' | 'flower'

const promises = [
  { icon: 'comfort' as const, text: 'Beautiful, comfortable loungewear for day or night.' },
  { icon: 'package' as const, text: 'No wasteful extras, like tags or plastic packaging.' },
  { icon: 'waves' as const, text: 'Our signature fabric is incredibly comfortable - unlike anything you have ever felt.' },
]

const benefits = [
  { icon: 'leaf' as const, title: 'Ethically sourced.' },
  { icon: 'drop' as const, title: 'Responsibly made.' },
  { icon: 'flower' as const, title: 'Made for living in.' },
  { icon: 'waves' as const, title: 'Unimaginably comfortable.' },
]

const reviews = [
  { name: 'Amy P.', quote: 'Honestly, my loungewear set is my new favorite. Quality, comfort and buttery-soft fabric - I want to live in it.', source: 'Verified customer' },
  { name: 'Jamie S.', quote: 'The fabric feels incredible, and the set is comfortable enough to wear all day. I am already planning my next order.', source: 'Verified customer' },
  { name: 'Nina R.', quote: 'Beautifully made and so soft. It has quickly become the first thing I reach for when I get home.', source: 'Verified customer' },
]

const galleryPhotos = [
  { src: whiteLoungewear, title: 'White Robe', alt: 'White cotton loungewear set' },
  { src: oatLoungewear, title: 'Oat Set', alt: 'Oatmeal lounge top and shorts' },
  { src: sageLoungewear, title: 'Sage Set', alt: 'Sage cotton loungewear set' },
  { src: readingLoungewear, title: 'Relaxed Set', alt: 'Model reading in white loungewear' },
]

function LineIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    comfort: 'M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
    package: 'M3 5h2l2.1 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L20 9H6M10 20h.01M17 20h.01M10 12h6',
    waves: 'M3 7c2.2 0 2.2 2 4.5 2S9.8 7 12 7s2.2 2 4.5 2S18.8 7 21 7M3 12c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.2 2 4.5 2 2.3-2 4.5-2M3 17c2.2 0 2.2 2 4.5 2s2.3-2 4.5-2 2.2 2 4.5 2 2.3-2 4.5-2',
    leaf: 'M20 4C10 4 5 7.8 5 13a6 6 0 0 0 6 6c5.2 0 9-5 9-15ZM4 21c2.6-5.2 6-8.5 11-11',
    drop: 'M12 3s7 7.1 7 12a7 7 0 0 1-14 0c0-4.9 7-12 7-12Zm-3 12a3 3 0 0 0 3 3',
    flower: 'M12 12c-2-2-5-1-5 1s3 3 5 1c2 2 5 1 5-1s-3-3-5-1Zm0 0c2-2 1-5-1-5s-3 3-1 5c-2 2-1 5 1 5s3-3 1-5Zm0 0h.01M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.8.8m11.2 11.2.8.8m0-12.8-.8.8M6.4 17.6l-.8.8',
  }
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[name]} /></svg>
}

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const activePhoto = galleryPhotos[selectedPhoto]
  const showPhoto = (direction: -1 | 1) => {
    setSelectedPhoto((current) => (current + direction + galleryPhotos.length) % galleryPhotos.length)
  }

  return (
    <>
      <div className="announcement">
        Consciously made butter-soft staples for every day (or night)
        <span aria-hidden="true">&middot;</span> Free shipping on orders over $200
        <span aria-hidden="true">&middot;</span> Easy 45 day return window
      </div>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Byteex home">BYTEEX<sup>&reg;</sup></a>
      </header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Don&apos;t apologize for being comfortable.</h1>
            <ul className="promise-list">
              {promises.map((promise) => <li key={promise.text}><span className="promise-icon"><LineIcon name={promise.icon} /></span>{promise.text}</li>)}
            </ul>
            <a className="button" href="#story"><span>Customize Your Outfit</span><span className="button-arrow" aria-hidden="true">&rarr;</span></a>
            <article className="review-note" aria-label="Customer review">
              <div className="review-content">
                <div className="review-meta"><strong>{reviews[0].name}</strong><span className="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span>{reviews[0].source}</span></div>
                <p>&ldquo;{reviews[0].quote}&rdquo;</p>
              </div>
            </article>
          </div>
          <div className="hero-collage" aria-label="Loungewear collection photos">
            <img className="hero-photo hero-photo-one" src={oatLoungewear} alt="Oatmeal loungewear set" />
            <img className="hero-photo hero-photo-two" src={whiteLoungewear} alt="White cotton loungewear set" />
            <img className="hero-photo hero-photo-three" src={readingLoungewear} alt="Relaxed white loungewear" />
          </div>
        </section>
        <section className="press-strip" aria-label="As seen in">
          <p>As seen in</p>
          <div><span>ECO-STYLIST</span><span>Canadian Living</span><span>JILLIAN HARRIS</span><span>THE ECO HUB</span><span>TRENDHUNTER</span></div>
        </section>
        <section className="benefits" id="benefits" aria-labelledby="benefits-title">
          <div className="benefit-copy">
            <h2 id="benefits-title">Loungewear you can be proud of.</h2>
            {benefits.map((item) => (
              <article className="benefit" key={item.title}>
                <span className="benefit-icon"><LineIcon name={item.icon} /></span>
                <div><h3>{item.title}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque.</p></div>
              </article>
            ))}
          </div>
          <div className="feature-gallery" aria-label="Loungewear photo gallery">
            <button className="gallery-arrow gallery-arrow-previous" type="button" aria-label="Previous photo" onClick={() => showPhoto(-1)}>&lsaquo;</button>
            <figure className="feature-photo">
              <img src={activePhoto.src} alt={activePhoto.alt} />
              <div className="gallery-thumbnails" aria-label="Choose a loungewear photo">
                {galleryPhotos.map((photo, index) => (
                  <button className={index === selectedPhoto ? 'gallery-thumbnail is-selected' : 'gallery-thumbnail'} type="button" key={photo.title} aria-label={`Show ${photo.title}`} aria-pressed={index === selectedPhoto} onClick={() => setSelectedPhoto(index)}>
                    <img src={photo.src} alt="" />
                  </button>
                ))}
              </div>
              <figcaption>{activePhoto.title}</figcaption>
            </figure>
            <button className="gallery-arrow gallery-arrow-next" type="button" aria-label="Next photo" onClick={() => showPhoto(1)}>&rsaquo;</button>
          </div>
        </section>
        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-collage" aria-label="Loungewear collection photography">
            <img className="story-photo story-photo-main" src={whiteLoungewear} alt="Model wearing a white loungewear set" />
            <img className="story-photo story-photo-top" src={oatLoungewear} alt="Oatmeal loungewear collection" />
            <img className="story-photo story-photo-bottom" src={sageLoungewear} alt="Soft cotton loungewear in a sunlit room" />
            <span className="story-seam story-seam-top-right" aria-hidden="true" />
            <span className="story-seam story-seam-top-bottom" aria-hidden="true" />
            <span className="story-seam story-seam-bottom-left" aria-hidden="true" />
            <span className="story-seam story-seam-bottom-top" aria-hidden="true" />
          </div>
          <div className="story-copy">
            <h2 id="story-title">Be your best self.</h2>
            <p>Hi! I&apos;m [Name], and I founded BYTEEX with one simple idea: getting dressed should feel as good as winding down.</p>
            <p>We create thoughtful, comfortable essentials with soft fabrics and considered details, so the pieces you reach for every day are made with care.</p>
            <p>From our fabric choices to the way each piece is finished, comfort and responsibility guide every decision we make.</p>
            <p>We hope you find a new favorite here.</p>
            <a className="button" href="#benefits"><span>Customize Your Outfit</span><span className="button-arrow" aria-hidden="true">&rarr;</span></a>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
