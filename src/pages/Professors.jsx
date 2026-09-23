import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SHARE_EMAIL } from '../data/showcase.js'
import { PROFESSOR_IDEAS } from '../data/professorIdeas.js'
import { ShowcaseCard, ShowcaseDialog } from '../components/ShowcaseSection.jsx'
import '../kickstart.css'
import '../showcase.css'

const AREAS = [
  {
    title: 'In the classroom',
    text: 'How you teach with or around AI: assignment design, AI-use policies, ways to build learning that AI cannot replace, or activities that put AI to good use.',
  },
  {
    title: 'In research',
    text: 'How you use AI in your own scholarship: literature review, data analysis, writing support, and the questions of integrity, disclosure and reproducibility that come with it.',
  },
]

const EMPTY = { name: '', role: '', area: 'Classroom', title: '', idea: '' }

function ProfessorForm() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // No backend: submitting opens an email to the Initiative with the fields
  // filled in, same as the student showcase form.
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Professor idea (${form.area}): ${form.title}`
    const body = `Area: ${form.area}\nTitle: ${form.title}\nIdea:\n${form.idea}\n\nShared by: ${form.name}${form.role ? `, ${form.role}` : ''}`
    window.location.href = `mailto:${SHARE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="sc-form" onSubmit={onSubmit} data-reveal>
      <h3>Share an idea</h3>
      <p className="sc-form__lead">
        A short description is plenty. We will follow up if we have questions.
      </p>
      <div className="sc-form__row">
        <label>
          Your name
          <input required value={form.name} onChange={set('name')} />
        </label>
        <label>
          Department or role
          <input value={form.role} onChange={set('role')} placeholder="e.g. Political Science" />
        </label>
      </div>
      <div className="sc-form__row">
        <label>
          Where does it apply?
          <select value={form.area} onChange={set('area')}>
            <option>Classroom</option>
            <option>Research</option>
            <option>Both</option>
          </select>
        </label>
        <label>
          Idea title
          <input required value={form.title} onChange={set('title')} />
        </label>
      </div>
      <label>
        Describe your idea
        <textarea
          required
          rows={5}
          value={form.idea}
          onChange={set('idea')}
          placeholder="What do you do, how does it work, and what have you learned?"
        />
      </label>
      <div className="sc-form__actions">
        <button type="submit" className="btn btn--accent">
          Submit idea<span className="arrow">&rarr;</span>
        </button>
        {sent && (
          <span className="sc-form__note">
            Your email app should have opened with your idea ready to send. If not, email us at {SHARE_EMAIL}.
          </span>
        )}
      </div>
    </form>
  )
}

export default function Professors() {
  const [selected, setSelected] = useState(null)
  return (
    <>
      <header className="phead phead--paper">
        <div className="wrap">
          <h1>Ideas for Professors</h1>
          <p>A space for faculty to share how they are approaching AI, in the classroom and in research.</p>
        </div>
      </header>

      <section className="section" data-screen-label="Professors">
        <div className="wrap">
          <div className="sc-prose" data-reveal>
            <p>
              We are a student initiative, and we know that navigating AI is a lot to ask of faculty on
              top of everything else you do. So we created a space where professors can share their
              ideas for using AI, both in the classroom and in research, and learn from each other.
            </p>
            <p>
              Whatever your stance on AI, your experience is useful to students and colleagues who are
              working out the same questions.
            </p>
          </div>

          <div className="sc-grid">
            {AREAS.map((a) => (
              <div className="sc-card" key={a.title} data-reveal>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>

          <div className="ks-section-label sc-shared-label">
            <h2>Shared ideas</h2>
            <span className="ks-section-label__tag">From faculty</span>
          </div>
          <div className="sc-grid">
            {PROFESSOR_IDEAS.map((item) => (
              <ShowcaseCard key={item.id} item={item} onOpen={setSelected} />
            ))}
          </div>

          <ProfessorForm />

          <p className="sc-back">
            <Link className="link-more" to="/kickstart">
              <span className="arrow sc-back__arrow">&larr;</span>Back to the student showcase
            </Link>
          </p>
        </div>
      </section>
      {selected && <ShowcaseDialog item={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
