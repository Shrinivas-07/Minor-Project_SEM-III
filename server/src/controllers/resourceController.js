/**
 * Resource Controller
 */

const supabase = require('../config/supabase');
const ApiResponse = require('../utils/responseHandler');

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
    description: "Hands-on penetration testing, network packet analysis with Wireshark, Linux security, and ethical hacking protocols.",
    duration: "50 mins",
    difficulty: "intermediate",
    isFeatured: false
  },
  {
    id: "res-7",
    title: "Chartered Accountancy (CA) Complete Roadmap",
    category: "Finance & Business",
    type: "guide",
    url: "https://www.icai.org",
    embedId: null,
    description: "Official guide to ICAI Foundation, Intermediate, Articleship training, and Final CA examinations in India.",
    duration: "Official Portal",
    difficulty: "advanced",
    isFeatured: false
  },
  {
    id: "res-8",
    title: "National Defence Academy (NDA) Cadet Training Journey",
    category: "Government & Public Policy",
    type: "video",
    url: "https://www.youtube.com/watch?v=Bv0T89C6TdQ",
    embedId: "Bv0T89C6TdQ",
    description: "Inside the National Defence Academy (Khadakwasla): physical conditioning, academic curriculum, and military discipline.",
    duration: "25 mins",
    difficulty: "beginner",
    isFeatured: true
  }
];

exports.getResources = async (req, res, next) => {
  try {
    const { category, type, search } = req.query;

    let resources = defaultResources;

    if (supabase) {
      try {
        const { data, error } = await supabase.from('resource_hub').select('*');
        if (!error && data && data.length > 0) {
          resources = data.map((r) => ({
            id: r.id,
            title: r.title,
            category: r.category,
            type: r.type,
            url: r.url,
            embedId: r.embed_id || r.embedId,
            description: r.description,
            duration: r.duration,
            difficulty: r.difficulty,
            isFeatured: r.is_featured || r.isFeatured,
          }));
        }
      } catch (err) {
        // Fall back to defaultResources
      }
    }

    let filtered = [...resources];

    if (category && category !== 'All') {
      filtered = filtered.filter(
        (r) => r.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (type && type !== 'All') {
      filtered = filtered.filter(
        (r) => r.type.toLowerCase() === type.toLowerCase()
      );
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

    return ApiResponse.success(res, filtered, 'Resources retrieved', 200, { total: filtered.length });
  } catch (error) {
    next(error);
  }
};
