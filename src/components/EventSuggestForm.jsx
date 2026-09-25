import { useState } from 'react'
import { SHARE_EMAIL } from '../data/showcase.js'
import '../showcase.css'

const EMPTY = { what: '', date: '', where: '', details: '', name: '' }

// No backend: "submitting" opens an email to the Initiative with the fields
// filled in, and the team adds real events to data/events.js.
export default function EventSuggestForm() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Campus event tip: ${form.what}`
    const body = [
      `What's happening: ${form.what}`,
      `Date: ${form.date || '(not sure)'}`,
      `Time and place: ${form.where || '(not sure)'}`,
      `More details or link:\n${form.details || '(none)'}`,
      '',
      `Sent by: ${form.name || '(anonymous)'}`,
    ].join('\n')
    window.location.href = `mailto:${SHARE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="sc-form" onSubmit={onSubmit} data-reveal>
      <h3>Know about something happening on campus?</h3>
      <p className="sc-form__lead">
        Let us know! Tell us what you heard and we&rsquo;ll add it to the calendar.
      </p>
      <label>
        What&rsquo;s happening?
        <input
          required
          value={form.what}
          onChange={set('what')}
          placeholder="e.g. Guest lecture on AI in healthcare"
        />
      </label>
      <div className="sc-form__row">
        <label>
          Date
          <input type="date" value={form.date} onChange={set('date')} />
        </label>
        <label>
          Time and place
          <input value={form.where} onChange={set('where')} placeholder="e.g. 5 PM, Kimball Tower" />
        </label>
      </div>
      <label>
        More details or a link (optional)
        <textarea rows={3} value={form.details} onChange={set('details')} />
      </label>
      <label>
        Your name (optional)
        <input value={form.name} onChange={set('name')} />
      </label>
      <div className="sc-form__actions">
        <button type="submit" className="btn btn--accent">
          Send it in<span className="arrow">&rarr;</span>
        </button>
        {sent && (
          <span className="sc-form__note">
            Your email app should have opened with your tip ready to send. If not, email us at {SHARE_EMAIL}.
          </span>
        )}
      </div>
    </form>
  )
}
