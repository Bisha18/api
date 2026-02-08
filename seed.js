import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import {Profile} from './models/Profile.js';

const MONGODB_URI = process.env.MONGODB_URI

const sampleProfiles = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    education: "B.Tech Computer Science, MIT",
    skills: ["Python", "Machine Learning", "TensorFlow", "Django", "React"],
    projects: [
      {
        title: "AI Chatbot",
        description: "Intelligent customer service chatbot using NLP",
        links: "https://github.com/alice/ai-chatbot"
      },
      {
        title: "Sentiment Analyzer",
        description: "Real-time sentiment analysis for social media",
        links: "https://github.com/alice/sentiment-analyzer"
      }
    ],
    work: [
      {
        links: {
          github: "https://github.com/alicejohnson",
          linkedin: "https://linkedin.com/in/alicejohnson",
          portfolio: "https://alicejohnson.dev"
        }
      }
    ]
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    education: "M.Sc. Software Engineering, Stanford",
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS", "TypeScript"],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Full-stack MERN online shopping platform with payment integration",
        links: "https://github.com/bob/ecommerce"
      },
      {
        title: "Social Media App",
        description: "Instagram clone with real-time messaging",
        links: "https://github.com/bob/social-app"
      }
    ],
    work: [
      {
        links: {
          github: "https://github.com/bobsmith",
          linkedin: "https://linkedin.com/in/bobsmith",
          portfolio: "https://bobsmith.io"
        }
      }
    ]
  },
  {
    name: "Carol Davis",
    email: "carol@example.com",
    education: "B.Sc. Information Technology, Berkeley",
    skills: ["Java", "Spring Boot", "MySQL", "Docker", "Kubernetes", "React"],
    projects: [
      {
        title: "Microservices Architecture",
        description: "Scalable microservices-based banking application",
        links: "https://github.com/carol/microservices-bank"
      },
      {
        title: "CI/CD Pipeline",
        description: "Automated deployment pipeline using Jenkins and Docker",
        links: "https://github.com/carol/cicd-pipeline"
      }
    ],
    work: [
      {
        links: {
          github: "https://github.com/caroldavis",
          linkedin: "https://linkedin.com/in/caroldavis",
          portfolio: "https://caroldavis.tech"
        }
      }
    ]
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    education: "B.Tech Data Science, CMU",
    skills: ["Python", "R", "SQL", "Tableau", "Pandas", "NumPy", "React"],
    projects: [
      {
        title: "Sales Dashboard",
        description: "Interactive sales analytics dashboard for business intelligence",
        links: "https://github.com/david/sales-dashboard"
      }
    ],
    work: [
      {
        links: {
          github: "https://github.com/davidwilson",
          linkedin: "https://linkedin.com/in/davidwilson",
          portfolio: "https://davidwilson.analytics"
        }
      }
    ]
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    education: "M.Tech Cybersecurity, Georgia Tech",
    skills: ["Python", "Penetration Testing", "Network Security", "Linux", "Wireshark"],
    projects: [
      {
        title: "Security Audit Tool",
        description: "Automated security vulnerability scanner for web applications",
        links: "https://github.com/emma/security-audit"
      },
      {
        title: "Intrusion Detection System",
        description: "Machine learning-based network intrusion detection",
        links: "https://github.com/emma/ids-ml"
      }
    ],
    work: [
      {
        links: {
          github: "https://github.com/emmabrown",
          linkedin: "https://linkedin.com/in/emmabrown",
          portfolio: "https://emmabrown.security"
        }
      }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    await Profile.deleteMany({});
    console.log('🗑️  Cleared existing profiles');

    const profiles = await Profile.insertMany(sampleProfiles);
    console.log(`✅ Inserted ${profiles.length} sample profiles`);

    console.log('\n📋 Created Profiles:');
    profiles.forEach((profile, index) => {
      console.log(`${index + 1}. ${profile.name} (${profile.email})`);
      console.log(`   Skills: ${profile.skills.join(', ')}`);
      console.log(`   Projects: ${profile.projects.length}`);
      console.log('');
    });

    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

seedDatabase();