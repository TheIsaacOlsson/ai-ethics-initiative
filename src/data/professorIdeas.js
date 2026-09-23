// Ideas shared by professors, shown on /professors. Same shape as
// data/showcase.js, plus optional `steps` (ordered list) and `notes`
// (things to keep in mind), and optional dialog text overrides.
export const PROFESSOR_IDEAS = [
  {
    id: 'ai-as-a-textbook',
    title: 'AI as a Textbook',
    tool: 'Any AI model',
    toolPrefix: '',
    category: 'Classroom',
    how: 'Textbooks in fast-moving fields go out of date. Instead, each student has a 30-minute conversation with the AI model of their choice, started from a prompt the instructor provides, then completes a short written reflection before class.',
    why: 'This treats an AI model as an interactive reading. Instead of one fixed chapter, each student explores the topic through conversation, asking follow-up questions wherever they get confused, at their own pace. That suits subjects where the assigned textbook lags behind the field. Two things keep it honest. AI models have knowledge cutoffs and can state false things confidently, so the reflection asks students to evaluate what they learned instead of only reporting it. And the reflections feed into class discussion, where the instructor can correct errors and go deeper on what matters most.',
    steps: [
      'Choose the topic for the week and adapt the starter prompt below to it.',
      'Students choose the AI model they prefer and paste in the prompt.',
      'Students spend about 30 minutes in conversation, asking follow-up questions whenever something is unclear.',
      'Before class, students complete the short written reflection using the questions below.',
      'In class, use the reflections to open discussion, compare what different models said, and correct anything that was wrong.',
    ],
    notes: [
      'Students using different models will get different answers. Treat that as material for discussion.',
      'Ask students to save key excerpts of the conversation if you want to see what they were working from.',
      'Offer an alternative for any student without access to an AI account.',
      'State your expectations for AI use in the assignment, so students know this use is approved.',
    ],
    promptsHeading: 'Prompts and questions to copy',
    promptsHint: 'The first is for students to paste into their AI model; the second is the written reflection. Replace anything in [brackets] to fit your course.',
    prompts: [
      {
        label: '1. Starter prompt for students',
        text: `Act as an expert [subject] instructor who teaches [level] university students and explains ideas clearly with concrete examples.

I am studying [topic] for my [course name] class this week, and my assigned textbook is outdated.

Teach me the topic through conversation, in these steps:
1. Begin with a 5-sentence overview of the current state of [topic], noting anything that has changed in recent years.
2. Ask me one question to find out what I already know, and wait for my answer.
3. Explain the 3 most important ideas one at a time, each in under 150 words with one real-world example, and check my understanding before moving on.
4. Invite me to ask follow-up questions, and answer each one at my level.
5. Whenever you state a fact that I should confirm, mark it with (verify) so I know what to check.

Example of a (verify) note: "The most recent studies suggest X (verify)."`,
      },
      {
        label: '2. Reflection questions (short written assignment)',
        text: `1. In 3–4 sentences, summarize the most important thing you learned in your conversation.
2. What was one idea that surprised you or changed what you thought before?
3. Choose one claim the AI made and check it against a reliable source, such as a course reading or a published article. What did you find?
4. What question did you ask that led to the most useful answer, and why do you think it worked?
5. What is one question you still have that you would like to discuss in class?`,
      },
      {
        label: '3. Fact-check follow-up (optional, for students)',
        text: `Act as a careful research assistant. Review the main claims you made in our conversation and work in steps:
1. List the 5 claims that matter most, as a numbered list.
2. For each claim, rate your confidence as high, medium, or low, with one sentence of reasoning.
3. For each claim, name the kind of source I could use to verify it and a search phrase I could type.

Example: "Claim 2: [claim]. Confidence: medium, because this area changes quickly. Verify with: a recent review article; search 'current research on [topic]'."`,
      },
    ],
  },
]
