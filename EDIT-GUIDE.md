# Website Edit Guide — Sarthak Mishra

Ye guide do kaam ke liye hai:

1. **Pehli baar website live karna** (ek hi baar, ~15 minute)
2. **Baad mein kuch bhi badalna** (har baar ~2 minute, Claude ki zaroorat nahi)

---

## Folder mein kya hai

| File / folder | Kya hai | Kya tujhe edit karna hai? |
|---|---|---|
| `content.js` | Website ka **saara text**: naam, headline, experience, projects, skills, certificates, contact | **Haan, sirf yahi** |
| `assets/` | Photos (`sarthak-portrait.webp`, `sarthak-standing.webp`) aur link-preview image | Sirf photo badalni ho tab |
| `files/` | Resume aur certificate PDFs | Naya resume/certificate daalna ho tab |
| `index.html`, `styles.css`, `script.js` | Design aur code | Nahi (zaroorat nahi padegi) |

---

## Part 1: Pehli baar website live karna

### Step 1: GitHub pe files daalo
1. **github.com** kholo, account nahi hai toh **Sign up** kar lo.
2. Upar right mein **+** → **New repository**.
3. Repository name: `sarthak-mishra` (ya jo pasand ho). **Public** select karo. **Create repository** dabao.
4. Naye page pe **"uploading an existing file"** link pe click karo.
5. Zip file extract karo. `sarthak-portfolio` folder ke **andar** jo bhi hai (`assets`, `files`, `index.html`, `content.js`, `script.js`, `styles.css`, `favicon.svg`, `EDIT-GUIDE.md`, `README.md`) sab select karke browser mein drag-drop kar do.
   - Folder ko nahi, folder ke **andar ki cheezein** drag karni hain.
   - Chrome ya Edge use karo, folders sahi se upload hote hain.
6. Neeche **Commit changes** dabao.
7. Check: repo ke main page pe seedha `index.html` dikhna chahiye, kisi folder ke andar nahi.

### Step 2: GitHub Pages se live karo
1. Apni repo ke page pe upar **Settings** dabao.
2. Left side mein **Pages** pe click karo.
3. **Source** mein **Deploy from a branch** chuno.
4. Branch: **main**, folder: **/ (root)**. **Save** dabao.
5. 1-2 minute baad isi page pe upar tera link dikhega: kuch aisa `tera-username.github.io/sarthak-mishra`.

Bas. Ab jab bhi GitHub pe koi file badlega, GitHub khud website update kar dega.
(Repo **Public** honi chahiye, tabhi free mein Pages chalta hai.)

---

## Part 2: Kuch bhi badalna (2 minute)

1. **github.com** → apni repo → **`content.js`** pe click.
2. Right side mein **pencil icon** (Edit this file) dabao.
3. Jo text badalna hai, badlo.
4. Upar right **Commit changes…** → phir se **Commit changes**.
5. 1-2 minute ruko, phir apni site kholke refresh karo (laptop pe `Ctrl + Shift + R`). Kabhi 5 minute bhi lag sakte hain.
   Browser purani files 10 minute tak yaad rakh sakta hai, isliye site aadhi purani aadhi nayi dikhe toh `Ctrl + Shift + R` ya Incognito window use karo.

### 3 rules (inhe follow karoge toh kuch nahi tootega)
1. Har text `"double quotes"` ke andar hota hai.
2. Har item ke baad comma `,` lagta hai.
3. Text ke andar `"` chahiye toh `\"` likho, ya `'` use kar lo.

---

## Common changes (copy-paste examples)

### Headline badalni hai
```js
headline: "Turning numbers into *decisions*.",
```
`*star ke beech*` wala shabd italic aur rangeen dikhta hai.

### Naya project add karna
`projects: [` ke andar aakhri project ke `},` ke baad ye block paste karo aur text badlo:
```js
    {
      title: "Titan Company Dashboard",
      kind: "Python dashboard · Financial Insights",
      summary: "Ek line mein project kya hai.",
      details: [
        "Pehla point.",
        "Doosra point.",
      ],
      tags: ["Python", "Financial analysis"],
      link: "https://project-ka-link.com",
      linkLabel: "Open the dashboard",
    },
```
Link nahi hai toh `link: "",` likh do, button nahi dikhega.

### Naya certificate add karna
1. GitHub pe `files` folder kholo → **Add file → Upload files** → PDF daalo → **Commit changes**.
   (File ke naam mein space mat rakho, jaise `Certificate_Excel.pdf`.)
