// ==============================================================================
// SAHICHAYAN.COM - Master Career Catalog (32+ Diverse High-Impact Careers)
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
];

export default careersData;
