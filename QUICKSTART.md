# 🚀 GreenROI Widget - Quick Start Guide

## ✅ Project Complete!

Your complete React 19 multi-tenant lead generation widget has been built. Here's what's ready:

---

## 📁 What You Have

### **Core Features**
- ✅ 5-step widget flow (Location → Home Details → Qualifiers → Lead Capture → Results)
- ✅ Free IP geolocation (ipapi.co - no API key required)
- ✅ ROI calculation engine with your exact formulas
- ✅ Firebase Firestore integration (ready for your credentials)
- ✅ Multi-tenant branding system (custom colors per tenant)
- ✅ Responsive Tailwind CSS design
- ✅ Embeddable script for any website

### **Project Structure**
```
d:\ROI LEAD GEN\
├── src/
│   ├── components/          # 5 main UI components
│   ├── context/             # State management
│   ├── hooks/               # useLocation hook
│   ├── config/              # Firebase + regions
│   ├── utils/               # Calculations + Firestore
│   ├── App.jsx
│   ├── main.jsx
│   ├── embed.js             # Embeddable wrapper
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── index.html
├── .env.example
└── README.md
```

---

## 🔧 Next: Setup & Firebase Keys

### **Step 1: Install Dependencies**
```bash
cd "d:\ROI LEAD GEN"
npm install
```

### **Step 2: Create `.env.local`**
```bash
# Create a new file: .env.local
```

Add your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### **Step 3: Run Locally**
```bash
npm run dev
```
Opens at: `http://localhost:5173`

---

## 🎨 Testing with Tenants

### **Test with Custom Branding**
```
http://localhost:5173?tenantId=alex-solar-001&brandColor=%2300aa44
```

Parameters:
- `tenantId` - Your tenant's unique ID
- `brandColor` - Hex color code (URL-encoded, %23 = #)

---

## 📊 Calculation Engine (Ready)

Your formulas are implemented:

**1. Net Cost (after grant)**
```
Fixed grant: Cost - Grant
Percentage grant: Cost * (1 - 0.30)
```

**2. Annual Savings**
```
Monthly_Bill * 12 * Efficiency_Factor
```

**3. Payback Period**
```
Net_Cost / Annual_Savings
```

**4. 10-Year Projection**
```
Scenario A: Bills with 5% inflation
Scenario B: Bills after heat pump + installation cost
Daily Loss: (A - B) / 3650
```

---

## 🌍 Supported Regions (Built-In)

### **UK**
- Grant: £7,500 (Fixed)
- Energy: £0.28/kWh
- Install Cost: £12,000

### **Denmark**
- Grant: 27,000 DKK (Fixed)
- Energy: 2.75 DKK/kWh
- Install Cost: 80,000 DKK

### **USA**
- Grant: 30% (Credit)
- Energy: $0.19/kWh
- Install Cost: $25,000

---

## 🔌 Firestore Collections (Setup Required)

Create these in your Firebase console:

### **1. `global_regions`** (Document per country)
```javascript
// Document ID: "uk", "denmark", "usa"
{
  id: "uk",
  country: "United Kingdom",
  currency: "£",
  energyRate: 0.28,
  grantName: "Boiler Upgrade Scheme",
  grantValue: 7500,
  grantType: "fixed",
  baseInstallationCost: 12000,
  efficiencyFactor: 0.6,
  qualifiers: [
    { id: "district_heating", question: "...", key: "inDistrictHeating" }
  ]
}
```

### **2. `tenants`** (One doc per tenant)
```javascript
// Document ID: "alex-solar-001"
{
  businessName: "Alex Solar Ltd",
  brandColor: "#00aa44",
  logoUrl: "https://...",
  bookingLink: "https://calendly.com/..."
}
```

### **3. `leads`** (Auto-created on submission)
```javascript
{
  tenantId: "alex-solar-001",
  userFirstName: "John",
  userEmail: "john@example.com",
  userPhone: "+44 7000 000000",
  country: "uk",
  monthlyBill: 150,
  calculatedSavings: 45000,
  timestamp: "2026-01-16T10:30:00Z"
}
```

---

## 📦 Building for Deployment

### **Production Build**
```bash
npm run build
```
Creates optimized bundle in `dist/`

### **Embeddable Widget Build**
```bash
npm run build:widget
```
Creates standalone script: `dist/greenroi-widget.umd.js`

### **Embed in Any Website**
```html
<div id="greenroi-widget"></div>
<script src="https://your-domain.com/greenroi-widget.umd.js"></script>
<script>
  GreenROI.embed('greenroi-widget', {
    tenantId: 'alex-solar-001',
    brandColor: '#00aa44'
  });
</script>
```

---

## 🔌 Location Detection

**How it works:**
1. On load, detects user's IP using free **ipapi.co** service
2. Maps country code to region (GB→UK, DK→Denmark, US→USA)
3. Fetches region logic from Firestore
4. Falls back to manual zip code entry if detection fails

**No API key required** ✅

---

## 🎯 What's Next?

1. **Add Firebase Keys** → Create `.env.local` with your credentials
2. **Setup Firestore Collections** → Create documents in your Firebase console
3. **Run Locally** → `npm run dev`
4. **Test the Flow** → Go through all 5 steps
5. **Build & Deploy** → Use either standard or embeddable builds
6. **Embed on Tenant Sites** → Add the script to partner websites

---

## 📞 API Summary

### **useLocation Hook**
```javascript
const { region, country, loading, error, setLocationByRegion } = useLocation()
```

### **useCalculator Context**
```javascript
const { 
  step, nextStep, previousStep,
  region, monthlyBill, qualifierAnswers,
  calculatedSavings, resetForm
} = useCalculator()
```

### **Firestore API**
```javascript
await submitLead(leadData)
await fetchTenantConfig(tenantId)
await fetchRegionLogic(regionId)
```

### **Calculation API**
```javascript
const roi = calculateROI(region, monthlyBill)
// Returns: { netCost, annualSavings, paybackPeriod, totalSavings10Years, dailyLoss, yearByYear... }
```

---

## 📝 Notes

- **Location Detection**: Uses free ipapi.co service (no rate limiting for reasonable usage)
- **State Management**: React Context API handles all multi-step state
- **Styling**: Tailwind CSS with dynamic brand color injection
- **Real-time**: All data flows from real Firestore (when configured)

---

**Ready to launch? Let's go!** 🚀
