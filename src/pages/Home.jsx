import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import CinemaWords from '../components/cinema/CinemaWords.jsx'
import useInView from '../hooks/useInView.js'
import { PRINCIPLES } from '../data/principles.js'
import { events, longDate as eventLongDate } from '../data/events.js'
import { latestIssue } from '../data/news.js'
import '../cinema-sequence.css'
import '../homepage.css'

// The opening argument, tightened to four short beats instead of a long
// scroll-hijacked sequence — see cinema-sequence.css for why each one is
// its own short pin rather than one continuous scroll-scrubbed narrative.
const OPENING_BEATS = [
  'AI is changing rapidly.',
  'There are many ideas about where this is headed.',
  'We believe AI can help people flourish.',
  'But technology does not determine who we become.',
]

function OpeningBeat({ text }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  return (
    <div className="cinema-pin" ref={ref}>
      <div className="cinema-sticky">
        <div className="cinema-stage">
          <CinemaWords text={text} revealed={inView} className="cinema-statement" />
        </div>
      </div>
    </div>
  )
}

const nextEvent = events[0]
const recentIssue = latestIssue

// How long scrolling holds once "You do." first lands on screen — long
// enough to register as a deliberate beat, short enough not to feel stuck.
const FINALE_PAUSE_MS = 1000

