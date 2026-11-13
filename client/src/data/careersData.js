// ==============================================================================
// CLEARPATH - Master Career Catalog (32+ Diverse High-Impact Careers)
// With 3-tier resource architecture: YouTube In-App Hub, Course Sites, & General Knowledge
// ==============================================================================

export const careersData = [
  // --- TECHNOLOGY & AI ---
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
    featuredVideos: [
      { title: "AI Engineer Roadmap & Skills (2026)", query: "ai engineer roadmap 2026", embedId: "8SF_h3xF3cE" },
      { title: "Deep Learning Crash Course with PyTorch", query: "pytorch deep learning full course", embedId: "V_xro1bcAuA" },
      { title: "Generative AI & LLMs Explained Simply", query: "generative ai llm architecture explained", embedId: "mEsleV16qdo" }
    ],
    courses: [
      { name: "Deep Learning Specialization", platform: "Coursera", url: "https://www.coursera.org/specializations/deep-learning", provider: "DeepLearning.AI (Andrew Ng)", freeOption: true },
      { name: "Intro to Machine Learning & Deep Learning", platform: "Kaggle", url: "https://www.kaggle.com/learn", provider: "Kaggle Learn", freeOption: true },
      { name: "CS50 Introduction to Artificial Intelligence", platform: "Harvard / edX", url: "https://cs50.harvard.edu/ai/", provider: "Harvard University", freeOption: true },
      { name: "Full Machine Learning with Python Course", platform: "freeCodeCamp", url: "https://www.freecodecamp.org/news/tag/machine-learning/", provider: "freeCodeCamp", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Artificial Intelligence", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", type: "Encyclopedia", desc: "Comprehensive historical, technical, and mathematical overview of AI systems." },
      { title: "Roadmap.sh: AI Engineer Guide", url: "https://roadmap.sh/ai-engineer", type: "Interactive Roadmap", desc: "Community-driven visual skill tree covering prompt engineering to LLM deployment." },
      { title: "ArXiv Machine Learning Research Papers", url: "https://arxiv.org/list/cs.LG/recent", type: "Research Portal", desc: "State-of-the-art academic papers on neural networks and foundational models." }
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
    featuredVideos: [
      { title: "Full Stack Web Developer Roadmap", query: "full stack developer roadmap", embedId: "nu_pCVPKzTk" },
      { title: "System Design for Beginners", query: "system design interview crash course", embedId: "MbjObHmDbZo" }
    ],
    courses: [
      { name: "Full Stack Open (React, Redux, Node, GraphQL)", platform: "University of Helsinki", url: "https://fullstackopen.com/en/", provider: "Univ. of Helsinki", freeOption: true },
      { name: "Meta Front-End & Back-End Certificates", platform: "Coursera", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer", provider: "Meta", freeOption: false },
      { name: "Web Development Complete Bootcamp", platform: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", provider: "freeCodeCamp", freeOption: true },
      { name: "Full Stack Tutorials & Practice", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/web-development/", provider: "GeeksforGeeks", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Web Development & Architecture", url: "https://en.wikipedia.org/wiki/Web_development", type: "Encyclopedia", desc: "Detailed summary of client-side, server-side, and database tier mechanisms." },
      { title: "Roadmap.sh: Full Stack Developer Guide", url: "https://roadmap.sh/full-stack", type: "Interactive Roadmap", desc: "Industry-standard step-by-step roadmap from frontend basics to cloud architecture." },
      { title: "MDN Web Docs (Mozilla)", url: "https://developer.mozilla.org/", type: "Official Docs", desc: "The gold standard documentation for HTML, CSS, JavaScript, and Web APIs." }
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
    featuredVideos: [
      { title: "Complete DevOps Roadmap Guide", query: "devops engineer roadmap complete tutorial", embedId: "9pZ2xmsSDdo" },
      { title: "Docker & Kubernetes Full Course", query: "docker and kubernetes crash course for beginners", embedId: "Wf2eSG3owoA" }
    ],
    courses: [
      { name: "AWS Cloud Practitioner & Solutions Architect", platform: "Coursera / AWS", url: "https://www.coursera.org/learn/aws-cloud-technical-essentials", provider: "Amazon Web Services", freeOption: true },
      { name: "DevOps Engineering Bootcamp", platform: "freeCodeCamp", url: "https://www.freecodecamp.org/news/tag/devops/", provider: "freeCodeCamp", freeOption: true },
      { name: "Cloud Computing Fundamentals", platform: "edX", url: "https://www.edx.org/learn/cloud-computing", provider: "Linux Foundation / edX", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: DevOps & Cloud Computing", url: "https://en.wikipedia.org/wiki/DevOps", type: "Encyclopedia", desc: "Philosophies, practices, and automated toolchains uniting software development and IT ops." },
      { title: "Roadmap.sh: DevOps Engineer Roadmap", url: "https://roadmap.sh/devops", type: "Interactive Roadmap", desc: "Visual diagram of cloud providers, orchestration, and continuous integration." },
      { title: "Cloud Native Computing Foundation (CNCF)", url: "https://www.cncf.io/", type: "Official Foundation", desc: "The home of Kubernetes, Prometheus, Envoy, and cloud native open-source projects." }
    ],
    weights: { technology: 10, building: 9, logic: 8, administration: 6, communication: 5 }
  },
  {
    id: "cybersecurity_analyst",
    name: "Cybersecurity Analyst & Ethical Hacker",
    category: "Technology & AI",
    icon: "ShieldAlert",
    tagline: "Defend digital infrastructure and conduct ethical penetration testing",
    description: "Protects critical enterprise networks, tests application vulnerabilities (penetration testing), handles incident response, and prevents advanced nation-state cyberattacks.",
    averageSalaryInr: "₹10 - ₹32 LPA",
    averageSalaryUsd: "$95,000 - $185,000",
    growthRate: "33% (Critical Global Shortage)",
    topEmployers: ["CrowdStrike", "Palo Alto Networks", "Deloitte Cyber", "Cisco", "CERT-In (Govt)", "TCS"],
    skills: ["Kali Linux", "Penetration Testing", "Wireshark", "SIEM (Splunk)", "OWASP Top 10", "Network Security", "Cryptography"],
    roadmap: [
      { phase: "Phase 1: Networking & Linux", duration: "3 Months", topics: ["TCP/IP, OSI Layers, Subnetting", "Linux CLI & Bash", "Packet Sniffing with Wireshark"] },
      { phase: "Phase 2: Security Fundamentals", duration: "3 Months", topics: ["CompTIA Security+ Principles", "Firewalls, IDS/IPS & Threat Modeling", "Cryptography & PKI"] },
      { phase: "Phase 3: Ethical Hacking Labs", duration: "4-6 Months", topics: ["TryHackMe & Hack The Box Labs", "Web Security (OWASP Top 10, Burp Suite)", "Vulnerability Scanning"] },
      { phase: "Phase 4: Blue/Red Teaming & Cloud", duration: "Ongoing", topics: ["SIEM Log Analysis (Splunk)", "Cloud Security (AWS/Azure)", "SOC Analyst Incident Handling"] }
    ],
    youtubeSearchQuery: "cyber security analyst ethical hacking roadmap tutorial full course",
    featuredVideos: [
      { title: "Cybersecurity Roadmap & Free Resources", query: "cyber security roadmap guide", embedId: "inWWhr5tnEA" },
      { title: "Ethical Hacking 12-Hour Crash Course", query: "ethical hacking full course tutorial", embedId: "3Kq1MIfTWCE" }
    ],
    courses: [
      { name: "Google Cybersecurity Professional Certificate", platform: "Coursera", url: "https://www.coursera.org/professional-certificates/google-cybersecurity", provider: "Google", freeOption: false },
      { name: "TryHackMe Hands-on Security Pathways", platform: "TryHackMe", url: "https://tryhackme.com/", provider: "TryHackMe", freeOption: true },
      { name: "Introduction to Cybersecurity", platform: "Cisco Skills For All", url: "https://skillsforall.com/course/introduction-to-cybersecurity", provider: "Cisco Networking Academy", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Computer Security & Vulnerabilities", url: "https://en.wikipedia.org/wiki/Computer_security", type: "Encyclopedia", desc: "Detailed summary of threat models, malware, network defense, and cryptography." },
      { title: "Roadmap.sh: Cyber Security Roadmap", url: "https://roadmap.sh/cyber-security", type: "Interactive Roadmap", desc: "Complete visual guide from foundational networking to offensive and defensive ops." },
      { title: "OWASP (Open Web App Security Project)", url: "https://owasp.org/", type: "Official Security Org", desc: "The authoritative source on web vulnerabilities, APIs security, and mitigation." }
    ],
    weights: { technology: 10, logic: 9, building: 8, government: 7, communication: 5 }
  },
  {
    id: "data_scientist",
    name: "Data Scientist & Analytics Lead",
    category: "Technology & AI",
    icon: "BarChart3",
    tagline: "Uncover predictive insights and statistical models from massive data oceans",
    description: "Extracts business and scientific value from big data, builds predictive statistical models, designs A/B experiments, and presents data storytelling to executive teams.",
    averageSalaryInr: "₹11 - ₹34 LPA",
    averageSalaryUsd: "$105,000 - $195,000",
    growthRate: "35% (Rapid Growth)",
    topEmployers: ["Netflix", "Amazon", "Walmart Labs", "Fractal Analytics", "Mu Sigma", "JPMorgan"],
    skills: ["Python", "SQL", "Pandas", "Statistical Modeling", "Power BI / Tableau", "Machine Learning", "A/B Testing"],
    roadmap: [
      { phase: "Phase 1: Statistics & SQL", duration: "3 Months", topics: ["Probability & Hypothesis Testing", "Advanced SQL (Window Functions)", "Pandas & Data Wrangling"] },
      { phase: "Phase 2: Visualization & Dashboards", duration: "3 Months", topics: ["Exploratory Data Analysis (EDA)", "Tableau & Power BI", "A/B Experimentation Design"] },
      { phase: "Phase 3: Machine Learning & Modeling", duration: "4 Months", topics: ["Supervised & Unsupervised Models", "Time Series Forecasting", "Feature Engineering"] },
      { phase: "Phase 4: Big Data & Production", duration: "Ongoing", topics: ["Apache Spark / PySpark", "Snowflake & BigQuery", "Deploying Streamlit Data Apps"] }
    ],
    youtubeSearchQuery: "data science roadmap python sql machine learning tutorial full course",
    featuredVideos: [
      { title: "Data Science Full Course 2026", query: "data science full course for beginners", embedId: "ua-CiDNNj30" }
    ],
    courses: [
      { name: "IBM Data Science Professional Certificate", platform: "Coursera", url: "https://www.coursera.org/professional-certificates/ibm-data-science", provider: "IBM", freeOption: false },
      { name: "Kaggle Data Science & Pandas Micro-Courses", platform: "Kaggle", url: "https://www.kaggle.com/learn", provider: "Kaggle", freeOption: true },
      { name: "Python for Data Analysis and Science", platform: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/data-analysis-with-python/", provider: "freeCodeCamp", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Data Science", url: "https://en.wikipedia.org/wiki/Data_science", type: "Encyclopedia", desc: "Scientific methods, processes, algorithms, and systems to extract knowledge from data." },
      { title: "Roadmap.sh: Data Analyst Roadmap", url: "https://roadmap.sh/data-analyst", type: "Interactive Roadmap", desc: "Visual steps from spreadsheet mastery to SQL, Python, and statistical modeling." }
    ],
    weights: { Ai: 9, logic: 10, technology: 9, finance: 7, building: 6 }
  },
  {
    id: "blockchain_developer",
    name: "Blockchain & Smart Contract Architect",
    category: "Technology & AI",
    icon: "Boxes",
    tagline: "Build decentralized finance protocols, smart contracts, and Web3 apps",
    description: "Develops decentralized applications (dApps), programs secure Solidity smart contracts on Ethereum and Solana, and audits cryptographic ledger consensus protocols.",
    averageSalaryInr: "₹12 - ₹38 LPA",
    averageSalaryUsd: "$115,000 - $210,000",
    growthRate: "24% (High Specialized Demand)",
    topEmployers: ["Polygon Labs", "ConsenSys", "Coinbase", "Chainlink", "Solana Labs"],
    skills: ["Solidity", "Rust", "Ethers.js", "Smart Contract Auditing", "Cryptography", "Hardhat", "Web3.js"],
    roadmap: [
      { phase: "Phase 1: Blockchain Fundamentals", duration: "2 Months", topics: ["Cryptography (SHA-256, Public/Private keys)", "Proof of Work vs Proof of Stake", "EVM Mechanics"] },
      { phase: "Phase 2: Solidity & Smart Contracts", duration: "3-4 Months", topics: ["Solidity Syntax & Design Patterns", "Hardhat & Foundry Testing", "ERC-20, ERC-721 Token Standards"] },
      { phase: "Phase 3: dApp Frontend & Web3", duration: "3 Months", topics: ["Ethers.js / Wagmi integration", "MetaMask Wallet Connection", "IPFS Decentralized Storage"] },
      { phase: "Phase 4: Security & Protocol Auditing", duration: "Ongoing", topics: ["Smart Contract Reentrancy Vulnerabilities", "Gas Optimization", "DeFi Protocol Architecture"] }
    ],
    youtubeSearchQuery: "blockchain developer roadmap solidity smart contract tutorial",
    featuredVideos: [
      { title: "Solidity & Smart Contract 16-Hour Course", query: "solidity full course blockchain developer", embedId: "gyMwXuJrbJQ" }
    ],
    courses: [
      { name: "Blockchain Specialization", platform: "Coursera", url: "https://www.coursera.org/specializations/blockchain", provider: "University at Buffalo", freeOption: true },
      { name: "CryptoZombies Interactive Solidity Tutorial", platform: "CryptoZombies", url: "https://cryptozombies.io/", provider: "Loom Network", freeOption: true },
      { name: "Ethereum Development Documentation", platform: "Ethereum.org", url: "https://ethereum.org/en/developers/", provider: "Ethereum Foundation", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Blockchain & Smart Contracts", url: "https://en.wikipedia.org/wiki/Blockchain", type: "Encyclopedia", desc: "A distributed ledger with growing lists of records securely linked using cryptography." },
      { title: "Roadmap.sh: Blockchain Developer Guide", url: "https://roadmap.sh/blockchain", type: "Interactive Roadmap", desc: "Visual pathway covering smart contracts, consensus, and dApp architecture." }
    ],
    weights: { technology: 10, logic: 9, building: 8, finance: 8, creativity: 5 }
  },
  {
    id: "game_developer_3d",
    name: "Video Game Developer & 3D Engine Programmer",
    category: "Technology & AI",
    icon: "Gamepad2",
    tagline: "Build immersive virtual worlds, character physics, and AAA game mechanics",
    description: "Develops interactive game logic, real-time shaders, character physics, and multiplayer network architecture across Unreal Engine 5 and Unity.",
    averageSalaryInr: "₹8 - ₹28 LPA",
    averageSalaryUsd: "$85,000 - $165,000",
    growthRate: "24% (Expanding Gaming & XR Industry)",
    topEmployers: ["Ubisoft", "Rockstar Games", "EA Sports", "Epic Games", "Krafton India", "Sony Interactive"],
    skills: ["C++", "C#", "Unreal Engine 5", "Unity", "Shader Programming (HLSL)", "Physics Engines", "Multiplayer Netcode"],
    roadmap: [
      { phase: "Phase 1: C++ & 3D Math", duration: "3 Months", topics: ["Memory Management & Pointers", "Vectors, Matrices & Quaternions", "OOP Logic"] },
      { phase: "Phase 2: Game Engine Basics", duration: "4 Months", topics: ["Unreal Engine Blueprint & C++", "Physics & Collision Systems", "Animation State Machines"] },
      { phase: "Phase 3: Shaders & Graphics", duration: "4 Months", topics: ["Lumen & Nanite in Unreal 5", "HLSL / Shader Graphs", "Lighting & Post-Processing"] },
      { phase: "Phase 4: Multiplayer & Polish", duration: "Ongoing", topics: ["Client-Server Replication", "Steam SDK Integration", "Publishing Indie Title"] }
    ],
    youtubeSearchQuery: "unreal engine 5 game development full course c++ tutorial",
    featuredVideos: [
      { title: "Unreal Engine 5 Beginner to Pro", query: "unreal engine 5 full course", embedId: "k-zMkzmduqI" }
    ],
    courses: [
      { name: "Unreal Engine C++ Developer Course", platform: "Coursera / edX", url: "https://www.edx.org/learn/game-development", provider: "Epic Games / edX", freeOption: true },
      { name: "Unity Learn Official Pathways", platform: "Unity Learn", url: "https://learn.unity.com/", provider: "Unity Technologies", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Video Game Development", url: "https://en.wikipedia.org/wiki/Video_game_development", type: "Encyclopedia", desc: "Software engineering, game design, rendering pipelines, and audio engineering." },
      { title: "Roadmap.sh: Game Developer Roadmap", url: "https://roadmap.sh/game-developer", type: "Interactive Roadmap", desc: "Step-by-step roadmap for math, engines, shaders, and multiplayer." }
    ],
    weights: { technology: 9, creativity: 10, building: 9, logic: 8, Ai: 6 }
  },
  {
    id: "robotics_mechatronics",
    name: "Robotics & Autonomous Systems Engineer",
    category: "Technology & AI",
    icon: "Bot",
    tagline: "Design intelligent mechanical robots, sensor fusion, and ROS control systems",
    description: "Combines mechanical engineering, embedded electronics, and software algorithms (ROS) to build autonomous industrial manipulators, warehouse AGVs, and surgical robotics.",
    averageSalaryInr: "₹9 - ₹30 LPA",
    averageSalaryUsd: "$95,000 - $175,000",
    growthRate: "28% (Industrial Automation Boom)",
    topEmployers: ["Boston Dynamics", "Tesla Optimus", "GreyOrange", "ABB Robotics", "FANUC", "ISRO"],
    skills: ["ROS / ROS 2", "C++ / Python", "Embedded Systems (STM32, Arduino)", "Computer Vision (OpenCV)", "Sensor Fusion (LiDAR, IMU)", "Kinematics"],
    roadmap: [
      { phase: "Phase 1: Mechanics & Electronics", duration: "3-4 Months", topics: ["Microcontrollers & Circuit Design", "Sensors, Actuators & Motor Drivers", "Embedded C/C++"] },
      { phase: "Phase 2: ROS 2 & Kinematics", duration: "4 Months", topics: ["Robot Operating System 2", "Forward & Inverse Kinematics", "URDF & Gazebo Simulation"] },
      { phase: "Phase 3: Sensor Fusion & SLAM", duration: "4-6 Months", topics: ["LiDAR & Depth Camera Fusion", "SLAM (Simultaneous Localization & Mapping)", "Navigation 2 (Nav2) Stack"] },
      { phase: "Phase 4: Real-World Robot Build", duration: "Ongoing", topics: ["Custom PCB Design", "Autonomous Mobile Robot (AMR) Fabrication", "Reinforcement Learning for Control"] }
    ],
    youtubeSearchQuery: "robotics engineering ros2 tutorial full course for beginners",
    featuredVideos: [
      { title: "Robotics Engineering Roadmap & ROS Tutorial", query: "robotics engineer roadmap ros tutorial", embedId: "0bPe_M6uV8I" }
    ],
    courses: [
      { name: "Modern Robotics: Mechanics, Planning, and Control", platform: "Coursera", url: "https://www.coursera.org/specializations/modernrobotics", provider: "Northwestern University", freeOption: true },
      { name: "MIT OpenCourseWare: Introduction to Robotics", platform: "MIT OCW", url: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/", provider: "MIT", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Robotics & Autonomous Systems", url: "https://en.wikipedia.org/wiki/Robotics", type: "Encyclopedia", desc: "Interdisciplinary branch of engineering and computer science involving mechanical design and AI." },
      { title: "ROS.org (Robot Operating System)", url: "https://www.ros.org/", type: "Official Portal", desc: "The open source software framework powering robotics research and commercial autonomy." }
    ],
    weights: { technology: 9, building: 10, logic: 9, Ai: 7, creativity: 5 }
  },

  // --- DESIGN & CREATIVE ---
  {
    id: "ui_ux_product_designer",
    name: "UI/UX & Digital Product Designer",
    category: "Design & Creative",
    icon: "Palette",
    tagline: "Bridge human psychology and elegant digital experiences through design",
    description: "Crafts intuitive user experiences, design systems, wireframes, and interactive prototypes that make complex software simple, accessible, and delightful to use.",
    averageSalaryInr: "₹8 - ₹26 LPA",
    averageSalaryUsd: "$80,000 - $160,000",
    growthRate: "20% (High Demand)",
    topEmployers: ["Apple", "Airbnb", "CRED", "Uber", "Razorpay", "Adobe", "Swiggy"],
    skills: ["Figma Mastery", "Design Systems", "User Research", "Wireframing", "Interaction Design", "Usability Testing", "Design Tokens"],
    roadmap: [
      { phase: "Phase 1: Design Principles", duration: "2 Months", topics: ["Visual Hierarchy & Gestalt Psychology", "Color Theory & Contrast Accessibility (WCAG)", "Typography Scales", "Layout Grids"] },
      { phase: "Phase 2: Figma & Prototyping", duration: "3 Months", topics: ["Figma Auto-Layout & Variants", "Creating Scalable Design Systems", "Interactive Prototyping", "Micro-interactions"] },
      { phase: "Phase 3: UX Research & Product", duration: "3 Months", topics: ["User Interview Methodologies", "Empathy & Journey Mapping", "Information Architecture", "Usability Audits"] },
      { phase: "Phase 4: Portfolio & Case Studies", duration: "Ongoing", topics: ["Publishing 3 Deep Case Studies", "Design System Documentation", "Showcase on Behance & Dribbble"] }
    ],
    youtubeSearchQuery: "ui ux design roadmap figma full course tutorial for beginners",
    featuredVideos: [
      { title: "Complete Figma UI/UX Masterclass", query: "figma ui ux full course tutorial", embedId: "c9Wg6Cb_YlU" }
    ],
    courses: [
      { name: "Google UX Design Professional Certificate", platform: "Coursera", url: "https://www.coursera.org/professional-certificates/google-ux-design", provider: "Google", freeOption: false },
      { name: "Interaction Design Foundation Courses", platform: "IxDF", url: "https://www.interaction-design.org/", provider: "IxDF", freeOption: false },
      { name: "Free Figma UI Crash Course", platform: "freeCodeCamp", url: "https://www.freecodecamp.org/news/tag/ui-ux/", provider: "freeCodeCamp", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: User Experience Design (UX)", url: "https://en.wikipedia.org/wiki/User_experience_design", type: "Encyclopedia", desc: "The process of supporting user behavior through usability, usefulness, and desirability." },
      { title: "Nielsen Norman Group (NN/g)", url: "https://www.nngroup.com/articles/", type: "UX Research Authority", desc: "World leaders in research-based user experience guidelines and heuristics." },
      { title: "Laws of UX", url: "https://lawsofux.com/", type: "Reference Guide", desc: "Collection of best practices and psychological principles shaping design decisions." }
    ],
    weights: { creativity: 10, technology: 8, communication: 7, helping: 6, logic: 5 }
  },
  {
    id: "content_creator_media_lead",
    name: "Digital Content Creator & Media Strategist",
    category: "Design & Creative",
    icon: "Video",
    tagline: "Build engaged digital audiences, brand narratives, and multimedia production",
    description: "Produces captivating video, audio, and written stories across digital platforms, monetizing audience engagement through creator economy channels, sponsorships, and viral media campaigns.",
    averageSalaryInr: "₹6 - ₹32 LPA (High Scalability / Royalties)",
    averageSalaryUsd: "$60,000 - $180,000",
    growthRate: "22% (Creator Economy Boom)",
    topEmployers: ["YouTube Creator Studios", "Netflix India", "Red Bull Media", "Self-Employed Brands", "Swiggy Brand Studio"],
    skills: ["Video Editing (Premiere / DaVinci)", "Storytelling & Scriptwriting", "Audience Retention Optimization", "Thumbnail Design", "Short-Form Video Strategy", "Brand Sponsorship Negotiation"],
    roadmap: [
      { phase: "Phase 1: Production Basics", duration: "2 Months", topics: ["Camera Framing & Studio Lighting", "Microphone Acoustics & Audio Mixing", "DaVinci Resolve / Premiere Pro Editing"] },
      { phase: "Phase 2: Storytelling & Hooks", duration: "3 Months", topics: ["Script Structure (Hook, Story, Value)", "Pacing & Retention Curve Analysis", "Thumbnail Psychology"] },
      { phase: "Phase 3: Multi-Platform Distribution", duration: "4 Months", topics: ["Repurposing Long Form to Shorts/Reels", "Community Discord Building", "SEO & Algorithm Optimization"] },
      { phase: "Phase 4: Media Business Scale", duration: "Ongoing", topics: ["Brand Deal Contracts & Pricing", "Digital Product Sales", "Hiring Editors & Production Team"] }
    ],
    youtubeSearchQuery: "content creation storytelling video editing youtube growth roadmap",
    featuredVideos: [
      { title: "YouTube Video Production & Storytelling", query: "youtube video editing storytelling course", embedId: "wXhhV240wgw" }
    ],
    courses: [
      { name: "Viral Video & Scriptwriting Masterclass", platform: "Coursera / Skillshare", url: "https://www.skillshare.com/", provider: "Top Creators", freeOption: false },
      { name: "YouTube Creator Academy Official", platform: "YouTube Creators", url: "https://www.youtube.com/creators/", provider: "YouTube Official", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Creator Economy", url: "https://en.wikipedia.org/wiki/Creator_economy", type: "Encyclopedia", desc: "The software-facilitated economy that enables creators to earn from content and community." }
    ],
    weights: { content: 10, creativity: 10, communication: 9, technology: 6, leadership: 7 }
  },

  // --- AVIATION & AEROSPACE ---
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
    featuredVideos: [
      { title: "Commercial Pilot Guide in India (DGCA Step by Step)", query: "how to become a pilot in india dgca", embedId: "Zf5rG6y1k8Y" }
    ],
    courses: [
      { name: "DGCA Ground School Syllabus & Study Modules", platform: "DGCA India", url: "https://dgca.gov.in", provider: "Directorate General of Civil Aviation", freeOption: true },
      { name: "Aviation 101 Ground Course", platform: "Embry-Riddle / edX", url: "https://www.edx.org/learn/aviation", provider: "Embry-Riddle Aeronautical Univ.", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Commercial Pilot License (CPL)", url: "https://en.wikipedia.org/wiki/Commercial_pilot_license", type: "Encyclopedia", desc: "A qualification permitting the holder to act as pilot of an aircraft and be remunerated." },
      { title: "DGCA Official Portal (India)", url: "https://dgca.gov.in/", type: "Official Regulatory Body", desc: "Direct regulations, licensing exam forms, flight training organizations (FTO) list." },
      { title: "ICAO (International Civil Aviation Organization)", url: "https://www.icao.int/", type: "Global Aviation Agency", desc: "UN agency adopting international standards for civil aeronautics and flight safety." }
    ],
    weights: { Avation: 10, logic: 8, technology: 8, travel: 9, leadership: 8, sports: 6 }
  },
  {
    id: "drone_pilot_engineer",
    name: "Drone & Autonomous UAV Systems Engineer",
    category: "Aviation & Aerospace",
    icon: "Rocket",
    tagline: "Operate and engineer autonomous aerial surveying, defense, and cargo UAVs",
    description: "Pilots commercial remote drones, programs autonomous waypoint mission controllers, and conducts aerial GIS mapping, agricultural spraying, and surveillance.",
    averageSalaryInr: "₹6 - ₹20 LPA",
    averageSalaryUsd: "$70,000 - $140,000",
    growthRate: "35% (Rapid Drone Market Expansion)",
    topEmployers: ["IdeaForge", "Garuda Aerospace", "Adani Defence", "Survey of India", "Skye Air"],
    skills: ["DGCA Remote Pilot Certificate", "Pixhawk / ArduPilot", "Aerial Photogrammetry", "GIS & LiDAR Mapping", "Telemetry", "Drone Maintenance"],
    roadmap: [
      { phase: "Phase 1: Ground Theory & Simulators", duration: "1-2 Months", topics: ["DGCA Drone Rules 2021", "Airspace Maps (Red, Yellow, Green Zones)", "Simulator Flight Drills"] },
      { phase: "Phase 2: DGCA RPC Certification", duration: "1 Month", topics: ["Certified RPTO Flight Training", "Solo Drone Maneuvers", "Emergency Fail-Safe Testing"] },
      { phase: "Phase 3: Payload & Mapping Skills", duration: "3 Months", topics: ["Pix4D / DroneDeploy Photogrammetry", "Multispectral & Thermal Sensor Operations", "GIS Orthomosaics"] },
      { phase: "Phase 4: Commercial Operations", duration: "Ongoing", topics: ["Kisan Drone Agricultural Missions", "Infrastructure Inspection Contracts", "UAV Fleet Management"] }
    ],
    youtubeSearchQuery: "drone pilot certification dgca remote pilot course roadmap india",
    featuredVideos: [
      { title: "Drone Pilot License & Career in India", query: "drone pilot license career india dgca", embedId: "4yDEqW8yR9M" }
    ],
    courses: [
      { name: "Digital Sky Drone Certification Guidelines", platform: "DigitalSky Govt", url: "https://digitalsky.dgca.gov.in/", provider: "Ministry of Civil Aviation", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Unmanned Aerial Vehicle (UAV)", url: "https://en.wikipedia.org/wiki/Unmanned_aerial_vehicle", type: "Encyclopedia", desc: "Aircraft without an onboard human pilot, operated remotely or autonomously." },
      { title: "DigitalSky Portal (Govt of India)", url: "https://digitalsky.dgca.gov.in/", type: "Official Drone Registry", desc: "Official regulatory platform for pilot registration, airspace maps, and flight permissions." }
    ],
    weights: { Avation: 10, technology: 9, building: 8, travel: 8, logic: 7 }
  },

  // --- GOVERNMENT, DEFENSE & CIVIL SERVICES ---
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
    featuredVideos: [
      { title: "UPSC CSE Complete Strategy & Syllabus", query: "upsc civil services strategy syllabus roadmap", embedId: "0w5GqH_7Z8c" }
    ],
    courses: [
      { name: "UPSC CSE Official Syllabus & Question Papers", platform: "UPSC Official", url: "https://upsc.gov.in/", provider: "Union Public Service Commission", freeOption: true },
      { name: "ClearIAS Study Guidance Portal", platform: "ClearIAS", url: "https://www.clearias.com", provider: "ClearIAS", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Indian Administrative Service", url: "https://en.wikipedia.org/wiki/Indian_Administrative_Service", type: "Encyclopedia", desc: "The administrative arm of the All India Services of the Government of India." },
      { title: "UPSC Official Examination Portal", url: "https://upsc.gov.in/", type: "Official Sovereign Portal", desc: "Official exam notifications, calendar, answer keys, and previous question papers." }
    ],
    weights: { government: 10, administration: 10, leadership: 9, helping: 9, communication: 8, logic: 7 }
  },
  {
    id: "defence_nda_officer",
    name: "Indian Armed Forces Officer (NDA / CDS)",
    category: "Government & Public Policy",
    icon: "Shield",
    tagline: "Command troops and defend sovereign borders in the Army, Navy, or Air Force",
    description: "Leads military units into tactical operations, manages strategic national defense assets, and upholds supreme national integrity across land, maritime, and aerospace frontiers.",
    averageSalaryInr: "₹10 - ₹28 LPA (Lt. to General + Defense Perks)",
    averageSalaryUsd: "Commissioned Military Rank",
    growthRate: "Commissioned Defense Service",
    topEmployers: ["Indian Army", "Indian Navy", "Indian Air Force", "Coast Guard"],
    skills: ["Military Tactics", "SSB Officer Like Qualities (OLQ)", "Physical Endurance", "Weaponry & Navigation", "Crisis Decision Making"],
    roadmap: [
      { phase: "Phase 1: Written Exam (NDA / CDS)", duration: "6 Months", topics: ["Mathematics (11th & 12th Level)", "General Ability Test (English & GK)", "Mock Tests"] },
      { phase: "Phase 2: Services Selection Board (SSB)", duration: "5 Days Process", topics: ["Screening (OIR & PPDT)", "Psychology Tests (TAT, WAT, SRT, SD)", "GTO Ground Tasks & Personal Interview"] },
      { phase: "Phase 3: Academy Training (NDA/IMA/AFA/INA)", duration: "3-4 Years", topics: ["Physical Fitness & Drill", "Military Strategy & Weapons Training", "Leadership Development"] },
      { phase: "Phase 4: Commissioned Officer Induction", duration: "Commissioning", topics: ["Lieutenant / Flying Officer / Sub-Lieutenant Induction in Field Units"] }
    ],
    youtubeSearchQuery: "nda ssb interview preparation strategy armed forces officer guide",
    featuredVideos: [
      { title: "How to Clear NDA & SSB Interview", query: "nda written and ssb interview guide", embedId: "m6Eslc_m_wA" }
    ],
    courses: [
      { name: "Join Indian Army Official Portal", platform: "Indian Army", url: "https://joinindianarmy.nic.in/", provider: "Ministry of Defence", freeOption: true },
      { name: "Join Indian Air Force Carrier Guidance", platform: "IAF CDAC", url: "https://afcat.cdac.in/", provider: "Indian Air Force", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: National Defence Academy (India)", url: "https://en.wikipedia.org/wiki/National_Defence_Academy_(India)", type: "Encyclopedia", desc: "The joint services academy where cadets of the Army, Navy, and Air Force train together." },
      { title: "Join Indian Army Sovereign Portal", url: "https://joinindianarmy.nic.in/", type: "Official Defense Portal", desc: "Direct entries, SSB centers, cutoff marks, and notification schedules." }
    ],
    weights: { government: 10, leadership: 10, sports: 9, administration: 8, Avation: 6, logic: 7 }
  },

  // --- LAW & CIVIL SERVICES ---
  {
    id: "corporate_lawyer",
    name: "Corporate Lawyer & M&A Legal Strategist",
    category: "Civil Services & Law",
    icon: "Briefcase",
    tagline: "Navigate multi-million dollar mergers, startup fundraising, and corporate governance",
    description: "Advises multinational corporations and venture capital funds on mergers, cross-border corporate contracts, IPO regulatory compliance, and high-stakes business negotiations.",
    averageSalaryInr: "₹12 - ₹36 LPA",
    averageSalaryUsd: "$130,000 - $250,000",
    growthRate: "12% (Steady High Demand)",
    topEmployers: ["Shardul Amarchand Mangaldas", "Cyril Amarchand", "AZB & Partners", "Khaitan & Co", "Trilegal"],
    skills: ["Corporate Governance", "Mergers & Acquisitions (M&A)", "Contract Drafting", "Intellectual Property Law", "Negotiation", "Due Diligence"],
    roadmap: [
      { phase: "Phase 1: CLAT & Law School", duration: "5 Years (BA LLB)", topics: ["Constitutional Law", "Contracts & Commercial Laws", "Company Law", "Moot Court Competitions"] },
      { phase: "Phase 2: Law Firm Internships", duration: "Throughout Degree", topics: ["Due Diligence Reports", "Contract Redlining", "SEBI & MCA Regulatory Filings"] },
      { phase: "Phase 3: Bar Council (AIBE) & Associate", duration: "1-3 Years", topics: ["Clearing All India Bar Examination", "Joining Tier-1 Corporate Practice", "Handling M&A Closings"] },
      { phase: "Phase 4: Senior Associate to Partner", duration: "Ongoing", topics: ["Deal Origination", "Corporate Board Advisory", "Cross-Border Arbitration"] }
    ],
    youtubeSearchQuery: "corporate lawyer career roadmap clat national law school india",
    featuredVideos: [
      { title: "Corporate Law Career Guide & Day in the Life", query: "corporate law career guide salary", embedId: "8lJ_o5k_pXo" }
    ],
    courses: [
      { name: "American Law & Corporate Contracts", platform: "Coursera", url: "https://www.coursera.org/learn/american-law", provider: "University of Pennsylvania", freeOption: true },
      { name: "CLAT Examination Preparation Guidance", platform: "Consortium of NLUs", url: "https://consortiumofnlus.ac.in/", provider: "Consortium of NLUs", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Corporate Law", url: "https://en.wikipedia.org/wiki/Corporate_law", type: "Encyclopedia", desc: "The body of law governing the rights, relations, and conduct of persons, companies, organizations, and businesses." },
      { title: "Bar Council of India Official Portal", url: "http://www.barcouncilofindia.org/", type: "Official Regulatory Body", desc: "Statutory body governing legal practice, legal education, and professional ethics in India." }
    ],
    weights: { administration: 10, communication: 10, logic: 9, leadership: 8, finance: 7 }
  },

  // --- HEALTHCARE & LIFE SCIENCES ---
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
    featuredVideos: [
      { title: "Journey to Becoming a Doctor (MBBS to MD)", query: "mbbs doctor journey preparation", embedId: "0kQkG5h0784" }
    ],
    courses: [
      { name: "Anatomy & Physiology Fundamentals", platform: "Coursera / edX", url: "https://www.coursera.org/learn/anatomy", provider: "University of Michigan", freeOption: true },
      { name: "Stanford Medicine Clinical Online Courses", platform: "Stanford Online", url: "https://online.stanford.edu/programs/health-medicine", provider: "Stanford Medicine", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Bachelor of Medicine, Bachelor of Surgery", url: "https://en.wikipedia.org/wiki/Bachelor_of_Medicine,_Bachelor_of_Surgery", type: "Encyclopedia", desc: "The primary medical degrees awarded by institutions in India, UK, and other countries." },
      { title: "National Medical Commission (NMC)", url: "https://www.nmc.org.in/", type: "Official Regulatory Body", desc: "Statutory body governing medical education, medical professionals, and clinical practice standards." },
      { title: "World Health Organization (WHO)", url: "https://www.who.int/", type: "Global Health Agency", desc: "Specialized agency of the United Nations responsible for international public health." }
    ],
    weights: { medical: 10, helping: 10, logic: 8, nature: 6, leadership: 7 }
  },
  {
    id: "sports_physiotherapist",
    name: "Sports Physiotherapist & Athletic Performance Lead",
    category: "Healthcare & Life Sciences",
    icon: "Activity",
    tagline: "Rehabilitate athletes and optimize peak physiological athletic performance",
    description: "Works with professional athletes and sports teams to prevent injuries, diagnose biomechanical flaws, rehabilitate sports trauma, and design conditioning regimens.",
    averageSalaryInr: "₹7 - ₹24 LPA",
    averageSalaryUsd: "$75,000 - $140,000",
    growthRate: "18% (Expanding Sports & League Ecosystems)",
    topEmployers: ["BCCI / Indian Cricket Team", "IPL Franchises", "Olympic Training Centers", "ISL Football Clubs"],
    skills: ["Biomechanical Gait Analysis", "Sports Injury Rehabilitation", "Manual Therapy", "Strength & Conditioning (CSCS)", "Athlete Taping", "Exercise Physiology"],
    roadmap: [
      { phase: "Phase 1: Bachelor of Physiotherapy (BPT)", duration: "4.5 Years", topics: ["Human Anatomy & Kinesiology", "Exercise Physiology & Biomechanics", "Clinical Orthopedic Assessment"] },
      { phase: "Phase 2: Master of Physiotherapy (MPT - Sports)", duration: "2 Years", topics: ["Sports Trauma Management", "Tendon & Ligament Protocols", "Advanced Mobilization"] },
      { phase: "Phase 3: Certifications & Field Drills", duration: "1 Year", topics: ["NSCA CSCS Conditioning", "Pitch-side Emergency First Aid", "Working with State Teams"] },
      { phase: "Phase 4: Head Team Physiotherapist", duration: "Ongoing", topics: ["Managing National Squads", "Load Monitoring & Injury Prevention"] }
    ],
    youtubeSearchQuery: "sports physiotherapy career roadmap bpt mpt sports athletic trainer",
    featuredVideos: [
      { title: "Sports Physiotherapy Career Roadmap & Day in Life", query: "sports physiotherapist career roadmap", embedId: "2Tz8g_1M578" }
    ],
    courses: [
      { name: "Sports Medicine and Injury Prevention", platform: "Coursera", url: "https://www.coursera.org/learn/sports-medicine", provider: "University of Florida", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Physical Therapy & Sports Medicine", url: "https://en.wikipedia.org/wiki/Physical_therapy", type: "Encyclopedia", desc: "Care aimed at easing pain, improving mobility, and rehabilitating physical injuries." }
    ],
    weights: { sports: 10, medical: 9, helping: 9, building: 6, communication: 7 }
  },

  // --- FINANCE & BUSINESS ---
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
    featuredVideos: [
      { title: "Investment Banking Career Guide & Skills", query: "investment banking career guide roadmap", embedId: "F3QpgXBtDe8" }
    ],
    courses: [
      { name: "Financial Modeling and Valuation Specialization", platform: "Coursera", url: "https://www.coursera.org/specializations/financial-modeling-valuation", provider: "Wharton / PwC", freeOption: true },
      { name: "CFA Institute Official Curriculum", platform: "CFA Institute", url: "https://www.cfainstitute.org/", provider: "CFA Institute", freeOption: false }
    ],
    knowledge: [
      { title: "Wikipedia: Investment Banking", url: "https://en.wikipedia.org/wiki/Investment_banking", type: "Encyclopedia", desc: "Financial services company or corporate division assisting individuals and corporations in raising capital." },
      { title: "Investopedia (Finance Authority)", url: "https://www.investopedia.com/", type: "Financial Dictionary", desc: "The world's leading source of financial content on financial modeling, IPOs, and valuations." }
    ],
    weights: { finance: 10, logic: 9, leadership: 8, communication: 7, building: 5 }
  },
  {
    id: "chartered_accountant",
    name: "Chartered Accountant (CA) & Financial Auditor",
    category: "Finance & Business",
    icon: "FileSpreadsheet",
    tagline: "Master taxation laws, corporate financial auditing, and forensic accounting",
    description: "Audits corporate balance sheets, designs tax optimization strategies, and advises corporate leadership on financial regulations and fiscal compliance.",
    averageSalaryInr: "₹10 - ₹30 LPA",
    averageSalaryUsd: "$85,000 - $170,000",
    growthRate: "15% (Essential Corporate Trust)",
    topEmployers: ["Deloitte", "PwC", "EY", "KPMG", "Tata Sons", "Reliance Industries"],
    skills: ["Financial Auditing", "Direct & Indirect Taxation (GST)", "Corporate Law", "Cost Accounting", "Financial Reporting (IFRS)", "Forensic Accounting"],
    roadmap: [
      { phase: "Phase 1: CA Foundation", duration: "6 Months", topics: ["Principles of Accounting", "Business Laws", "Quantitative Aptitude", "Business Economics"] },
      { phase: "Phase 2: CA Intermediate", duration: "9 Months", topics: ["Advanced Accounting", "Corporate & Other Laws", "Taxation (Income Tax & GST)", "Cost & Management Accounting"] },
      { phase: "Phase 3: Articleship Practical Training", duration: "2 Years", topics: ["Statutory Auditing at CA Firm", "Tax Returns & ROC Filings", "Internal Controls Auditing"] },
      { phase: "Phase 4: CA Final & Qualification", duration: "1 Year", topics: ["Financial Reporting", "Strategic Financial Management", "Advanced Auditing & Ethics"] }
    ],
    youtubeSearchQuery: "how to become chartered accountant icai ca foundation inter final strategy",
    featuredVideos: [
      { title: "CA Course Details, Eligibility, & Preparation", query: "ca course details icai roadmap", embedId: "c_l70vX3_fI" }
    ],
    courses: [
      { name: "ICAI Official BoS Knowledge Portal", platform: "ICAI Official", url: "https://www.icai.org/", provider: "Institute of Chartered Accountants of India", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Institute of Chartered Accountants of India", url: "https://en.wikipedia.org/wiki/Institute_of_Chartered_Accountants_of_India", type: "Encyclopedia", desc: "Statutory body established by an Act of Parliament to regulate the profession of CA in India." },
      { title: "ICAI Official Portal", url: "https://www.icai.org/", type: "Official Statutory Body", desc: "Examination forms, syllabus, study materials, and practical training notifications." }
    ],
    weights: { finance: 10, logic: 9, administration: 9, building: 4, communication: 7 }
  },

  // --- ENGINEERING & GREEN TECH ---
  {
    id: "renewable_energy_engineer",
    name: "Renewable Energy & Sustainability Engineer",
    category: "Engineering & Green Tech",
    icon: "Leaf",
    tagline: "Design clean solar microgrids, wind farms, and battery energy storage (BESS)",
    description: "Designs utility-scale solar photovoltaic power plants, wind turbine energy systems, and battery storage architectures driving the global clean energy transition.",
    averageSalaryInr: "₹8 - ₹26 LPA",
    averageSalaryUsd: "$85,000 - $155,000",
    growthRate: "28% (Global Green Energy Push)",
    topEmployers: ["Tata Power Solar", "Adani Green Energy", "ReNew Power", "Tesla Energy", "Siemens Gamesa"],
    skills: ["Solar PV Design (PVsyst)", "Grid Integration", "Battery Storage (BESS)", "Carbon Auditing", "Energy Efficiency", "AutoCAD Electrical"],
    roadmap: [
      { phase: "Phase 1: Electrical & Environmental Basics", duration: "B.Tech Foundations", topics: ["Power Systems & Electromagnetics", "Renewable Energy Thermodynamics", "Environmental Impact Assessment"] },
      { phase: "Phase 2: Solar & Wind Simulation", duration: "4 Months", topics: ["PVsyst Simulation Software", "Wind Resource Assessment", "Inverter & Transformer Sizing"] },
      { phase: "Phase 3: Battery Storage & Grids", duration: "4 Months", topics: ["Lithium-Ion / BESS Technology", "Microgrid Controller Logic", "Grid Code Compliance"] },
      { phase: "Phase 4: Mega Project Execution", duration: "Ongoing", topics: ["Utility-Scale EPC Execution", "Green Hydrogen Systems", "Carbon Credit Trading"] }
    ],
    youtubeSearchQuery: "renewable energy engineer solar engineering roadmap tutorial",
    featuredVideos: [
      { title: "Renewable Energy Systems & Solar Engineering Overview", query: "renewable energy engineering course solar", embedId: "1kUE0BZtTRc" }
    ],
    courses: [
      { name: "Renewable Energy Technology Specialization", platform: "Coursera", url: "https://www.coursera.org/specializations/renewable-energy", provider: "University of Colorado Boulder", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Renewable Energy", url: "https://en.wikipedia.org/wiki/Renewable_energy", type: "Encyclopedia", desc: "Energy collected from renewable resources naturally replenished on a human timescale." },
      { title: "Ministry of New and Renewable Energy (MNRE India)", url: "https://mnre.gov.in/", type: "Official Ministry", desc: "Official policies, national green hydrogen mission, and solar park guidelines." }
    ],
    weights: { nature: 10, building: 9, technology: 8, logic: 8, helping: 7 }
  },
  {
    id: "ev_automotive_engineer",
    name: "Electric Vehicle (EV) Systems & Battery Architect",
    category: "Engineering & Green Tech",
    icon: "BatteryCharging",
    tagline: "Engineer high-voltage EV battery packs, motor controllers, and regenerative powertrains",
    description: "Designs electric vehicle powertrains, thermal management architectures for high-capacity battery packs, and embedded Battery Management Systems (BMS).",
    averageSalaryInr: "₹9 - ₹28 LPA",
    averageSalaryUsd: "$90,000 - $165,000",
    growthRate: "32% (EV Revolution)",
    topEmployers: ["Tesla", "Tata Motors EV", "Ola Electric", "Ather Energy", "Mahindra Electric", "Rivian"],
    skills: ["Battery Management Systems (BMS)", "Thermal Management", "CAN Bus Protocol", "Motor Inverters", "MATLAB / Simulink", "SolidWorks"],
    roadmap: [
      { phase: "Phase 1: Automotive & Power Electronics", duration: "B.Tech Foundations", topics: ["Electric Motors (PMSM, Induction)", "DC-DC Converters & Inverters", "Automotive Dynamics"] },
      { phase: "Phase 2: Battery Chemistry & BMS", duration: "4 Months", topics: ["Lithium-Ion Cell Chemistry", "State of Charge (SOC) Algorithms", "Cell Balancing Circuitry"] },
      { phase: "Phase 3: Embedded Control & CAN", duration: "4 Months", topics: ["CAN / LIN Automotive Bus", "Simulink Powertrain Modeling", "High Voltage Safety Protocols"] },
      { phase: "Phase 4: Vehicle Integration", duration: "Ongoing", topics: ["Fast Charging Standards (CCS2)", "Crash Safety & Thermal Runaway Mitigation", "Homologation"] }
    ],
    youtubeSearchQuery: "ev engineer electric vehicle battery management system bms tutorial course",
    featuredVideos: [
      { title: "How Electric Vehicles Work & EV Engineering", query: "electric vehicle powertrain engineering tutorial", embedId: "3SAxXUIre28" }
    ],
    courses: [
      { name: "Electric Vehicles and Mobility", platform: "Coursera / NPTEL", url: "https://www.coursera.org/learn/electric-vehicles-technology", provider: "IIT Madras / edX", freeOption: true }
    ],
    knowledge: [
      { title: "Wikipedia: Electric Vehicle", url: "https://en.wikipedia.org/wiki/Electric_vehicle", type: "Encyclopedia", desc: "A vehicle using one or more electric motors for propulsion." }
    ],
    weights: { technology: 9, building: 10, logic: 8, nature: 8, creativity: 6 }
  }
,
{
  "id": "biotech_genetic_engineer",
  "name": "Biotechnologist & CRISPR Genetic Engineer",
  "category": "Healthcare & Life Sciences",
  "icon": "Dna",
  "tagline": "Engineer gene therapies, mRNA vaccines, and synthetic biology breakthroughs",
  "description": "Applies molecular biology, computational genomics, and CRISPR gene-editing tools to develop therapeutics for rare diseases, engineered crops, and novel biomanufacturing solutions.",
  "averageSalaryInr": "₹9 - ₹28 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "22% (Biotech Revolution)",
  "topEmployers": [
    "Biocon",
    "Serum Institute of India",
    "Moderna",
    "Novartis",
    "AstraZeneca",
    "Genentech"
  ],
  "skills": [
    "CRISPR-Cas9 Protocols",
    "Bioinformatics & Python (Biopython)",
    "Cell Culture",
    "PCR & Next-Gen Sequencing",
    "Molecular Cloning",
    "FDA/CDSCO Regulations"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Molecular Foundations",
      "duration": "3-4 Years",
      "topics": [
        "B.Tech / B.Sc in Biotechnology / Biochemistry",
        "Organic Chemistry & Microbiology",
        "Genetics & Cell Biology"
      ]
    },
    {
      "phase": "Phase 2: Bioinformatics & Genomics",
      "duration": "1-2 Years",
      "topics": [
        "Next-Gen Sequencing (NGS) Analysis",
        "Python for Bioinformatics",
        "Structural Biology & BLAST"
      ]
    },
    {
      "phase": "Phase 3: Gene Editing & Wet Lab",
      "duration": "2 Years",
      "topics": [
        "CRISPR Design Tools",
        "Mammalian Cell Culture",
        "Therapeutic Protein Expression"
      ]
    },
    {
      "phase": "Phase 4: Clinical Translation & Ph.D.",
      "duration": "Ongoing",
      "topics": [
        "Clinical Trial Design",
        "GMP Biomanufacturing",
        "Synthetic Biology Systems"
      ]
    }
  ],
  "youtubeSearchQuery": "biotechnology genetic engineering crispr career roadmap guide",
  "featuredVideos": [
    {
      "title": "Biotechnology Career Roadmap & Future",
      "query": "biotechnology genetic engineering career",
      "embedId": "1O0A5T_Xj6c"
    }
  ],
  "courses": [
    {
      "name": "Genomic Data Science Specialization",
      "platform": "Coursera",
      "url": "https://www.coursera.org/specializations/genomic-data-science",
      "provider": "Johns Hopkins University",
      "freeOption": true
    },
    {
      "name": "Introduction to Bioengineering",
      "platform": "edX",
      "url": "https://www.edx.org/learn/bioengineering",
      "provider": "MIT / edX",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Genetic Engineering",
      "url": "https://en.wikipedia.org/wiki/Genetic_engineering",
      "type": "Encyclopedia",
      "desc": "Direct manipulation of an organism genes using biotechnology."
    },
    {
      "title": "Department of Biotechnology (Govt. of India)",
      "url": "https://dbtindia.gov.in/",
      "type": "Government Council",
      "desc": "Apex nodal agency promoting modern biotechnology research and commercialization."
    }
  ],
  "weights": {
    "medical": 9,
    "logic": 9,
    "nature": 8,
    "technology": 8,
    "building": 7
  }
},
{
  "id": "product_manager_tech",
  "name": "Product Manager (AI & Digital Platforms)",
  "category": "Technology & AI",
  "icon": "Briefcase",
  "tagline": "Define product vision, lead cross-functional squads, and drive user growth",
  "description": "Serves as the strategic intersection of engineering, design, and business. Owns feature roadmaps, conducts customer discovery, and scales metrics from 0 to 1 and beyond.",
  "averageSalaryInr": "₹15 - ₹45 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "25% (High Demand Leadership)",
  "topEmployers": [
    "Google",
    "Microsoft",
    "Flipkart",
    "Swiggy",
    "Razorpay",
    "Atlassian",
    "Uber"
  ],
  "skills": [
    "Product Discovery & User Interviews",
    "PRD Writing",
    "A/B Testing & Mixpanel",
    "Agile/Scrum Leadership",
    "Go-To-Market (GTM) Strategy",
    "SQL & Telemetry"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Foundations of Product",
      "duration": "2-3 Months",
      "topics": [
        "User Research & Jobs To Be Done (JTBD)",
        "Product Metrics (DAU, CAC, LTV, Retention)",
        "Writing Spec PRDs"
      ]
    },
    {
      "phase": "Phase 2: Tech & Data for PMs",
      "duration": "3 Months",
      "topics": [
        "SQL & Funnel Analytics",
        "API & Architecture Literacy",
        "Wireframing in Figma"
      ]
    },
    {
      "phase": "Phase 3: Execution & Strategy",
      "duration": "4 Months",
      "topics": [
        "Prioritization Frameworks (RICE, MoSCoW)",
        "A/B Experimentation Design",
        "Sprint Ceremonies"
      ]
    },
    {
      "phase": "Phase 4: Leadership & Portfolio",
      "duration": "Ongoing",
      "topics": [
        "Tear-downs of Popular Apps",
        "GTM Launches",
        "Executive Stakeholder Management"
      ]
    }
  ],
  "youtubeSearchQuery": "product manager roadmap beginner to senior pm interview guide",
  "featuredVideos": [
    {
      "title": "How to Become a Product Manager",
      "query": "product manager complete roadmap guide",
      "embedId": "m40L_eC7kQo"
    }
  ],
  "courses": [
    {
      "name": "Digital Product Management: Modern Fundamentals",
      "platform": "Coursera",
      "url": "https://www.coursera.org/learn/uva-darden-digital-product-management",
      "provider": "University of Virginia",
      "freeOption": true
    },
    {
      "name": "Product School Free Micro-Certifications",
      "platform": "ProductSchool",
      "url": "https://productschool.com/",
      "provider": "Product School",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Product Management",
      "url": "https://en.wikipedia.org/wiki/Product_management",
      "type": "Encyclopedia",
      "desc": "Organizational function that guides every step of a product life cycle."
    },
    {
      "title": "Lenny Newsletter & Podcast",
      "url": "https://www.lennysnewsletter.com/",
      "type": "Industry Benchmark",
      "desc": "The gold standard publication for product, growth, and company building."
    }
  ],
  "weights": {
    "leadership": 10,
    "communication": 9,
    "logic": 8,
    "technology": 7,
    "creativity": 7
  }
},
{
  "id": "digital_growth_marketer",
  "name": "Growth Marketer & Digital Performance Strategist",
  "category": "Finance & Business",
  "icon": "TrendingUp",
  "tagline": "Engineer viral acquisition loops, SEO authority, and high-ROI ad spend",
  "description": "Blends data analytics, psychological persuasion, and digital ad networks to optimize user acquisition, conversion funnels, and viral expansion across global channels.",
  "averageSalaryInr": "₹7 - ₹24 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "21% (Digital First Economy)",
  "topEmployers": [
    "Nykaa",
    "Meesho",
    "Zomato",
    "Publicis Groupe",
    "Ogilvy",
    "ByteDance"
  ],
  "skills": [
    "Google & Meta Ads Manager",
    "Technical SEO & Programmatic Pages",
    "CRO & Funnel Optimization",
    "Copywriting & Creative Strategy",
    "HubSpot & Klaviyo Marketing Automation"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Marketing Fundamentals",
      "duration": "2 Months",
      "topics": [
        "Brand Positioning & Personas",
        "Copywriting Psychology",
        "Content Distribution Channels"
      ]
    },
    {
      "phase": "Phase 2: Paid Ads & Performance",
      "duration": "3 Months",
      "topics": [
        "Meta Ads CBO / ASC",
        "Google Search & PMax Ads",
        "Attribution & ROAS Tracking"
      ]
    },
    {
      "phase": "Phase 3: SEO & Lifecycle",
      "duration": "3 Months",
      "topics": [
        "Technical SEO & Keyword Research",
        "Email Automation & Drip Campaigns",
        "Retention & Churn Reduction"
      ]
    },
    {
      "phase": "Phase 4: Scaling Growth Loops",
      "duration": "Ongoing",
      "topics": [
        "Referral Engine Design",
        "Product-Led Growth (PLG)",
        "Multi-Touch Attribution Modeling"
      ]
    }
  ],
  "youtubeSearchQuery": "performance marketing digital marketing full course complete roadmap",
  "featuredVideos": [
    {
      "title": "Digital Marketing Complete Course",
      "query": "performance marketing full course",
      "embedId": "nU-IIXBWlS4"
    }
  ],
  "courses": [
    {
      "name": "Google Digital Marketing & E-commerce Professional Certificate",
      "platform": "Coursera",
      "url": "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
      "provider": "Google",
      "freeOption": true
    },
    {
      "name": "HubSpot Inbound Marketing Certification",
      "platform": "HubSpot Academy",
      "url": "https://academy.hubspot.com/courses/inbound-marketing",
      "provider": "HubSpot",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Digital Marketing",
      "url": "https://en.wikipedia.org/wiki/Digital_marketing",
      "type": "Encyclopedia",
      "desc": "Component of marketing that uses internet and online-based digital technologies."
    },
    {
      "title": "Google Search Central Documentation",
      "url": "https://developers.google.com/search",
      "type": "Official Guidelines",
      "desc": "Google official search engine ranking and discovery standards."
    }
  ],
  "weights": {
    "communication": 9,
    "creativity": 8,
    "logic": 8,
    "leadership": 7,
    "finance": 7
  }
},
{
  "id": "film_director_cinematographer",
  "name": "Film Director & Visual Storyteller (Cinematographer)",
  "category": "Design & Creative",
  "icon": "Video",
  "tagline": "Direct cinematic visions, visual pacing, lighting, and evocative camera movements",
  "description": "Shapes narrative fiction, documentaries, and commercials by orchestrating camera angles, lighting aesthetics, actor performances, and post-production color science.",
  "averageSalaryInr": "₹8 - ₹35 LPA (Royalties/Project Dependent)",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "18% (OTT & Global Streaming Surge)",
  "topEmployers": [
    "Netflix Originals",
    "Amazon Studios",
    "Dharma Productions",
    "Yash Raj Films",
    "Red Chillies VFX",
    "A24"
  ],
  "skills": [
    "Screenplay Analysis & Storyboarding",
    "Camera Optics & Lens Selection",
    "Three-Point & Practical Lighting",
    "Directing Actors",
    "DaVinci Resolve Color Grading",
    "Audio Pacing"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Visual Language",
      "duration": "3 Months",
      "topics": [
        "Framing, Rule of Thirds & Depth",
        "Lenses (Focal Length & Compression)",
        "Screenwriting Fundamentals"
      ]
    },
    {
      "phase": "Phase 2: Camera & Lighting",
      "duration": "4 Months",
      "topics": [
        "Cinema Cameras (RED, ARRI, Blackmagic)",
        "Lighting Rigs & Diffusers",
        "Gimbal & Dolly Movement"
      ]
    },
    {
      "phase": "Phase 3: Post-Production",
      "duration": "4 Months",
      "topics": [
        "DaVinci Resolve Node Grading",
        "Sound Design & Foley",
        "Editorial Rhythms in Premiere/FCP"
      ]
    },
    {
      "phase": "Phase 4: Directing & Pitching",
      "duration": "Ongoing",
      "topics": [
        "Directing Short Films & Festivals",
        "Pitch Decks for Producers",
        "OTT Distribution Deals"
      ]
    }
  ],
  "youtubeSearchQuery": "cinematography film directing masterclass camera lighting tutorial",
  "featuredVideos": [
    {
      "title": "Cinematography & Directing Masterclass",
      "query": "cinematography visual storytelling course",
      "embedId": "p3EaY53_9g8"
    }
  ],
  "courses": [
    {
      "name": "Filmmaking & Storytelling Specialization",
      "platform": "Coursera / MasterClass",
      "url": "https://www.coursera.org/learn/film-images",
      "provider": "Wesleyan University",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Filmmaking & Cinematography",
      "url": "https://en.wikipedia.org/wiki/Cinematography",
      "type": "Encyclopedia",
      "desc": "The art or science of motion-picture photography and visual narrative direction."
    },
    {
      "title": "American Society of Cinematographers (ASC)",
      "url": "https://theasc.com/",
      "type": "Guild Standard",
      "desc": "The historic professional guild advancing the art and craft of motion picture imaging."
    }
  ],
  "weights": {
    "creativity": 10,
    "communication": 9,
    "leadership": 8,
    "building": 7,
    "technology": 6
  }
},
{
  "id": "sustainable_architect",
  "name": "Sustainable Architect & Urban Infrastructure Planner",
  "category": "Design & Creative",
  "icon": "Building2",
  "tagline": "Design carbon-neutral buildings, iconic skylines, and green resilient cities",
  "description": "Designs residential, commercial, and urban spaces that balance aesthetic grandeur, structural integrity, and net-zero ecological footprints using modern BIM software.",
  "averageSalaryInr": "₹7 - ₹25 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "15% (Smart Cities & Climate Resilience)",
  "topEmployers": [
    "Foster + Partners",
    "Gensler",
    "Hafeez Contractor Architects",
    "L&T Construction",
    "HOK",
    "CPWD"
  ],
  "skills": [
    "Revit & BIM Modeling",
    "AutoCAD & Rhino 3D",
    "LEED / GRIHA Green Building Certification",
    "Structural Feasibility",
    "Passive Solar Design",
    "Urban Zoning Laws"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: B.Arch Degree",
      "duration": "5 Years",
      "topics": [
        "NATA Examination & Council of Architecture (CoA)",
        "Architectural History & Theory",
        "Structural Mechanics"
      ]
    },
    {
      "phase": "Phase 2: Digital Drafting & BIM",
      "duration": "1 Year",
      "topics": [
        "Autodesk Revit & BIM Execution Plans",
        "Parametric Design in Rhino / Grasshopper",
        "Enscape & V-Ray Rendering"
      ]
    },
    {
      "phase": "Phase 3: Green Certification",
      "duration": "6 Months",
      "topics": [
        "LEED Green Associate",
        "GRIHA India Standards",
        "Thermal Modeling & Daylight Analysis"
      ]
    },
    {
      "phase": "Phase 4: Site Execution & Studio",
      "duration": "Ongoing",
      "topics": [
        "Contractor Management",
        "Building Bylaws & Fire Safety Approval",
        "Founding Architectural Firm"
      ]
    }
  ],
  "youtubeSearchQuery": "architecture design urban planning revit bim sustainable building guide",
  "featuredVideos": [
    {
      "title": "Architect Career Guide & Sustainable Building",
      "query": "architecture career guide bim sustainable design",
      "embedId": "qB26U78VdE4"
    }
  ],
  "courses": [
    {
      "name": "Sustainable Architecture & Cities",
      "platform": "Coursera / edX",
      "url": "https://www.coursera.org/learn/sustainable-cities",
      "provider": "Lund University",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Sustainable Architecture",
      "url": "https://en.wikipedia.org/wiki/Sustainable_architecture",
      "type": "Encyclopedia",
      "desc": "Architecture that seeks to minimize the negative environmental impact of buildings."
    },
    {
      "title": "Council of Architecture India (CoA)",
      "url": "https://www.coa.gov.in/",
      "type": "Regulatory Council",
      "desc": "Statutory body established by the Government of India under the Architects Act."
    }
  ],
  "weights": {
    "building": 10,
    "creativity": 9,
    "nature": 8,
    "logic": 8,
    "technology": 7
  }
},
{
  "id": "fashion_designer_apparel",
  "name": "Fashion Designer & Haute Couture Stylist",
  "category": "Design & Creative",
  "icon": "Scissors",
  "tagline": "Create trendsetting apparel, textile drape collections, and runway aesthetics",
  "description": "Conceptualizes seasonal garment lines, selects fabrics, directs pattern making, and showcases collections for luxury fashion houses and contemporary retail brands.",
  "averageSalaryInr": "₹6 - ₹22 LPA (High Independent Upside)",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "16% (Global Fashion & E-Commerce Growth)",
  "topEmployers": [
    "Sabyasachi Mukherjee Studio",
    "Manish Malhotra",
    "Zara / Inditex",
    "Aditya Birla Fashion",
    "H&M Group"
  ],
  "skills": [
    "Fashion Illustration & CLO 3D",
    "Textile Science & Fiber Properties",
    "Pattern Making & Draping",
    "Color Forecasting",
    "Garment Construction",
    "Sustainable Fashion Upcycling"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: NIFT / Design School",
      "duration": "3-4 Years",
      "topics": [
        "NIFT Entrance Exam",
        "Elements of Design & Garment Construction",
        "Textile Testing & Weaving"
      ]
    },
    {
      "phase": "Phase 2: Digital Fashion & 3D",
      "duration": "1 Year",
      "topics": [
        "CLO 3D Virtual Fitting",
        "Adobe Illustrator for Technical Flats",
        "Trend Forecasting with WGSN"
      ]
    },
    {
      "phase": "Phase 3: Apprenticeship & Studio",
      "duration": "2 Years",
      "topics": [
        "Working under Head Designers",
        "Vendor Sourcing in Fabric Hubs (Surat, Milan)",
        "Runway Production"
      ]
    },
    {
      "phase": "Phase 4: Label Launch",
      "duration": "Ongoing",
      "topics": [
        "Lookbook Photography",
        "B2B Retail Buyers Pitching",
        "E-commerce Brand Launch"
      ]
    }
  ],
  "youtubeSearchQuery": "fashion design career roadmap pattern making clo 3d sketching tutorial",
  "featuredVideos": [
    {
      "title": "Fashion Design Roadmap & Career Essentials",
      "query": "fashion design roadmap nift tutorial",
      "embedId": "L8E_6GjYFqg"
    }
  ],
  "courses": [
    {
      "name": "Fashion Design: From Concept to Runway",
      "platform": "Coursera",
      "url": "https://www.coursera.org/specializations/fashion-design",
      "provider": "Politecnico di Milano",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Fashion Design",
      "url": "https://en.wikipedia.org/wiki/Fashion_design",
      "type": "Encyclopedia",
      "desc": "The art of applying design, aesthetics, and natural beauty to clothing and its accessories."
    },
    {
      "title": "National Institute of Fashion Technology (NIFT)",
      "url": "https://www.nift.ac.in/",
      "type": "Apex Fashion Institute",
      "desc": "India premier institute in fashion education and textile research."
    }
  ],
  "weights": {
    "creativity": 10,
    "communication": 8,
    "building": 7,
    "leadership": 6,
    "nature": 5
  }
},
{
  "id": "marine_biologist_oceanographer",
  "name": "Marine Biologist & Oceanographic Scientist",
  "category": "Healthcare & Life Sciences",
  "icon": "Waves",
  "tagline": "Explore abyssal marine ecosystems, coral restoration, and ocean climate health",
  "description": "Investigates marine organisms, pelagic food webs, coral reef restoration, and deep-sea benthic environments aboard scientific expedition vessels and marine research stations.",
  "averageSalaryInr": "₹6 - ₹20 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "14% (Ocean Climate & Conservation Grants)",
  "topEmployers": [
    "National Institute of Oceanography (NIO)",
    "NOAA",
    "Woods Hole Oceanographic Institution",
    "WWF Marine",
    "Scripps Oceanography"
  ],
  "skills": [
    "SCUBA Scientific Diving",
    "Marine Taxonomy & Ecology",
    "GIS Ocean Mapping",
    "Water Chemistry & Salinity Profiling",
    "Hydroacoustic Sonar Data",
    "R for Ecological Statistics"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: B.Sc Marine Biology / Zoology",
      "duration": "3 Years",
      "topics": [
        "Ichthyology & Invertebrate Zoology",
        "Marine Chemistry & Physical Oceanography",
        "Limnology"
      ]
    },
    {
      "phase": "Phase 2: SCUBA & Field Skills",
      "duration": "1 Year",
      "topics": [
        "PADI Rescue & Scientific Diver Certification",
        "Transect Coral Sampling",
        "Plankton Net Trawls"
      ]
    },
    {
      "phase": "Phase 3: M.Sc & Expedition Research",
      "duration": "2 Years",
      "topics": [
        "Oceanographic Cruises",
        "Spatial GIS Mapping with QGIS",
        "Remote Sensing of Chlorophyll"
      ]
    },
    {
      "phase": "Phase 4: Ph.D. & Conservation Policy",
      "duration": "Ongoing",
      "topics": [
        "Marine Protected Areas (MPA) Policy",
        "Abyssal Exploration",
        "Coral Restoration Projects"
      ]
    }
  ],
  "youtubeSearchQuery": "marine biology career roadmap oceanography deep sea expedition guide",
  "featuredVideos": [
    {
      "title": "How to Become a Marine Biologist",
      "query": "marine biologist career roadmap guide",
      "embedId": "xO2tY5j9KzA"
    }
  ],
  "courses": [
    {
      "name": "Oceanography: A Key to Better Understand Our World",
      "platform": "Coursera",
      "url": "https://www.coursera.org/learn/oceanography",
      "provider": "University of Barcelona",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Marine Biology",
      "url": "https://en.wikipedia.org/wiki/Marine_biology",
      "type": "Encyclopedia",
      "desc": "The scientific study of marine life, organisms in the sea."
    },
    {
      "title": "CSIR National Institute of Oceanography",
      "url": "https://www.nio.res.in/",
      "type": "Government Research Body",
      "desc": "India premier oceanographic research institute under CSIR."
    }
  ],
  "weights": {
    "nature": 10,
    "medical": 8,
    "logic": 8,
    "technology": 6,
    "creativity": 5
  }
},
{
  "id": "wildlife_forest_conservationist",
  "name": "Wildlife Biologist & Indian Forest Service Officer (IFS)",
  "category": "Government & Public Service",
  "icon": "Trees",
  "tagline": "Protect megafauna biodiversity, manage national parks, and combat wildlife poaching",
  "description": "Guards primary forests, tracks endangered tigers and elephants, leads anti-poaching squads, and conducts community forest restoration across national parks and biosphere reserves.",
  "averageSalaryInr": "₹8 - ₹24 LPA + Gazetted Quarters & Security",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "12% (Prestigious Gazetted Service)",
  "topEmployers": [
    "Indian Forest Service (UPSC IFS)",
    "Wildlife Institute of India (WII)",
    "WWF India",
    "National Tiger Conservation Authority (NTCA)"
  ],
  "skills": [
    "Forest Ecology & Silviculture",
    "Wildlife Radio-Telemetry & Camera Traps",
    "Wildlife Protection Act (1972)",
    "Anti-Poaching Patrol Leadership",
    "Fire Line Management"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Graduation in Sciences",
      "duration": "3-4 Years",
      "topics": [
        "Forestry / Zoology / Botany / Agriculture / Engineering",
        "Environmental Science Basics"
      ]
    },
    {
      "phase": "Phase 2: UPSC IFS Examination",
      "duration": "1-2 Years",
      "topics": [
        "UPSC Prelims (Joint with IAS)",
        "IFS Mains (Forestry / Geology / Agriculture Options)",
        "Interview at Dholpur House"
      ]
    },
    {
      "phase": "Phase 3: IGNFA Training Dehradun",
      "duration": "2 Years",
      "topics": [
        "Indira Gandhi National Forest Academy Training",
        "Weapons & Physical Fitness Training",
        "Wildlife Forensics & Law"
      ]
    },
    {
      "phase": "Phase 4: DFO & Wildlife Warden",
      "duration": "Ongoing",
      "topics": [
        "Managing Tiger Reserves",
        "Mitigating Human-Wildlife Conflicts",
        "Directing Reforestation Projects"
      ]
    }
  ],
  "youtubeSearchQuery": "indian forest service ifs officer upsc preparation wildlife career guide",
  "featuredVideos": [
    {
      "title": "Indian Forest Service (IFS) Complete Guide",
      "query": "upsc ifs indian forest service preparation",
      "embedId": "N6K12x9aOpU"
    }
  ],
  "courses": [
    {
      "name": "Ecology: Ecosystem Dynamics and Conservation",
      "platform": "Coursera",
      "url": "https://www.coursera.org/learn/ecology-conservation",
      "provider": "American Museum of Natural History",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Indian Forest Service",
      "url": "https://en.wikipedia.org/wiki/Indian_Forest_Service",
      "type": "Encyclopedia",
      "desc": "One of the three All India Services of the Government of India."
    },
    {
      "title": "Wildlife Institute of India (WII)",
      "url": "https://wii.gov.in/",
      "type": "Autonomous Institute",
      "desc": "Apex government institute conducting research on wildlife ecology and park management."
    }
  ],
  "weights": {
    "nature": 10,
    "leadership": 9,
    "helping": 8,
    "logic": 7,
    "building": 6
  }
},
{
  "id": "sports_performance_scientist",
  "name": "Sports Scientist & High-Performance Athletic Coach",
  "category": "Healthcare & Life Sciences",
  "icon": "Activity",
  "tagline": "Optimize Olympic athlete biomechanics, VO2 max, recovery, and peak human stamina",
  "description": "Uses force plates, GPS telemetry vests, and metabolic carts to maximize athletic endurance, prevent injury, and engineer nutrition protocols for national teams and sports franchises.",
  "averageSalaryInr": "₹7 - ₹25 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "23% (IPL, ISL & Global Athletics Expansion)",
  "topEmployers": [
    "Sports Authority of India (SAI)",
    "BCCI / National Cricket Academy",
    "IPL Franchises (MI, CSK, RCB)",
    "Olympic Gold Quest (OGQ)",
    "Red Bull High Performance"
  ],
  "skills": [
    "Biomechanical Motion Analysis",
    "VO2 Max & Lactate Threshold Testing",
    "Periodization & Strength Programming",
    "Sports Nutrition & Hydration",
    "Catapult GPS Telemetry",
    "Injury Rehabilitation"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: B.Sc Sports Science / Kinesiology",
      "duration": "3-4 Years",
      "topics": [
        "Exercise Physiology & Muscle Anatomy",
        "Biomechanics & Physics of Movement",
        "Sports Nutrition"
      ]
    },
    {
      "phase": "Phase 2: CSCS Certification",
      "duration": "6-12 Months",
      "topics": [
        "Certified Strength and Conditioning Specialist (NSCA CSCS)",
        "Olympic Lifting Mechanics",
        "Plyometrics"
      ]
    },
    {
      "phase": "Phase 3: Telemetry & Lab Testing",
      "duration": "1 Year",
      "topics": [
        "Catapult GPS Data Analysis",
        "Vald Force Decks & NordBord",
        "Blood Lactate Monitoring"
      ]
    },
    {
      "phase": "Phase 4: Elite Franchise Head Coach",
      "duration": "Ongoing",
      "topics": [
        "Managing National Squad Periodization",
        "Peaking for World Championships",
        "Injury Prevention Protocols"
      ]
    }
  ],
  "youtubeSearchQuery": "sports science career guide strength conditioning cscs exercise physiology",
  "featuredVideos": [
    {
      "title": "How to Become a Sports Scientist",
      "query": "sports scientist strength and conditioning career",
      "embedId": "L8E_6GjYFqg"
    }
  ],
  "courses": [
    {
      "name": "Science of Exercise",
      "platform": "Coursera",
      "url": "https://www.coursera.org/learn/exercise-science",
      "provider": "University of Colorado Boulder",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Sports Science",
      "url": "https://en.wikipedia.org/wiki/Sports_science",
      "type": "Encyclopedia",
      "desc": "Discipline that studies how the healthy human body works during exercise."
    },
    {
      "title": "Sports Authority of India (SAI)",
      "url": "https://sportsauthorityofindia.nic.in/",
      "type": "Apex Sports Body",
      "desc": "Nodal body under the Ministry of Youth Affairs and Sports developing Olympic athletes."
    }
  ],
  "weights": {
    "medical": 8,
    "helping": 8,
    "logic": 7,
    "leadership": 8,
    "building": 6
  }
},
{
  "id": "sound_engineer_music_producer",
  "name": "Sound Engineer & Acoustic Audio Producer",
  "category": "Design & Creative",
  "icon": "Radio",
  "tagline": "Shape acoustic resonance, Dolby Atmos spatial audio, and chart-topping mixdowns",
  "description": "Records, mixes, and masters audio for commercial albums, blockbuster film sound design, AAA video games, and immersive Dolby Atmos spatial formats.",
  "averageSalaryInr": "₹6 - ₹24 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "17% (Spatial Audio & Streaming Dominance)",
  "topEmployers": [
    "YRF Studios",
    "Abbey Road Studios",
    "Spotify Audio Labs",
    "Sony Music",
    "Electronic Arts Audio",
    "Dolby Laboratories"
  ],
  "skills": [
    "Pro Tools & Ableton Live",
    "Dolby Atmos Spatial Mixing",
    "Parametric EQ & Multiband Compression",
    "Microphone Placement & Acoustics",
    "Analogue Outboard Gear",
    "Mastering LUFS Loudness"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Audio Physics & Acoustics",
      "duration": "3 Months",
      "topics": [
        "Frequency Spectrum (20Hz - 20kHz)",
        "Room Treatment & Acoustic Standing Waves",
        "Microphone Types (Condenser, Ribbon, Dynamic)"
      ]
    },
    {
      "phase": "Phase 2: DAW Mastery",
      "duration": "4 Months",
      "topics": [
        "Avid Pro Tools Workflow",
        "Subtractive & Additive Synthesis",
        "Gain Staging & Bussing"
      ]
    },
    {
      "phase": "Phase 3: Mixing & Spatial Audio",
      "duration": "6 Months",
      "topics": [
        "Dynamic EQ & Saturation",
        "Reverb & Stereo Imaging",
        "Dolby Atmos 7.1.4 Bed & Object Panning"
      ]
    },
    {
      "phase": "Phase 4: Commercial Mastering",
      "duration": "Ongoing",
      "topics": [
        "LUFS Metering for Streaming",
        "Vinyl & Film Stem Deliverables",
        "Studio Client Management"
      ]
    }
  ],
  "youtubeSearchQuery": "audio engineering music production pro tools mixing mastering course",
  "featuredVideos": [
    {
      "title": "Audio Engineering & Mixing Complete Course",
      "query": "audio engineering mixing pro tools tutorial",
      "embedId": "L8E_6GjYFqg"
    }
  ],
  "courses": [
    {
      "name": "Music Production Specialization",
      "platform": "Coursera",
      "url": "https://www.coursera.org/specializations/music-production",
      "provider": "Berklee College of Music",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Audio Engineer",
      "url": "https://en.wikipedia.org/wiki/Audio_engineer",
      "type": "Encyclopedia",
      "desc": "Professional concerned with the recording, manipulation, mixing and reproduction of sound."
    },
    {
      "title": "Audio Engineering Society (AES)",
      "url": "https://www.aes.org/",
      "type": "Global Authority",
      "desc": "The international professional society devoted exclusively to audio technology."
    }
  ],
  "weights": {
    "creativity": 10,
    "technology": 8,
    "building": 7,
    "logic": 7,
    "communication": 6
  }
},
{
  "id": "pr_crisis_communications",
  "name": "Public Relations Director & Crisis Communications Strategist",
  "category": "Government & Public Service",
  "icon": "Megaphone",
  "tagline": "Safeguard corporate reputation, steer press narratives, and manage global media crises",
  "description": "Advises Fortune 500 CEOs, unicorn founders, and public figures through corporate scandals, high-stakes press conferences, and strategic global brand image management.",
  "averageSalaryInr": "₹10 - ₹32 LPA",
  "averageSalaryUsd": ",000 - ,000",
  "growthRate": "19% (High Stakes Corporate Advisory)",
  "topEmployers": [
    "Edelman",
    "Adfactors PR",
    "Genesis BCW",
    "Weber Shandwick",
    "Google Global PR",
    "Reliance Corporate Communications"
  ],
  "skills": [
    "Crisis Scenario War-Rooms",
    "Media Relations & Journalist Pitching",
    "Executive Speechwriting",
    "Reputation Threat Auditing",
    "Press Conference Staging",
    "Social Sentiment Analysis"
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Journalism & Mass Media",
      "duration": "3 Years",
      "topics": [
        "B.A Journalism / Communications",
        "Media Law, Defamation & Ethics",
        "Press Release Drafting"
      ]
    },
    {
      "phase": "Phase 2: Media Pitching & Agency",
      "duration": "2 Years",
      "topics": [
        "Building Journalist Rolodex",
        "Targeting Business Press (ET, Bloomberg)",
        "Thought Leadership Articles"
      ]
    },
    {
      "phase": "Phase 3: Crisis Simulation",
      "duration": "1 Year",
      "topics": [
        "War-Room Protocol Execution",
        "Holding Statements under Pressure",
        "Rapid Response Digital PR"
      ]
    },
    {
      "phase": "Phase 4: Chief Communications Officer (CCO)",
      "duration": "Ongoing",
      "topics": [
        "Board-Level Reputation Strategy",
        "Merger & Acquisition Press Rolls",
        "Global Media Management"
      ]
    }
  ],
  "youtubeSearchQuery": "public relations pr crisis communications reputation management career",
  "featuredVideos": [
    {
      "title": "Public Relations & Crisis Communications Roadmap",
      "query": "public relations career reputation management guide",
      "embedId": "L8E_6GjYFqg"
    }
  ],
  "courses": [
    {
      "name": "Crisis Communication Management",
      "platform": "Coursera",
      "url": "https://www.coursera.org/learn/crisis-communication",
      "provider": "Northwestern University",
      "freeOption": true
    }
  ],
  "knowledge": [
    {
      "title": "Wikipedia: Public Relations",
      "url": "https://en.wikipedia.org/wiki/Public_relations",
      "type": "Encyclopedia",
      "desc": "Practice of managing the communication between an organization and its publics."
    },
    {
      "title": "Public Relations Society of India (PRSI)",
      "url": "https://www.prsi.co.in/",
      "type": "National Association",
      "desc": "National association of PR practitioners established to promote PR professionalism."
    }
  ],
  "weights": {
    "communication": 10,
    "leadership": 9,
    "logic": 8,
    "helping": 7,
    "creativity": 7
  }
}
];

export default careersData;
