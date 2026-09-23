import { useState } from 'react'

const STATEMENTS = [
  {
    statement:
      'If an AI tool cites a specific source — a named study, article, or publication — for a claim, that citation is reliable evidence the claim is accurate.',
    isMyth: true,
    feedback:
      'Myth. Citations are generated the same way the rest of the text is: as a plausible-looking pattern, not a verified lookup. A model can produce a real-sounding source that’s subtly wrong, outdated, or doesn’t exist at all — and it will format the fake one exactly like a real one. A citation is a claim to check, not proof.',
  },
  {
    statement:
      'Because two AI tools were both trained on huge amounts of overlapping internet text, asking a second tool to "verify" a claim from the first is a meaningfully independent check.',
    isMyth: true,
    feedback:
      'Myth, more often than it seems. If both tools absorbed the same widely-repeated error during training, the second tool can confidently agree with the first one’s mistake — agreement between two AI tools isn’t the same as agreement with reality. It’s a useful sanity check, but not a substitute for an actual outside source.',
  },
  {
    statement:
      'An AI tool can be completely correct about the facts in an answer while still subtly misleading you through what it chooses to emphasize, include, or leave out.',
    isMyth: false,
    feedback:
      'True, and the harder half of verification. Fact-checking catches false statements; it doesn’t catch a technically-accurate answer that’s framed to lead you somewhere skewed. This is why the source and framing matter, not just whether each individual sentence checks out.',
  },
  {
    statement: 'If you give an AI tool more context and more detailed instructions, its answer will always become more accurate.',
    isMyth: true,
    feedback:
      'Myth. More context usually helps — but irrelevant, conflicting, or excessive detail can crowd out what actually matters, and the model can latch onto the wrong part of what you gave it. More isn’t the same as better; relevant and well-organized context is what actually moves accuracy.',
  },
  {
    statement:
      'An AI model’s training data has a real cutoff date, but the model itself often can’t reliably tell you what that date is or what it does or doesn’t know as a result.',
    isMyth: false,
    feedback:
      'True, and genuinely counterintuitive. A model doesn’t have real self-awareness of the edges of its own knowledge — it can misstate its own cutoff, or answer questions about recent events with the same fluent confidence it uses for anything else, without flagging that it’s guessing.',
  },
]

export default function MythSpotter() {
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState(null)
  const [answeredCount, setAnsweredCount] = useState(0)
  const item = STATEMENTS[index]
  const isLast = index === STATEMENTS.length - 1

  const pick = (chosenMyth) => {
    if (guess !== null) return
    setGuess(chosenMyth)
    setAnsweredCount((c) => c + 1)
  }

  const next = () => {
    setGuess(null)
    setIndex((i) => (isLast ? 0 : i + 1))
  }

  const correct = guess !== null && guess === item.isMyth

  return (
    <div className="ks-widget ks-widget--spotter">
      <p className="ks-widget__prompt">&ldquo;{item.statement}&rdquo;</p>
      {guess === null ? (
        <div className="ks-widget__options">
          <button type="button" className="ks-widget__option" onClick={() => pick(false)}>
            True
          </button>
          <button type="button" className="ks-widget__option" onClick={() => pick(true)}>
            Myth
          </button>
        </div>
      ) : (
        <div className={`ks-widget__reveal ${correct ? 'is-correct' : 'is-off'}`}>
          <p className="ks-widget__reveal-head">{correct ? 'Correct —' : 'Not quite —'} {item.isMyth ? 'Myth.' : 'True.'}</p>
          <p>{item.feedback}</p>
          <button type="button" className="btn btn--ghost" onClick={next}>
            {isLast ? 'Start over' : 'Next statement'}
            <span className="arrow">&rarr;</span>
          </button>
        </div>
      )}
      <p className="ks-widget__progress">{answeredCount} of {STATEMENTS.length} answered</p>
    </div>
  )
}
