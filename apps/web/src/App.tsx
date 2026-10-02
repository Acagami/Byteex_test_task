import whiteLoungewear from './assets/loungewear-white.png'
import sageLoungewear from './assets/loungewear-sage.png'
import './App.css'

const promises = [
  'Beautiful, comfortable loungewear for day or night.',
  'No wasteful extras, like tags or plastic packaging.',
  'Our signature fabric is incredibly comfortable, unlike anything you have ever felt.',
]

const benefits = [
  { icon: '\u2667', title: 'Ethically sourced.' },
  { icon: '\u25ce', title: 'Responsibly made.' },
  { icon: '\u273f', title: 'Made for living in.' },
  { icon: '\u224b', title: 'Unimaginably comfortable.' },
]

function App() {
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
              {promises.map((promise) => <li key={promise}><span aria-hidden="true">&#10022;</span>{promise}</li>)}
            </ul>
            <a className="button" href="#story">Customize Your Outfit <span aria-hidden="true">&rarr;</span></a>
            <article className="review-note" aria-label="Customer review">
              <strong>Amy P. <span aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></strong>
              <p>&ldquo;Honestly, my loungewear set is my new favorite. Quality, comfort and buttery-soft fabric - I want to live in it.&rdquo;</p>
            </article>
          </div>
          <div className="hero-collage" aria-label="Loungewear collection photos">
            <img className="hero-photo hero-photo-one" src={sageLoungewear} alt="Sage loungewear set" />
            <img className="hero-photo hero-photo-two" src={whiteLoungewear} alt="White cotton loungewear set" />
            <img className="hero-photo hero-photo-three" src={sageLoungewear} alt="Soft sage lounge wear" />
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
                <span className="benefit-icon" aria-hidden="true">{item.icon}</span>
                <div><h3>{item.title}</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque.</p></div>
              </article>
            ))}
          </div>
          <figure className="feature-photo">
            <img src={whiteLoungewear} alt="Model relaxing in a soft white loungewear set" />
            <figcaption>White Robe</figcaption>
          </figure>
        </section>
        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story-collage" aria-label="Loungewear collection photography">
            <img className="story-photo story-photo-main" src={whiteLoungewear} alt="Model wearing a white loungewear set" />
            <img className="story-photo story-photo-top" src={sageLoungewear} alt="Sage loungewear collection" />
            <img className="story-photo story-photo-bottom" src={sageLoungewear} alt="Soft cotton loungewear in a sunlit room" />
          </div>
          <div className="story-copy">
            <h2 id="story-title">Be your best self.</h2>
            <p>Hi! I&apos;m [Name], and I founded BYTEEX with one simple idea: getting dressed should feel as good as winding down.</p>
            <p>We create thoughtful, comfortable essentials with soft fabrics and considered details, so the pieces you reach for every day are made with care.</p>
            <p>From our fabric choices to the way each piece is finished, comfort and responsibility guide every decision we make.</p>
            <p>We hope you find a new favorite here.</p>
            <a className="button" href="#benefits">Customize Your Outfit <span aria-hidden="true">&rarr;</span></a>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
