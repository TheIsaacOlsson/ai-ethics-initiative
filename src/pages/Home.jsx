import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CinemaWords from '../components/cinema/CinemaWords.jsx'
import useInView from '../hooks/useInView.js'
import '../cinema-sequence.css'
import '../homepage.css'

// The opening argument, tightened to four short beats instead of a long
// scroll-hijacked sequence — see cinema-sequence.css for why each one is
// its own short pin rather than one continuous scroll-scrubbed narrative.
const OPENING_BEATS = [
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

// The finale's scroll budget, in vh: the background spends BG_FADE_VH
// fading completely from navy to white, then — only once it's fully
// white — the statement spends TEXT_FADE_VH fading in on that same spot.
// HOLD_VH is extra scroll distance after that with nothing left to
// animate, which is what makes the pin keep holding "You do." on screen
// for a beat before releasing into the pivot section, rather than a timed
// animation or an intercepted scroll gesture.
const BG_FADE_VH = 60
const TEXT_FADE_VH = 40
const HOLD_VH = 60

function clamp01(n) {
  return Math.min(1, Math.max(0, n))
}

function Finale() {
  const pinRef = useRef(null)
  const [bgOpacity, setBgOpacity] = useState(0)
  const [textOpacity, setTextOpacity] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setBgOpacity(1)
      setTextOpacity(1)
      return
    }
    const onScroll = () => {
      const pin = pinRef.current
      if (!pin) return
      const vh = window.innerHeight / 100
      const scrolled = Math.max(0, -pin.getBoundingClientRect().top)
      setBgOpacity(clamp01(scrolled / (BG_FADE_VH * vh)))
      setTextOpacity(clamp01((scrolled - BG_FADE_VH * vh) / (TEXT_FADE_VH * vh)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="cinema-finale-pin"
      ref={pinRef}
      style={{ height: `${100 + BG_FADE_VH + TEXT_FADE_VH + HOLD_VH}vh` }}
      data-screen-label="Finale"
    >
      <div className="cinema-finale-sticky">
        {bgOpacity < 0.6 && <div className="cinema-finale-dark-zone" aria-hidden="true" />}
        <div className="cinema-finale-fade" style={{ opacity: bgOpacity }} aria-hidden="true" />
        <p className="cinema-finale__statement" style={{ opacity: textOpacity }}>
          We do.
        </p>
      </div>
    </div>
  )
}

// Mission — pinned in place (same mechanic as the opening beats) so it
// holds centered on screen for a beat rather than just scrolling past.
// Plain white throughout — the white → navy crossfade now happens on the
// Pivot below instead (see Pivot).
function Mission() {
  return (
    <section className="mission-band" data-screen-label="Mission">
      <div className="mission-band__pin">
        <div className="mission-band__sticky">
          <div className="wrap">
            <h2 className="mission-band__headline" data-reveal>
              Join us as we become Christlike leaders in an age of artificial intelligence
            </h2>
            <p className="mission-band__statement" data-reveal>
              that treat AI as a <Link to="/principles#p1">stewardship</Link> &mdash; harnessing
              it ethically for people, communities, and the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Pivot — no pinned crossfade and no added scroll distance: white → navy
// is a plain CSS color transition (background + text, eased over ~0.9s)
// triggered once by useInView when the section scrolls into view, rather
// than a hard cut or a scroll-scrubbed fade.
function Pivot() {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <section className={`pivot${inView ? ' pivot--in' : ''}`} ref={ref} data-screen-label="Pivot">
      <div className="wrap">
        <p className="kicker" data-reveal>Our principles</p>
        <h2 className="pivot__headline" data-reveal>
          Our Principles for Ethical AI Use
        </h2>
        <p className="pivot__body" data-reveal>
          The AI &amp; Ethics Initiative explores principles that can guide how we use
          artificial intelligence, regardless of what tools come next.
        </p>
        <Link to="/principles" className="pivot__cta" data-reveal>
          Explore our principles <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}

// "Put the Principles into practice" — three circles that hold just a
// label until hovered (or focused, for keyboard users), when a panel
// slides up over the circle with a fuller description and a link.
const PRACTICE_CIRCLES = [
  {
    key: 'learn',
    label: 'Learn',
    title: 'AI Kickstart',
    text: 'A hands-on introduction to using AI tools thoughtfully, built around the Principles.',
    href: '/kickstart',
  },
  {
    key: 'engage',
    label: 'Engage',
    title: 'Events & Conversations',
    text: 'Workshops, panels, and forums where the Principles meet real questions.',
    href: '/get-involved',
  },
  {
    key: 'explore',
    label: 'Explore',
    title: 'Ideas & Resources',
    text: 'Curated reading and updates on AI ethics, delivered weekly.',
    href: '/news',
  },
]

// A circle that reads as just an arrow until hovered/focused, when it
// stretches into a pill and a second "panel" slides out of it with the
// fuller description — the arrow rotates from pointing in (down-left) to
// pointing out (right) to sell the same motion.
function PracticeCircle({ item }) {
  return (
    <Link className="practice-circle" to={item.href} data-reveal>
      <span className="practice-circle__pill">
        <span className="practice-circle__arrow" aria-hidden="true">
          &rarr;
        </span>
        <span className="practice-circle__detail">
          <span className="practice-circle__detail-title">{item.title}</span>
          <span className="practice-circle__detail-text">{item.text}</span>
        </span>
      </span>
      <span className="practice-circle__label">{item.label}</span>
    </Link>
  )
}

export default function Home() {
  return (
    <>
      {/* Section 1 — Cinematic opening. .home-open is what tells Layout.jsx
          to render the nav light-on-dark for this stretch of the page. */}
      <section className="home-open" data-screen-label="Opening">
        {OPENING_BEATS.map((text) => (
          <OpeningBeat key={text} text={text} />
        ))}
      </section>

      {/* Finale — pinned in place while the background fades completely to
          white, then "You do." fades in on that same spot (see Finale
          above / cinema-sequence.css for the mechanics). */}
      <Finale />

      {/* Mission — lands immediately after "You do.": the AI → human
          agency pivot leads straight into the initiative's Christlike,
          BYU-centered identity before the pivot/Principles sections. Pinned
          in place (see Mission above), plain white. */}
      <Mission />

      {/* Section 2 — The pivot: plain, static navy — white → navy is a
          hard cut right at this section boundary. */}
      <Pivot />

      {/* Section 4 — Put the Principles into practice */}
      <section className="practice" data-screen-label="Practice">
        <div className="wrap">
          <div className="practice__head">
            <p className="kicker" data-reveal>In practice</p>
            <h2 data-reveal>Put the Principles into practice</h2>
          </div>
          <div className="practice-circles reveal-stagger">
            {PRACTICE_CIRCLES.map((item) => (
              <PracticeCircle item={item} key={item.key} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Reflective break */}
      <section className="reflect" data-screen-label="Reflective break">
        <div className="wrap reveal-stagger">
          <p className="reflect__line" data-reveal>AI can help you do more.</p>
          <p className="reflect__line reflect__line--pause" data-reveal>
            But who is it helping you become?
          </p>
        </div>
      </section>

    </>
  )
}
