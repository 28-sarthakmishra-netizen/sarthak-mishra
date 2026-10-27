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
  // degree · specialisation · batch · institute (FIIB framework: naam ke theek neeche)
  label: "PGDM Financial Management · 2026–28 · FIIB, New Delhi",
  // *star ke beech wala shabd* italic aur rangeen dikhega
  headline: "Turning numbers into *decisions*.",
  // upar wala *shabd* in shabdon ke beech ghoomta rahega (ek hi rakhoge toh nahi ghoomega)
  headlineWords: ["decisions", "strategy", "growth", "insight"],
  // photo ke aas-paas tairte hue finance terms
  floatingTerms: ["NPV", "IRR", "ROE", "P/E", "EBITDA", "WACC", "₹", "%", "FCF", "Σ"],
  // positioning line: Domain + Value + Edge (FIIB framework, standard 1)
  intro: "Finance student who turns business numbers into decisions, backed by two and a half years of running operations and revenue growth at a real business.",
  targetRoles: ["Corporate Finance", "FP&A", "Financial Analysis"],

  photo: "assets/sarthak-portrait.webp",
  photoStanding: "assets/sarthak-standing.webp",
  resume: "files/Sarthak_Mishra_Resume.pdf?v=3",   // naya resume upload karo toh ?v= ka number badha dena, taaki purana cache na dikhe

  email: "28-sarthak.mishra@fiib.edu.in",
  phone: "+91 99262 78300",   // khali chhodoge ("") toh number site pe nahi dikhega
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
    "Titan dashboard · FY20–FY26",
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
     Har project Purpose → Process → Outcome mein likha hai (FIIB framework).
       purposeLabel / processLabel / outcomeLabel : button pe kya likha aaye (optional)
       role / contribution : project mein TERA kaam (team ka nahi)
       purpose  : project kyun bana
       process  : kya aur kaise kiya
       outcome  : result. Number tabhi likhna jab asli ho aur interview mein samjha sako.
       purposeLink / processLink / outcomeLink : us column ki asli file ka link
         (brief, working sheet, dashboard, PPT). Khali chhodoge toh button nahi aayega.
     Picture: screenshot ko assets/projects folder mein daalo aur
     image: "assets/projects/file-ka-naam.jpg" likho. image khali ho toh "visual"
     wala animated chitra dikhta hai: "agent", "dashboard" ya "search".
     Naya project: ek { ... }, block copy karke aakhri project ke baad paste karo. */
  projects: [
    {
      title: "Titan Company Dashboard",
      kind: "Python dashboard · Financial Insights",
      summary: "An interactive financial dashboard on Titan Company, built in Python with Streamlit and Plotly.",
      role: "Builder",
      contribution: "Built the dashboard in Python.",
      purpose: "Course project for Financial Insights at FIIB: analyse Titan Company's financial performance from its annual reports in one interactive dashboard.",
      process: "Built with Python, Streamlit and Plotly on consolidated figures from FY2019-20 to FY2025-26. Tabs cover the share price, P&L, business segments, balance sheet and a financial health check, plus a chatbot, TitanBot.",
      outcome: "A live dashboard anyone can open. Its forecast tab projects revenue, profit, EPS and dividend from FY27 to FY31 under bear, base, bull or custom scenarios.",
      purposeLink: "",
      processLink: "",       // GitHub code ka link yahan daalo
      processLabel: "View the code",
      outcomeLink: "https://titan-sarthak.streamlit.app/",
      outcomeLabel: "Open the dashboard",
      tags: ["Python", "Streamlit", "Plotly", "Financial analysis", "Forecasting"],
      link: "https://titan-sarthak.streamlit.app/",
      linkLabel: "Open the dashboard",
      note: "Hosted on Streamlit. If nobody has opened it for a while it sleeps; press the wake-up button and give it about a minute.",
      image: "assets/projects/titan-dashboard.jpg",
    },
    {
      title: "Mamaearth Sales Diagnosis Agent",
      kind: "AI decision-support agent · Team project",
      summary: "An AI agent that diagnoses Mamaearth's sales performance and gives managers actionable insights.",
      role: "Agent builder",
      contribution: "Each team member built their own agent. Mine was approved as the best one.",
      purpose: "Help a manager understand why Mamaearth's sales slowed and what to do about it.",
      process: "Built a custom AI agent, a Gem in Google Gemini, grounded in the data files it was given. It diagnoses sales performance and identifies the key issues behind it.",
      outcome: "Approved as the team's agent. Asked why sales went down, it answers with an executive diagnosis, the evidence behind it and actionable insights for managers.",
      purposeLink: "",
      processLink: "",
      outcomeLink: "files/Mamaearth_Agent_Sample_Answer.png",
      outcomeLabel: "See a sample answer",
      tags: ["Sales analysis", "Decision support", "D2C", "Gemini"],
      link: "https://gemini.google.com/gem/1pG4nlpvY3pNYB_mooCKdqYOuUNr4ydPK?usp=sharing",
      linkLabel: "Open the agent",
      note: "Opening the agent needs a Google sign-in. A sample answer is linked under Outcome.",
      image: "",
      visual: "agent",
    },
    {
      title: "Build Your Acre",
      kind: "AI business game · Team of two",
      summary: "A game where you build a home in Delhi NCR on a budget, then try to beat an AI property advisor.",
      role: "Co-creator",
      contribution: "",
      purpose: "Show how location, budget and amenities shape the value of a home in Delhi NCR, in a form anyone can try in three minutes.",
      process: "Players pick a plot, build within a budget, get an AI score, then compete against the AI advisor's own plan. Built as an interactive web game with AI tools, with guidance from faculty.",
      outcome: "Presented at the CIET · FIIB Gamified AI Business Projects Showcase on 9 Oct 2026. 9 guests wrote feedback, 7 praised it, and 6 shared their contacts for follow-up, including a startup founder who offered introductions.",
      purposeLink: "",
      processLink: "",
      outcomeLink: "",
      tags: ["Budgeting", "Real estate", "AI advisor", "Game design"],
      link: "https://claude.ai/code/artifact/340599b4-b82a-4960-8273-64e4d6e47a78",
      linkLabel: "Play the game",
      note: "",
      image: "assets/projects/build-your-acre.jpg",
    },
    {
      title: "Delhi ICU Finder",
      kind: "Public-data tool · Team project",
      summary: "A search tool for reported ICU bed availability at Delhi government hospitals.",
      role: "Builder",
      contribution: "Built the tool for the team.",
      purpose: "Help people in Delhi find reported ICU bed availability at government hospitals from one search.",
      process: "Search by district, hospital, specialty or ventilator need, plus a chat assistant that answers in Hindi, English or Hinglish. It uses the Delhi Health & Family Welfare ICU dashboard, flags reports older than six hours and reminds people to call the hospital before travelling.",
      outcome: "A live public tool with a citizen search and a separate Government Capacity Analyzer view.",
      purposeLink: "",
      processLink: "",
      outcomeLink: "https://delhi-icu-finder-adii.souravyadav122002.chatgpt.site/",
      outcomeLabel: "Open the tool",
      tags: ["Public data", "Healthcare", "Search", "AI assistant"],
      link: "https://delhi-icu-finder-adii.souravyadav122002.chatgpt.site/",
      linkLabel: "Open the tool",
      note: "",
      image: "",
      visual: "search",
    },
  ],


  /* ---------- 7. SKILLS aur TOOLS (alag-alag, FIIB framework ke hisaab se) ----------
     level: imaandari se likho. "Foundational" < "Working knowledge" < "Advanced".
     shownIn: kis project / kaam mein ye skill dikhti hai.
     Tools mein sirf woh software jo tu khud chala sakta hai.                       */
  skills: [
    { name: "Financial statement analysis",         level: "Foundational",      shownIn: "Titan Company Dashboard" },
    { name: "Forecasting & scenario analysis",      level: "Foundational",      shownIn: "Titan Company Dashboard" },
    { name: "Sales performance diagnosis",          level: "Foundational",      shownIn: "Mamaearth Sales Diagnosis Agent" },
    { name: "Business operations & revenue growth", level: "Working knowledge", shownIn: "Yog Sakshi Studio" },
    { name: "Financial tracking & payment records", level: "Working knowledge", shownIn: "Yog Sakshi Studio" },
    { name: "Client onboarding & retention",        level: "Working knowledge", shownIn: "Yog Sakshi Studio" },
    { name: "Event operations & coordination",      level: "Working knowledge", shownIn: "Lit Chowk Season 5" },
    { name: "Budgeting & location trade-offs",      level: "Foundational",      shownIn: "Build Your Acre" },
    { name: "Time value of money",                  level: "Foundational",      shownIn: "LinkedIn Learning certificate" },
  ],
  tools: [
    { name: "Python",               shownIn: "Titan Company Dashboard" },
    { name: "Streamlit & Plotly",   shownIn: "Titan Company Dashboard" },
    { name: "MS Excel",             shownIn: "" },     // kis project mein use kiya, woh yahan likho
    { name: "Google Sheets",        shownIn: "Yog Sakshi Studio" },
    { name: "Google Gemini (Gems)", shownIn: "Mamaearth Sales Diagnosis Agent" },
    { name: "ChatGPT",              shownIn: "Delhi ICU Finder" },
    { name: "Claude",               shownIn: "Build Your Acre" },
  ],


  /* ---------- 8. CERTIFICATIONS ----------
     verify: certificate ka online verify link (LinkedIn Learning pe "Share" se milta hai).
     Khali ho toh sirf PDF wala button dikhega.                                        */
  certifications: [
    {
      title: "International Business and Finance",
      issuer: "LinkedIn Learning",
      date: "Oct 2026",
      skills: ["Corporate Finance", "International Business"],
      extra: "2 hr 9 min course",
      file: "files/Certificate_International_Business_and_Finance.pdf",
      verify: "https://www.linkedin.com/learning/certificates/26235dd9df02c0b06a50fdf933b834955eb56389ffd08777efe1d29198a4b398",
    },
    {
      title: "Using the Time Value of Money to Make Financial Decisions",
      issuer: "LinkedIn Learning",
      date: "Oct 2026",
      skills: ["Time Value of Money"],
      extra: "3.4 CPE credits (NASBA)",
      file: "files/Certificate_Time_Value_of_Money.pdf",
      verify: "https://www.linkedin.com/learning/certificates/7e9ae9bfc03152a0f56890e7059d0aede221d36e2060e5cb50043fbbfcebd8fd",
    },
  ],


  /* ---------- 9. TESTIMONIALS ----------
     Abhi khali hai, isliye site pe ye section nahi dikhta.
     Kisi teacher/manager ka quote mile toh aise add karo:
     { quote: "Unki baat yahan", name: "Naam", title: "Designation, Company" },   */
  testimonials: [
  ],


  /* ---------- 10. PLAYGROUND: BALANCE SHEET GAME ----------
     side: "Asset", "Liability" ya "Equity" hi likhna.
     Amount aise rakho ki Assets ka total = Liabilities + Equity ka total,
     tabhi game ke end mein balance sheet "Balanced ✓" dikhayegi.        */
  game: {
    show: true,      // false likhoge toh game chhup jayega
    title: "Make the balance sheet balance",
    text: "A small chai brand's books are in a mess. Put each item on the right side of the balance sheet: tap a side, drag the card, or press A, L or E.",
    items: [
      { name: "Cash in bank",         side: "Asset",     amount: 200000, why: "money the business owns" },
      { name: "Inventory",            side: "Asset",     amount: 150000, why: "goods held for sale" },
      { name: "Trade receivables",    side: "Asset",     amount: 100000, why: "customers owe this to the business" },
      { name: "Machinery",            side: "Asset",     amount: 400000, why: "a long-term resource the business uses" },
      { name: "Prepaid rent",         side: "Asset",     amount: 50000,  why: "rent paid in advance, so the benefit is still to come" },
      { name: "Bank loan",            side: "Liability", amount: 300000, why: "borrowed money that must be repaid" },
      { name: "Trade payables",       side: "Liability", amount: 120000, why: "the business owes its suppliers" },
      { name: "Outstanding salaries", side: "Liability", amount: 30000,  why: "salary earned by staff but not yet paid" },
      { name: "Share capital",        side: "Equity",    amount: 300000, why: "money put in by the owners" },
      { name: "Retained earnings",    side: "Equity",    amount: 150000, why: "past profits kept in the business" },
    ],
  },


  /* ---------- 11. PLAYGROUND: PAISE KA CALCULATOR ---------- */
  playground: {
    show: true,      // false likhoge toh calculator chhup jayega
    title: "Money has a time value",
    text: "₹1 today is worth more than ₹1 tomorrow. Move the sliders to see how an amount grows, or what a future amount is worth today.",
  },


  /* ---------- 12. CONTACT ---------- */
  contact: {
    heading: "Let's talk",
    text: "Hiring for Corporate Finance, FP&A or Financial Analysis, or working on something I could help with? I'd like to hear about it.",
  },

};
