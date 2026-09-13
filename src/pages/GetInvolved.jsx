import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel.jsx'
import EventsCalendar from '../components/EventsCalendar.jsx'
import '../get-involved.css'

export default function GetInvolved() {
  return (
    <>
      <header className="phead phead--paper">
        <div className="wrap">
          <nav className="crumbs">
            <Link to="/">Home</Link> <span>/</span> <span>Get Involved</span>
          </nav>
          <h1>Calendar &amp; Announcements</h1>
        </div>
      </header>

      <div className="gi-panel">
        <section className="hero" data-screen-label="Spotlights">
          <div className="wrap">
            <Carousel />
          </div>
        </section>

        <section className="section" data-screen-label="Calendar">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="kicker">Upcoming</p>
                <h2>Events calendar</h2>
              </div>
            </div>
            <EventsCalendar />
          </div>
        </section>

        <section className="section" data-screen-label="Featured">
          <div className="wrap">
            <div className="feature-split" data-reveal>
              <div className="ph">
                <span>photo · students &amp; faculty</span>
              </div>
              <div className="feature-split__body">
                <p className="kicker">Featured</p>
                <h2>Something Cool That Should be Featured</h2>
                <p className="lead">
                  We made this really cool thing for students, and we want to show it off. Check
                  it out!
                </p>
                <Link className="link-more" to="/kickstart">
                  Learn how it works<span className="arrow">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
