const resume = `
Arjun Verma
Email: arjun.verma.dev@example.com
Phone: 8123456789
LinkedIn: linkedin.com/in/arjun-verma
GitHub: github.com/arjun-verma
Location: Bengaluru, India

Summary:
Results-driven Full Stack Software Engineer with 4+ years of experience designing and building scalable web applications. Proficient in modern JavaScript frameworks (React, Vue), Node.js, and microservices architecture. Strong track record of improving system performance and leading end-to-end delivery of complex features.

Technical Skills:
- Languages: JavaScript (ES6+), TypeScript, Python, HTML5, CSS3/SASS
- Frontend: React.js, Redux, Next.js, Tailwind CSS, Webpack
- Backend: Node.js, Express.js, NestJS, Python (Django)
- Databases: PostgreSQL, MongoDB, Redis
- DevOps & Cloud: AWS (EC2, S3, Lambda), Docker, Kubernetes, CI/CD (GitHub Actions)
- Testing: Jest, Mocha, Cypress

Experience:
Senior Software Engineer | InnovateTech Solutions (Mar 2021 - Present)
- Architected and developed a high-traffic e-commerce platform using Next.js and Node.js microservices, handling over 100k daily active users.
- Optimized PostgreSQL database indexing and query structures, reducing API response times by 45%.
- Implemented an advanced caching layer using Redis, reducing server load by 30% during peak sale events.
- Mentored a team of 3 junior developers and conducted regular code reviews to maintain code quality.

Software Engineer | CodeCraft Inc. (Jul 2019 - Feb 2021)
- Developed a real-time collaborative workspace application using React.js and WebSockets (Socket.io).
- Integrated third-party payment gateways (Stripe, Razorpay) securely, ensuring PCI compliance.
- Reduced initial page load time by 60% through lazy loading and optimal asset bundling.

Projects:
1. "Streamify" - Video Streaming Service:
   Built a Netflix-clone using MERN stack with AWS S3 for video storage and AWS CloudFront for CDN distribution. Implemented adaptive bitrate streaming and user-specific recommendation feeds based on watch history.
2. "FinTrack" - Personal Finance Dashboard:
   Developed a robust financial tracker using Vue.js and Node.js. Integrated Plaid API for real-time bank transaction syncing and implemented interactive data visualizations using D3.js.

Education:
B.Tech in Information Technology | National Institute of Technology (2015-2019)
- CGPA: 8.5/10
`;

const selfDescription = `
Hi, my name is Arjun Verma. I've been working as a Full Stack Engineer for over 4 years now. In my current role at InnovateTech, I've primarily focused on scaling Node.js microservices and optimizing React applications for high performance. 

Recently, I was the lead developer on an e-commerce platform revamp where we successfully handled a huge spike in traffic by implementing robust caching strategies with Redis and optimizing our database queries. I genuinely enjoy deep-diving into system architecture and performance tuning. 

Beyond coding, I consider myself a strong team player and I've actively mentored junior engineers on my team. I'm looking for a Senior Backend or Full Stack role where I can tackle complex architectural challenges and contribute to a product that impacts millions of users. I noticed your team is working heavily with microservices and AWS, which aligns perfectly with my background and interests.
`;

const jobDescription = `
Role: Senior Full Stack Engineer
Company: CloudScale Dynamics
Location: Remote (India)

About the Role:
CloudScale Dynamics is building the next generation of cloud-native collaboration tools. We are seeking a highly skilled Senior Full Stack Engineer to lead the development of our core platform. You will have a significant impact on architectural decisions, feature development, and engineering culture.

Key Responsibilities:
- Design, build, and maintain robust, scalable APIs and microservices using Node.js/NestJS.
- Develop intuitive and highly responsive user interfaces using React.js and modern state management tools.
- Lead end-to-end project execution, from technical design to deployment.
- Identify and resolve performance bottlenecks across the entire stack.
- Collaborate closely with product managers and designers to translate requirements into technical solutions.
- Mentor junior engineers and champion engineering best practices.

Requirements:
- 4+ years of professional experience in full-stack web development.
- Deep expertise in JavaScript/TypeScript, Node.js, and React.js.
- Strong experience with relational (PostgreSQL) and NoSQL (MongoDB, Redis) databases.
- Proven track record of designing and scaling microservices architectures.
- Experience with cloud platforms (AWS/GCP), Docker, and CI/CD pipelines.
- Excellent problem-solving skills and a proactive approach to engineering challenges.
- Outstanding communication skills.

Bonus Points:
- Experience with WebSockets or real-time data processing.
- Contributions to open-source projects.
`;

// You can use these variables to test your generateInterviewReport function
// console.log(generateInterviewReport(resume, selfDescription, jobDescription));
module.exports={resume,selfDescription,jobDescription};