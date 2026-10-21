-- ==============================================================================
-- SAHICHAYAN.COM - Supabase Initial Seed Data
-- ==============================================================================

INSERT INTO public.career_catalog (id, name, category, description, average_salary_inr, average_salary_usd, growth_rate, skills, roadmap, resources, trait_weights)
VALUES 
(
  'ai_ml_engineer',
  'Artificial Intelligence & ML Engineer',
  'Technology & AI',
  'Designs, trains, and deploys machine learning models and deep learning architectures that power generative AI, computer vision, and autonomous systems.',
  '12 - 35 LPA',
  '$110,000 - $210,000',
  '36% (Much faster than average)',
  ARRAY['Python', 'PyTorch', 'TensorFlow', 'Linear Algebra', 'Transformers', 'LLMOps', 'Data Pipelines'],
  '[
    {"phase": "Phase 1: Foundations", "duration": "3-6 Months", "topics": ["Python Mastery", "Calculus & Linear Algebra", "Probability & Statistics", "Data Structures"]},
    {"phase": "Phase 2: Core Machine Learning", "duration": "4-6 Months", "topics": ["Scikit-Learn", "Regression/Classification", "Feature Engineering", "Pandas/NumPy"]},
    {"phase": "Phase 3: Deep Learning & GenAI", "duration": "6-8 Months", "topics": ["Neural Networks", "PyTorch", "HuggingFace Transformers", "Fine-tuning LLMs", "RAG Systems"]},
    {"phase": "Phase 4: Production & Deployment", "duration": "Ongoing", "topics": ["Docker", "MLflow", "FastAPI Serving", "Vector Databases", "Cloud GPU Scaling"]}
  ]'::jsonb,
  '[
    {"title": "Complete Machine Learning Bootcamp", "type": "video", "url": "https://www.youtube.com/watch?v=i_LwzRVP7bg", "provider": "YouTube"},
    {"title": "Deep Learning Specialization", "type": "course", "url": "https://www.coursera.org/specializations/deep-learning", "provider": "Coursera"},
    {"title": "Full Stack LLM Application Architecture", "type": "roadmap", "url": "https://roadmap.sh/ai-engineer", "provider": "Roadmap.sh"}
  ]'::jsonb,
  '{"Ai": 10, "logic": 9, "technology": 10, "building": 7, "creativity": 6}'::jsonb
),
(
  'full_stack_architect',
  'Full Stack Software Architect',
  'Technology & AI',
  'Builds high-scale frontend and backend applications, designing scalable system architectures, APIs, and modern cloud deployment pipelines.',
  '10 - 30 LPA',
  '$95,000 - $180,000',
  '25% (Faster than average)',
  ARRAY['React / Next.js', 'Node.js / Express', 'TypeScript', 'PostgreSQL / Supabase', 'Docker', 'System Design'],
  '[
    {"phase": "Phase 1: Modern Web Fundamentals", "duration": "3 Months", "topics": ["HTML5/CSS3/Tailwind", "Modern JavaScript (ES6+)", "Git & GitHub Workflow"]},
    {"phase": "Phase 2: Frontend Engineering", "duration": "3-4 Months", "topics": ["React.js", "State Management", "Client Routing", "Responsive Web Design"]},
    {"phase": "Phase 3: Backend & Databases", "duration": "4 Months", "topics": ["Node.js / Express", "PostgreSQL & Supabase", "REST APIs & GraphQL", "JWT Auth"]},
    {"phase": "Phase 4: Cloud & Scale", "duration": "Ongoing", "topics": ["Docker & CI/CD", "AWS/Vercel/Render", "Microservices & Caching", "Security & System Design"]}
  ]'::jsonb,
  '[
    {"title": "Full Stack Web Development Roadmap", "type": "video", "url": "https://www.youtube.com/watch?v=nu_pCVPKzTk", "provider": "YouTube"},
    {"title": "Full Stack Developer Roadmap Guide", "type": "roadmap", "url": "https://roadmap.sh/full-stack", "provider": "Roadmap.sh"}
  ]'::jsonb,
  '{"technology": 10, "logic": 9, "building": 9, "creativity": 7, "communication": 6}'::jsonb
),
(
  'ui_ux_product_designer',
  'UI/UX & Product Designer',
  'Design & Creative',
  'Crafts intuitive user experiences, wireframes, interactive prototypes, and design systems that bridge human psychology and digital software.',
  '7 - 22 LPA',
  '$75,000 - $145,000',
  '18% (Faster than average)',
  ARRAY['Figma', 'Design Systems', 'User Research', 'Wireframing', 'Prototyping', 'Visual Hierarchy', 'Micro-interactions'],
  '[
    {"phase": "Phase 1: Design Principles", "duration": "2 Months", "topics": ["Visual Hierarchy", "Typography & Color Theory", "UI Laws & Gestalt Principles"]},
    {"phase": "Phase 2: Figma Mastery", "duration": "2 Months", "topics": ["Figma Auto-layout", "Components & Variants", "Interactive Prototyping", "Tokens"]},
    {"phase": "Phase 3: UX Research & IA", "duration": "3 Months", "topics": ["User Interviews", "Empathy Maps & Personas", "Information Architecture", "Usability Testing"]},
    {"phase": "Phase 4: Portfolio & Case Studies", "duration": "Ongoing", "topics": ["2-3 End-to-end Case Studies", "Design Systems Documentation", "Dribbble & Behance Presence"]}
  ]'::jsonb,
  '[
    {"title": "Figma UI/UX Crash Course", "type": "video", "url": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU", "provider": "YouTube"},
    {"title": "Google UX Design Professional Certificate", "type": "course", "url": "https://www.coursera.org/professional-certificates/google-ux-design", "provider": "Coursera"}
  ]'::jsonb,
  '{"creativity": 10, "technology": 8, "communication": 7, "helping": 6, "logic": 5}'::jsonb
),
(
  'civil_services_ias',
  'Civil Services Administrator (IAS / IPS)',
  'Government & Public Policy',
  'Shapes state and national policies, leads district administration, executes public welfare schemes, and manages governance at the highest tier.',
  '8 - 25 LPA (Grade Pay + Govt Perks)',
  'Equivalent Indian Cabinet Ranks',
  'Prestigious Govt Appointment',
  ARRAY['Public Policy', 'Constitution of India', 'Ethics & Governance', 'Crisis Management', 'Leadership', 'Strategic Decision Making'],
  '[
    {"phase": "Phase 1: NCERTs & Static Foundations", "duration": "6-8 Months", "topics": ["Polity (M. Laxmikanth)", "History & Culture", "Geography & Environment", "Economy"]},
    {"phase": "Phase 2: Current Affairs & CSAT", "duration": "4-6 Months", "topics": ["Newspaper Analysis (The Hindu/Express)", "Monthly Compilations", "Quantitative Aptitude"]},
    {"phase": "Phase 3: UPSC Prelims & Mains Drill", "duration": "6 Months", "topics": ["Mock Tests (100+)", "Answer Writing Practice", "Optional Subject Mastery", "Essay Papers"]},
    {"phase": "Phase 4: Personality Test / Interview", "duration": "2 Months", "topics": ["DAF Preparation", "Mock Interviews", "Current Socio-economic Debates"]}
  ]'::jsonb,
  '[
    {"title": "UPSC CSE Preparation Strategy", "type": "video", "url": "https://www.youtube.com/watch?v=0w5GqH_7Z8c", "provider": "YouTube"},
    {"title": "ClearIAS Study Guidance Portal", "type": "guide", "url": "https://www.clearias.com", "provider": "ClearIAS"}
  ]'::jsonb,
  '{"government": 10, "administration": 10, "leadership": 9, "helping": 9, "communication": 8, "logic": 7}'::jsonb
),
(
  'commercial_pilot',
  'Commercial Airline Pilot',
  'Aviation & Aerospace',
  'Commands commercial passenger and cargo aircraft across domestic and international routes, ensuring utmost flight safety, navigation, and crew coordination.',
  '18 - 45 LPA',
  '$100,000 - $250,000',
  '14% (Faster than average)',
  ARRAY['Cockpit Resource Management', 'Aeronautical Navigation', 'Meteorology', 'Air Regulations', 'Emergency Procedures', 'Instrument Flying'],
  '[
    {"phase": "Phase 1: Medicals & Ground School", "duration": "6 Months", "topics": ["Class 2 & Class 1 DGCA Medicals", "Air Regulations", "Aviation Meteorology", "Air Navigation"]},
    {"phase": "Phase 2: DGCA Exams & SPL/PPL", "duration": "6 Months", "topics": ["Clearing 5 DGCA Papers", "Student Pilot License", "First Solo Flight"]},
    {"phase": "Phase 3: Commercial Pilot License (CPL)", "duration": "12-18 Months", "topics": ["200 Hours Flying Hours Log", "Multi-Engine Rating (ME)", "Instrument Rating (IR)"]},
    {"phase": "Phase 4: Type Rating & Airline Cadet", "duration": "3-6 Months", "topics": ["A320 / B737 Type Rating", "Simulator Evaluations", "First Officer Induction"]}
  ]'::jsonb,
  '[
    {"title": "How to Become a Pilot in India - Step by Step", "type": "video", "url": "https://www.youtube.com/watch?v=Zf5rG6y1k8Y", "provider": "YouTube"}
  ]'::jsonb,
  '{"Avation": 10, "logic": 8, "technology": 8, "travel": 9, "leadership": 8, "sports": 6}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Seed initial resources
