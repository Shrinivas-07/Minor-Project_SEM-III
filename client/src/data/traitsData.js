export const traitCategories = [
  {
    name: "Cognitive & Analytical",
    description: "Reasoning, numerical problem solving, and analytical thinking",
    color: "from-blue-500 to-indigo-600",
    traits: [
      { key: "logic", label: "Logic & Problem Solving", icon: "Brain", description: "Enjoy cracking puzzles, algorithms, and analytical deductions." },
      { key: "finance", label: "Financial & Quantitative Aptitude", icon: "DollarSign", description: "Comfortable with market mathematics, budgets, and spreadsheets." },
      { key: "medical", label: "Life Sciences & Biological Curiosity", icon: "Stethoscope", description: "Intrigued by biology, human health, medicine, and clinical care." },
      { key: "nature", label: "Environmental & Sustainable Thinking", icon: "Leaf", description: "Passionate about climate, ecology, green energy, and earth sciences." },
    ]
  },
  {
    name: "Technology & Engineering",
    description: "Digital tools, coding, AI, aerospace, and robotics",
    color: "from-cyan-500 to-blue-600",
    traits: [
      { key: "technology", label: "Technology & Software Interest", icon: "Laptop", description: "Curious about software systems, coding, apps, and digital platforms." },
      { key: "Ai", label: "Artificial Intelligence & Data Science", icon: "Cpu", description: "Fascinated by neural nets, big data, machine learning, and automation." },
      { key: "Avation", label: "Aviation & Aerospace Interest", icon: "Plane", description: "Enthusiastic about aircraft, aerodynamics, drone UAVs, and space travel." },
      { key: "building", label: "Hands-on Hardware & Architecture", icon: "Hammer", description: "Love assembling physical prototypes, mechanics, circuits, or structures." },
    ]
  },
  {
    name: "Leadership, Law & Public Impact",
    description: "Governance, public service, policy, and management",
    color: "from-amber-500 to-rose-600",
    traits: [
      { key: "government", label: "Public Service & Civil Services", icon: "Flag", description: "Desire to serve citizens, nation-building, and ethical governance." },
      { key: "administration", label: "Strategic Administration & Law", icon: "Scale", description: "Skilled in organizing, contract rules, negotiation, and leadership." },
      { key: "leadership", label: "Team Leadership & Vision", icon: "Users", description: "Natural ability to rally people, make decisions, and drive team outcomes." },
      { key: "helping", label: "Empathetic Mentorship & Helping", icon: "HeartHandshake", description: "Deep fulfillment from guiding, teaching, and improving people's lives." },
    ]
  },
  {
    name: "Creative, Media & Physical",
    description: "Design, storytelling, athletic discipline, and exploration",
    color: "from-purple-500 to-pink-600",
    traits: [
      { key: "creativity", label: "Visual & Conceptual Creativity", icon: "Palette", description: "Aesthetic eye for design, typography, layout, and innovative ideas." },
      { key: "content", label: "Content Creation & Storytelling", icon: "Video", description: "Storytelling via video, writing, social media, and digital broadcast." },
      { key: "communication", label: "Verbal & Written Communication", icon: "MessageSquare", description: "Clear articulation, public speaking, pitching, and persuasive writing." },
      { key: "sports", label: "Sports, Fitness & Physical Stamina", icon: "Activity", description: "Dedication to athletics, bodily conditioning, and kinetic sports." },
      { key: "travel", label: "Global Exploration & Mobility", icon: "Compass", description: "Desire to discover cultures, international markets, and fieldwork." },
      { key: "teaching", label: "Teaching & Pedagogy", icon: "GraduationCap", description: "Patience and passion to explain complex ideas and educate others." },
    ]
  }
];

export const allTraits = traitCategories.flatMap(c => c.traits);

export const archetypePresets = [
  {
    name: "AI & Tech Innovator",
    tagline: "High logic, coding, and future tech curiosity",
    scores: {
      technology: 10, Ai: 10, logic: 9, building: 8, creativity: 7,
      finance: 6, Avation: 6, communication: 6, administration: 5,
      government: 4, helping: 5, medical: 3, nature: 5, content: 6,
      sports: 4, travel: 6, teaching: 5
    }
  },
  {
    name: "Civil Services & Governance",
    tagline: "Nation building, leadership, and public administration",
    scores: {
      government: 10, administration: 10, leadership: 9, helping: 9,
      communication: 9, logic: 8, finance: 7, teaching: 7,
      technology: 5, Ai: 4, Avation: 4, building: 4, creativity: 5,
      medical: 5, nature: 6, content: 5, sports: 6, travel: 7
    }
  },
  {
    name: "Creative Product Designer",
    tagline: "Visual flair, human empathy, and digital craft",
    scores: {
      creativity: 10, content: 8, technology: 8, communication: 8,
      helping: 7, logic: 6, building: 6, Ai: 6, administration: 5,
      finance: 5, leadership: 6, government: 3, medical: 3,
      nature: 5, sports: 4, travel: 7, teaching: 6, Avation: 4
    }
  },
  {
    name: "Aerospace & Commercial Aviator",
    tagline: "Aviation passion, situational calmness, and travel",
    scores: {
      Avation: 10, travel: 10, logic: 8, technology: 8, leadership: 8,
      sports: 7, building: 7, communication: 7, administration: 6,
      Ai: 6, finance: 5, government: 6, helping: 5, medical: 4,
      nature: 5, creativity: 5, content: 5, teaching: 5
    }
  },
  {
    name: "Doctor & Healthcare Specialist",
    tagline: "Human biology, empathy, and clinical dedication",
    scores: {
      medical: 10, helping: 10, logic: 9, teaching: 8, communication: 8,
      nature: 7, leadership: 7, administration: 6, technology: 6,
      Ai: 6, building: 5, finance: 5, sports: 5, government: 6,
      travel: 5, creativity: 4, content: 4, Avation: 2
    }
  }
];
