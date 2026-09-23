// Ethical AI use showcase. Each entry is one concrete, real way to use an AI
// tool well. Add new ones to this array — the page renders whatever is here.
//   title    — short name of the use
//   tool     — which AI tool it's done with
//   category — grouping label shown on the card
//   how      — plain-language instructions, one paragraph (shown on the card)
//   why      — technical explanation shown when the card is opened
//   prompts  — copy-and-paste prompts: { label, text }
export const SHOWCASE = [
  {
    id: 'foreign-language-practice',
    title: 'Foreign Language Practice',
    tool: 'ChatGPT',
    category: 'Learning',
    how: 'Put ChatGPT in voice mode and ask it to speak to you in a different language. Speak back and forth to practice, and have it correct you when you use incorrect grammar or vocabulary.',
    why: "Voice mode runs speech recognition on what you say and generates a spoken reply, so you practice listening and pronunciation, not just reading. The model has seen a huge amount of text in most major languages, which makes it a patient conversation partner. Its corrections are predictions of what a fluent speaker would say, so they are usually right on common grammar but can be wrong on slang, dialects, or rare vocabulary. Treat it as a practice partner and double-check anything important with a teacher or a dictionary. The ethical part: you are doing the speaking and the thinking, and the AI is only giving you reps and feedback.",
    prompts: [
      { label: "1. Set up the conversation", text: "Act as a friendly, patient [language] tutor with 15 years of experience teaching [beginner / intermediate / advanced] students.\n\nContext: I am a [level] learner practicing spoken [language] in voice mode. Today's topic is [topic, e.g. ordering food at a café].\n\nRun the conversation in these steps:\n1. Greet me in [language] and ask one simple opening question.\n2. Wait for my reply.\n3. Respond in 1–2 short sentences at my level, then ask one follow-up question.\n\nSpeak only in [language], using everyday vocabulary at a slow, clear pace.\n\nExample of one turn (shown in Spanish; use my language):\nYou: \"Hola, ¿qué te gustaría comer hoy?\"\nMe: (I answer)\nYou: \"¡Qué rico! ¿Prefieres algo dulce o salado?\"" },
      { label: "2. Get corrections as we talk", text: "Keep the same tutor role. After each of my replies, use this 3-part format:\n1. Corrected: my sentence rewritten with correct grammar and vocabulary (repeated unchanged if it was already correct).\n2. Why: the fix explained in one short English sentence.\n3. Continue: your next reply in [language], ending with a question.\n\nExample:\nMe: \"Yo soy ir al mercado.\"\nYou:\nCorrected: \"Yo voy al mercado.\"\nWhy: \"Ir\" becomes \"voy\" for \"I\", and \"soy\" (I am) is not needed here.\nContinue: \"¡Qué bien! ¿Qué vas a comprar?\"" },
      { label: "3. Review the session", text: "Act as a language coach reviewing the conversation we just had. Work through these steps in order, and wait for me to say \"next\" between them:\nStep 1: List my 5 most frequent mistakes, each written as \"my version → correct version\".\nStep 2: Give a one-sentence rule of thumb in plain English for each mistake.\nStep 3: Write 5 practice sentences at my level that use the correct forms, as a numbered list in [language] with the English translation in parentheses." },
    ],
  },
  {
    id: 'mock-interview',
    title: 'Mock Interview Practice',
    tool: 'ChatGPT',
    category: 'Career',
    how: 'Give the AI a job description and ask it to interview you, one question at a time. Answer out loud or in text, then ask for honest feedback on how you could answer more clearly.',
    why: "The model can play an interviewer because it has learned what interview questions and good answers look like. Pasting a real job description lets it tailor questions to the role. Doing it one question at a time, with your own answers, gives you realistic practice reps. Its feedback is general coaching, not a prediction of what a specific employer wants, and you should not let it invent experience for you. Your answers should always reflect what you have actually done.",
    prompts: [
      { label: "1. Start the interview", text: "Act as a senior hiring manager at [company or type of company] interviewing me for the role below. I am a [level, e.g. new grad] candidate.\n\nJob description:\n\"\"\"\n[paste job description]\n\"\"\"\n\nRun a 6-question interview:\n1. Begin with a warm opening question.\n2. Ask one question at a time and wait for my answer. Mix behavioral questions (\"Tell me about a time…\") with role-specific ones.\n3. After each answer, reply with a one-line acknowledgment and the next question.\n\nExample: \"Thanks for that. Next: tell me about a time you had to learn something quickly. What was the situation, and what did you do?\"" },
      { label: "2. Get coaching after each answer", text: "After each answer I give, step out of the interviewer role and act as an interview coach. Reply in this format, in under 80 words:\nStrength: one thing I did well, quoting my words.\nSharper: one way to be more specific (for example, add a number or a result).\nStructure: which parts of Situation, Task, Action, Result I included.\n\nLeave the rewriting to me and invite me to try the answer again." },
      { label: "3. Build a practice plan", text: "Act as a career coach and review the whole interview. Work in steps:\n1. Summarize my 3 strongest themes.\n2. List the 3 questions where my answers were weakest, with one specific improvement for each.\n3. Give me a 3-item practice plan for the next week, with each item taking under 20 minutes." },
    ],
  },
  {
    id: "brainstorming-session",
    title: "Brainstorming Session",
    tool: "ChatGPT",
    category: "Creativity",
    how: "Use AI as a thinking partner to stretch your own ideas: share what you already have, then have it ask questions and offer new angles you can pick from or ignore.",
    why: "Language models can produce many varied associations quickly, which helps when you are stuck. The risk is anchoring on the first suggestion or letting the AI do the creative work. These prompts have you generate your own ideas first, then use the AI to widen the field and question your thinking. It can also repeat common ideas, so treat its list as raw material, and make the final choices yourself.",
    prompts: [
      { label: "1. Share your ideas first", text: "Act as a creative brainstorming coach who has facilitated hundreds of student idea sessions. I am a [level] student working on [project or assignment] for [audience, e.g. a class of 30 peers].\n\nHere are the 3 ideas I already have:\n1. [idea]\n2. [idea]\n3. [idea]\n\nWork in small steps:\n1. Ask me 3 questions, one at a time, about my goals and constraints, and wait for my answer after each.\n2. Then suggest 5 new directions that build on or contrast with my ideas, each in one sentence.\n\nExample format: \"Direction 2: Flip your idea #1 so the audience does the teaching, which fits your goal of active participation.\"" },
      { label: "2. Push the ideas further", text: "Stay in your coach role. Pick my favorite idea from [number] and help me develop it in these steps:\n1. List 3 ways a reviewer might question it.\n2. Suggest one small experiment I could try this week to test it.\n3. Ask me which of the 3 concerns matters most to me, and wait for my answer." },
      { label: "3. Choose and commit", text: "Act as a decision coach. Using the ideas we discussed, build a comparison table with my top 3 ideas as rows and these columns: fits my goal, effort needed (low / medium / high), and biggest risk. Keep each cell under 10 words. Then ask me which one I choose and why, so the decision stays mine." },
    ],
  },
  {
    id: "prioritizing-to-dos",
    title: "Prioritizing To-Dos",
    tool: "ChatGPT",
    category: "Productivity",
    how: "Dump everything on your plate into the chat, and have the AI help you sort it by deadline and effort so you can plan your week. You stay in charge of what matters.",
    why: "Organizing a long list is a pattern-matching and sorting task that language models handle well, which frees up your energy for the actual work. The model does not know your real priorities, other commitments, or how long tasks take you, so its ranking is a starting point. Giving it your deadlines, time available and constraints improves results, and you make the final call.",
    prompts: [
      { label: "1. Dump and sort", text: "Act as an experienced academic planner who helps busy university students manage their week. I have [number] hours available for schoolwork this week, and I do my best focus work in the [morning / afternoon / evening].\n\nHere is everything on my plate, with deadlines where I know them:\n[task 1, due date]\n[task 2, due date]\n[task 3, due date]\n\nWork in steps:\n1. Group my tasks into \"urgent and important\", \"important but not urgent\", and \"quick wins under 15 minutes\".\n2. Ask me one clarifying question about any task where the effort is unclear, and wait for my answer.\n\nExample format:\nUrgent and important: \"Chemistry lab report (due Thursday)\"" },
      { label: "2. Build the schedule", text: "Stay in your planner role. Turn the groups into a day-by-day plan for this week using these rules: put the hardest task in my best focus time, keep each work block to 25–50 minutes with a 5–10 minute break, and leave one open block each day for surprises. Present it as a table with columns for Day, Time block, and Task." },
      { label: "3. Adjust when life happens", text: "Act as my planner again. Something changed: [what changed, e.g. a new assignment appeared or I lost 3 hours]. In steps:\n1. Tell me which tasks are now at risk.\n2. Suggest 2 ways to adjust the plan, each in 2 sentences.\n3. Ask me which I prefer, then show the updated schedule." },
    ],
  },
  {
    id: "outlining-key-concepts",
    title: "Outlining Key Concepts",
    tool: "Claude",
    category: "Studying",
    how: "Paste your own notes or reading and have the AI organize the key ideas into a clear outline, so you can see how concepts connect before you study them.",
    why: "Turning long text into a hierarchy of main ideas, sub-points and links is something language models do well, and seeing the structure makes studying faster. Because the model only works from the text you paste, the outline stays tied to your course material, but it can misjudge what your instructor stresses, so compare it with your syllabus. Use it after you have read or attended class, so the outline supports your learning instead of replacing the reading.",
    prompts: [
      { label: "1. Build the outline", text: "Act as an expert [subject] teaching assistant who is skilled at organizing complex material for [level] students.\n\nHere are my notes or reading:\n\"\"\"\n[paste text]\n\"\"\"\n\nCreate an outline in these steps:\n1. State the single big idea of this material in one sentence.\n2. List 4–6 key concepts as top-level headings.\n3. Under each heading, add 2–3 sub-points in short phrases using plain words, and include one key term with a one-line definition.\n\nExample format:\n1. Supply and demand\n   a. Price rises when demand outpaces supply\n   b. Key term: \"equilibrium\" is the price where supply equals demand" },
      { label: "2. Show how ideas connect", text: "Stay in your teaching assistant role. Using the outline, list the 5 most important relationships between the concepts, each as one sentence in the form \"[Concept A] leads to / depends on / contrasts with [Concept B] because…\". Then suggest a simple diagram I could sketch by hand." },
      { label: "3. Check my understanding", text: "Act as a study coach. Ask me to fill in the blanks: turn the outline into 8 fill-in-the-blank statements, one per sub-point, and ask them one at a time. Wait for my answer, confirm or correct it in one sentence, and tell me my score at the end." },
    ],
  },
  {
    id: "midterm-practice",
    title: "Midterm Practice",
    tool: "Claude",
    category: "Studying",
    how: "Turn your own study guide and notes into a practice exam, take it yourself, then have the AI go over the answers so you know exactly what to review.",
    why: "A practice test works because recalling information under exam-like conditions strengthens memory more than rereading. The model can write questions in the formats your exam uses, based on the material you provide. It can miss the emphasis of your instructor, and its answer keys can contain errors, so check answers against your notes or textbook. Use it to prepare honestly for an exam, and follow your course policy on AI use.",
    prompts: [
      { label: "1. Generate the practice exam", text: "Act as a university professor writing a midterm for [course name]. My audience is [level] students. The exam covers these topics: [topics].\n\nHere is my study guide and notes:\n\"\"\"\n[paste materials]\n\"\"\"\n\nWrite a 30-minute practice midterm in these steps:\n1. Write 8 multiple-choice questions, 3 short-answer questions, and 1 essay prompt, ordered from easiest to hardest.\n2. Base every question on the material I pasted, and label the topic in brackets after each question.\n3. Present only the questions and keep the answer key hidden until I say \"grade me\".\n\nExample format: \"Q2 [Cell respiration]: Which molecule carries electrons to the electron transport chain? A) … B) … C) … D) …\"" },
      { label: "2. Grade my answers", text: "I have finished the practice midterm. Act as a fair, encouraging grader. Here are my answers:\n[paste answers]\n\nWork in steps:\n1. Give each answer a score with the correct answer, and quote the line from my notes that supports it.\n2. Explain each mistake in 2 sentences.\n3. Rank the topics from weakest to strongest based on my results." },
      { label: "3. Plan my final review", text: "Act as a study coach. Based on my weakest topics, create a 3-day review plan with 45-minute sessions. For each session, list the topic, one activity (for example, redo missed questions, explain the concept aloud, or make flashcards), and a goal that I can check off. Present it as a table." },
    ],
  },
]

export const SHARE_EMAIL = 'ai-ethics@byu.edu'
