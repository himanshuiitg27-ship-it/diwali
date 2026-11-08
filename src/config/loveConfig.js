// ============================================================================
//  loveConfig.js — EVERYTHING personal lives here.
//  Edit this one file and the whole experience updates. No component edits needed.
// ============================================================================

// Vite resolves these at build time. If a file is missing the key is simply absent.
const musicFiles = import.meta.glob('../assets/music/*.{mp3,ogg,m4a,wav}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const imageFiles = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const assetUrl = (folder, name) => (name ? folder[`../assets/${name}`] : undefined)

const loveConfig = {
  // ---------------------------------------------------------------- Names ---
  herName: 'Sania, my babyyy, my baccha, my babuuu, my sona',
  yourName: 'Himanshu Kumar',
  nickname: 'Babyyyy', // what you call her
  herNickForYou: 'Babyyyy', // what she calls you (optional)

  // Shown on the opening page and in the browser tab.
  siteTitle: 'A Diwali Night Just for You',
  diwaliGreeting: 'Happy Diwali, My Favourite Person ❤️',

  // -------------------------------------------------------------- Chapters ---
  // Labels used by the progress indicator.
  chapters: ['The Surprise', 'My Favourite Light', 'Before the Diyas', 'Light Up Together', 'A Little Forever'],

  // ------------------------------------------------------------- Page 1 ----
  welcome: {
    heading: 'Tonight, the lights are beautiful...',
    subheading: 'But there\'s someone who makes my world brighter.',
    button: 'Open Your Surprise ✨',
    footer: 'Made with love, just for you ❤️',
    // Set to true to greet her by name above the heading.
    showNameGreeting: true,
    greetingPrefix: 'For',
  },

  // ------------------------------------------------------------- Page 2 ----
  favouriteLight: {
    lines: ['You are...', 'And always will be...', 'My favourite light ✨'],
    button: 'Continue our little story →',
  },

  // ------------------------------------------------------------- Page 3 ----
  lantern: {
    lines: [
      'Before the diyas...',
      'There\'s you.',
      'Of all the lights in this world,',
      'You\'re the one I would always choose.',
    ],
    hint: 'Touch the lantern',
    hiddenMessage: 'Even on the darkest nights, you make everything feel brighter.',
    button: 'There\'s something more I want to tell you ❤️',
  },

  // ------------------------------------------------------------- Page 4 ----
  lightTogether: {
    heading: 'Let\'s light up Diwali together.',
    subheading: 'Even if we\'re miles apart, I wish we could light every diya side by side.',
    hint: 'Tap a diya to light it',
    // One message per diya. Add or remove — the circle adapts (9–12 works best).
    diyaMessages: [
      'You make ordinary days extraordinary.',
      'Your smile is my favourite celebration.',
      'Distance means nothing when someone means everything.',
      'You are my favourite reason to smile.',
      'Every festival feels brighter with you.',
      'I wish I could celebrate tonight beside you.',
      'You\'re my favourite blessing.',
      'Here\'s to a thousand more memories together.',
      'My heart always finds its way to you.',
    ],
    // How many diyas begin already lit (the rest are for her to light).
    initiallyLit: 2,
    allLitMessage: 'Every diya is beautiful, but none shines brighter than you. ❤️',
    button: 'One Last Surprise...',
  },

  // ------------------------------------------------------------- Page 5 ----
  forever: {
    title: 'Happy Diwali, My Favourite Person ❤️',
    // Each string is one paragraph. The typewriter types them in order.
    letter: [
      'Hey, my babyyy, my baccha, my babuuu, my sona,',
      'I know we are far away from each other to celebrate this Diwali, but I hope you know that you\'re always with me.',
      'Among all the beautiful lights of Diwali, there\'s one light that means more to me than anything else — YOU.',
      'I wish I could be there with you, light diyas together, watch the fireworks, share sweets and make another beautiful memory .',
      'Until that happens, let this little corner of the internet remind you that somewhere, someone is smiling just because you exist.',
      'You are my favourite light, my favourite feeling, and my favourite part of every day.',
      'Happy Diwali, sweetheart. ❤️',
      'Always yours.',
    ],
    closingLine: 'Distance may separate our celebrations, but never our hearts. ❤️',
    button: 'Light Up Our Forever ✨',
    finalMessage: ['Every Diwali, every lifetime, every version of tomorrow...', 'I would still choose you.'],
    theme: 'Among millions of lights, you\'re the one I would always choose. ❤️🪔',
    replayButton: 'Replay our story',
    typingSpeedMs: 38,
  },

  // --------------------------------------------------------------- Music ---
  // Drop an audio file into src/assets/music/ and put its file name here.
  // If the file is missing, the site still works and the music button explains how to add one.
  music: {
    file: 'diwali.mp3',
    volume: 0.5,
    label: 'Our song',
  },

  // ----------------------------------------------------------- Memories ----
  // OPTIONAL. Leave empty to hide. Nothing is invented for you.
  // Each memory: { title: 'First date', text: 'Your own words…', date: 'Optional', photo: 'optional-file.jpg' }
  memories: [],

  // ---------------------------------------------------------- Photographs ---
  // OPTIONAL. Drop photos into src/assets/images/ and list file names + captions.
  // Example: { file: 'us-1.jpg', caption: 'Our favourite day' }
  // When this list has entries, a gentle photo gallery appears on the final page.
  photos: [],
}

// ---------------------------------------------------------------------------
//  Resolved asset URLs (do not edit below)
// ---------------------------------------------------------------------------
export const musicUrl = assetUrl(musicFiles, `music/${loveConfig.music.file}`)

export const resolvePhoto = (file) => assetUrl(imageFiles, `images/${file}`)

export default loveConfig
