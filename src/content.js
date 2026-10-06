// ✏️ ALL EDITABLE TEXT / PATHS LIVE HERE.
export const IMG = {
  smile: '/images/nudaeng-smile.png',
  laugh: '/images/nudaeng-laughing.png',
   smile2: '/images/nudaeng-smile2.png',
  one: '/images/nudaeng1.png',
  two: '/images/nudaeng2.png',
  three: '/images/nudaeng3.png',
  sad: '/images/nudaeng2.png',
  cry2: '/images/nudaeng-crying2.png',
   heart: '/images/nudaeng-heart.png', 
   think: '/images/nudaeng-thinking.png',       // ← new
  flowers: '/images/nudaeng-flowers.png',
  flowers2: '/images/nudaeng-flowers2.png',   // ← new
  cry: '/images/nudaeng-crying.png'
}

// 4 photos taped around the letter. Replace the files, or change the names here.
export const LETTER_PHOTOS = [
  '/images/letter1.jpg',
  '/images/letter2.jpg',
  '/images/letter3.jpg',
  '/images/letter4.jpg',
]

export const OFFICIAL_FLOWERS = [
  '/images/flower1.png',   // top-left
  '/images/flower2.png',   // top-right
  '/images/flower3.png',   // bottom-left
  '/images/flower4.png',   // bottom-right
  '/images/flower5.png',   // middle-left (hidden on phones)
  '/images/flower6.png',   // middle-right (hidden on phones)
]

export const AUDIO = { bg: '/audio/background.mp3',  ask: '/audio/proposal.mp3', pasilyo: '/audio/pasilyo-chorus.mp3' }

export const DODGES = 5 // NO presses that dodge; the press after that is a real NO
export const FINAL_DODGES = 2

export const T = {
  landing: { title: 'Weiiiiiiiiiiiiiiiiiiiii', btn: 'Come here hehe →' },
  cards: {
    heading: 'What caught my eye in you',
    list: ['You being genuine.', "The way you're being honest.", 'Our shared interests.', 'Your kindness and caring traits.'],
    last: 'And honestly… I could keep going.',
    hint: 'tap or swipe the cards',
    next: 'Next',
    btn: "Okay… there's more →",
  },
  quiz: {
    title: 'Before we continue…',
    q: 'Are you really sure that im not just in your imagination? 😭',
  },
  joke: {
    a: 'HAHAHAHA',
    b: "bercanda ajaa",
    c: 'AHH Im nervous😭',
    btn: 'Okay, enough nonsense… →',
  },
  ask: {
    a: 'Okay… enough jokes.',
    b: "There's something I've been wanting to ask you…",
    q: 'May I be your boyfriend?',
    yes: 'YES ❤️',
    no: 'NO 😈',
  },
  // index = number of times NO was pressed
  steps: [
    { yes: 'YES ❤️', mood: 'flowers', lv: 0, note: 'Nudaeng is watching… 👀' },
    { yes: 'YES ❤️', mood: 'flowers', lv: 0, note: 'Hehe… the NO button is shy 🙈' },
    { yes: 'YES PLEASE 😭❤️', mood: 'sad', lv: 0, note: 'Nudaeng is getting emotional…' },
    { yes: 'YES YOU KNOW YOU WANT TO 😭❤️', mood: 'cry2', lv: 0, note: "pretty plzzz " },
    { yes: 'PLEASEEEEE ❤️😭', mood: 'cry', lv: 0, note: "I can't handle this anymore." },
    { yes: 'YES ALREADY 😭❤️', mood: 'cry', lv: 0, note: "Okay, I'll stop dodging. NO is yours if you really mean it 🥺" },
  ],
  finalSteps: [
    { yes: 'YES ❤️', mood: 'smile', lv: 0, note: '' },
    { yes: 'YES, please ❤️', mood: 'smile', lv: 0, note: 'please pleasepleaseeee…' },
    { yes: 'YES, I mean it ❤️', mood: 'sad', lv: 0, note: "(you can still say no, it's okay 🥺)" },
  ],
  yes: { a: 'WAIT…', b: 'YOU SAID YES?! 😭❤️', c: 'Hi, my beautiful Girlfriend. ❤️', btn: 'One last thing… 💌' },
  letter: {
    title: 'One last thing…',
    paras: [
      "I honestly don't know what to say haha, you are the first one that I've asked... yes FIRST ONE that i have asked to be my Girlfriend AHHHHH.",
      "My emotions are overwhelmed. I have never felt this kind of feelings I can't explain it.",
      "A lot have changed in my life since I met you. Like alot, things i thought I would never do, words that I never thought that would come out of my mouth, emotions that I've never expressed to someone, and I am very grateful for that. I am very happy that I met you.",
      "I am very glad, though it's not physical, I can still feel the bond and shared moments we had this past month and days.",
      "I never thought that i would've fallen for you.... hmmm must be kind of black magic. JKKKK haha.",
      'My mind and heart took hold with your presence and personality so deep, that i hope i will never experience this type of feeling again aside from you.',
      'I want only you forever.',
      'Our shared laughs, frustration and interests made our bond more strong and my soul craves more from you.',
      'ughhhh I LOVE U I REALLY DOOO.',
      "I don't know exactly where this will take us, but I know I want to experience it with you.",
      'I am really hoping to meet you soon.',
    ],
    btn: "There's one more thing I want to ask…",
  },
  final: { a: 'Okay… one last question.', q: 'May I be your boyfriend? hehe', official: "Then it's official. ❤️", hi: 'Hi, Sayang.', stamp: 'OFFICIAL ✅', stampDate: '' },
  end: {
    first: 'Okay okay… 😭 I respect your decision.',
    final: 'Okay okay 😭 I understand. No pressure. ❤️',
    back: 'Oops, wrong button 🥺',
  },
}