INSERT INTO public.resource_hub (title, category, type, url, embed_id, description, duration, difficulty, is_featured)
VALUES
('Machine Learning Specialization Video Primer', 'Technology & AI', 'video', 'https://www.youtube.com/watch?v=i_LwzRVP7bg', 'i_LwzRVP7bg', 'Comprehensive introduction to modern machine learning, regression, and model evaluation.', '45 mins', 'beginner', true),
('Full Stack Web Developer Interactive Roadmap', 'Technology & AI', 'roadmap', 'https://roadmap.sh/full-stack', null, 'Step by step roadmap to becoming a modern full-stack developer with frontend and backend mastery.', 'Self-paced', 'beginner', true),
('Complete Figma Masterclass for Beginners', 'Design & Creative', 'video', 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU', 'c9Wg6Cb_YlU', 'Learn Figma UI design, auto-layouts, responsive frames, and modern component systems.', '60 mins', 'beginner', true),
('UPSC Civil Services Exam Roadmap & Syllabus', 'Government & Public Policy', 'guide', 'https://upsc.gov.in', null, 'Official syllabus and stage breakdown for Prelims, Mains, and Interview examinations.', 'Guide', 'intermediate', true),
('How to Become a Commercial Airline Pilot', 'Aviation & Aerospace', 'video', 'https://www.youtube.com/watch?v=Zf5rG6y1k8Y', 'Zf5rG6y1k8Y', 'Complete step by step guide on DGCA medicals, ground school, flying club hours, and CPL issuance.', '30 mins', 'beginner', true)
ON CONFLICT DO NOTHING;
