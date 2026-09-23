// Top-level metadata for the 5 Kickstart modules. Each module's actual
// step content lives in its own file (module-1-basics.js, etc.) so the
// dashboard can stay light without pulling in every module's content.

export const MODULES_META = [
  {
    id: 'basics',
    number: 1,
    title: 'AI Basics',
    description: 'What AI actually is (and isn’t), and why it sometimes confidently makes things up.',
    minutes: 25,
    needsAccount: false,
  },
  {
    id: 'ethics',
    number: 2,
    title: 'AI Ethics',
    description:
      'Real cases where AI went wrong, an apostle’s counsel on AI and faith, and your own personal AI constitution.',
    minutes: 30,
    needsAccount: false,
  },
]

export const moduleMetaById = (id) => MODULES_META.find((m) => m.id === id)
