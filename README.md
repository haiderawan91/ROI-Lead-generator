# GreenROI Global - React 19 Widget

A multi-tenant, location-intelligent lead generation widget for green energy installers.

## Features

✅ **Location Detection** - IP-based detection with manual fallback
✅ **Dynamic Logic Packs** - Country-specific calculations and qualifiers
✅ **ROI Calculator** - 10-year financial projections with loss aversion metrics
✅ **Multi-tenant** - Fully embeddable with custom branding per tenant
✅ **Real Firebase** - Firestore integration for leads and configuration
✅ **Responsive UI** - React 19 + Tailwind CSS

## Project Structure

```
src/
├── components/           # React components
│   ├── LocationGate.jsx      # Step 1: Country detection
│   ├── HomeDetails.jsx       # Step 2: Bill & heating type
│   ├── Qualifiers.jsx        # Step 3: Region-specific questions
│   ├── LeadCapture.jsx       # Step 4: Email/phone capture
│   ├── Results.jsx           # Step 5: 10-year breakdown
│   └── GreenROIWidget.jsx    # Main orchestrator
├── config/
│   ├── firebase.js           # Firebase initialization
│   └── regions.js            # Region logic packs (UK, DK, USA)
├── context/
│   └── CalculatorContext.jsx # State management for multi-step flow
├── hooks/
│   └── useLocation.js        # IP detection + region fetching
├── utils/
│   ├── calculations.js       # ROI calculation engine
│   └── firestore.js          # Firestore API wrappers
├── App.jsx
├── main.jsx
├── embed.js                  # Standalone embed script
└── index.css
```

## Installation

```bash
npm install
```

## Running Locally

### Development Mode
```bash
npm run dev
```

Access at `http://localhost:5173`

### With URL Parameters (Tenant Testing)
```
http://localhost:5173?tenantId=alex-solar-001&brandColor=%2300aa44
```

## Building

### Development Build
```bash
npm run build
```

### Embeddable Widget Build
```bash
npm run build:widget
```

Creates a standalone JavaScript bundle that can be embedded in any website.

## Firebase Setup

1. Create a `.env.local` file in the root directory
2. Add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

## Firestore Collections

### `global_regions`
Stores logic packs for each country:
- `uk`, `denmark`, `usa`
- Fields: currency, energyRate, grantName, grantValue, grantType, qualifiers

### `tenants`
Stores tenant configurations:
- Document ID: Unique tenant ID (e.g., `alex-solar-001`)
- Fields: businessName, brandColor, logoUrl, bookingLink

### `leads`
Stores submitted leads:
- Fields: tenantId, userEmail, userPhone, country, calculatedSavings, timestamp

## Embedding the Widget

### Option 1: As a React Component
```jsx
import GreenROIWidget from './components/GreenROIWidget'

<GreenROIWidget tenantId="alex-solar-001" brandColor="#00aa44" />
```

### Option 2: Standalone Script
```html
<div id="greenroi-widget"></div>
<script src="https://greenroi.com/widget.js"></script>
<script>
  GreenROI.embed('greenroi-widget', {
    tenantId: 'alex-solar-001',
    brandColor: '#00aa44'
  });
</script>
```

## Calculation Formulas

### Net Cost
```
Net_Cost = Base_Installation_Cost - Grant_Value  (for fixed)
Net_Cost = Base_Installation_Cost * (1 - Grant_Percentage)  (for percentage)
```

### Annual Savings
```
Annual_Savings = Monthly_Bill * 12 * Efficiency_Factor
```

### Payback Period
```
Payback_Period = Net_Cost / Annual_Savings
```

### 10-Year Comparison
```
Scenario A (Status Quo): Bill * 12 * (1.05^year) for 10 years
Scenario B (GreenROI): Net_Cost + Reduced_Bill * 12 * (1.05^year) for 10 years
Daily Loss: (Scenario A - Scenario B) / 3650
```

## 2026 Region Data

### UK
- Grant: £7,500 (Fixed BUS Grant)
- Energy Rate: £0.28/kWh
- Base Install Cost: £12,000

### Denmark
- Grant: 27,000 DKK (Varmepumpepuljen)
- Energy Rate: 2.75 DKK/kWh
- Base Install Cost: 80,000 DKK

### USA
- Grant: 30% (Section 48E Lease Credit)
- Energy Rate: $0.19/kWh
- Base Install Cost: $25,000

## License

Proprietary - GreenROI Global 2026
