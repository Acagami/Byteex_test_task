import './App.css'

const promises = [
  'Beautiful, comfortable loungewear for day or night.',
  'No wasteful extras, like tags or plastic packaging.',
  'Our signature fabric is incredibly comfortable, unlike anything you have ever felt.',
]

const benefits = [
  { icon: '\u2667', title: 'Ethically sourced.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque.' },
  { icon: '\u25ce', title: 'Responsibly made.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque.' },
  { icon: '\u273f', title: 'Made for living in.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque.' },
  { icon: '\u224b', title: 'Unimaginably comfortable.', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis sapien facilisis tincidunt pellentesque.' },
]

function App() {
  return (
    <>
      <div className="announcement">Consciously made butter-soft staples for every day (or night) <span>&middot;</span> Free shipping on orders over $200 <span>&middot;</span> Easy 45 day return window</div>
      <header className="site-header"><a className="wordmark" href="#top">BYTEEX<sup>&reg;</sup></a></header>
      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Don&apos;t apologize for being comfortable.</h1>
            <ul className="promise-list">{promises.map((promise) => <li key={promise}><span aria-hidden="true">&#10022;</span>{promise}</li>)}</ul>
            <a className="button" href="#benefits">Customize Your Outfit <span aria-hidden="true">&rarr;</span></a>
            <article className="review-note"><strong>Amy P.　<span>★★★★★</span></strong><p>&ldquo;Honestly, my loungewear set is my new favorite. Quality, comfort and buttery-soft fabric — I want to live in it.&rdquo;</p></article>
          </div>
          <div className="hero-collage" role="img" aria-label="Loungewear collection photos"><div className="photo photo-one"/><div className="photo photo-two"/><div className="photo photo-three"/></div>
        </section>
        <section className="press-strip" aria-label="As seen in"><p>As seen in</p><div><span>ECO-STYLIST</span><span>Canadian Living</span><span>JILLIAN HARRIS</span><span>THE ECO HUB</span><span>TRENDHUNTER</span></div></section>
        <section className="benefits" id="benefits"><div className="benefit-copy"><h2>Loungewear you can be proud of.</h2>{benefits.map((item) => <article className="benefit" key={item.title}><span className="benefit-icon" aria-hidden="true">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div><div className="feature-photo" role="img" aria-label="Model relaxing in soft white loungewear"><span>White Robe</span></div></section>
      </main>
    </>
  )
}

export default App
