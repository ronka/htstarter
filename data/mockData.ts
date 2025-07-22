export const mockUsers = [
  {
    id: "user1",
    name: "שרה חן",
    avatar: "👩‍💻",
    bio: "מפתחת פול-סטק עם תשוקה לבינה מלאכותית וטכנולוגיות ווב מודרניות",
    location: "סן פרנסיסקו, קליפורניה",
    joinedDate: "מרץ 2023",
    experience: "5+ שנים",
    website: "https://sarahchen.dev",
    github: "https://github.com/sarahchen",
    twitter: "https://twitter.com/sarahchen",
    skills: ["React", "TypeScript", "Node.js", "Python", "AI/ML", "PostgreSQL"],
    projects: 12,
    followers: 234,
    following: 89,
  },
  {
    id: "user2",
    name: "מייק רודריגז",
    avatar: "🧑‍💻",
    bio: "מפתח Full-Stack המתמחה באפליקציות בזמן אמת ושיתוף פעולה",
    location: 'ניו יורק, ארה"ב',
    joinedDate: "ינואר 2023",
    experience: "7+ שנים",
    website: "https://mikerodriguez.dev",
    github: "https://github.com/mikerodriguez",
    twitter: "https://twitter.com/mikerodriguez",
    skills: [
      "Next.js",
      "Socket.io",
      "MongoDB",
      "React",
      "Node.js",
      "TypeScript",
    ],
    projects: 8,
    followers: 156,
    following: 67,
  },
  {
    id: "user3",
    name: "אמה תומפסון",
    avatar: "🦄",
    bio: "מפתחת Frontend עם תשוקה לאפליקציות חברתיות וטכנולוגיות ווב",
    location: "לונדון, בריטניה",
    joinedDate: "פברואר 2023",
    experience: "4+ שנים",
    website: "https://emmathompson.dev",
    github: "https://github.com/emmathompson",
    twitter: "https://twitter.com/emmathompson",
    skills: ["Vue.js", "Firebase", "JavaScript", "CSS", "HTML", "Cloudinary"],
    projects: 15,
    followers: 189,
    following: 92,
  },
  {
    id: "user4",
    name: "אלכס ג'ונסון",
    avatar: "🚀",
    bio: "מפתח Full-Stack המתמחה בטכנולוגיות פיננסיות וקריפטו",
    location: "אוסטין, טקסס",
    joinedDate: "דצמבר 2022",
    experience: "6+ שנים",
    website: "https://alexjohnson.dev",
    github: "https://github.com/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    skills: ["React", "Chart.js", "Node.js", "Python", "Blockchain", "APIs"],
    projects: 10,
    followers: 312,
    following: 145,
  },
  {
    id: "user5",
    name: "ליסה פארק",
    avatar: "🐱",
    bio: "מפתחת Frontend המתמחה באפליקציות מינימליסטיות ו-PWA",
    location: "סיאול, דרום קוריאה",
    joinedDate: "נובמבר 2022",
    experience: "3+ שנים",
    website: "https://lisapark.dev",
    github: "https://github.com/lisapark",
    twitter: "https://twitter.com/lisapark",
    skills: ["Svelte", "D3.js", "PWA", "CSS", "JavaScript", "IndexedDB"],
    projects: 6,
    followers: 98,
    following: 43,
  },
  {
    id: "user6",
    name: "דיויד קים",
    avatar: "🐻",
    bio: "מפתח Backend המתמחה בבינה מלאכותית וכלי פיתוח",
    location: "ונקובר, קנדה",
    joinedDate: "אוקטובר 2022",
    experience: "8+ שנים",
    website: "https://davidkim.dev",
    github: "https://github.com/davidkim",
    twitter: "https://twitter.com/davidkim",
    skills: [
      "Python",
      "OpenAI API",
      "FastAPI",
      "Machine Learning",
      "Docker",
      "AWS",
    ],
    projects: 18,
    followers: 445,
    following: 178,
  },
];