2. `content.js` mein `certifications: [` ke andar ye block add karo:
```js
    {
      title: "Certificate ka naam",
      issuer: "Kisne diya (jaise NSE Academy)",
      date: "Nov 2026",
      skills: ["Skill 1", "Skill 2"],
      extra: "Koi extra line (ya khali chhod do)",
      file: "files/Certificate_Excel.pdf",
    },
```

### Resume update karna
Naya resume **same naam** se upload karo: `Sarthak_Mishra_Resume.pdf`, `files` folder mein. GitHub purani file replace kar dega. Code mein kuch nahi badalna.

### Photo badalna
`assets` folder mein nayi photo upload karo, phir `content.js` mein:
```js
  photo: "assets/nayi-photo.jpg",
```

### Testimonial add karna
Abhi khali hai, isliye site pe ye section dikhta hi nahi. Kisi teacher ya manager ka quote mile toh:
```js
  testimonials: [
    { quote: "Unki baat yahan.", name: "Naam", title: "Designation, Company" },
  ],
```

### Resume update karna (naya tarika)
1. Naya resume PDF ko **same naam** se (`Sarthak_Mishra_Resume.pdf`) `files` folder mein replace karo.
2. `content.js` mein `resume:` wali line mein `?v=2` ko `?v=3` kar do (har baar number badhao), taaki logon ko purana resume na dikhe.

### Titan dashboard ka link daalna
`content.js` mein Titan wale project mein:
```js
      link: "https://tera-dashboard-ka-link",
```
Link daalte hi card pe "Open the dashboard" button aa jayega.

### Project ki picture lagana
1. Screenshot ko GitHub Desktop wale folder mein `assets/projects` ke andar daalo (naam mein space nahi, jaise `titan-dashboard.jpg`).
2. `content.js` mein us project ke andar likho:
```js
      image: "assets/projects/titan-dashboard.jpg",
```
`image` khali ho toh `visual` wala animated chitra dikhta hai (`"agent"`, `"dashboard"` ya `"search"`).

### Ghoomti heading ke shabd
```js
  headlineWords: ["decisions", "strategy", "growth", "insight"],
```
Ek hi shabd rakhoge toh heading ghoomegi nahi.

### Photo ke aas-paas tairte terms
```js
  floatingTerms: ["NPV", "IRR", "ROE", "P/E", "EBITDA", "WACC", "₹", "%", "FCF", "Σ"],
```
Zyada se zyada 10 dikhte hain.

### Balance sheet game
`game:` ke andar `items` hain. Har item mein `side` sirf `"Asset"`, `"Liability"` ya `"Equity"` hona chahiye.
Amount aise rakhna ki Assets ka total = Liabilities + Equity ka total, warna end mein "Balanced ✓" nahi aayega.
Game band karna ho toh `show: false,`.

### Kuch hatana / chhupana
- Phone number hatana: `phone: "",`
- Playground ka calculator chhupana: `playground:` ke andar `show: false,` (game aur calculator dono band karoge toh poora Playground section chhup jayega)
- Koi skill, project ya bullet hatana: uski poori line (ya poora `{ ... },` block) delete kar do.

---

## Galti ho jaye toh?

- Website pe ek **laal box** dikhega jo batayega `content.js` ki **kaunsi line** ke paas galti hai. Usually ek comma chhoot gaya hota hai ya quote band nahi hua.
- Line numbers GitHub editor mein left side dikhte hain.
- Samajh na aaye toh: `content.js` ka poora text copy karo, kisi bhi AI (Claude ka free plan, ChatGPT, Gemini) ko do aur bolo: *"Is JavaScript file mein syntax error fix karo, text mat badlo."* Fixed version wapas paste karke commit kar do.
- Purana version wapas laana ho: GitHub pe `content.js` kholo → upar **History** → jo version theek chal raha tha uspe click → **View file** ke andar ka text copy karo → wapas `content.js` edit karke paste aur commit kar do.

---

## Optional: WhatsApp/LinkedIn link preview
Site live hone ke baad `index.html` kholo, ye line dhundo:
```html
<meta property="og:image" content="assets/og-image.jpg">
```
Aur `assets/og-image.jpg` ki jagah poora link daal do:
```html
<meta property="og:image" content="https://tera-username.github.io/sarthak-mishra/assets/og-image.jpg">
```
(Apna asli site link use karna.) Isse link share karne pe photo wala preview card aayega.

## Optional: Colours ya fonts badalna
`styles.css` ki shuru ki lines mein saare colours hain (`--paper`, `--forest`, `--rust` …). Wahan hex code badloge toh poori site ka colour badal jayega.
