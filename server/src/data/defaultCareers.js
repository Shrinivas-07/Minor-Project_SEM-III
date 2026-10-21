// ==============================================================================
// SAHICHAYAN.COM - Server Master Career Catalog (32+ High-Impact Careers)
// ==============================================================================

const defaultCareers = [
  {
    id: "ai_ml_engineer",
    name: "Artificial Intelligence & ML Engineer",
    category: "Technology & AI",
    icon: "Cpu",
    tagline: "Architect generative AI models, LLM systems, and deep neural networks",
    description: "Designs, trains, and deploys deep learning architectures and transformer models powering generative AI, autonomous robotics, computer vision, and speech agents.",
    averageSalaryInr: "₹14 - ₹42 LPA",
    averageSalaryUsd: "$120,000 - $225,000",
    growthRate: "38% (Explosive Demand)",
    topEmployers: ["Google DeepMind", "OpenAI", "Microsoft", "NVIDIA", "Infosys AI Labs", "Flipkart"],
    skills: ["Python", "PyTorch", "TensorFlow", "Transformers", "LLMOps", "Vector DBs", "RAG Systems", "Linear Algebra"],
    roadmap: [
      { phase: "Phase 1: Math & Python", duration: "3-4 Months", topics: ["Python OOP & NumPy", "Linear Algebra & Matrix Math", "Multivariate Calculus & Optimization", "Probability & Statistics"] },
      { phase: "Phase 2: Core Machine Learning", duration: "3-5 Months", topics: ["Scikit-Learn", "Regression & Classification", "Feature Engineering", "Ensemble Methods (XGBoost)"] },
      { phase: "Phase 3: Deep Learning & GenAI", duration: "6 Months", topics: ["PyTorch Neural Nets", "CNNs & Computer Vision", "Attention & Transformers", "RAG Systems & Vector Databases"] },
      { phase: "Phase 4: ML Engineering & Cloud", duration: "Ongoing", topics: ["Docker & Kubernetes for ML", "FastAPI / vLLM Serving", "CI/CD & Model Monitoring", "Cloud GPU Scaling"] }
    ],
    youtubeSearchQuery: "artificial intelligence machine learning engineer roadmap complete course",
    courses: [
      { name: "Deep Learning Specialization", platform: "Coursera", url: "https://www.coursera.org/specializations/deep-learning", provider: "DeepLearning.AI (Andrew Ng)", freeOption: true },
      { name: "Intro to Machine Learning & Deep Learning", platform: "Kaggle", url: "https://www.kaggle.com/learn", provider: "Kaggle Learn", freeOption: true },
      { name: "CS50 Introduction to Artificial Intelligence", platform: "Harvard / edX", url: "https://cs50.harvard.edu/ai/", provider: "Harvard University", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Artificial Intelligence", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", type: "Encyclopedia", desc: "Comprehensive historical, technical, and mathematical overview of AI systems." },
      { title: "Roadmap.sh: AI Engineer Guide", url: "https://roadmap.sh/ai-engineer", type: "Interactive Roadmap", desc: "Community-driven visual skill tree covering prompt engineering to LLM deployment." }
    ],
    weights: { Ai: 10, logic: 9, technology: 10, building: 7, creativity: 6 }
  },
  {
    id: "full_stack_architect",
    name: "Full Stack Software Architect",
    category: "Technology & AI",
    icon: "Layers",
    tagline: "Build high-throughput web software from modern UI to distributed cloud backends",
    description: "Architects scalable full-stack applications, designing resilient microservices, reactive user interfaces, and automated continuous delivery pipelines.",
    averageSalaryInr: "₹12 - ₹35 LPA",
    averageSalaryUsd: "$100,000 - $190,000",
    growthRate: "26% (Very High Demand)",
    topEmployers: ["Amazon", "Meta", "Zomato", "Swiggy", "Stripe", "Atlassian"],
    skills: ["React / Next.js", "Node.js / Express", "TypeScript", "PostgreSQL / Supabase", "System Design", "Docker", "Redis"],
    roadmap: [
      { phase: "Phase 1: Web & JavaScript", duration: "3 Months", topics: ["Modern JS (ES6+)", "React.js & State Management", "Tailwind CSS & Responsive Layouts", "Client Routing"] },
      { phase: "Phase 2: Backend & Database", duration: "4 Months", topics: ["Node.js REST APIs", "PostgreSQL & Supabase Modeling", "JWT & OAuth2 Auth", "API Rate Limiting"] },
      { phase: "Phase 3: System Design & Scale", duration: "4 Months", topics: ["Redis Caching", "Microservices vs Modular Monolith", "Kafka Message Queues", "Load Balancing"] },
      { phase: "Phase 4: Cloud & DevOps", duration: "Ongoing", topics: ["Docker Containers", "GitHub Actions CI/CD", "AWS/Vercel Deployments", "Monitoring & Telemetry"] }
    ],
    youtubeSearchQuery: "full stack web development roadmap complete course tutorial",
    courses: [
      { name: "Full Stack Open (React, Redux, Node, GraphQL)", platform: "University of Helsinki", url: "https://fullstackopen.com/en/", provider: "Univ. of Helsinki", freeOption: true },
      { name: "Full Stack Tutorials & Practice", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/web-development/", provider: "GeeksforGeeks", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Web Development & Architecture", url: "https://en.wikipedia.org/wiki/Web_development", type: "Encyclopedia", desc: "Detailed summary of client-side, server-side, and database tier mechanisms." },
      { title: "Roadmap.sh: Full Stack Developer Guide", url: "https://roadmap.sh/full-stack", type: "Interactive Roadmap", desc: "Industry-standard step-by-step roadmap from frontend basics to cloud architecture." }
    ],
    weights: { technology: 10, logic: 9, building: 9, creativity: 7, communication: 6 }
  },
  {
    id: "cloud_devops_engineer",
    name: "Cloud Solutions & DevOps Architect",
    category: "Technology & AI",
    icon: "Cloud",
    tagline: "Automate global cloud infrastructure, CI/CD pipelines, and high availability systems",
    description: "Automates multi-cloud infrastructure deployment, orchestrates Kubernetes clusters, manages Terraform Infrastructure-as-Code, and ensures zero-downtime releases.",
    averageSalaryInr: "₹12 - ₹36 LPA",
    averageSalaryUsd: "$110,000 - $200,000",
    growthRate: "30% (High Growth)",
    topEmployers: ["AWS", "Microsoft Azure", "Google Cloud", "Red Hat", "TCS", "Accenture"],
    skills: ["Docker", "Kubernetes", "AWS / Azure", "Terraform", "GitHub Actions", "Linux / Bash", "Prometheus / Grafana"],
    roadmap: [
      { phase: "Phase 1: Linux & Networking", duration: "2-3 Months", topics: ["Linux Administration", "Bash Scripting", "TCP/IP, DNS, VPNs, SSL", "Git Collaboration"] },
      { phase: "Phase 2: Containers & Orchestration", duration: "3-4 Months", topics: ["Docker Containerization", "Kubernetes Pods, Services, Ingress", "Helm Charts"] },
      { phase: "Phase 3: Cloud & IaC", duration: "4 Months", topics: ["AWS Core Services (EC2, S3, RDS, IAM)", "Terraform Infrastructure as Code", "Ansible Configuration"] },
      { phase: "Phase 4: CI/CD & Observability", duration: "Ongoing", topics: ["GitHub Actions & GitLab CI", "Prometheus & Grafana Monitoring", "Site Reliability Engineering (SRE)"] }
    ],
    youtubeSearchQuery: "devops engineer roadmap tutorial docker kubernetes aws",
    courses: [
      { name: "AWS Cloud Technical Essentials", platform: "Coursera / AWS", url: "https://www.coursera.org/learn/aws-cloud-technical-essentials", provider: "Amazon Web Services", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: DevOps & Cloud Computing", url: "https://en.wikipedia.org/wiki/DevOps", type: "Encyclopedia", desc: "Philosophies, practices, and automated toolchains uniting software development and IT ops." },
      { title: "Roadmap.sh: DevOps Engineer Roadmap", url: "https://roadmap.sh/devops", type: "Interactive Roadmap", desc: "Visual diagram of cloud providers, orchestration, and continuous integration." }
    ],
    weights: { technology: 10, building: 9, logic: 8, administration: 6, communication: 5 }
  },
  {
    id: "commercial_pilot",
    name: "Commercial Airline Pilot",
    category: "Aviation & Aerospace",
    icon: "Plane",
    tagline: "Command passenger wide-body & narrow-body aircraft across international routes",
    description: "Commands commercial passenger and cargo aircraft, overseeing flight navigation, cockpit resource management, aviation meteorology, and passenger safety.",
    averageSalaryInr: "₹18 - ₹55 LPA",
    averageSalaryUsd: "$110,000 - $275,000",
    growthRate: "16% (High Global Pilot Demand)",
    topEmployers: ["Air India", "IndiGo", "Emirates", "Singapore Airlines", "Qatar Airways"],
    skills: ["Crew Resource Management", "Instrument Flying (IFR)", "Aviation Meteorology", "Air Navigation", "Emergency Handling", "Aerodynamics"],
    roadmap: [
      { phase: "Phase 1: DGCA Medicals & Ground School", duration: "6 Months", topics: ["Class 2 & Class 1 DGCA Medicals", "Air Regulations", "Aviation Meteorology", "Air Navigation & Radio Aids"] },
      { phase: "Phase 2: Flying Training & CPL Hours", duration: "12-18 Months", topics: ["200 Hours Certified Flight Training", "Solo Cross-Country Flights", "Night Flying & Instrument Rating (IR)", "Multi-Engine Rating (ME)"] },
      { phase: "Phase 3: Multi-Crew & Type Rating", duration: "3-4 Months", topics: ["Jet Orientation Course (JOC)", "Airbus A320 or Boeing 737 Type Rating", "Full Flight Simulator (FFS) Check-rides"] },
      { phase: "Phase 4: Airline Induction", duration: "Ongoing", topics: ["First Officer Induction", "Line Oriented Flight Training (LOFT)", "Captain Command Upgrade"] }
    ],
    youtubeSearchQuery: "how to become commercial pilot in india dgca cpl complete guide",
    courses: [
      { name: "DGCA Ground School Syllabus & Study Modules", platform: "DGCA India", url: "https://dgca.gov.in", provider: "Directorate General of Civil Aviation", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Commercial Pilot License (CPL)", url: "https://en.wikipedia.org/wiki/Commercial_pilot_license", type: "Encyclopedia", desc: "A qualification permitting the holder to act as pilot of an aircraft and be remunerated." },
      { title: "DGCA Official Portal (India)", url: "https://dgca.gov.in/", type: "Official Regulatory Body", desc: "Direct regulations, licensing exam forms, flight training organizations (FTO) list." }
    ],
    weights: { Avation: 10, logic: 8, technology: 8, travel: 9, leadership: 8, sports: 6 }
  },
  {
    id: "civil_services_ias",
    name: "Civil Services Administrator (IAS / IPS / IFS)",
    category: "Government & Public Policy",
    icon: "Flag",
    tagline: "Direct public administration, policy execution, and nation-building governance",
    description: "Shapes state and national governance, manages district law and order, spearheads public welfare delivery, and implements socio-economic reforms at the highest levels of Indian administration.",
    averageSalaryInr: "₹8 - ₹25 LPA (Pay Level 10-17 + Sovereign Perks)",
    averageSalaryUsd: "Sovereign Cabinet Rank",
    growthRate: "Elite Indian Civil Service",
    topEmployers: ["Government of India", "State Governments", "Cabinet Secretariat", "Prime Minister's Office (PMO)"],
    skills: ["Public Administration", "Constitution of India", "Crisis Governance", "Policy Drafting", "Diplomacy", "Strategic Leadership"],
    roadmap: [
      { phase: "Phase 1: NCERT Static Foundations", duration: "6-8 Months", topics: ["Indian Polity (M. Laxmikanth)", "Modern & Ancient History", "Geography & Environment", "Macroeconomics Basics"] },
      { phase: "Phase 2: Prelims & CSAT Drill", duration: "4-6 Months", topics: ["100+ Sectional & Full Mocks", "Daily Current Affairs (The Hindu)", "CSAT Aptitude & Reasoning"] },
      { phase: "Phase 3: Mains Answer Writing & Optional", duration: "6 Months", topics: ["GS Papers 1, 2, 3, 4 (Ethics)", "Optional Subject (500 Marks)", "Essay Paper Practice"] },
      { phase: "Phase 4: Personality Test / Interview", duration: "2 Months", topics: ["DAF Analysis", "Mock Interviews with Former Bureaucrats", "Socio-Political Debates"] }
    ],
    youtubeSearchQuery: "upsc civil services preparation strategy ias ips topper roadmap",
    courses: [
      { name: "UPSC CSE Official Syllabus & Question Papers", platform: "UPSC Official", url: "https://upsc.gov.in/", provider: "Union Public Service Commission", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Indian Administrative Service", url: "https://en.wikipedia.org/wiki/Indian_Administrative_Service", type: "Encyclopedia", desc: "The administrative arm of the All India Services of the Government of India." },
      { title: "UPSC Official Examination Portal", url: "https://upsc.gov.in/", type: "Official Sovereign Portal", desc: "Official exam notifications, calendar, answer keys, and previous question papers." }
    ],
    weights: { government: 10, administration: 10, leadership: 9, helping: 9, communication: 8, logic: 7 }
  },
  {
    id: "doctor_mbbs_specialist",
    name: "Medical Doctor & Clinical Specialist (MBBS / MD)",
    category: "Healthcare & Life Sciences",
    icon: "HeartPulse",
    tagline: "Diagnose, heal, and save lives through clinical excellence and surgical science",
    description: "Evaluates patient health, diagnoses complex medical conditions, administers life-saving treatments, and leads healthcare teams in major hospitals and research institutions.",
    averageSalaryInr: "₹12 - ₹45 LPA (Super-Specialists Higher)",
    averageSalaryUsd: "$190,000 - $420,000",
    growthRate: "14% (Perennial Essential Need)",
    topEmployers: ["AIIMS", "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "WHO"],
    skills: ["Clinical Diagnosis", "Patient Empathy", "Pharmacology", "Emergency Medicine", "Surgical Fundamentals", "Medical Ethics"],
    roadmap: [
      { phase: "Phase 1: NEET-UG Examination", duration: "1-2 Years", topics: ["Physics, Chemistry, Biology (NCERT Precision)", "NEET Mock Practice & Speed Drills"] },
      { phase: "Phase 2: MBBS Medical College", duration: "4.5 Years + 1 Year Internship", topics: ["Anatomy, Physiology, Biochemistry", "Pathology, Microbiology, Pharmacology", "Rotatory Clinical Hospital Internship"] },
      { phase: "Phase 3: NEET-PG Specialization (MD/MS)", duration: "3 Years", topics: ["Specialization in Cardiology, General Surgery, Pediatrics, etc.", "Clinical Hospital Residency"] },
      { phase: "Phase 4: Super-Specialization (DM/MCh)", duration: "Ongoing", topics: ["Advanced Surgical Fellowships", "Independent Hospital Practice & Research"] }
    ],
    youtubeSearchQuery: "mbbs neet ug pg medical doctor career roadmap complete guide",
    courses: [
      { name: "Anatomy & Physiology Fundamentals", platform: "Coursera / edX", url: "https://www.coursera.org/learn/anatomy", provider: "University of Michigan", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Bachelor of Medicine, Bachelor of Surgery", url: "https://en.wikipedia.org/wiki/Bachelor_of_Medicine,_Bachelor_of_Surgery", type: "Encyclopedia", desc: "The primary medical degrees awarded by institutions in India, UK, and other countries." },
      { title: "National Medical Commission (NMC)", url: "https://www.nmc.org.in/", type: "Official Regulatory Body", desc: "Statutory body governing medical education, medical professionals, and clinical practice standards." }
    ],
    weights: { medical: 10, helping: 10, logic: 8, nature: 6, leadership: 7 }
  },
  {
    id: "investment_banker",
    name: "Investment Banker & Financial Analyst",
    category: "Finance & Business",
    icon: "TrendingUp",
    tagline: "Underwrite initial public offerings (IPOs), acquisitions, and capital raises",
    description: "Helps companies and sovereign entities raise capital through equity and debt, builds sophisticated financial valuation models, and advises on multi-billion dollar M&A transactions.",
    averageSalaryInr: "₹16 - ₹48 LPA + Heavy Bonuses",
    averageSalaryUsd: "$140,000 - $320,000+",
    growthRate: "16% (Lucrative Global Finance)",
    topEmployers: ["Goldman Sachs", "Morgan Stanley", "JP Morgan", "Citigroup", "Kotak Mahindra Capital", "Avendus"],
    skills: ["DCF & LBO Financial Modeling", "Company Valuation", "Pitchbook Creation", "Capital Markets", "Financial Statements", "Excel Mastery"],
    roadmap: [
      { phase: "Phase 1: Finance Foundations", duration: "3-4 Years", topics: ["B.Com / Economics / B.Tech / BBA", "Corporate Finance & Accounting", "Advanced Excel Modeling"] },
      { phase: "Phase 2: Certifications (CFA / MBA)", duration: "1-2 Years", topics: ["CFA Level 1 & Level 2", "CAT / GMAT Preparation for IIMs / ISB / Ivy League"] },
      { phase: "Phase 3: Investment Banking Analyst", duration: "2-3 Years", topics: ["Confidential Information Memorandums (CIM)", "Comparable Company Valuation", "M&A Execution"] },
      { phase: "Phase 4: Associate to MD Track", duration: "Ongoing", topics: ["Originating M&A Deals", "Managing Client Corporate Boards", "Syndication"] }
    ],
    youtubeSearchQuery: "investment banking career guide financial modeling day in the life",
    courses: [
      { name: "Financial Modeling and Valuation Specialization", platform: "Coursera", url: "https://www.coursera.org/specializations/financial-modeling-valuation", provider: "Wharton / PwC", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Investment Banking", url: "https://en.wikipedia.org/wiki/Investment_banking", type: "Encyclopedia", desc: "Financial services company or corporate division assisting individuals and corporations in raising capital." },
      { title: "Investopedia (Finance Authority)", url: "https://www.investopedia.com/", type: "Financial Dictionary", desc: "The world's leading source of financial content on financial modeling, IPOs, and valuations." }
    ],
    weights: { finance: 10, logic: 9, leadership: 8, communication: 7, building: 5 }
  }
];

module.exports = defaultCareers;
