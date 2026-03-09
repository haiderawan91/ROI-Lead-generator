# Project File Tree

```
d:\ROI LEAD GEN\
│
├─ 📄 Documentation (READ THESE FIRST)
│  ├─ QUICKSTART.md              ⭐ START HERE - Setup & running locally
│  ├─ PROJECT_SUMMARY.md         📋 Complete project overview
│  ├─ FIRESTORE_SETUP.md         🔥 Firestore schema & collections
│  ├─ API_REFERENCE.md           📚 Complete API documentation
│  ├─ README.md                  📖 General readme
│  └─ instructions.txt           📝 Original product requirements
│
├─ 📦 Configuration Files
│  ├─ package.json               NPM dependencies & scripts
│  ├─ vite.config.js             Vite development config
│  ├─ vite.widget.config.js      Embeddable widget build config
│  ├─ tailwind.config.js         Tailwind CSS theme
│  ├─ postcss.config.js          PostCSS plugins
│  ├─ .env.example               Firebase keys template
│  ├─ .gitignore                 Git ignore rules
│  └─ index.html                 HTML entry point
│
├─ 🚀 Setup Scripts
│  ├─ setup.sh                   Linux/Mac setup script
│  └─ setup.bat                  Windows setup script
│
└─ 📁 src/ (Source Code)
   │
   ├─ 📄 Entry Points
   │  ├─ main.jsx                Vite entry point
   │  ├─ App.jsx                 React app root
   │  ├─ embed.js                Embeddable widget wrapper
   │  └─ index.css               Global Tailwind styles
   │
   ├─ 🎨 components/ (5 Main UI Components)
   │  ├─ GreenROIWidget.jsx      ⭐ Main orchestrator & flow controller
   │  ├─ LocationGate.jsx        🌍 Step 1: Location detection
   │  ├─ HomeDetails.jsx         🏠 Step 2: Bill & heating type
   │  ├─ Qualifiers.jsx          ❓ Step 3: Region-specific questions
   │  ├─ LeadCapture.jsx         📧 Step 4: Email & phone capture
   │  └─ Results.jsx             📊 Step 5: 10-year savings breakdown
   │
   ├─ 🪝 hooks/
   │  └─ useLocation.js          📍 IP detection & region fetching
   │
   ├─ 🔄 context/
   │  └─ CalculatorContext.jsx   🧠 Global state management (Context API)
   │
   ├─ ⚙️ config/
   │  ├─ firebase.js             🔥 Firebase initialization
   │  └─ regions.js              🌐 Region logic packs (UK, DK, USA)
   │
   ├─ 🛠️ utils/
   │  ├─ calculations.js         📈 ROI calculation engine
   │  └─ firestore.js            💾 Firestore API wrappers
   │
   └─ 📁 assets/                 (For future images/logos)
```

---

## 📊 File Statistics

| Category | Files | Purpose |
|----------|-------|---------|
| Components | 6 | React UI components (5 steps + main) |
| Hooks | 1 | Custom React hook for location |
| Context | 1 | Global state management |
| Config | 2 | Firebase + regions data |
| Utils | 2 | Calculations + Firestore |
| Entry Points | 4 | App initialization & embedding |
| Config Files | 8 | Build, styles, deps |
| Docs | 5 | Complete documentation |
| Scripts | 2 | Setup automation |
| **Total** | **31** | **Complete production-ready app** |

---

## 🔑 Key Files Explained

### **Must Edit First**
1. `.env.local` ← Add your Firebase keys here (create this file)
2. `src/config/regions.js` ← Update with live Firestore data

### **Main Application Logic**
1. `src/components/GreenROIWidget.jsx` ← Flow orchestration
2. `src/context/CalculatorContext.jsx` ← State management
3. `src/utils/calculations.js` ← ROI formulas

### **Integration Points**
1. `src/config/firebase.js` ← Firebase setup
2. `src/utils/firestore.js` ← Firestore operations
3. `src/hooks/useLocation.js` ← Location detection

### **Styling & Config**
1. `tailwind.config.js` ← Theme colors & sizes
2. `src/index.css` ← Global styles
3. `postcss.config.js` ← CSS processing

### **Build & Deploy**
1. `package.json` ← Dependencies & scripts
2. `vite.config.js` ← Development build
3. `vite.widget.config.js` ← Embeddable build

---

## 🔄 Component Hierarchy

```
<App>
  └─ <CalculatorProvider>
     └─ <GreenROIWidget>
        ├─ LocationGate        (Step 1)
        ├─ HomeDetails         (Step 2)
        ├─ Qualifiers          (Step 3)
        ├─ LeadCapture         (Step 4)
        └─ Results             (Step 5)
```

All components share state via `CalculatorContext`.

---

## 📡 External Dependencies

```json
{
  "runtime": [
    "react@19.0.0",
    "react-dom@19.0.0",
    "firebase@10.7.1"
  ],
  "build": [
    "vite@5.0.8",
    "@vitejs/plugin-react@4.2.1",
    "tailwindcss@3.4.1",
    "postcss@8.4.32",
    "autoprefixer@10.4.16"
  ],
  "external": [
    "ipapi.co (free, no API key)"
  ]
}
```

---

## 🎯 Usage Paths

### **Path 1: Development**
```bash
npm install
npm run dev  # http://localhost:5173
```

### **Path 2: Production Web App**
```bash
npm install
npm run build
# Deploy dist/ folder
```

### **Path 3: Embeddable Widget**
```bash
npm install
npm run build:widget
# Use dist/greenroi-widget.umd.js in any website
```

---

## 📐 Code Organization Principles

- **Single Responsibility**: Each component handles one step
- **Separation of Concerns**: Logic in utils, UI in components
- **DRY**: No code duplication (utilities reused)
- **Context**: Central state (no prop drilling)
- **Hooks**: Custom logic extraction
- **Components**: Functional + hooks (modern React)
- **Styling**: Tailwind utility classes (no CSS files)
- **Configuration**: Externalized in config/ folder

---

## ✅ Checklist for Launching

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add Firebase credentials to `.env.local`
- [ ] Run `npm install`
- [ ] Run `npm run dev` and test all 5 steps
- [ ] Create Firestore collections (see FIRESTORE_SETUP.md)
- [ ] Add region documents to Firestore
- [ ] Add tenant documents to Firestore
- [ ] Test lead submission (check Firestore dashboard)
- [ ] Run `npm run build` for production
- [ ] Deploy to hosting provider
- [ ] Test embeddable version (if needed)
- [ ] Share widget code with installer partners
- [ ] Monitor leads in Firestore

---

## 🚀 You're Ready!

All files are in place. Just follow QUICKSTART.md to get started.

Happy building! ⚡🌍
