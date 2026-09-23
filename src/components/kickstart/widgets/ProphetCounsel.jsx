import { useState } from 'react'
import { GONG_BYU_CONFERENCE, FURTHER_PROPHETIC_COUNSEL } from '../../../data/kickstart/quotes.js'

export default function ProphetCounsel() {
  const [reflection, setReflection] = useState('')

  return (
    <div className="ks-prophet">
      <div className="ks-quote ks-prophet__quote">
        <cite className="ks-prophet__source">{GONG_BYU_CONFERENCE.source}</cite>
        {GONG_BYU_CONFERENCE.paragraphs.map((p, i) => (
          <p key={i}>
            {i === 0 && '“'}
            {p}
          </p>
        ))}
        <ol className="ks-prophet__list" type="a">
          {GONG_BYU_CONFERENCE.list.map((item, i, arr) => (
            <li key={i}>
              {item}
              {i === arr.length - 1 ? '”' : ''}
            </li>
          ))}
        </ol>
      </div>

      <div className="ks-callout ks-callout--tip">
        <p>
          {GONG_BYU_CONFERENCE.verifyNote}{' '}
          <a href={GONG_BYU_CONFERENCE.sourceUrl} target="_blank" rel="noopener noreferrer">
            Source <span className="arrow">&rarr;</span>
          </a>
        </p>
      </div>

      <div className="ks-callout ks-callout--link-out">
        <p>
          No matter what we do with AI, we should strive to live up to Elder Gong&rsquo;s prophetic
          counsel and remember our divine worth as children of God.
        </p>
      </div>

      <div className="ks-prophet__further">
        <p className="ks-prophet__further-title">More prophetic counsel on AI</p>
        <ul className="ks-prophet__further-list">
          {FURTHER_PROPHETIC_COUNSEL.map((item) => (
            <li key={item.title}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              <span className="ks-prophet__further-meta">{item.meta}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ks-prophet__reflect">
        <p className="ks-widget__prompt">
          Before moving on — what stands out to you in this counsel? No wrong answers, this isn&rsquo;t
          graded.
        </p>
        <textarea
          className="ks-roles__notes"
          rows={3}
          placeholder="Type a thought or two…"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
      </div>
    </div>
  )
}
