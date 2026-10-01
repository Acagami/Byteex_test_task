import './App.css'

const promises = [
  'Beautiful, comfortable loungewear for day or night.',
  'No wasteful extras, like tags or plastic packaging.',
  'Our signature fabric is incredibly comfortable - unlike anything you have ever felt.',
]

function App() {
  return (
    <>
      <div className="announcement">
        <span>Consciously made butter-soft staples for every day (or night)</span>
        <span aria-hidden="true">&middot;</span>
        <span>Free shipping on orders over $200</span>
        <span aria-hidden="true">&middot;</span>
        <span>Easy 45 day return window</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Byteex home">
          BYTEEX<span aria-hidden="true">&reg;</span>
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#benefits">Our fabric</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-link" href="#shop">Shop loungewear <span aria-hidden="true">&#8594;</span></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Made for the way you unwind</p>
            <h1 id="hero-title">Don&apos;t apologize for being comfortable.</h1>
            <ul className="promise-list">
              {promises.map((promise, index) => (
                <li key={promise}>
                  <span className={`promise-icon promise-icon-${index + 1}`} aria-hidden="true">&#10022;</span>
                  <span>{promise}</span>
                </li>
              ))}
            </ul>
            <a className="button button-primary" href="#shop">
              Customize your outfit <span aria-hidden="true">&#8594;</span>
            </a>
            <article className="review-note" aria-label="Customer review">
              <div className="review-avatar" aria-hidden="true">A</div>
              <div className="review-content">
                <div className="review-meta">
                  <span>Amy P.</span>
                  <span className="stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span>Over 500 5-Star Reviews Online</span>
                </div>
                <p>&ldquo;Honestly, my loungewear set is my new favorite. Quality, comfort and buttery-soft fabric - I want to live in it.&rdquo;</p>
              </div>
            </article>
          </div>

          <div className="hero-collage" aria-label="Loungewear collection photography">
            <div className="photo-placeholder photo-left" role="img" aria-label="Lifestyle photo placeholder" />
            <div className="photo-placeholder photo-center" role="img" aria-label="Lifestyle photo placeholder" />
            <div className="photo-placeholder photo-right" role="img" aria-label="Lifestyle photo placeholder" />
          </div>
        </section>

        <section className="press-strip" aria-label="As seen in">
          <p>As seen in</p>
          <div className="press-logos">
            <span>ECO-STYLIST</span>
            <span className="press-serif">Canadian Living</span>
            <span>JILLIAN HARRIS</span>
            <span>THE ECO HUB</span>
            <span className="press-italic">TRENDHUNTER</span>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
