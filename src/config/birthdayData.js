/**
 * =========================================================================
 * EASY CUSTOMIZATION CONFIGURATION FILE
 * =========================================================================
 * Modify any of the values below to personalize the birthday website.
 * You can replace names, quotes, dates, photos, songs, letters, and reasons!
 */

export const birthdayData = {
  // 1. Recipient Details
  recipientName: "Pranathi",
  subtitle: "This little surprise was made just for you.",
  heroQuote: "Some people make life more beautiful simply by being in it.",
  birthDate: "August 1, 2026",
  heroPhotoUrl: "/photos/new_hero.jpg",
  auraVideoUrl: "/videos/aura_center.mp4",

  // 1.5 Website Password Protection Configuration
  passcodeConfig: {
    enabled: true, // Set to false if you want to disable password protection
    passcode: "070806", // 6-digit secret passcode
    hint: "Hint: Enter the secret 6-digit passcode (070806) 💖",
    title: "Secret Birthday Realm",
    subtitle: "Enter the secret passcode to unlock Pranathi's surprise."
  },

  // 2. Background Music Configuration
  // "Kaarkuzhal Kadavaiye" from VadaChennai (Composed by Santhosh Narayanan)
  music: {
    title: "Kaarkuzhal Kadavaiye",
    artist: "Santhosh Narayanan (VadaChennai)",
    audioUrl: "/music/kaarkuzhal-kadavaiye.mp3",
    albumArt: "https://c.saavncdn.com/173/VadaChennai-Tamil-2018-20260108133313-500x500.jpg"
  },

  // 2.1 Our Memories Section Music ("Let The Celebration Begin" from Dude)
  memoriesMusic: {
    title: "Let The Celebration Begin",
    artist: "Dude Soundtrack",
    audioUrl: "/music/let-the-celebration-begin.mp3",
    fallbackUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a85590.mp3?filename=celebration-cheerful-upbeat-10904.mp3",
    albumArt: "/photos/dude_cover.png"
  },

  // 3. Memory Gallery (Polaroid Cards & Lightbox)
  galleryPhotos: [
    {
      id: 1,
      title: "Radiant Evening Grace",
      caption: "A joyful smile that lights up the night, radiating pure warmth.",
      date: "Evening Joy",
      photoUrl: "/photos/prev_shade1.jpg",
      aspect: "tall"
    },
    {
      id: 2,
      title: "Traditional Splendor",
      caption: "Looking breathtaking in vibrant traditional silk saree.",
      date: "Festive Poise",
      photoUrl: "/photos/prev_shade2.jpg",
      aspect: "tall"
    },
    {
      id: 3,
      title: "Thoughtful Poise",
      caption: "Gentle poise and calm strength under green canopies.",
      date: "Quiet Beauty",
      photoUrl: "/photos/prev_shade3.jpg",
      aspect: "tall"
    },
    {
      id: 4,
      title: "Nighttime Enchantment",
      caption: "Adorned in classic traditional attire under the night sky.",
      date: "Midnight Grace",
      photoUrl: "/photos/new_shade1.png",
      aspect: "tall"
    },
    {
      id: 5,
      title: "Golden Hour Sunshine",
      caption: "Looking absolutely breathtaking in radiant yellow.",
      date: "Sunny Days",
      photoUrl: "/photos/new_shade2.png",
      aspect: "tall"
    },
    {
      id: 6,
      title: "Playful Breeze",
      caption: "Carefree laughter and lighthearted poise under green trees.",
      date: "Quiet Walks",
      photoUrl: "/photos/new_shade3.jpg",
      aspect: "tall"
    },
    {
      id: 7,
      title: "Chic & Charming",
      caption: "Effortless style and golden warmth under the afternoon sun.",
      date: "Street Moments",
      photoUrl: "/photos/new_shade4.jpg",
      aspect: "tall"
    },
    {
      id: 8,
      title: "Cozy Night Dreams",
      caption: "Unfiltered joy and pure peace under city lights.",
      date: "Rooftop Magic",
      photoUrl: "/photos/new_shade5.png",
      aspect: "tall"
    },
    {
      id: 9,
      title: "Eloquent & Poised",
      caption: "Focus, intelligence, and captivating presence at the podium.",
      date: "Spotlight Moment",
      photoUrl: "/photos/shade_podium.jpg",
      aspect: "tall"
    },
    {
      id: 10,
      title: "Yellow Mirror Chic",
      caption: "A cute, stylish mirror selfie in bright yellow ethnic wear.",
      date: "Mirror Magic",
      photoUrl: "/photos/shade_mirror.png",
      aspect: "tall"
    },
    {
      id: 11,
      title: "Park Bench UNO Champion",
      caption: "Sitting cross-legged on a bench with an adorable playful expression.",
      date: "Game Day",
      photoUrl: "/photos/shade_uno.jpg",
      aspect: "tall"
    },
    {
      id: 12,
      title: "Hearts & Sunbeams",
      caption: "Basking in afternoon warmth with a radiant, joyful smile.",
      date: "Sunshine Love",
      photoUrl: "/photos/shade_heart.jpg",
      aspect: "tall"
    },
    {
      id: 13,
      title: "Traditional Jhumka Charm",
      caption: "A close-up of natural beauty adorned with elegant traditional earrings.",
      date: "Heavenly Grace",
      photoUrl: "/photos/shade_jhumka.png",
      aspect: "tall"
    },
    {
      id: 14,
      title: "Golden Sunlit Eye",
      caption: "Capturing the depth, warmth, and quiet magic in your eyes.",
      date: "Golden Hour",
      photoUrl: "/photos/shade_eye.jpg",
      aspect: "tall"
    },
    {
      id: 15,
      title: "Playful Pout & Hearts",
      caption: "The cutest silly expression with floating hearts.",
      date: "Cute Moments",
      photoUrl: "/photos/shade_pout.png",
      aspect: "tall"
    },
    {
      id: 16,
      title: "Dance Studio Reflections",
      caption: "Hakuna Matata vibes in the practice studio mirror.",
      date: "Dance Vibe",
      photoUrl: "/photos/shade_dance.png",
      aspect: "tall"
    }
  ],

  // 3.5 Shades of Beauty (Full-Screen Gallery Showcase - All 16 Photos)
  shadesOfBeauty: [
    {
      id: 1,
      title: "Radiant Evening Grace",
      subtitle: "Effortless confidence and timeless joy",
      caption: "A joyful smile that lights up the night, radiating pure warmth, charm, and beauty.",
      photoUrl: "/photos/prev_shade1.jpg",
      tag: "Shade I • Elegance"
    },
    {
      id: 2,
      title: "Traditional Splendor",
      subtitle: "Graceful in silk and golden weaves",
      caption: "Stunning poise and regal elegance in a vibrant traditional saree, glowing with warmth.",
      photoUrl: "/photos/prev_shade2.jpg",
      tag: "Shade II • Splendor"
    },
    {
      id: 3,
      title: "Thoughtful Poise",
      subtitle: "Gentle elegance under leafy canopies",
      caption: "Poised and sophisticated amidst peaceful green leaves, a moment of quiet grace.",
      photoUrl: "/photos/prev_shade3.jpg",
      tag: "Shade III • Poise"
    },
    {
      id: 4,
      title: "Nighttime Enchantment",
      subtitle: "Graceful poise under the moonlit sky",
      caption: "Adorned in classic traditional attire, bringing quiet warmth and undeniable charm to the evening.",
      photoUrl: "/photos/new_shade1.png",
      tag: "Shade IV • Royalty"
    },
    {
      id: 5,
      title: "Golden Hour Sunshine",
      subtitle: "Pure warmth beneath the open blue sky",
      caption: "Draped in radiant yellow like morning sunlight, bringing natural light and pure happiness wherever you go.",
      photoUrl: "/photos/new_shade2.png",
      tag: "Shade V • Sunshine"
    },
    {
      id: 6,
      title: "Playful Breeze",
      subtitle: "Carefree laughter and effortless charm",
      caption: "A sweet, playful moment caught in motion—walking under green canopies with a lighthearted, infectious spirit.",
      photoUrl: "/photos/new_shade3.jpg",
      tag: "Shade VI • Serenity"
    },
    {
      id: 7,
      title: "Chic & Charming",
      subtitle: "Casual cool with a heart of pure gold",
      caption: "Sporting effortless style and golden warmth under the afternoon sun, making simple street moments look iconic.",
      photoUrl: "/photos/new_shade4.jpg",
      tag: "Shade VII • Radiant Style"
    },
    {
      id: 8,
      title: "Cozy Night Dreams",
      subtitle: "Unfiltered joy and pure peace",
      caption: "Surrounded by city lights, with eyes closed in sheer bliss—the sweetest, warmest smile that heals the heart.",
      photoUrl: "/photos/new_shade5.png",
      tag: "Shade VIII • Pure Magic"
    },
    {
      id: 9,
      title: "Eloquent & Poised",
      subtitle: "Focus, intelligence, and captivating presence",
      caption: "Standing gracefully at the podium, focused and eloquent—a captivating blend of brain, beauty, and confidence.",
      photoUrl: "/photos/shade_podium.jpg",
      tag: "Shade IX • Eloquence"
    },
    {
      id: 10,
      title: "Yellow Mirror Chic",
      subtitle: "Stylish reflections and golden vibes",
      caption: "A cute, stylish mirror selfie in bright yellow ethnic wear, radiating fun and effortless fashion.",
      photoUrl: "/photos/shade_mirror.png",
      tag: "Shade X • Chic Vibe"
    },
    {
      id: 11,
      title: "Park Bench UNO Champion",
      subtitle: "Playful expressions and sweet competitive spirit",
      caption: "Sitting cross-legged on a park bench surrounded by UNO cards, giving that adorable playful look!",
      photoUrl: "/photos/shade_uno.jpg",
      tag: "Shade XI • Playful Heart"
    },
    {
      id: 12,
      title: "Hearts & Sunbeams",
      subtitle: "Basking in warmth and sweet affection",
      caption: "Reaching up towards the sunlight with a blissful smile, framed in love and sweet memories.",
      photoUrl: "/photos/shade_heart.jpg",
      tag: "Shade XII • Sweet Joy"
    },
    {
      id: 13,
      title: "Traditional Jhumka Charm",
      subtitle: "Captivating eyes and intricate elegance",
      caption: "A close-up glimpse of natural beauty, adorned with traditional earrings and a gaze that steals hearts.",
      photoUrl: "/photos/shade_jhumka.png",
      tag: "Shade XIII • Heavenly Grace"
    },
    {
      id: 14,
      title: "Golden Sunlit Eye",
      subtitle: "Unspoken stories in warm golden light",
      caption: "A breathtaking close-up macro portrait—capturing the depth, warmth, and quiet magic in your eyes.",
      photoUrl: "/photos/shade_eye.jpg",
      tag: "Shade XIV • Soulful Gaze"
    },
    {
      id: 15,
      title: "Playful Pout & Hearts",
      subtitle: "The cutest, most hilarious goofy face",
      caption: "The absolute cutest silly moment—running a hand through hair with an adorable pout that makes everyone melt.",
      photoUrl: "/photos/shade_pout.png",
      tag: "Shade XV • Adorable Goofball"
    },
    {
      id: 16,
      title: "Dance Studio Reflections",
      subtitle: "Hakuna Matata energy and passionate drive",
      caption: "Standing proud in the dance studio mirror wearing Hakuna Matata—pure passion, rhythm, and dedicated energy.",
      photoUrl: "/photos/shade_dance.png",
      tag: "Shade XVI • Rhythmic Spirit"
    }
  ],

  // 3.8 Our Memories 35mm Film Strip Videos
  ourMemoriesVideos: [
    { id: 1, videoUrl: "/videos/mem_clip1.mp4" },
    { id: 2, videoUrl: "/videos/mem_clip2.mp4" },
    { id: 3, videoUrl: "/videos/mem_clip3.mp4" },
    { id: 4, videoUrl: "/videos/mem_clip4.mp4" },
    { id: 5, videoUrl: "/videos/mem_clip5.mp4" },
    { id: 6, videoUrl: "/videos/mem_clip6.mp4" },
    { id: 7, videoUrl: "/videos/mem_clip7.mp4" },
    { id: 8, videoUrl: "/videos/mem_clip8.mp4" },
    { id: 9, videoUrl: "/videos/mem_clip9.mp4" },
    { id: 10, videoUrl: "/videos/mem_clip10.mp4" },
    { id: 11, videoUrl: "/videos/mem_clip11.mp4" },
    { id: 12, videoUrl: "/videos/mem_clip12.mp4" },
    { id: 13, videoUrl: "/videos/mem_clip13.mp4" },
    { id: 14, videoUrl: "/videos/mem_clip14.mp4" },
    { id: 15, videoUrl: "/videos/mem_clip15.mp4" },
    { id: 16, videoUrl: "/videos/mem_clip16.mp4" },
    { id: 17, videoUrl: "/videos/mem_clip17.mp4" },
    { id: 18, videoUrl: "/videos/mem_clip18.mp4" },
    { id: 19, videoUrl: "/videos/mem_clip19.mp4" },
    { id: 20, videoUrl: "/videos/mem_clip20.mp4" }
  ],

  // 3.9 Cinematic Movie & Series Montage Clips
  cinematicClips: [
    {
      id: 1,
      title: "Off Campus",
      videoUrl: "/videos/clip1.mp4"
    },
    {
      id: 2,
      title: "Vampire Diaries",
      videoUrl: "/videos/clip2.mp4"
    },
    {
      id: 3,
      title: "Hi Nanna",
      videoUrl: "/videos/clip3.mp4"
    },
    {
      id: 4,
      title: "Amazing Spider-Man",
      videoUrl: "/videos/clip6.mp4"
    },
    {
      id: 5,
      title: "Mouna Raagam",
      videoUrl: "/videos/clip7.mp4"
    }
  ],

  // 4. Memory Timeline
  timelineEvents: [
    {
      id: 1,
      date: "Chapter 1",
      title: "The First Time We Met",
      caption: "It started with a simple hello, but little did I know how much sunshine you would bring into my life.",
      photoUrl: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      date: "Chapter 2",
      title: "Midnight Conversations",
      caption: "Hours turning into minutes as we shared our deepest dreams, funny stories, and unspoken thoughts.",
      photoUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      date: "Chapter 3",
      title: "Unstoppable Laughter",
      caption: "Inside jokes that nobody else understands, making everyday moments feel like magic.",
      photoUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      date: "Chapter 4",
      title: "Always Standing By You",
      caption: "Through every storm and sunny sky, celebrating your victories and holding space for your heart.",
      photoUrl: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 5,
      date: "Today & Beyond",
      title: "Celebrating Wonderful You",
      caption: "A brand new chapter begins today, filled with limitless happiness, love, and boundless achievements.",
      photoUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop"
    }
  ],

  // 5. Handwritten Birthday Letter
  birthdayLetter: {
    greeting: "Dearest Pranathi, ❤️",
    paragraphs: [
      "Happy Birthday to someone who means so much to me. I'm truly grateful to have you in my life.",
      "I hope this year brings you endless happiness, success, love, and everything your heart wishes for. You deserve all the beautiful things life has to offer.",
      "Have the most beautiful birthday. ❤️"
    ],
    signOff: "With love,\nShailendran",
  },

  // 6. Reasons You're Amazing
  reasonsList: [
    {
      icon: "Smile",
      title: "Your Beautiful Smile",
      description: "It lights up even the darkest room and stays in the heart long after."
    },
    {
      icon: "Heart",
      title: "Your Pure Kindness",
      description: "You care so deeply for everyone around you with genuine warmth."
    },
    {
      icon: "Sparkles",
      title: "Your Magical Energy",
      description: "Your aura radiates positivity, elegance, and effortless grace."
    },
    {
      icon: "Sun",
      title: "Your Radiant Heart",
      description: "Generous, soft, and endlessly compassionate in everything you do."
    },
    {
      icon: "Music",
      title: "Your Infectious Laugh",
      description: "The sweetest sound that immediately puts a smile on anyone's face."
    },
    {
      icon: "Shield",
      title: "Your Caring Nature",
      description: "Always listening, supporting, and making others feel valued."
    },
    {
      icon: "Moon",
      title: "Your Calm Strength",
      description: "You navigate life with remarkable poise, wisdom, and dignity."
    },
    {
      icon: "Star",
      title: "The Happiness You Bring",
      description: "Simply being around you makes life richer, warmer, and brighter."
    }
  ],

  // 7. Hidden Star Wishes & Compliments
  starWishes: [
    "May this year be the one where you stop doubting yourself and start seeing yourself the way the people who truly care about you already do.",
    "May you never have to shrink yourself just to be understood. The right people will love every version of you.",
    "I hope you always choose kindness without forgetting to choose yourself too. Your heart deserves the same love it gives.",
    "May every mistake you’ve ever made become proof of how much you’ve grown—not a reason to doubt yourself.",
    "I hope one day love feels effortless to you—not confusing, not exhausting, just peaceful, safe, and real.",
    "May you always protect your peace, but never let fear convince you that you’re meant to face life alone.",
    "Keep your soft heart. The world needs more people who stay kind even after they’ve been hurt.",
    "Whenever life feels heavy, I hope you remember that even the quietest stars still light up the night. Keep shining in your own way."
  ],

  // 8. Surprise Gift Box Content
  giftSurprise: {
    videoUrl: "/videos/gift_video.mp4",
    realGiftPhotoUrl: "/photos/real_gift.png",
    title: "One Last Surprise",
    lines: [
      "The laughter was only the beginning...",
      "This isn't just a picture.",
      "It's waiting for you in the real world."
    ],
    badge: "🎁 Reserved Especially for You"
  },

  // 9. Final Celebration Message
  finalMessage: {
    heading: "Happy Birthday",
    subtext: "May this year bring you endless happiness, beautiful memories, and every dream your heart wishes for.",
    closing: "Forever & Always."
  }
};
