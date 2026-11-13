/**
 * ClearPath AI Advisory & Gemini Chat Service
 * High-accuracy, contextual career guidance with dynamic response formatting
 * and multi-model fallback resiliency.
 */

const { genAI, getModel, MODEL_CANDIDATES } = require('../config/gemini');
const careerService = require('./careerService');
const supabase = require('../config/supabase');
const { isValidUUID } = require('../utils/validators');

class AiService {
  /**
   * System Instruction that instructs Gemini to be natural, accurate, and adaptive.
   */
  buildSystemInstruction(careerContext, userProfile) {
    let contextAddition = '';

    if (careerContext) {
      contextAddition += `\n\nActive Card Reference (use ONLY if relevant to the user query):
- Focused Career: ${careerContext.name} (${careerContext.category || 'General'})
- Average Salary (India): ${careerContext.averageSalaryInr || 'Competitive'}
- Global Benchmark: ${careerContext.averageSalaryUsd || 'Market Rate'}
- Key Core Skills: ${Array.isArray(careerContext.skills) ? careerContext.skills.join(', ') : 'Industry Standard Skills'}`;
    }

    if (userProfile) {
      contextAddition += `\n\nStudent Profile:
- Current Stream / Degree: ${userProfile.stream || 'Undergraduate'}
- Education Level: ${userProfile.education_level || 'Higher Education'}
- College: ${userProfile.college || 'Not specified'}
- Target Graduation Year: ${userProfile.target_year || 'Upcoming'}`;
    }

    return `You are "ClearPath AI Mentor", an elite, empathetic, and highly knowledgeable career counselor and academic advisor.
You advise school students (10th/12th), college undergrads, graduate students, and working professionals across India and globally.

CORE ADVISORY PRINCIPLES:
1. DIRECT & ACCURATE:
   - Answer the student's EXACT question directly and accurately. Never dodge the question with generic boilerplate.
   - If they ask about entrance exams (JEE, NEET, UPSC, GATE, CAT, CUET, GRE, GMAT), provide verified details, syllabus breakdowns, and realistic preparation strategies.
   - If they ask about degrees (B.Tech, BCA, MBBS, B.Com, BA, MBA, MCA, M.Tech), give realistic ROI, curriculum differences, and career entry pathways.
   - If they ask for advice on learning or switching careers, provide concrete, actionable milestones and portfolio suggestions.
   - If they greet ("Hi", "Hello"), respond warmly and ask what career question, degree, or roadmap they would like to explore today.

2. ADAPTIVE & NATURAL FORMATTING:
   - Vary your response format organically to match what was asked.
   - Do NOT force rigid pre-scripted headers or identical templates onto every answer.
   - For quick queries, give concise, direct answers with key takeaways.
   - For roadmaps, use clean step-by-step phases with bullet points.
   - For comparisons ("X vs Y"), provide structured comparisons (roles, salaries, learning curve, growth).
   - For salary queries, give realistic Indian LPA figures (Entry, Mid, Senior) alongside global benchmarks.

3. CONTEXT SENSITIVITY:
   - If a specific career card is active, incorporate relevant insights if appropriate.
   - BUT if the user asks about a different field, exam, degree, or general dilemma, ALWAYS prioritize the user's specific prompt over the card.

4. ACTIONABLE & INSPIRING:
   - Be practical, grounded, and encouraging. Recommend real tools, frameworks, projects, and high-impact next steps.${contextAddition}`;
  }

