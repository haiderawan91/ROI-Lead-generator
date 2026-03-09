# GreenROI Widget - API Reference

## Table of Contents
1. [Components](#components)
2. [Hooks](#hooks)
3. [Context](#context)
4. [Utilities](#utilities)
5. [Configuration](#configuration)

---

## Components

### `GreenROIWidget`
Main orchestrator component that manages the entire 5-step flow.

**Props:**
```javascript
<GreenROIWidget 
  tenantId="alex-solar-001"    // Optional: Tenant identifier
  brandColor="#00aa44"         // Optional: Brand color (hex)
/>
```

**Usage:**
```jsx
import GreenROIWidget from './components/GreenROIWidget'
import { CalculatorProvider } from './context/CalculatorContext'

<CalculatorProvider>
  <GreenROIWidget tenantId="alex-solar-001" brandColor="#00aa44" />
</CalculatorProvider>
```

**Features:**
- Manages all 5 steps
- Applies tenant branding
- Triggers ROI calculations
- Shows progress indicator

---

### `LocationGate`
Step 1: Detects user location and confirms country.

**Exported from:** `src/components/LocationGate.jsx`

**Behavior:**
- Auto-detects location via IP (ipapi.co)
- Falls back to manual selection
- Updates context with selected region
- Advances to next step on confirmation

**Context Used:**
- `setRegion()` - Store selected region
- `nextStep()` - Advance to home details

---

### `HomeDetails`
Step 2: Collects monthly utility bill and current heating type.

**Exported from:** `src/components/HomeDetails.jsx`

**Input Fields:**
```javascript
monthlyBill: number          // Current monthly utility cost
currentHeatingType: string   // "Gas" | "Oil" | "Electric"
```

**Validation:**
- Both fields required
- Bill must be positive number

**Context Used:**
- `monthlyBill`, `setMonthlyBill`
- `currentHeatingType`, `setCurrentHeatingType`
- `nextStep()`, `previousStep()`

---

### `Qualifiers`
Step 3: Ask region-specific yes/no questions.

**Exported from:** `src/components/Qualifiers.jsx`

**Behavior:**
- Dynamically renders questions from `region.qualifiers`
- Stores yes/no answers in context
- Questions vary by region (UK, Denmark, USA)

**Context Used:**
- `region.qualifiers[]` - Get region questions
- `qualifierAnswers{}` - Store answers
- `updateQualifier(id, boolean)` - Update single answer

**Example Qualifiers:**
```javascript
// UK specific
"Are you in a District Heating area?"
"Is your property a detached house?"

// Denmark specific
"Do you currently use oil heating?"
"Do you own your property (not an apartment)?"

// USA specific
"Do you have federal tax liability?"
"Do you own your home (not rent)?"
```

---

### `LeadCapture`
Step 4: Collect user contact information.

**Exported from:** `src/components/LeadCapture.jsx`

**Input Fields:**
```javascript
userFirstName: string        // User's first name (required)
userEmail: string           // User's email (required)
userPhone: string           // User's phone (required)
```

**On Submit:**
- Validates all fields are filled
- Calls `submitLead()` Firestore function
- Advances to results on success
- Shows error message on failure

**Context Used:**
- `userFirstName`, `setUserFirstName`
- `userEmail`, `setUserEmail`
- `userPhone`, `setUserPhone`
- `nextStep()`

---

### `Results`
Step 5: Display 10-year savings breakdown and key metrics.

**Exported from:** `src/components/Results.jsx`

**Displays:**
- Total 10-year savings (big headline)
- Annual savings amount
- Payback period
- Installation cost (after grant)
- Daily loss (not taking action)
- Year-by-year table breakdown
- Grant information
- Efficiency percentage

**Context Used:**
- `calculatedSavings` - ROI calculation results
- `resetForm()` - Start over button

**Example Output:**
```javascript
{
  netCost: 4500,                    // Cost after grant
  annualSavings: 800,               // Annual savings amount
  paybackPeriod: "5.6",            // Years to break even
  totalSavings10Years: 47500,      // 10-year total
  dailyLoss: 13,                   // Lost per day not acting
  grantValue: 7500,                // Grant amount
  efficiency: "60",                 // Efficiency %
  yearByYear: [...]                // Year-by-year breakdown
}
```

---

## Hooks

### `useLocation()`
Detects user's location from IP and fetches region configuration.

**Exported from:** `src/hooks/useLocation.js`

**Returns:**
```javascript
{
  region: Object|null              // Region logic pack
  country: string|null             // Country code (GB, DK, US)
  loading: boolean                 // Detection in progress
  error: string|null               // Error message
  setLocationByRegion(regionId)    // Manual region selection
  detectLocationFromIP()            // Retry IP detection
}
```

**Example:**
```jsx
import useLocation from '../hooks/useLocation'

function MyComponent() {
  const { region, country, loading, error } = useLocation()
  
  if (loading) return <div>Detecting...</div>
  if (error) return <div>Error: {error}</div>
  
  return <div>Your country: {region.country}</div>
}
```

**How It Works:**
1. Fetches IP info from `https://ipapi.co/json/`
2. Maps country code to region ID (GB→uk, DK→denmark, US→usa)
3. Attempts to fetch region from Firestore
4. Falls back to local config if Firestore fails
5. Returns region data or error

**Supported Countries:**
- 🇬🇧 United Kingdom (GB) → "uk"
- 🇩🇰 Denmark (DK) → "denmark"
- 🇺🇸 United States (US/CA) → "usa"

---

## Context

### `CalculatorContext`
Global state management for the entire multi-step calculator.

**Exported from:** `src/context/CalculatorContext.jsx`

**Hook:** `useCalculator()`

**State:**
```javascript
{
  // Step management
  step: string,                    // Current step name
  setStep(step): void,
  nextStep(): void,                // Advance to next step
  previousStep(): void,            // Go back one step
  goToStep(step): void,            // Jump to specific step
  
  // Location & tenant
  region: Object|null,             // Region logic pack
  setRegion(region): void,
  tenantId: string|null,           // Current tenant ID
  setTenantId(id): void,
  
  // User data
  userEmail: string,
  setUserEmail(email): void,
  userPhone: string,
  setUserPhone(phone): void,
  userFirstName: string,
  setUserFirstName(name): void,
  
  // Home details
  monthlyBill: string|number,
  setMonthlyBill(amount): void,
  currentHeatingType: string,      // "Gas"|"Oil"|"Electric"
  setCurrentHeatingType(type): void,
  
  // Qualifiers
  qualifierAnswers: Object,        // { qualifierId: boolean, ... }
  updateQualifier(id, value): void,
  
  // Results
  calculatedSavings: Object|null,  // ROI calculation output
  setCalculatedSavings(roi): void,
  
  // Utilities
  resetForm(): void,               // Clear all and start over
}
```

**Usage:**
```jsx
import { useCalculator } from '../context/CalculatorContext'

function MyComponent() {
  const { step, region, monthlyBill, nextStep } = useCalculator()
  
  return (
    <div>
      <p>Step: {step}</p>
      <p>Region: {region?.country}</p>
      <button onClick={nextStep}>Next</button>
    </div>
  )
}
```

**Provider Setup:**
```jsx
import { CalculatorProvider } from './context/CalculatorContext'

<CalculatorProvider>
  <YourApp />
</CalculatorProvider>
```

---

## Utilities

### `calculations.js`
ROI calculation engine implementing your exact formulas.

**Functions:**

#### `calculateNetCost(baseInstallationCost, grantValue, grantType)`
Calculates cost after applying grant.

```javascript
calculateNetCost(12000, 7500, 'fixed')
// Returns: 4500

calculateNetCost(25000, 0.30, 'percentage')
// Returns: 17500 (cost minus 30%)
```

#### `calculateAnnualSavings(monthlyBill, efficiencyFactor)`
Annual savings from reduced energy bills.

```javascript
calculateAnnualSavings(150, 0.6)
// Returns: 1080 (150 * 12 * 0.6)
```

#### `calculatePaybackPeriod(netCost, annualSavings)`
Years until installation pays for itself.

```javascript
calculatePaybackPeriod(4500, 800)
// Returns: 5.625 years
```

#### `calculateROI(region, monthlyBill)`
**Main function** - Complete ROI calculation.

```javascript
const roi = calculateROI(region, 150)

// Returns:
{
  netCost: 4500,
  annualSavings: 800,
  paybackPeriod: "5.6",
  totalSavings10Years: 47500,
  dailyLoss: 13,
  scenarioA: 18900,              // 10-year status quo
  scenarioB: 12500,              // 10-year with heat pump
  grantValue: 7500,
  grantType: "fixed",
  currency: "£",
  energyRate: 0.28,
  efficiency: "60",
  yearByYear: [
    {
      year: 1,
      statusQuo: 1800,
      heatPump: 720,
      savings: 1080,
      cumulativeSavings: 0        // Negative first year (payoff)
    },
    // ... 9 more years
  ]
}
```

---

### `firestore.js`
Firestore database operations.

**Functions:**

#### `submitLead(leadData)`
Submit a new lead to Firestore.

```javascript
const result = await submitLead({
  tenantId: 'alex-solar-001',
  userFirstName: 'John',
  userEmail: 'john@example.com',
  userPhone: '+44 7000 000000',
  country: 'uk',
  monthlyBill: 150,
  calculatedSavings: 47500
})

// Returns:
{ 
  success: true, 
  leadId: "abc123xyz" 
}
```

#### `fetchTenantConfig(tenantId)`
Get tenant branding and configuration.

```javascript
const result = await fetchTenantConfig('alex-solar-001')

// Returns:
{
  success: true,
  data: {
    businessName: "Alex Solar Ltd",
    brandColor: "#00aa44",
    logoUrl: "https://...",
    bookingLink: "https://..."
  }
}
```

#### `fetchRegionLogic(regionId)`
Get region-specific logic pack.

```javascript
const result = await fetchRegionLogic('uk')

// Returns:
{
  success: true,
  data: {
    id: "uk",
    country: "United Kingdom",
    currency: "£",
    energyRate: 0.28,
    // ... rest of region data
  }
}
```

---

## Configuration

### Region Logic Packs
Located in `src/config/regions.js`

```javascript
GLOBAL_REGIONS = {
  uk: { ... },
  denmark: { ... },
  usa: { ... }
}
```

**Region Object Structure:**
```javascript
{
  id: string,                      // "uk", "denmark", "usa"
  country: string,                 // Display name
  currency: string,                // Currency symbol
  energyRate: number,              // Cost per kWh
  grantName: string,               // Grant program name
  grantValue: number,              // Grant amount or percentage
  grantType: "fixed"|"percentage", // Type of grant
  baseInstallationCost: number,    // Average install cost
  efficiencyFactor: number,        // Energy reduction (0-1)
  qualifiers: [
    {
      id: string,                  // Unique identifier
      question: string,            // Question to ask user
      key: string                  // Context key for answer
    }
  ]
}
```

### Firebase Configuration
Located in `src/config/firebase.js`

**Environment Variables Required:**
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

**Firestore Collections:**
- `global_regions` - Region logic packs
- `tenants` - Tenant configurations
- `leads` - Submitted leads

---

## Embedding the Widget

### As React Component
```jsx
import GreenROIWidget from './components/GreenROIWidget'
import { CalculatorProvider } from './context/CalculatorContext'

<CalculatorProvider>
  <GreenROIWidget 
    tenantId="alex-solar-001"
    brandColor="#00aa44"
  />
</CalculatorProvider>
```

### As Standalone Script
```html
<div id="greenroi-widget"></div>
<script src="greenroi-widget.umd.js"></script>
<script>
  GreenROI.embed('greenroi-widget', {
    tenantId: 'alex-solar-001',
    brandColor: '#00aa44'
  });
</script>
```

### URL Parameters (Demo Mode)
```
http://localhost:5173?tenantId=alex-solar-001&brandColor=%2300aa44
```

---

## Error Handling

All async operations return success/error objects:

```javascript
{
  success: boolean,
  data?: Object,      // If successful
  error?: string      // If failed
}
```

**Common Errors:**
- Firebase not initialized (check `.env.local`)
- Firestore collection missing
- Invalid tenant ID
- Network timeout
- Invalid region ID

Check browser console for detailed error messages.

---

## Performance Tips

1. **Region caching** - `useLocation` caches Firestore results
2. **Lazy loading** - Components only render needed step
3. **Memoization** - Context prevents unnecessary re-renders
4. **Bundle size** - Use `npm run build:widget` for embeddable version

---

## Version

**Current:** 1.0.0
**React:** 19.0.0
**Firebase SDK:** 10.7.1+
**Vite:** 5.0.0+
**Tailwind CSS:** 3.4.0+
