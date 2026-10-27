/* =====================================================================
   SARTHAK MISHRA — WEBSITE KA SAARA TEXT ISI FILE MEIN HAI
   =====================================================================

   Kuch bhi badalna ho (naam, line, project, certificate), bas yahin
   text badlo, "Commit changes" dabao, 1-2 minute mein site update.

   3 RULES (inhe follow karoge toh kabhi kuch nahi tootega):
     1. Har text "double quotes" ke andar hota hai.
     2. Har item ke baad comma ( , ) lagta hai.
     3. Text ke andar " chahiye toh \" likho (ya ' use kar lo).

   Kuch galat ho gaya toh website khud bata degi ki kaunsi line pe
   galti hai. Pura step-by-step: EDIT-GUIDE.md dekho.
   ===================================================================== */

window.SITE = {

  /* ---------- 1. BASIC DETAILS ---------- */
  name: "Sarthak Mishra",
  initials: "SM",
  label: "PGDM Financial Management · FIIB, New Delhi",
  // *star ke beech wala shabd* italic aur rangeen dikhega
  headline: "Turning numbers into *decisions*.",
  intro: "PGDM (Financial Management) student at FIIB with hands-on experience in business operations and revenue growth. I'm looking for opportunities in Corporate Finance, FP&A and Financial Analysis.",

  photo: "assets/sarthak-portrait.webp",
  photoStanding: "assets/sarthak-standing.webp",
  resume: "files/Sarthak_Mishra_Resume.pdf",

  email: "28-sarthak.mishra@fiib.edu.in",
  phone: "",          // number likhoge (jaise "+91 98765 43210") toh site pe "Call" button aa jayega
  linkedin: "https://www.linkedin.com/in/sarthakmishra0610/",
  location: "New Delhi, India",


  /* ---------- 2. UPAR WALE 3 NUMBERS (hero) ---------- */
  stats: [
    { value: "+70%",      label: "Revenue growth at Yog Sakshi Studio" },
    { value: "93 → 180+", label: "Active members in one year" },
    { value: "2.5 yrs",   label: "Part-time operations experience" },
  ],


  /* ---------- 3. CHALTI HUI PATTI (ticker) ---------- */
  ticker: [
    "Revenue ▲ 70%",
    "Members 93 → 180+",
    "Corporate Finance",
    "FP&A",
    "Financial Analysis",
    "Time Value of Money",
    "International Business",
    "PGDM FM · FIIB",
  ],


  /* ---------- 4. ABOUT ME ---------- */
  about: {
    paragraphs: [
      "I'm a PGDM Financial Management student at FIIB, New Delhi, with a BBA in Finance from IPS Academy, Indore.",
      "Alongside my BBA, I spent two and a half years as the part-time Administrative Manager of Yog Sakshi Studio, an online yoga and wellness platform. I tracked subscriptions and payments, onboarded clients, and worked with the founder to set up structured financial tracking. Over that time revenue grew 70% and the active student base went from 93 to over 180.",
      "Running the numbers for a small business taught me that finance matters most when it changes a decision. That's the work I want to do next, in Corporate Finance, FP&A and Financial Analysis.",
    ],
    lookingFor: ["Corporate Finance", "FP&A", "Financial Analysis"],
  },

  education: [
    { school: "Fortune Institute of International Business (FIIB)", place: "New Delhi", course: "PGDM, Financial Management", years: "2026 – Present" },
    { school: "IPS Academy", place: "Indore", course: "BBA, Finance", years: "2023 – 2026" },
    { school: "Tata DAV Public School", place: "Sonadih", course: "Class XII, CBSE (Commerce)", years: "2022 – 2023" },
  ],


  /* ---------- 5. EXPERIENCE ---------- */
  experience: [
    {
      role: "Administrative Manager",
      company: "Yog Sakshi Studio",
      note: "Online yoga & wellness platform",
      type: "Part-time",
      start: "Oct 2023",
      end: "May 2026",
      groups: [
        {
          title: "Business growth & strategy",
          points: [
            "Increased revenue by 70% by implementing growth strategies, improving operational efficiency and optimising business processes.",
            "Expanded the active student base from 93 to 180+ members within one year through strategic marketing and customer engagement.",
            "Introduced new wellness programs, including Prenatal, Postnatal and Face Yoga, to diversify services and bring in new customers.",
          ],
        },
        {
          title: "Operations & client management",
          points: [
            "Strengthened relationships with trainers and students, improving student retention and customer satisfaction.",
            "Managed client onboarding, subscription tracking, payment records and daily administration using Google Sheets.",
            "Worked with the founder to set up structured financial tracking and streamline operational workflows.",
          ],
        },
      ],
      tags: ["Revenue growth", "Financial tracking", "Customer retention", "Google Sheets", "Marketing"],
    },
    {
      role: "Volunteer",
      company: "Lit Chowk Season 5",
      note: "India's first socio-cultural festival",
      type: "Volunteer",
      start: "Sep 2025",
      end: "Jan 2026",
      groups: [
        {
          title: "Event operations & coordination",
          points: [
            "Coordinated Audition Chowk across multiple colleges and venues in Indore, keeping events and participants on schedule.",
            "Helped plan and run large-scale event operations with cross-functional teams.",
          ],
        },
        {
          title: "Guest relations & hospitality",
          points: [
            "Managed hotel bookings, hospitality and logistics for invited speakers, artists and dignitaries.",
            "Supported outreach and scheduling with guests from Bollywood, the Armed Forces, media and other fields.",
          ],
        },
      ],
      tags: ["Event operations", "Logistics", "Stakeholder coordination"],
    },
  ],


  /* ---------- 6. PROJECTS ----------
     Naya project add karna ho: neeche ek { ... }, block copy karo,
     aakhri project ke baad paste karo, aur text badal do.          */
  projects: [
    {
      title: "Build Your Acre",
      kind: "AI business game · Team project",
      summary: "A game where you build a home in Delhi NCR on a budget, then try to beat an AI property advisor.",
      details: [
        "Players pick a neighbourhood, set a budget and place the house, shops, pool and solar on their plot.",
        "An AI property advisor, Anu, scores the plan and then builds its own version to compete against yours.",
        "Turns location and budget trade-offs into a three-minute game anyone can play.",
        "Presented at the CIET · FIIB AI Business Projects Showcase.",
      ],
      tags: ["Budgeting", "Real estate", "AI advisor", "Game design"],
      link: "https://claude.ai/code/artifact/340599b4-b82a-4960-8273-64e4d6e47a78",
      linkLabel: "Play the game",
    },
    {
      title: "Delhi ICU Finder",
      kind: "Public-data tool · Team project",
      summary: "A search tool for reported ICU bed availability at Delhi government hospitals.",
      details: [
        "Team project. I built the tool.",
        "Search by district, hospital, specialty or ventilator need, with the hospitals reporting the most vacant beds shown first.",
        "A chat assistant answers questions in Hindi, English or Hinglish.",
        "Draws on the Delhi Health & Family Welfare ICU dashboard, flags reports older than six hours and reminds people to call the hospital before travelling.",
        "Includes a separate Government Capacity Analyzer view.",
      ],
      tags: ["Public data", "Healthcare", "Search", "AI assistant"],
      link: "https://delhi-icu-finder-adii.souravyadav122002.chatgpt.site/",
      linkLabel: "Open the tool",
    },
    {
      title: "Mamaearth Sales Diagnosis Agent",
      kind: "AI decision-support agent",
      summary: "An AI agent that diagnoses Mamaearth's sales performance and gives managers actionable insights.",
      details: [
        "Full name: Mamaearth Sales Diagnosis & Managerial Decision-Support Agent.",
        "Diagnoses the brand's sales performance and identifies the key issues behind it.",
        "Turns that diagnosis into actionable insights for managerial decisions.",
        "Built as a custom Gem in Google Gemini. Opening it needs a Google sign-in.",
      ],
      tags: ["Sales analysis", "Decision support", "D2C", "Gemini"],
      link: "https://gemini.google.com/gem/1pG4nlpvY3pNYB_mooCKdqYOuUNr4ydPK?usp=sharing",
      linkLabel: "Open the agent",
    },
  ],


  /* ---------- 7. SKILLS ---------- */
  skills: [
    { group: "Finance", items: ["Corporate Finance", "Time Value of Money", "International Business & Finance", "Revenue Growth Analysis", "Financial Tracking"] },
    { group: "Business & Operations", items: ["Business Operations", "Growth Strategy", "Client Onboarding & Retention", "Subscription & Payment Tracking", "Event Operations", "Stakeholder Coordination"] },
    { group: "Tools", items: ["Google Sheets", "Claude", "ChatGPT", "Gemini"] },
  ],


  /* ---------- 8. CERTIFICATIONS ---------- */
  certifications: [
    {
      title: "International Business and Finance",
      issuer: "LinkedIn Learning",
      date: "Oct 2026",
      skills: ["Corporate Finance", "International Business"],
      extra: "2 hr 9 min course",
      file: "files/Certificate_International_Business_and_Finance.pdf",
    },
    {
      title: "Using the Time Value of Money to Make Financial Decisions",
      issuer: "LinkedIn Learning",
      date: "Oct 2026",
      skills: ["Time Value of Money"],
      extra: "3.4 CPE credits (NASBA)",
      file: "files/Certificate_Time_Value_of_Money.pdf",
    },
  ],


  /* ---------- 9. TESTIMONIALS ----------
     Abhi khali hai, isliye site pe ye section nahi dikhta.
     Kisi teacher/manager ka quote mile toh aise add karo:
     { quote: "Unki baat yahan", name: "Naam", title: "Designation, Company" },   */
  testimonials: [
  ],


  /* ---------- 10. PLAYGROUND (paise ka calculator) ---------- */
  playground: {
    show: true,      // false likhoge toh ye section chhup jayega
    title: "Money has a time value",
    text: "₹1 today is worth more than ₹1 tomorrow. Move the sliders to see how an amount grows, or what a future amount is worth today.",
  },


  /* ---------- 11. CONTACT ---------- */
  contact: {
    heading: "Let's talk",
    text: "Hiring for Corporate Finance, FP&A or Financial Analysis, or working on something I could help with? I'd like to hear about it.",
  },

};
