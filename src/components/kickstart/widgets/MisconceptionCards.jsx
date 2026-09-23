import { useState } from 'react'

const CARDS = [
  {
    tag: '01',
    claim: 'AI is not a search engine.',
    explanation:
      'Google retrieves — it finds a real page, written by a real person, and hands it to you. AI generates a plausible-sounding answer from patterns it learned in training. It can sound just as confident when it’s making something up.',
    example: 'Ask it for a niche statistic or an exact quote — the odds of a confident, wrong answer go up fast.',
  },
  {
    tag: '02',
    claim: 'AI is not a calculator.',
    explanation:
      'It isn’t computing step by step. It’s predicting what a correct-looking answer tends to look like. Well-worn problems go fine — anything unusual or multi-step can quietly produce the wrong number.',
    example: 'Try a multi-step logic puzzle, then check the work by hand.',
  },
  {
    tag: '03',
    claim: 'AI is not a person.',
    explanation:
      'It has no beliefs, judgment, or soul — just fluent, confident-sounding language, whether it’s right or wrong. Confidence in tone tells you nothing about accuracy or character.',
    example: 'Treat it as a tool with a strong first draft — not a mind, and not a moral authority.',
  },
]

function MisconceptionCard({ card }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`ks-misconception ${open ? 'is-open' : ''}`}>
      <span className="ks-misconception__tag">{card.tag}</span>
      <h3 className="ks-misconception__claim">{card.claim}</h3>
      {open ? (
        <div className="ks-misconception__reveal">
          <p>{card.explanation}</p>
          <p className="ks-misconception__example">{card.example}</p>
        </div>
      ) : (
        <button type="button" className="ks-misconception__toggle" onClick={() => setOpen(true)}>
          Why? <span className="arrow">&rarr;</span>
        </button>
      )}
    </div>
  )
}

export default function MisconceptionCards() {
  return (
    <div className="ks-misconceptions">
      {CARDS.map((card) => (
        <MisconceptionCard key={card.tag} card={card} />
      ))}
    </div>
  )
}
