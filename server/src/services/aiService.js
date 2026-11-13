/**
 * AI Advisory & Gemini Chat Service
 */

const { model } = require('../config/gemini');
const careerService = require('./careerService');
const supabase = require('../config/supabase');
const { isValidUUID } = require('../utils/validators');

class AiService {
  /**
   * Generates intelligent, context-aware fallback response when Gemini key is missing or quotas exceeded
   */
  generateFallback(message, careerContext) {
    const q = message.toLowerCase();

    if (q.includes('salary') || q.includes('package') || q.includes('lpa')) {
      return `### Compensation & Salary Trajectory
For **${careerContext ? careerContext.name : 'this high-growth specialization'}**:
- **Entry Level (0-2 Yrs):** ${careerContext?.averageSalaryInr ? careerContext.averageSalaryInr.split('-')[0] : '₹6 - ₹10 LPA'}
- **Mid Senior (3-6 Yrs):** ${careerContext?.averageSalaryInr || '₹14 - ₹28 LPA'}
- **Global / Senior Scale:** ${careerContext?.averageSalaryUsd || '$110,000 - $190,000'}
- **Key Factor:** Compensation scales exponentially when you master niche frameworks, lead technical delivery, and demonstrate verified portfolio milestones.`;
    }

    if (q.includes('skill') || q.includes('learn') || q.includes('start')) {
      const skills = careerContext?.skills?.join(', ') || 'Core Algorithms, System Design, Modern Frameworks, Problem Solving';
      return `### Recommended Learning Path & Core Skills
To excel in **${careerContext ? careerContext.name : 'this field'}**, prioritize:
1. **Foundations First:** Master ${skills.split(',').slice(0, 3).join(', ')}.
2. **Project Portfolio:** Build 2-3 production-grade end-to-end case studies rather than simple tutorial clones.
3. **Industry Certifications:** Validate your skills with industry-standard badges and open-source contributions.`;
    }

    return `### Strategic Advisory for ${careerContext ? careerContext.name : 'Your Career Journey'}
Navigating this path requires balancing technical competence with strategic execution:
1. **Core Trajectory:** Focus on mastering ${careerContext?.skills?.slice(0, 3).join(', ') || 'essential foundational skills'}.
2. **Industry Demand:** Current growth rate is **${careerContext?.growthRate || 'High Demand (20%+)'}**, with leading employers actively scouting verified builders.
3. **Action Step:** Explore the 3-Tier Resource Hub tabs above for structured video roadmaps, course certifications, and encyclopedic references!`;
  }

  /**
   * Generates AI mentor response using Gemini 1.5 Flash
   */
  async generateAdvice({ message, careerId, userProfile, history = [], userId = null }) {
    if (!message || !message.trim()) {
      throw new Error('Student query message cannot be empty.');
    }

    const careerContext = careerId ? await careerService.getCareerById(careerId) : null;

    const systemPrompt = `You are "ClearPath AI Mentor", an elite, empathetic, and highly knowledgeable career counselor for the Indian and global EdTech platform ClearPath.
Your goal is to guide students, graduates, and professionals with realistic, actionable, and encouraging career advice.

Current Career Context: ${careerContext ? `"${careerContext.name}" (${careerContext.category})` : 'General Career Discovery'}
${careerContext ? `Details:
- Average Salary (India): ${careerContext.averageSalaryInr}
- Global Salary: ${careerContext.averageSalaryUsd}
- Growth Rate: ${careerContext.growthRate}
- Key Skills: ${careerContext.skills.join(', ')}` : ''}
${userProfile ? `User Profile:
- Stream: ${userProfile.stream || 'General'}
- Education Level: ${userProfile.education_level || 'Undergraduate'}` : ''}

Tone Guidelines:
- Practical, structured, with bullet points and markdown headers where appropriate.
- Give realistic steps, real tools, degrees, and salary perspectives.
- Keep responses concise (around 2 to 4 structured sections).
- Be inspiring and direct.

User Inquiry: "${message}"`;

    let reply = '';

    if (model) {
      try {
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        reply = response.text();
      } catch (geminiError) {
        console.warn('⚠️ Gemini API call notice, using intelligent fallback:', geminiError.message);
        reply = this.generateFallback(message, careerContext);
      }
    } else {
      reply = this.generateFallback(message, careerContext);
    }

    // Persist to Supabase if valid UUID
    if (supabase && userId && isValidUUID(userId)) {
      try {
        const newMessages = [
          ...history.slice(-8), // Keep recent history compact
          { role: 'user', content: message, timestamp: new Date().toISOString() },
          { role: 'assistant', content: reply, timestamp: new Date().toISOString() },
        ];

        await supabase.from('ai_conversations').upsert({
          user_id: userId,
          career_context: careerId || 'general',
          messages: newMessages,
          updated_at: new Date().toISOString(),
        });
      } catch (dbErr) {
        // Silently continue
      }
    }

    return {
      reply,
      careerId: careerId || null,
      timestamp: new Date().toISOString(),
    };
  }

  getSuggestedPrompts(careerContext) {
    if (!careerContext) {
      return [
        'How do I choose between Engineering and Management?',
        'What are the highest paying tech careers in India?',
        'How do I build a portfolio with zero work experience?',
        'What skills will stay relevant with generative AI advances?',
      ];
    }

    return [
      `What are the top 3 skills needed to become a ${careerContext.name}?`,
      `What is the realistic 5-year salary roadmap for a ${careerContext.name}?`,
      `Which certifications hold the most industry credibility in this role?`,
      `Can I transition into ${careerContext.name} from a non-traditional background?`,
      `What are 2 impressive capstone projects to show in an interview?`,
    ];
  }
}

module.exports = new AiService();

