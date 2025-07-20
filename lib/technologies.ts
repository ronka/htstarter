export interface TechnologyInfo {
  name: string;
  emoji: string;
  color: string;
}

// Predefined technology options with colors and emojis
export const techOptions: TechnologyInfo[] = [
  {
    name: "React",
    emoji: "⚛️",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "Angular",
    emoji: "🅰️",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    name: "Vue",
    emoji: "💚",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Next.js",
    emoji: "▲",
    color: "bg-black text-white border-gray-300",
  },
  {
    name: "TypeScript",
    emoji: "📘",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "JavaScript",
    emoji: "🟨",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    name: "Svelte",
    emoji: "🟨",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    name: "Node.js",
    emoji: "🟢",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Express.js",
    emoji: "🟢",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Vue.js",
    emoji: "✅",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Chart.js",
    emoji: "📊",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Python",
    emoji: "🐍",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "Cloudinary",
    emoji: "☁️",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "Java",
    emoji: "☕",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "C#",
    emoji: "💜",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    name: "PHP",
    emoji: "🐘",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    name: "Ruby",
    emoji: "💎",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    name: "Go",
    emoji: "🔵",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "Rust",
    emoji: "🦀",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "Swift",
    emoji: "🍎",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "Kotlin",
    emoji: "🟠",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "Docker",
    emoji: "🐳",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "AWS",
    emoji: "☁️",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "Firebase",
    emoji: "🔥",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "MongoDB",
    emoji: "🍃",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "PostgreSQL",
    emoji: "🐘",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "MySQL",
    emoji: "🐬",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "Redis",
    emoji: "🔴",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    name: "GraphQL",
    emoji: "🟣",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    name: "REST API",
    emoji: "🌐",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "Tailwind CSS",
    emoji: "🎨",
    color: "bg-cyan-100 text-cyan-800 border-cyan-200",
  },
  {
    name: "Bootstrap",
    emoji: "🎯",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    name: "Material-UI",
    emoji: "🎨",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    name: "Redux",
    emoji: "🟣",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    name: "Zustand",
    emoji: "🐻",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "Jest",
    emoji: "🃏",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    name: "Cypress",
    emoji: "🌲",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    name: "Git",
    emoji: "📝",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    name: "GitHub",
    emoji: "🐙",
    color: "bg-gray-100 text-gray-800 border-gray-200",
  },
  {
    name: "Vercel",
    emoji: "▲",
    color: "bg-black text-white border-gray-300",
  },
  {
    name: "Netlify",
    emoji: "🟢",
    color: "bg-green-100 text-green-800 border-green-200",
  },
];

/**
 * Find technology information by name
 * @param techName - The name of the technology to find
 * @returns TechnologyInfo if found, null otherwise
 */
export const findTechnologyInfo = (techName: string): TechnologyInfo | null => {
  return techOptions.find((tech) => tech.name === techName) || null;
};

/**
 * Get technology color and emoji for a given technology name
 * @param techName - The name of the technology
 * @returns Object with color and emoji, or default values if not found
 */
export const getTechnologyStyle = (techName: string) => {
  const techInfo = findTechnologyInfo(techName);
  return {
    color: techInfo?.color || "bg-gray-100 text-gray-800 border-gray-200",
    emoji: techInfo?.emoji || "",
  };
};
