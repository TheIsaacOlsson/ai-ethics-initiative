import ShowcaseSection from '../components/ShowcaseSection.jsx'
import { LEARN_RESOURCES } from '../data/learnResources.js'
import '../kickstart.css'
import '../showcase.css'

export default function Kickstart() {
  return (
    <>
      <section className="ks-hero">
        <div className="wrap">
          <h1>Learn</h1>
          <p className="lead">
            Courses, guides, and tools built by professors and practitioners to help you use AI well,
            collected in one place.
          </p>
        </div>
      </section>

      <section className="section" data-screen-label="Coursework">
        <div className="wrap">
          <div className="ks-section-label">
            <h2>Coursework &amp; materials</h2>
            <span className="ks-section-label__tag">Built by professors and practitioners</span>
          </div>
          <div className="sc-grid">
            {LEARN_RESOURCES.map((r) => (
              <a
                className="sc-card sc-card--clickable"
                key={r.id}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                <div className="sc-card__top">
                  <span className="sc-card__tag">{r.type}</span>
                </div>
                <h3>{r.title}</h3>
                <p className="sc-card__by">By {r.by}</p>
                <p>{r.description}</p>
                <span className="sc-card__cta">
                  {r.cta}
                  <span className="arrow">&rarr;</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-screen-label="Showcase">
        <div className="wrap">
          <div className="ks-section-label">
            <h2>Ethical AI Showcase</h2>
            <span className="ks-section-label__tag">Ideas from the community</span>
          </div>
          <ShowcaseSection />
        </div>
      </section>
    </>
  )
}
