import ShowcaseSection from '../components/ShowcaseSection.jsx'

export default function Showcase() {
  return (
    <>
      <header className="phead phead--paper">
        <div className="wrap">
          <h1>Ethical AI Showcase</h1>
          <p>
            Real, concrete ways to use AI that support learning instead of replacing it. Borrow an
            idea, or share your own.
          </p>
        </div>
      </header>
      <section className="section" data-screen-label="Showcase">
        <div className="wrap">
          <ShowcaseSection />
        </div>
      </section>
    </>
  )
}