  /**
   * Generates intelligent, dynamic fallback responses if offline or all API quotas are exhausted.
   */
  generateFallback(message, careerContext, userProfile) {
    const q = message.toLowerCase().trim();

    // 1. Greetings & Conversational
    if (/^(hi|hello|hey|hola|greetings|good\s*(morning|afternoon|evening)|yo\b)/i.test(q)) {
      const studentName = userProfile?.full_name ? ` ${userProfile.full_name}` : '';
      return `Hello${studentName}! 👋 Welcome to **ClearPath Career Advisory**.

I am here to help you navigate your academic and career journey with complete clarity. Here are a few things you can ask me:

- **Degree Decisions:** *"Should I choose B.Tech CSE or BCA?"* or *"Is an MBA worth it after Engineering?"*
- **Career Roadmaps:** *"How do I become an AI Engineer from scratch?"* or *"What is the step-by-step roadmap for UPSC?"*
- **Skill & Portfolio Guidance:** *"What projects will get me hired in Data Science without work experience?"*
- **Compensation & Growth:** *"What is the realistic 5-year salary progression for Cloud Architects in India?"*

What is on your mind today?`;
    }

    // 2. UPSC / Civil Services / Govt Exams
    if (q.includes('upsc') || q.includes('civil service') || q.includes('ias') || q.includes('ips') || q.includes('government job')) {
      return `### Preparing for Civil Services (UPSC CSE)

Cracking the UPSC Civil Services Examination requires a structured, multi-stage marathon approach:

#### 1. The Exam Structure
- **Stage 1 (Prelims):** GS Paper 1 (100 questions, cut-off based) + CSAT Paper 2 (qualifying at 33%).
- **Stage 2 (Mains):** 9 subjective descriptive papers (Essay, 4 General Studies papers, and 2 Optional subject papers).
- **Stage 3 (Interview / Personality Test):** Evaluates mental alertness, critical assimilation, and moral integrity.

#### 2. Year-by-Year Preparation Strategy
1. **Foundation (Months 1–4):** Read basic **NCERT textbooks (Classes 6–12)** in History, Geography, Polity, and Economics. Start reading a national daily (*The Hindu* or *The Indian Express*) consistently.
2. **Standard Reference Books (Months 5–9):** Laxmikanth for Indian Polity, Spectrum for Modern History, Ramesh Singh/Nitin Singhania for Economy.
3. **Optional Subject Selection:** Choose an optional subject where your academic interest meets available syllabus and scoring trend (e.g., PSIR, Sociology, Geography, Pub Ad, or your graduation subject).
4. **Answer Writing & Mock Tests (Months 10–12):** Daily answer writing for Mains and solving 40+ full-length Prelims test papers.

**Pro-Tip:** If you are currently in college, dedicate 2–3 focused hours daily to current affairs and NCERTs so you have a massive advantage by your graduation year.`;
    }

    // 3. Degree Comparison / Education Choices
    if (q.includes('vs') || q.includes('compare') || q.includes('difference') || q.includes('which is better') || q.includes('bca') || q.includes('b.tech') || q.includes('btech')) {
      return `### Comparative Educational Guidance

When choosing between career tracks or academic degrees, evaluate these key dimensions:

1. **Foundational Depth vs Practical Application:**
   - **Comprehensive Technical Degrees (e.g. B.Tech / B.E.):** Offer deep grounding in math, computer architecture, systems, and algorithms. High campus recruitment pipeline for Tier-1/Tier-2 product companies.
   - **Applied Degree Programs (e.g. BCA, B.Sc CS):** Faster focus on application software, database design, and web development. Usually 3 years, making an **MCA** or strong industry portfolio essential for reaching senior-tier compensation parity.

2. **Market Realities:**
   - Companies today increasingly prioritize **verified proof of work** (GitHub repos, live deployed web apps, Kaggle medals, contributions to open-source) over institutional prestige alone.
   - A proactive student who builds real projects will outperform a passive student regardless of the degree title.

3. **Recommended Next Step:**
   - What specific domain (e.g., Full-Stack Web, AI/ML, Cloud DevOps, Cybersecurity, Data Analytics) excites you most? Share your stream and I will tailor an exact 6-month skill blueprint!`;
    }

    // 4. Career Switch / Non-CS / Commerce to Tech
    if (q.includes('non-cs') || q.includes('switch') || q.includes('mechanical') || q.includes('civil') || q.includes('commerce') || q.includes('arts') || q.includes('without experience')) {
      return `### Transitioning into Tech from a Non-CS Background

Breaking into technology from another background (Commerce, Mechanical, Arts, or Life Sciences) is completely achievable when you take a systematic approach:

1. **Leverage Your Domain Advantage:**
   - **Commerce / Economics Students:** Natural fit for **Data Analytics, Business Intelligence, FinTech, and Product Management**, because you already understand financial metrics and business logic.
   - **Engineering (Mechanical / Civil / Electrical):** Your analytical math and problem-solving skills make it easy to learn programming languages like Python and SQL.

2. **The 3-Step Transition Roadmap:**
   - **Step 1 — One Core Language:** Master **Python** or **JavaScript/TypeScript** thoroughly. Do not jump between 5 languages.
   - **Step 2 — Data & Systems:** Learn **SQL** and relational databases. Every modern enterprise application depends on data querying.
   - **Step 3 — Build "Proof-of-Work" Projects:** Deploy 2 full-scale production applications solving a problem in your original domain (e.g., a stock portfolio analytics dashboard or an IoT sensor monitor).

3. **Stepping-Stone Strategy:**
   - Start by targeting roles like **Data Analyst, QA Automation Engineer, or Technical Support Engineer**. After 1–2 years of industry experience, transition into core Software Engineering or Data Science.`;
    }

    // 5. Salary & Compensation
    if (q.includes('salary') || q.includes('package') || q.includes('lpa') || q.includes('compensation') || q.includes('highest paying')) {
      const careerName = careerContext?.name || 'High-Growth Tech Specializations';
      return `### Compensation & Salary Benchmarks

Salary trajectories for **${careerName}** across Indian and international markets:

| Experience Level | Indian Market (INR) | Global / Remote (USD) |
| :--- | :--- | :--- |
| **Entry Level (0–2 Years)** | ₹6 LPA – ₹14 LPA | $65,000 – $95,000 |
| **Mid-Level (3–6 Years)** | ₹16 LPA – ₹32 LPA | $110,000 – $160,000 |
| **Senior / Lead (7+ Years)** | ₹35 LPA – ₹70+ LPA | $175,000 – $240,000+ |

#### Factors That Drive Top-Tier (Top 10%) Compensation:
1. **System Architecture & Scale:** Knowledge of distributed systems, concurrency, and cloud infrastructure (AWS/GCP).
2. **Ownership & Delivery:** Ability to take vague business requirements and deliver robust production code independently.
3. **Problem-Solving Skills:** Strong understanding of Data Structures & Algorithms (DSA) for passing Tier-1 company screening rounds.`;
    }

    // 6. Skills, Learning Roadmap, or Capstones
    if (q.includes('skill') || q.includes('learn') || q.includes('roadmap') || q.includes('start') || q.includes('how to')) {
      const skills = Array.isArray(careerContext?.skills) ? careerContext.skills.join(', ') : 'Core Programming, System Design, Modern Frameworks, Databases';
      const target = careerContext?.name || 'Modern Technology Careers';

      return `### Recommended Learning Roadmap for ${target}

To build high-value competence in this track, structure your learning into three focused phases:

1. **Phase 1: Foundations & Core Logic (Weeks 1–6)**
   - Master core fundamentals: ${skills.split(',').slice(0, 3).join(', ')}.
   - Practice problem-solving on platforms like LeetCode or HackerRank (aim for consistent 30–45 mins daily).

2. **Phase 2: Real-World Development (Weeks 7–16)**
   - Build full-stack or end-to-end applications that solve an actual problem.
   - Use industry-standard version control (**Git & GitHub**), writing clean commit messages and clear README documentation.

3. **Phase 3: Deployment & Proof of Work (Weeks 17–24)**
   - Deploy your projects live on platforms like **Vercel, Render, or AWS**.
   - Create a clean 1-page portfolio website showcasing your architecture diagrams and demo links.

Would you like me to suggest 2 specific capstone project ideas tailored to your current skillset?`;
    }

    // 7. Contextual Fallback for any other query
    return `### Strategic Guidance for Your Inquiry

Regarding **"${message}"**:

1. **Core Direction:**
   - In modern career planning, the most successful path combines **deep foundational knowledge** with **consistent practical execution**.
   ${userProfile?.stream ? `- As a student in **${userProfile.stream}**, align your extracurricular learning with emerging market demands rather than sticking strictly to classroom syllabi.` : ''}

2. **Actionable Recommendations:**
   - Identify the top 2 industry-standard tools or skills needed for this specialization.
   - Spend 80% of your effort building tangible projects and 20% on passive tutorial watching.
   - Network actively with seniors and alumni on LinkedIn who are currently working in roles you aspire to.

Feel free to ask for a deeper breakdown of degrees, entrance exams, or project ideas!`;
  }