export default function Home() {
  const [finaleRef, finaleInView] = useInView({ threshold: 0.6 })
  const hasPausedRef = useRef(false)

  // One-shot scroll hold on the finale's first appearance — everywhere
  // else on this page scrolling stays untouched, but this single moment
  // is meant to land and sit for a beat before the page lets go again.
  // Skipped under reduced motion, where the text is simply already there.
  useEffect(() => {
    if (!finaleInView || hasPausedRef.current) return
    hasPausedRef.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const block = (e) => e.preventDefault()
    const blockKeys = (e) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) e.preventDefault()
    }
    window.addEventListener('wheel', block, { passive: false })
    window.addEventListener('touchmove', block, { passive: false })
    window.addEventListener('keydown', blockKeys)

    const release = () => {
      window.removeEventListener('wheel', block)
      window.removeEventListener('touchmove', block)
      window.removeEventListener('keydown', blockKeys)
    }
    const timer = setTimeout(release, FINALE_PAUSE_MS)
    return () => {
      clearTimeout(timer)
      release()
    }
  }, [finaleInView])

  const scrollToPrinciples = (e) => {
    e.preventDefault()
    document.getElementById('our-principles')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* Section 1 — Cinematic opening. .home-open is what tells Layout.jsx
          to render the nav light-on-dark for this stretch of the page. */}
      <section className="home-open" data-screen-label="Opening">
        {OPENING_BEATS.map((text) => (
          <OpeningBeat key={text} text={text} />
        ))}
      </section>

      {/* Finale — isolated, high-contrast, deliberately roomy. Its gradient
          background (see .cinema-finale) is what carries the page from navy
          into white without a hard cut. */}
      <div className="cinema-finale" ref={finaleRef} data-screen-label="Finale">
        <p className={`cinema-finale__statement ${finaleInView ? 'revealed' : ''}`}>You do.</p>
      </div>

      {/* Section 2 — The pivot */}
      <section className="pivot" data-screen-label="Pivot">
        <div className="wrap">
          <p className="kicker" data-reveal>The thesis</p>
          <h2 className="pivot__headline" data-reveal>
            Technology will change.
            <br />
            Principles endure.
          </h2>
          <p className="pivot__body" data-reveal>
            The AI &amp; Ethics Initiative explores principles that can guide how we use
            artificial intelligence, regardless of what tools come next.
          </p>
          <a href="#our-principles" className="pivot__cta" onClick={scrollToPrinciples} data-reveal>
            Explore our principles <span aria-hidden="true">&darr;</span>
          </a>
        </div>
      </section>

      {/* Section 3 — Principles: the centerpiece of the page */}
      <section className="principles-framework" id="our-principles" data-screen-label="Principles">
        <div className="wrap">
          <div className="principles-framework__head">
            <p className="kicker" data-reveal>Our principles</p>
            <h2 className="principles-framework__lead" data-reveal>
              A framework for navigating
              <br />
              artificial intelligence.
            </h2>
          </div>
          <ol className="principles-list reveal-stagger">
            {PRINCIPLES.map((p) => (
              <li className="principles-list__row" key={p.id} data-reveal>
                <Link to={`/principles#${p.id}`} className="principles-list__item">
                  <span className="principles-list__num">{p.num}</span>
                  <span className="principles-list__body">
                    <span className="principles-list__title">{p.title}</span>
                    <span className="principles-list__tag">
                      <span>{p.tag}</span>
                    </span>
                  </span>
                  <span className="principles-list__arrow" aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 4 — Mission: AI → human agency → Principles → Christlike leadership */}
      <section className="mission-band" data-screen-label="Mission">
        <div className="wrap">
          <p className="kicker" data-reveal>Our mission</p>
          <h2 className="mission-band__headline" data-reveal>
            Developing Christlike leaders in an age of artificial intelligence.
          </h2>
          <p className="mission-band__statement" data-reveal>
            Our mission is to develop Christlike leaders who treat artificial intelligence as a{' '}
            <Link to="/principles#p1">stewardship</Link> &mdash; harnessing it ethically for
            people, communities, and the world.
          </p>
        </div>
      </section>

      {/* Section 5 — Put the Principles into practice */}
      <section className="practice" data-screen-label="Practice">
        <div className="wrap">
          <div className="practice__head">
            <p className="kicker" data-reveal>In practice</p>
            <h2 data-reveal>Put the Principles into practice</h2>
          </div>
          <div className="practice-grid reveal-stagger">
            <article className="practice-block" data-reveal>
              <p className="practice-block__eyebrow">Learn</p>
              <h3>AI Kickstart</h3>
              <p>A hands-on introduction to using AI tools thoughtfully, built around the Principles.</p>
              <Link className="link-more" to="/kickstart">
                Start learning<span className="arrow">&rarr;</span>
              </Link>
            </article>
            <article className="practice-block" data-reveal>
              <p className="practice-block__eyebrow">Engage</p>
              <h3>Events &amp; Conversations</h3>
              <p>Workshops, panels, and forums where the Principles meet real questions.</p>
              <Link className="link-more" to="/get-involved">
                See upcoming events<span className="arrow">&rarr;</span>
              </Link>
            </article>
            <article className="practice-block" data-reveal>
              <p className="practice-block__eyebrow">Explore</p>
              <h3>Ideas &amp; Resources</h3>
              <p>Curated reading and updates on AI ethics, delivered weekly.</p>
              <Link className="link-more" to="/news">
                Explore resources<span className="arrow">&rarr;</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Section 6 — Reflective break */}
      <section className="reflect" data-screen-label="Reflective break">
        <div className="wrap reveal-stagger">
          <p className="reflect__line" data-reveal>AI can help you do more.</p>
          <p className="reflect__line reflect__line--pause" data-reveal>
            But who is it helping you become?
          </p>
          <p className="reflect__line reflect__line--answer" data-reveal>
            That&rsquo;s the question we&rsquo;re interested in.
          </p>
        </div>
      </section>

      {/* Section 7 — From the Initiative */}
      <section className="activity" data-screen-label="From the Initiative">
        <div className="wrap">
          <div className="activity__head">
            <p className="kicker" data-reveal>From the initiative</p>
            <h2 data-reveal>Currently</h2>
          </div>
          <div className="activity-grid reveal-stagger">
            <article className="activity-item" data-reveal>
              <span className="activity-item__eyebrow">Upcoming event</span>
              <h3>
                <Link to={`/events/${nextEvent.slug}`}>{nextEvent.title}</Link>
              </h3>
              <p>
                {eventLongDate(nextEvent.date)} &middot; {nextEvent.place}
              </p>
            </article>
            <article className="activity-item" data-reveal>
              <span className="activity-item__eyebrow">From the newsletter</span>
              <h3>
                <Link to="/newsletter">{recentIssue.title}</Link>
              </h3>
              <p>{recentIssue.summary}</p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 8 — Final CTA: return to the thesis, not a generic sign-off */}
      <section className="final-cta" data-screen-label="Final CTA">
        <div className="wrap">
          <p className="final-cta__statement" data-reveal>
            The future of AI isn&rsquo;t only about what technology can do.
            <br />
            It&rsquo;s about what we choose to do with it.
          </p>
          <Link className="btn btn--accent final-cta__btn" to="/principles" data-reveal>
            Explore the Principles<span className="arrow">&rarr;</span>
          </Link>
          <p className="final-cta__secondary" data-reveal>
            <Link className="link-more" to="/news#newsletter">
              Get the newsletter<span className="arrow">&rarr;</span>
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
