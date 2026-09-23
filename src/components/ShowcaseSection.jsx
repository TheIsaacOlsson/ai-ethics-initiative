import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SHOWCASE, SHARE_EMAIL } from '../data/showcase.js'
import '../showcase.css'

const VISIBLE_COUNT = 2
const EMPTY = { title: '', tool: '', how: '', name: '' }

// There's no backend, so "submitting" composes an email to the Initiative
// with the fields filled in; the team adds approved ideas to data/showcase.js.
function SubmitForm() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Showcase idea: ${form.title}`
    const body = `Title: ${form.title}\nAI tool: ${form.tool}\nHow it works:\n${form.how}\n\nSubmitted by: ${form.name || '(anonymous)'}`
    window.location.href = `mailto:${SHARE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form className="sc-form" onSubmit={onSubmit} data-reveal>
      <h3>Share your own idea</h3>
      <p className="sc-form__lead">
        Do you use AI in a way that supports learning instead of replacing it? Tell us how.
      </p>
      <div className="sc-form__row">
        <label>
          Title
          <input required value={form.title} onChange={set('title')} placeholder="e.g. Foreign Language Practice" />
        </label>
        <label>
          AI tool
          <input required value={form.tool} onChange={set('tool')} placeholder="e.g. ChatGPT" />
        </label>
      </div>
      <label>
        How does it work?
        <textarea
          required
          rows={4}
          value={form.how}
          onChange={set('how')}
          placeholder="Explain the steps so someone else could try it."
        />
      </label>
      <label>
        Your name (optional)
        <input value={form.name} onChange={set('name')} />
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

export function ShowcaseCard({ item, onOpen, reveal = true }) {
  const open = () => onOpen(item)
  return (
    <div
      className="sc-card sc-card--clickable"
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — view details and prompts`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
      {...(reveal ? { 'data-reveal': true } : {})}
    >
      <div className="sc-card__top">
        <span className="sc-card__tag">{item.category}</span>
        <span className="sc-card__tool">{item.tool}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.how}</p>
      <span className="sc-card__cta">
        See prompts<span className="arrow">&rarr;</span>
      </span>
    </div>
  )
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button type="button" className="sc-copy" onClick={copy}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

export function ShowcaseDialog({ item, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prevFocus = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [onClose])

  return (
    <div className="sc-modal" onClick={onClose}>
      <div
        className="sc-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sc-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="sc-modal__close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <div className="sc-card__top">
          <span className="sc-card__tag">{item.category}</span>
          <span className="sc-card__tool">{item.toolPrefix ?? 'Best with '}{item.tool}</span>
        </div>
        <h3 id="sc-modal-title">{item.title}</h3>
        <p className="sc-modal__how">{item.how}</p>

        <h4>How it works</h4>
        <p>{item.why}</p>

        {item.steps && (
          <>
            <h4>How to run it</h4>
            <ol className="sc-steps">
              {item.steps.map((st) => (
                <li key={st}>{st}</li>
              ))}
            </ol>
          </>
        )}

        {item.notes && (
          <>
            <h4>Things to keep in mind</h4>
            <ul className="sc-steps">
              {item.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </>
        )}

        <h4>{item.promptsHeading ?? 'Prompts to copy'}</h4>
        <p className="sc-modal__hint">
          {item.promptsHint ?? (
            <>
              Paste these into {item.tool}, in order, and replace anything in [brackets] with your own
              details. Each one assigns a role, gives specifics, says what to do, shows an example, and
              breaks the task into steps &mdash; worth borrowing for your own prompts.
            </>
          )}
        </p>
        <ol className="sc-prompts">
          {item.prompts.map((pr) => (
            <li key={pr.label} className="sc-prompt">
              <div className="sc-prompt__head">
                <span>{pr.label}</span>
                <CopyButton text={pr.text} />
              </div>
              <pre>{pr.text}</pre>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function ShowcaseSection() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const shown = SHOWCASE.slice(0, VISIBLE_COUNT)
  const more = SHOWCASE.slice(VISIBLE_COUNT)

  return (
    <>
      <div className="sc-grid">
        {shown.map((item) => (
          <ShowcaseCard key={item.id} item={item} onOpen={setSelected} />
        ))}
      </div>
      <div className="sc-actions">
        {more.length > 0 && (
          <button
            type="button"
            className="sc-more"
            aria-expanded={open}
            aria-controls="sc-more-list"
            onClick={() => setOpen(!open)}
          >
            {open ? 'Show less' : 'Show more'}
            <span className={`sc-more__chev ${open ? 'is-open' : ''}`} aria-hidden="true">&#9662;</span>
          </button>
        )}
        <Link className="sc-more sc-more--link" to="/professors">
          Ideas for professors<span className="arrow">&rarr;</span>
        </Link>
      </div>
      {more.length > 0 && open && (
        <div className="sc-grid sc-grid--more" id="sc-more-list">
          {more.map((item) => (
            <ShowcaseCard key={item.id} item={item} onOpen={setSelected} reveal={false} />
          ))}
        </div>
      )}
      <SubmitForm />
      {selected && <ShowcaseDialog item={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