export const mockProjects = [
  {
    id: "1",
    title: "מנהל משימות מבוסס בינה מלאכותית",
    description:
      "אפליקציית ניהול משימות מודרנית עם הצעות בינה מלאכותית לפרודוקטיביות משופרת וקטגוריזציה חכמה של משימות.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71",
    author: {
      id: "user1",
      name: "שרה חן",
      avatar: "👩‍💻",
    },
    technologies: ["React", "TypeScript", "OpenAI API", "Tailwind CSS"],
    votes: 124,
    liveUrl: "https://ai-taskmanager.demo.com",
    githubUrl: "https://github.com/sarah/ai-taskmanager",
    timeAgo: "לפני שעתיים",
    isVoted: false,
    features: [
      "הצעות משימות מבוססות בינה מלאכותית",
      "קטגוריזציה חכמה",
      "ניקוד עדיפות",
      "שיתוף פעולה צוותי",
    ],
    longDescription: `## פרטים טכניים

נבנה עם React 18 ו-TypeScript לבטיחות טיפוסים. משתלב עם OpenAI GPT-4 להצעות משימות חכמות.

## אתגרים ופתרונות

האתגר העיקרי היה אופטימיזציה של קריאות API ל-OpenAI תוך שמירה על תגובה בזמן אמת. פתרנו זאת על ידי:

* **Caching חכם** - שמירת תוצאות API במטמון
* **Debouncing** - הפחתת קריאות מיותרות
* **Loading states** - משוב ויזואלי למשתמשים`,
  },
  {
    id: "2",
    title: "לוח שיתופי בזמן אמת",
    description:
      "אפליקציית לוח שיתופי עם ציור בזמן אמת, פתקיות דביקות ותכונות שיתוף פעולה צוותי.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
    author: {
      id: "user2",
      name: "מייק רודריגז",
      avatar: "🧑‍💻",
    },
    technologies: ["Next.js", "Socket.io", "Canvas API", "MongoDB"],
    votes: 89,
    liveUrl: "https://collab-board.demo.com",
    githubUrl: "https://github.com/mike/collab-board",
    timeAgo: "לפני 4 שעות",
    isVoted: true,
    features: [
      "שיתוף פעולה בזמן אמת",
      "כלי ציור",
      "פתקיות דביקות",
      "פונקצית ייצוא",
    ],
    longDescription: `## פרטים טכניים

משתמש ב-Socket.io לתקשורת בזמן אמת וב-HTML5 Canvas API לפונקציונליות ציור.

## אתגרים ופתרונות

יישום ציור חלק בזמן אמת עם זמן השהיה מינימלי במספר משתמשים.`,
  },
  {
    id: "3",
    title: "רשת חברתית לשיתוף מתכונים",
    description:
      "פלטפורמה חברתית לחובבי אוכל לשיתוף מתכונים, טיפים לבישול וחיבור עם שפים מרחבי העולם.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
    author: {
      id: "user3",
      name: "אמה תומפסון",
      avatar: "🦄",
    },
    technologies: ["Vue.js", "Firebase", "Cloudinary", "Express.js"],
    votes: 156,
    liveUrl: "https://recipe-social.demo.com",
    githubUrl: "https://github.com/emma/recipe-social",
    timeAgo: "לפני 6 שעות",
    isVoted: false,
    features: [
      "שיתוף מתכונים",
      "אינטראקציות חברתיות",
      "העלאת תמונות",
      "דירוג מתכונים",
    ],
    longDescription: `## פרטים טכניים

נבנה עם Vue.js ו-Firebase לסינכרון נתונים בזמן אמת.

## אתגרים ופתרונות

ניהול העלאות תמונות גדולות ואופטימיזציה למכשירים ניידים.`,
  },
  {
    id: "4",
    title: "עוקב תיק קריפטו",
    description:
      "עקוב אחרי ההשקעות הקריפטו שלך עם מחירים בזמן אמת, אנליטיקה של תיק השקעות וחישובי רווח/הפסד.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
    author: {
      id: "user4",
      name: "אלכס ג'ונסון",
      avatar: "🚀",
    },
    technologies: ["React", "Chart.js", "CoinGecko API", "Material-UI"],
    votes: 203,
    liveUrl: "https://crypto-tracker.demo.com",
    githubUrl: "https://github.com/alex/crypto-tracker",
    timeAgo: "לפני 8 שעות",
    isVoted: false,
    features: [
      "מעקב מחירים בזמן אמת",
      "אנליטיקה של תיק השקעות",
      "חישובי רווח/הפסד",
      "התראות מחיר",
    ],
    longDescription: `## פרטים טכניים

משתלב עם CoinGecko API לנתוני קריפטו בזמן אמת.

## אתגרים ופתרונות

טיפול בעדכוני מחירים בתדירות גבוהה ושמירה על חישובי תיק השקעות מדויקים.`,
  },
  {
    id: "5",
    title: "עוקב הרגלים מינימלי",
    description:
      "אפליקציית מעקב הרגלים פשוטה ויפה עם מונה רצף, הדמיה של התקדמות ותכונות מוטיבציה.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    author: {
      id: "user5",
      name: "ליסה פארק",
      avatar: "🐱",
    },
    technologies: ["Svelte", "D3.js", "IndexedDB", "PWA"],
    votes: 78,
    liveUrl: "https://habit-tracker.demo.com",
    githubUrl: "https://github.com/lisa/habit-tracker",
    timeAgo: "לפני 12 שעות",
    isVoted: true,
    features: ["מעקב הרגלים", "מונה רצף", "הדמיה של התקדמות", "תמיכה אופליין"],
    longDescription: `## פרטים טכניים

נבנה עם Svelte לביצועים ומשתמש ב-IndexedDB לאחסון אופליין.

## אתגרים ופתרונות

יצירת הדמיות מרתקות תוך שמירה על פשטות.`,
  },
  {
    id: "6",
    title: "עוזר סקירת קוד מבוסס בינה מלאכותית",
    description:
      "כלי סקירת קוד חכם שמספק הצעות, מזהה באגים ומשפר איכות קוד באופן אוטומטי.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    author: {
      id: "user6",
      name: "דיויד קים",
      avatar: "🐻",
    },
    technologies: ["Python", "OpenAI API", "FastAPI", "React"],
    votes: 267,
    liveUrl: "https://ai-codereview.demo.com",
    githubUrl: "https://github.com/david/ai-codereview",
    timeAgo: "לפני יום",
    isVoted: false,
    features: [
      "ניתוח קוד מבוסס בינה מלאכותית",
      "זיהוי באגים",
      "מדדי איכות קוד",
      "אינטגרציה עם Git",
    ],
    longDescription: `## פרטים טכניים

משתמש ב-OpenAI GPT-4 לניתוח קוד ו-FastAPI לצד השרת.

## אתגרים ופתרונות

עיבוד קודבייס גדול ביעילות תוך מתן משוב מדויק.`,
  },
];