  /**
   * Generates AI mentor response with multi-model fallback resiliency
   */
  async generateAdvice({ message, careerId, userProfile, history = [], userId = null }) {
    if (!message || !message.trim()) {
      throw new Error('Student query message cannot be empty.');
    }

    const trimmedMessage = message.trim();
    const careerContext = careerId ? await careerService.getCareerById(careerId) : null;
    const systemInstruction = this.buildSystemInstruction(careerContext, userProfile);

    let reply = '';
    let usedModel = null;

    // Build multi-turn chat contents
    const contents = [];

    if (Array.isArray(history) && history.length > 0) {
      // Exclude initial system greeting if it was the first turn to keep user-first alternating structure
      const cleanHistory = history.filter((h) => h && h.content && h.content.trim());
      
      let lastRole = null;
      for (const turn of cleanHistory.slice(-6)) {
        const geminiRole = turn.role === 'assistant' ? 'model' : 'user';
        // Avoid consecutive roles with identical turn types
        if (geminiRole !== lastRole) {
          contents.push({
            role: geminiRole,
            parts: [{ text: turn.content.trim() }],
          });
          lastRole = geminiRole;
        }
      }
    }

    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: trimmedMessage }],
    });

    // Ensure the conversation starts with a user turn (Gemini API requirement)
    while (contents.length > 0 && contents[0].role !== 'user') {
      contents.shift();
    }

    // Attempt generation across available model candidates
    if (genAI && MODEL_CANDIDATES.length > 0) {
      for (const candidateModel of MODEL_CANDIDATES) {
        try {
          const modelInstance = getModel(candidateModel, {
            systemInstruction,
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              maxOutputTokens: 1500,
            },
          });

          if (!modelInstance) continue;

          const result = await modelInstance.generateContent({ contents });
          const response = await result.response;
          const text = response.text();

          if (text && text.trim()) {
            reply = text.trim();
            usedModel = candidateModel;
            break;
          }
        } catch (candidateError) {
          console.warn(`⚠️ Model ${candidateModel} failed: ${candidateError.message.split('\n')[0]}. Trying next fallback model...`);
        }
      }
    }

    // If all models failed or offline, use our rich dynamic fallback
    if (!reply) {
      console.log('ℹ️ Utilizing dynamic contextual fallback generator.');
      reply = this.generateFallback(trimmedMessage, careerContext, userProfile);
    }

    // Persist conversation to Supabase if valid UUID
    if (supabase && userId && isValidUUID(userId)) {
      try {
        const newMessages = [
          ...history.slice(-8),
          { role: 'user', content: trimmedMessage, timestamp: new Date().toISOString() },
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
      usedModel: usedModel || 'clearpath-advisory-engine',
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
