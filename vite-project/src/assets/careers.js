const careers = [
  {
    name: "AI Ethics Specialist",
    skills: [
      "AI governance",
      "Critical thinking",
      "Data privacy laws",
      "Bias detection",
      "Communication skills"
    ],
    roadmap: [
      "Learn AI fundamentals and ethics principles",
      "Study regulations like GDPR and responsible AI frameworks",
      "Build case studies or audit AI systems for fairness"
    ],
    resources: [    
      "https://www.youtube.com/results?search_query=AI+ethics+tutorial",
      "https://www.coursera.org/courses?query=AI+ethics",
      "https://en.wikipedia.org/wiki/AI_ethics"
    ],
    weights: {
      Ai: 10,
      logic: 7,
      communication: 5,
      technology: 9,
      creativity: 5
    }
  },

  {
    name: "UI/UX Designer",
    skills: [
      "Figma",
      "Wireframing",
      "User research",
      "Typography",
      "Design thinking"
    ],
    roadmap: [
      "Learn design fundamentals and Figma",
      "Create mobile and web app prototypes",
      "Build a portfolio on Behance or Dribbble"
    ],
    resources: [    
      "https://www.youtube.com/results?search_query=UI+UX+design+tutorial",
      "https://www.coursera.org/courses?query=UI+UX+design",
      "https://www.geeksforgeeks.org/ui-ux-design/"
    ],
    weights: {
      creativity: 10,
      technology: 8,
      communication: 5,
      logic: 6,
      helping: 3
    }
  },

  {
    name: "Drone Pilot",
    skills: [
      "Drone navigation",
      "Aerial photography",
      "Flight safety",
      "GPS mapping"
    ],
    roadmap: [
      "Learn drone basics and aviation rules",
      "Practice using simulators",
      "Get certified and specialize"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=drone+pilot+training",
      "https://www.coursera.org/courses?query=drone+pilot",
      "https://en.wikipedia.org/wiki/Unmanned_aerial_vehicle"
    ],
    weights: {
      Avation: 10,
      technology: 8,
      nature: 7,
      building: 8,
      creativity: 5,
      logic: 6
    }
  },
  
  {
    name: "UPSC Civil Services (IAS/IPS/IFS)",
    category: "Central Government",
    skills: [
      "General studies",
      "Current affairs",
      "Public administration",
      "Decision making",
      "Public administration"
    ],
    roadmap: [
      "Understand UPSC exam structure",
      "Build NCERT foundation",
      "Study standard reference books",
      "Practice answer writing daily",
      "Prepare optional subject deeply",
      "Attempt mock interviews"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=UPSC+preparation",
      "https://www.coursera.org/courses?query=public+administration",
      "https://en.wikipedia.org/wiki/Union_Public_Service_Commission"
    ],
    weights: {
      administration: 10,
      leadership: 10,
      helping: 10,
      communication: 9,
      nature: 3,
      creativity: 6
    }
  },

  {
    name: "Sustainable Farming Expert",
    skills: [
      "Organic farming",
      "Soil management",
      "Agri-tech tools",
      "Water conservation"
    ],
    roadmap: [
      "Study sustainable agriculture",
      "Practice farming projects",
      "Learn smart farming technologies"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=sustainable+farming+tutorial",
      "https://www.coursera.org/courses?query=sustainable+farming",
      "https://en.wikipedia.org/wiki/Sustainable_agriculture"
    ],
    weights: {
      nature: 10,
      helping: 7,
      building: 6,
      logic: 5,
      creativity: 4
    }
  },

  {
    name: "Data Scientist",
    skills: [
      "Python",
      "Machine learning",
      "Statistics",
      "SQL"
    ],
    roadmap: [
      "Learn Python and statistics",
      "Study machine learning",
      "Build real-world projects"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=data+science+tutorial",
      "https://www.coursera.org/courses?query=data+science",
      "https://www.geeksforgeeks.org/data-science/"
    ],
    weights: {
      logic: 10,
      Ai: 9,
      technology: 9,
      creativity: 5,
      communication: 4,
      helping: 3
    }
  },
   {
    name: "NDA (National Defence Academy)",
    category: "Defence",
    skills: [
      "Physical fitness",
      "Leadership",
      "Mathematics",
      "Discipline"
    ],
    roadmap: [
      "Prepare NDA written syllabus",
      "Focus on physical fitness",
      "Develop leadership qualities",
      "Prepare for SSB interview"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=NDA+preparation",
      "https://www.pw.live/defence/nda/batches",
      "https://en.wikipedia.org/wiki/National_Defence_Academy_(India)"
    ],
    eligibility: "12th Pass",
    examStages: ["Written Exam", "SSB Interview", "Medical"],
    salaryRange: "₹56,100 - ₹2,50,000/month",
    weights: {
      leadership: 10,
      helping: 9,
      communication: 9,
      administration: 10,
      government: 10,
      logic: 8
    }
  },
   {
    name: "State PCS (UPPSC/BPSC/MPSC etc.)",
    skills: [
      "State current affairs",
      "Essay writing",
      "Administration",
      "Reasoning"
    ],
    roadmap: [
      "Study state-specific syllabus",
      "Prepare NCERT basics",
      "Practice answer writing",
      "Revise current affairs"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=State+PCS+preparation",
      "https://visionias.in/",
      "https://en.wikipedia.org/wiki/Public_Service_Commission"
    ],
      weights: {
      technology: 1,
      helping: 10,
      communication: 4,
      administration: 10,
        government: 10,
      logic: 7
    }
   },
    {
    name: "RBI Grade B",
    skills: [
      "Economics",
      "Finance",
      "Analytical thinking",
      "English writing"
    ],
    roadmap: [
      "Study economics and finance",
      "Prepare RBI current affairs",
      "Practice descriptive answers",
      "Attempt mock interviews"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=RBI+Grade+B+preparation",
      "https://alison.com/tag/banking",
      "https://en.wikipedia.org/wiki/Reserve_Bank_of_India"
    ],
    weights: {
      technology: 1,
      helping: 10,
      communication: 4,
      administration: 10,
        government: 10,
      logic: 7
    }
  },

  {
    name: "Cybersecurity Analyst",
    skills: [
      "Network security",
      "Ethical hacking",
      "Linux",
      "Threat analysis"
    ],
    roadmap: [
      "Learn networking basics",
      "Practice ethical hacking labs",
      "Earn cybersecurity certifications"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=cybersecurity+tutorial",
      "https://www.coursera.org/courses?query=cybersecurity",
      "https://www.geeksforgeeks.org/cyber-security-tutorial/"
    ],
    weights: {
      logic: 10,
      technology: 9,
      building: 6,
      communication: 3,
      creativity: 2
    }
  },

  {
    name: "Cloud Engineer",
    skills: [
      "AWS",
      "Azure",
      "Linux",
      "Networking"
    ],
    roadmap: [
      "Learn cloud fundamentals",
      "Deploy apps on cloud platforms",
      "Earn cloud certifications"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=cloud+computing+tutorial",
      "https://www.coursera.org/courses?query=cloud+computing",
      "https://en.wikipedia.org/wiki/Cloud_computing"
    ],
    weights: {
      logic: 9,
      technology: 10,
      building: 7,
      communication: 4,
      creativity: 3
    }
  },

  {
    name: "Blockchain Developer",
    skills: [
      "Solidity",
      "Web3",
      "Cryptography",
      "JavaScript"
    ],
    roadmap: [
      "Learn blockchain basics",
      "Build smart contracts",
      "Create decentralized apps"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=blockchain+tutorial",
      "https://www.coursera.org/courses?query=blockchain",
      "https://www.geeksforgeeks.org/blockchain-tutorial/"
    ],
    weights: {
      logic: 9,
      technology: 10,
      creativity: 5,
      building: 6,
      communication: 2
    }
  },

  {
    name: "Digital Marketing Specialist",
    skills: [
      "SEO",
      "Content marketing",
      "Google Ads",
      "Analytics"
    ],
    roadmap: [
      "Learn SEO and marketing",
      "Run sample campaigns",
      "Build a personal brand"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=digital+marketing+tutorial",
      "https://www.coursera.org/courses?query=digital+marketing",
      "https://en.wikipedia.org/wiki/Digital_marketing"
    ],
    weights: {
      communication: 10,
      creativity: 8,
      leadership: 6,
      technology: 5,
      helping: 4
    }
  },

  {
    name: "AR/VR Developer",
    skills: [
      "Unity",
      "3D modeling",
      "C#",
      "Spatial computing"
    ],
    roadmap: [
      "Learn Unity basics",
      "Build AR/VR demos",
      "Publish projects"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=AR+VR+development+tutorial",
      "https://www.coursera.org/courses?query=AR+VR",
      "https://en.wikipedia.org/wiki/Virtual_reality"
    ],
    weights: {
      creativity: 0,
      technology: 9,
      logic: 7,
      building: 7,
      communication: 3
    }
  },

  {
    name: "Prompt Engineer",
    skills: [
      "LLM prompting",
      "AI workflows",
      "Automation",
      "Research"
    ],
    roadmap: [
      "Learn generative AI",
      "Practice prompting techniques",
      "Build AI automation workflows"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=prompt+engineering+tutorial",
      "https://www.coursera.org/courses?query=prompt+engineering",
      "https://en.wikipedia.org/wiki/Prompt_engineering"
    ],
    weights: {
      logic: 8,
      creativity: 7,
      technology: 9,
      communication: 7,
      helping: 3
    }
  },

  {
    name: "DevOps Engineer",
    skills: [
      "Docker",
      "Kubernetes",
      "Linux",
      "CI/CD"
    ],
    roadmap: [
      "Learn Linux and scripting",
      "Master Docker and CI/CD",
      "Deploy scalable systems"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=devops+tutorial",
      "https://www.coursera.org/courses?query=devops",
      "https://www.geeksforgeeks.org/devops-tutorial/"
    ],
    weights: {
      logic: 9,
      technology: 10,
      building: 8,
      communication: 3,
      creativity: 2
    }
  },

  {
    name: "Robotics Engineer",
    skills: [
      "Python",
      "ROS",
      "Electronics",
      "Mechanical systems"
    ],
    roadmap: [
      "Learn robotics basics",
      "Build robotics projects",
      "Specialize in AI robotics"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=robotics+tutorial",
      "https://www.coursera.org/courses?query=robotics",
      "https://en.wikipedia.org/wiki/Robotics"
    ],
    weights: {
      building: 10,
      logic: 9,
      technology: 9,
      creativity: 5,
      communication: 2
    }
  },

  {
    name: "Product Manager",
    skills: [
      "Agile",
      "Roadmapping",
      "Market research",
      "Communication"
    ],
    roadmap: [
      "Learn product lifecycle",
      "Study Agile and Scrum",
      "Build case studies"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=product+management+tutorial",
      "https://www.coursera.org/courses?query=product+management",
      "https://en.wikipedia.org/wiki/Product_management"
    ],
    weights: {
      leadership: 10,
      communication: 9,
      helping: 6,
      logic: 6,
      creativity: 5
    }
  },

  {
    name: "Renewable Energy Technician",
    skills: [
      "Solar systems",
      "Electrical basics",
      "Maintenance"
    ],
    roadmap: [
      "Learn renewable energy systems",
      "Practice installations",
      "Gain certifications"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=renewable+energy+tutorial",
      "https://www.coursera.org/courses?query=renewable+energy",
      "https://en.wikipedia.org/wiki/Renewable_energy"
    ],
    weights: {
      nature: 10,
      building: 9,
      helping: 5,
      logic: 6,
      technology: 6
    }
  },
  {
    name: "Environmental Engineer",
    skills: [
      "Environmental analysis",
      "Waste management",
      "Problem solving",
      "Technical design"
    ],
    roadmap: [
      "Study environmental engineering fundamentals",
      "Learn sustainability practices",
      "Work on field projects",
      "Get certified in environmental systems"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=environmental+engineering",
      "https://www.coursera.org/courses?query=environmental+engineering",
      "https://en.wikipedia.org/wiki/Environmental_engineering"
    ],
    weights: {
      creativity: 6,
      engineering: 9,
      government: 5,
      nature: 10,
      communication: 5,
      logic: 9,
      building: 8
    }
  },
   {
    name: "Architecture Designer",
    skills: [
      "Architectural drawing",
      "3D modeling",
      "Creative visualization",
      "Structural planning"
    ],
    roadmap: [
      "Learn architecture software",
      "Study building design principles",
      "Create design portfolios",
      "Work on real-world projects"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=architecture+design",
      "https://www.skillshare.com/browse/architecture",
      "https://en.wikipedia.org/wiki/Architecture"
    ],
    weights: {
      creativity: 10,
      engineering: 8,
      government: 2,
      nature: 5,
      communication: 7,
      logic: 8,
      building: 10
    }
  },
   {
    name: "Renewable Energy Engineer",
    skills: [
      "Solar systems",
      "Energy analysis",
      "Technical design",
      "Sustainability planning"
    ],
    roadmap: [
      "Study renewable energy technologies",
      "Learn solar and wind systems",
      "Build energy projects",
      "Get industry certifications"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=renewable+energy+engineering",
      "https://www.coursera.org/courses?query=renewable+energy",
      "https://en.wikipedia.org/wiki/Renewable_energy"
    ],
    weights: {
      creativity: 7,
      engineering: 10,
      government: 5,
      nature: 10,
      communication: 5,
      logic: 9,
      building: 9
    }
  },
   {
    name: "Smart City Engineer",
    skills: [
      "IoT systems",
      "Infrastructure planning",
      "Data analysis",
      "Project management"
    ],
    roadmap: [
      "Study smart infrastructure systems",
      "Learn IoT and urban technologies",
      "Understand government urban missions",
      "Work on smart city projects"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=smart+city+engineering",
      "https://www.coursera.org/courses?query=smart+cities",
      "https://en.wikipedia.org/wiki/Smart_city"
    ],
    weights: {
      creativity: 7,
      engineering: 10,
      government: 8,
      nature: 6,
      communication: 7,
      logic: 9,
      building: 10
    }
  },
 {
    name: "Business & Entrepreneurship",
    skills: [
      "Business strategy",
      "Marketing",
      "Financial planning",
      "Leadership"
    ],
    roadmap: [
      "Learn business fundamentals",
      "Study finance and marketing",
      "Build startup projects",
      "Develop networking and leadership"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=business+career+guide",
      "https://www.coursera.org/courses?query=business",
      "https://en.wikipedia.org/wiki/Business"
    ],
    weights: {
      business: 10,
      leadership: 8,
      communication: 9,
      risk: 8
    }
  },
  {
    name: "AI Engineer",
    skills: [
      "Python",
      "TensorFlow",
      "Deep Learning",
      "Machine Learning"
    ],
    roadmap: [
      "Learn Python and ML",
      "Build AI projects",
      "Deploy AI applications"
    ],
    resources: [
      "https://www.youtube.com/results?search_query=artificial+intelligence+tutorial",
      "https://www.coursera.org/courses?query=artificial+intelligence",
      "https://www.geeksforgeeks.org/artificial-intelligence/"
    ],
    weights: {
      logic: 10,
      technology: 10,
      creativity: 6,
      building: 7,
      communication: 3
    }
  },
];
export default careers;
