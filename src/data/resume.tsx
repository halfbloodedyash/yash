import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Yash",
  initials: "KV",
  url: "https://Yashh.tech",
  location: "Remote",
  locationLink: "#",
  description:
    "21, Software Developer",
  summary:
    "I like being the person who turns ideas into outcomes. Started my career as a visual designer by chance, but I was always geeked out into playing with software and stripping it down to understand how it works, and also was a fan of good aesthetics. I also did graphics design, video editing, motion graphics and a handful of animations as well. I now do a mix of everything, from building products to teaching design engineering. You'll find me shitposting on X, check out my digital store, or you can always reach me at kesh@ux.me.",
  avatarUrl: "/me.png",
  skills: [
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX Design",
    "AWS",
    "Figma",
    "Shitposting",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "kesh@ux.me",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/halfbloodedyash",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/keshav",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/eth_yash",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:kesh@ux.me",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Tug Fantasy",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "",
      start: "Dec 2024",
      end: "May 2025",
      description:
        "Single-handedly built the entire frontend of Tug Fantasy, a fantasy sports platform, from scratch. Developed a responsive, modern UI using Next.js and Tailwind CSS, optimized for both desktop and mobile users. Collaborated with backend developers to integrate APIs for live sports data, contests, and leaderboards into the frontend.",
    },
  ],
  education: [
    {
      school: "Vellore Institute of Technology",
      href: "https://vit.ac.in/",
      degree: "Bachelor's Degree in Computer Science",
      logoUrl: "/university.png",
      start: "2021",
      end: "2026",
    },
  ],
  projects: [
    {
      title: "End-to-End Medical Chatbot",
      href: "#",
      dates: "",
      active: true,
      description: "Built an AI-driven medical chatbot that processes 500+ pages of medical data to provide contextually accurate answers.",
      timeline: [
        "Implemented semantic search with Pinecone and LLMs (OpenAI GPT via LangChain) for reliable, relevant responses.",
        "search"
      ],



      technologies: [
        "Python",
        "LangChain",
        "OpenAI GPT",
        "Pinecone",
        "Flask",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Rice Classification using Machine Learning",
      href: "#",
      dates: "",
      active: true,
      description: "Achieved 97.74 accuracy in image classification using CNN for rice variety detection, leveraging a dataset of 75,000 grain images.",
      timeline: [
        "Optimized model performance, reducing validation loss to 0.0624, with a training loss of 0.0743 over 5 epochs, ensuring high generalization.",
      ],
      technologies: [
        "TensorFlow",
        "Keras",
        "OpenCV",
        "Google Colab"
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Intelligent Smart Lock",
      href: "#",
      dates: "",
      active: true,
      description: "Designed a robust access control system leveraging Bluetooth, Wi-Fi, image recognition, and a 4x4 matrix keypad.",
      timeline: [],
      technologies: [
        "IoT",
        "OpenCV",
        "Python",
        "Embedded Systems"
      ],
      links: [],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "code100x",
      dates: "Aug 2025",
      location: "Remote",
      description:
        "Redesigned major parts of the 100xDevs CMS UI — improving hierarchy, spacing, consistency, and overall usability.",
      image: "",
      links: [
        {
          title: "CMS: UI Changes - #532",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/code100x/daily-code/pull/532"
        },
        {
          title: "Daily Code: Major UI Revamp - #1135",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/code100x/cms/pull/1135"
        }
      ],
    },
  ],
} as const;
