const { model } = require('../config/gemini');
const defaultCareers = require('../data/defaultCareers');
const supabase = require('../config/supabase');

// Ask AI Career Mentor
exports.chatWithMentor = async (req, res) => {
  try {
    const { message, careerId, userProfile, history = [], userId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    // Look up career context if careerId provided
    const careerContext = defaultCareers.find((c) => c.id === careerId);

    // Build system instructions for Gemini
    const systemPrompt = `You are "Sahi AI Mentor", an elite, empathetic, and highly knowledgeable career counselor for the Indian and global EdTech platform SahiChayan.Com.
Your goal is to guide students, graduates, and professionals with realistic, actionable, and encouraging career advice.

Current Career Being Explored: ${careerContext ? `"${careerContext.name}" (${careerContext.category})` : "General Career Exploration"}
${careerContext ? `Details:
- Average Salary (India): ${careerContext.averageSalaryInr}
- Global Salary: ${careerContext.averageSalaryUsd}
- Growth Rate: ${careerContext.growthRate}
- Key Skills: ${careerContext.skills.join(', ')}` : ""}
${userProfile ? `User Background:
- Stream/Field: ${userProfile.stream || "General"}
- Education Level: ${userProfile.education_level || "Undergraduate"}` : ""}

Tone Guidelines:
- Practical, structured, structured with bullet points where appropriate.
- Mention specific tools, degrees, certifications, and realistic salary growth.
- Keep responses concise (2 to 4 concise paragraphs or bulleted milestones).
- Be supportive and inspiring.

Student Query: "${message}"`;

    let aiAnswer = '';

    if (model) {
      try {
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        aiAnswer = response.text();
      } catch (geminiError) {
        console.warn('Gemini API call failed, generating fallback:', geminiError.message);
        aiAnswer = generateIntelligentFallback(message, careerContext);
      }
    } else {
      aiAnswer = generateIntelligentFallback(message, careerContext);
    }

    // Optional: Save to Supabase ai_conversations if user is logged in
    if (supabase && userId) {
      try {
        const newMessages = [
          ...history,
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: aiAnswer, timestamp: new Date().toISOString() }
        ];

        await supabase.from('ai_conversations').upsert({
          user_id: userId,
          career_context: careerId || 'general',
          messages: newMessages,
          updated_at: new Date().toISOString()
        });
      } catch (dbErr) {
        // Continue silently
      }
    }

    res.json({
      success: true,
      data: {
        reply: aiAnswer,
        careerId: careerId || null,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Returns suggested prompt questions based on current context
exports.getSuggestedQuestions = (req, res) => {
  const { careerId } = req.query;
  const career = defaultCareers.find((c) => c.id === careerId);

  let suggestions = [
    "What are the top skills I should learn first?",
    "What is the realistic salary progression over 5 years?",
    "Which college degrees or certifications hold the most value?",
    "Can I transition into this field from a different background?",
    "What portfolio projects will impress hiring managers?"
  ];

  if (career) {
    suggestions = [
      `What does a typical day look like for a ${career.name}?`,
      `How can I land an entry-level role in ${career.name}?`,
      `What are the most valued certifications for ${career.name}?`,
      `How does ${career.name} compare with other roles in ${career.category}?`
    ];
  }

  res.json({ success: true, data: suggestions });
};

// Fallback intelligent responder when API key is pending or network drops
function generateIntelligentFallback(query, career) {
  const q = query.toLowerCase();

  if (q.includes('salary') || q.includes('earn') || q.includes('package')) {
    if (career) {
      return `For **${career.name}**, the entry-level salary in India typically starts around **${career.averageSalaryInr.split('-')[0].trim()}**, scaling to **${career.averageSalaryInr.split('-')[1]?.trim() || 'higher tiers'}** with 4-7 years of domain experience. In global remote markets, compensation ranges around **${career.averageSalaryUsd}**. High performers with specialized niche skills often exceed these benchmarks significantly.`;
    }
    return `Salaries vary based on specialization, portfolio depth, and technical excellence. Top tech and quantitative careers generally offer ₹8-20 LPA for starting roles, while specialized medical and corporate law roles offer steady compounding over time. Check out our **Careers Directory** for specific figures!`;
  }

  if (q.includes('skills') || q.includes('learn') || q.includes('start')) {
    if (career) {
      return `To excel as a **${career.name}**, prioritize mastering these core competencies:\n\n` +
        career.skills.map((s, i) => `${i + 1}. **${s}**`).join('\n') +
        `\n\nBegin with the foundational concepts in Phase 1 of our roadmap, build 2-3 tangible end-to-end projects, and document your learnings publicly on GitHub or LinkedIn.`;
    }
    return `Start by building strong fundamental problem-solving and communication skills. Next, pick one high-leverage technical skill (such as Python, SQL, Figma, or System Architecture) and practice with structured mini-projects every week.`;
  }

  if (career) {
    return `Regarding your interest in **${career.name}** (${career.category}): This is currently experiencing a **${career.growthRate}** outlook. \n\nKey next steps for your journey:\n1. **Foundations**: Focus on ${career.skills.slice(0, 3).join(', ')}.\n2. **Hands-on Practice**: Follow the 4-phase structured roadmap in the in-app dossier.\n3. **Mentorship**: Connect with active practitioners on LinkedIn and contribute to open source or real-world case studies.`;
  }

  return `Great question! The most sustainable career path aligns your innate cognitive strengths (logic, creativity, leadership) with high-demand market skills. I recommend taking the **SahiChayan 18-Trait Assessment** to pinpoint your closest matching career tracks, and then exploring their dedicated skill roadmaps!`;
}
