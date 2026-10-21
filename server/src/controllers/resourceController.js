const supabase = require('../config/supabase');

const defaultResources = [
  {
    id: "res-1",
    title: "Complete Machine Learning Bootcamp 2026",
    category: "Technology & AI",
    type: "video",
    url: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
    embedId: "i_LwzRVP7bg",
    description: "Comprehensive foundational video masterclass covering Python, regression, classification, neural nets, and practical ML pipelines.",
    duration: "45 mins",
    difficulty: "beginner",
    isFeatured: true
  },
  {
    id: "res-2",
    title: "Full Stack Web Developer Interactive Roadmap",
    category: "Technology & AI",
    type: "roadmap",
    url: "https://roadmap.sh/full-stack",
    embedId: null,
    description: "Step by step visual progression from frontend layout fundamentals to distributed backend systems and cloud deployment.",
    duration: "Interactive Guide",
    difficulty: "beginner",
    isFeatured: true
  },
  {
    id: "res-3",
    title: "Complete Figma UI/UX Masterclass",
    category: "Design & Creative",
    type: "video",
    url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
    embedId: "c9Wg6Cb_YlU",
    description: "Hands-on UI design in Figma covering components, auto-layout, typography hierarchies, and mobile app design systems.",
    duration: "55 mins",
    difficulty: "beginner",
    isFeatured: true
  },
  {
    id: "res-4",
    title: "UPSC Civil Services Prelims & Mains Strategy",
    category: "Government & Public Policy",
    type: "video",
    url: "https://www.youtube.com/watch?v=0w5GqH_7Z8c",
    embedId: "0w5GqH_7Z8c",
    description: "Detailed breakdown of syllabus, recommended books, daily schedule, and answer writing methodology for IAS aspirants.",
    duration: "40 mins",
    difficulty: "intermediate",
    isFeatured: true
  },
  {
    id: "res-5",
    title: "Commercial Pilot Training in India - Step by Step",
    category: "Aviation & Aerospace",
    type: "video",
    url: "https://www.youtube.com/watch?v=Zf5rG6y1k8Y",
    embedId: "Zf5rG6y1k8Y",
    description: "Everything you need to know about DGCA Medicals, ground school exams, flight school hours, and cadet pilot programs.",
    duration: "32 mins",
    difficulty: "beginner",
    isFeatured: true
  },
  {
    id: "res-6",
    title: "Cyber Security Analyst: Zero to Hero Bootcamp",
    category: "Technology & AI",
    type: "video",
    url: "https://www.youtube.com/watch?v=inWWhr5tnEA",
    embedId: "inWWhr5tnEA",
    description: "Network security, Kali Linux penetration testing, vulnerability assessment, and preparing for CompTIA Security+.",
    duration: "1 hr 10 mins",
    difficulty: "intermediate",
    isFeatured: false
  },
  {
    id: "res-7",
    title: "AI & Machine Learning Engineer Roadmap",
    category: "Technology & AI",
    type: "roadmap",
    url: "https://roadmap.sh/ai-engineer",
    embedId: null,
    description: "Visual roadmap covering mathematics, transformers, RAG architecture, LLMOps, and production serving.",
    duration: "Interactive Guide",
    difficulty: "advanced",
    isFeatured: false
  },
  {
    id: "res-8",
    title: "Investment Banking Financial Modeling Essentials",
    category: "Finance & Business",
    type: "video",
    url: "https://www.youtube.com/watch?v=F3QpgXBtDe8",
    embedId: "F3QpgXBtDe8",
    description: "Core accounting concepts, discounted cash flow (DCF) models, and valuation frameworks used on Wall Street and Dalal Street.",
    duration: "50 mins",
    difficulty: "intermediate",
    isFeatured: false
  }
];

// Get all resources
exports.getResources = async (req, res) => {
  try {
    const { category, type, search } = req.query;

    let resources = defaultResources;

    if (supabase) {
      try {
        const { data } = await supabase.from('resource_hub').select('*');
        if (data && data.length > 0) {
          resources = data;
        }
      } catch (e) {
        // Fall back to default resources
      }
    }

    let filtered = [...resources];

    if (category && category !== 'All') {
      filtered = filtered.filter(
        (r) => r.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (type && type !== 'All') {
      filtered = filtered.filter((r) => r.type.toLowerCase() === type.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

