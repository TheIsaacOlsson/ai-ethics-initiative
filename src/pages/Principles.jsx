// The Principles page embeds the team's "Stewardship of AI" outline
// document as-is (its own cream/navy-blue look, Newsreader + Hanken
// Grotesk, and all of its interactions) rather than rebuilding it in the
// site's BYU branding — see public/stewardship-outline/. It's a static
// export (Outline.dc.html + support.js + assets), so it's served
// unmodified in an iframe below the site's fixed nav bar; everything
// inside — scrolling, hover states, the principle-to-principle nav — is
// the document's own and isolated from the rest of the app.
const NAV_HEIGHT = 79

export default function Principles() {
  return (
    <div style={{ paddingTop: NAV_HEIGHT }}>
      <iframe
        title="Stewardship of AI — Principles"
        src={`${import.meta.env.BASE_URL}stewardship-outline/Outline.dc.html`}
        style={{
          display: 'block',
          width: '100%',
          height: `calc(100vh - ${NAV_HEIGHT}px)`,
          border: 0,
        }}
      />
    </div>
  )
}
