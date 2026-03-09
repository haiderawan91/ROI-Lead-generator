# Firestore Setup Instructions

## Collections Structure

Create these three collections in your Firebase Firestore console.

---

## 1. `global_regions` Collection

**Purpose**: Store region-specific logic packs (grants, energy rates, qualifiers)

### Document 1: `uk`
```json
{
  "id": "uk",
  "country": "United Kingdom",
  "currency": "£",
  "energyRate": 0.28,
  "grantName": "Boiler Upgrade Scheme (BUS)",
  "grantValue": 7500,
  "grantType": "fixed",
  "baseInstallationCost": 12000,
  "efficiencyFactor": 0.6,
  "qualifiers": [
    {
      "id": "district_heating",
      "question": "Are you in a District Heating area?",
      "key": "inDistrictHeating"
    },
    {
      "id": "property_type",
      "question": "Is your property a detached house?",
      "key": "isDetached"
    }
  ]
}
```

### Document 2: `denmark`
```json
{
  "id": "denmark",
  "country": "Denmark",
  "currency": "DKK",
  "energyRate": 2.75,
  "grantName": "Varmepumpepuljen (Heat Pump Pool)",
  "grantValue": 27000,
  "grantType": "fixed",
  "baseInstallationCost": 80000,
  "efficiencyFactor": 0.65,
  "qualifiers": [
    {
      "id": "heating_type",
      "question": "Do you currently use oil heating?",
      "key": "usesOilHeating"
    },
    {
      "id": "apartment",
      "question": "Do you own your property (not an apartment)?",
      "key": "ownsProperty"
    }
  ]
}
```

### Document 3: `usa`
```json
{
  "id": "usa",
  "country": "United States",
  "currency": "$",
  "energyRate": 0.19,
  "grantName": "Residential Clean Energy Credit (Section 48)",
  "grantValue": 0.3,
  "grantType": "percentage",
  "baseInstallationCost": 25000,
  "efficiencyFactor": 0.58,
  "qualifiers": [
    {
      "id": "tax_liability",
      "question": "Do you have federal tax liability?",
      "key": "hasTaxLiability"
    },
    {
      "id": "ownership",
      "question": "Do you own your home (not rent)?",
      "key": "ownHome"
    }
  ]
}
```

---

## 2. `tenants` Collection

**Purpose**: Store tenant (installer) configurations and branding

### Example Document: `alex-solar-001`
```json
{
  "businessName": "Alex Solar Solutions",
  "brandColor": "#00aa44",
  "logoUrl": "https://cdn.example.com/logos/alex-solar.png",
  "bookingLink": "https://calendly.com/alex-solar/consultation"
}
```

### Example Document: `solar-king-dk`
```json
{
  "businessName": "Solar King Denmark",
  "brandColor": "#0055ff",
  "logoUrl": "https://cdn.example.com/logos/solar-king.png",
  "bookingLink": "https://calendly.com/solar-king/møde"
}
```

**Field Types**:
- `businessName`: string (display name of the installer company)
- `brandColor`: string (hex color code for widget buttons and accents)
- `logoUrl`: string (optional, URL to company logo)
- `bookingLink`: string (Calendly or other booking system URL)

---

## 3. `leads` Collection

**Purpose**: Auto-stores submitted leads (created by widget submission)

**Document Structure** (auto-generated):
```json
{
  "tenantId": "alex-solar-001",
  "userFirstName": "John",
  "userEmail": "john.smith@example.com",
  "userPhone": "+44 7700 123456",
  "country": "uk",
  "monthlyBill": 150,
  "calculatedSavings": 47500,
  "timestamp": "2026-01-16T14:30:00.000Z",
  "createdAt": "2026-01-16T14:30:00.000Z"
}
```

**Field Types**:
- `tenantId`: string (links to tenants collection)
- `userFirstName`: string (user's first name)
- `userEmail`: string (user's email)
- `userPhone`: string (user's phone number)
- `country`: string (region ID: "uk", "denmark", "usa")
- `monthlyBill`: number (user's current monthly bill)
- `calculatedSavings`: number (10-year total savings)
- `timestamp`: Firestore timestamp (auto-set)
- `createdAt`: string (ISO format, auto-set)

---

## Firestore Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow anyone to read global_regions and tenants
    match /global_regions/{document=**} {
      allow read;
    }
    
    match /tenants/{document=**} {
      allow read;
    }
    
    // Allow unauthenticated writes to leads collection
    match /leads/{document=**} {
      allow create;
      allow read: if request.auth != null;
    }
  }
}
```

---

## Steps to Setup in Firebase Console

1. **Go to Firebase Console** → `https://console.firebase.google.com/`
2. **Select your project**
3. **Go to Firestore Database**
4. **Click "Create Database"** (if not exists)
5. **Click "Start Collection"** and create `global_regions`
6. **Add the three region documents** (uk, denmark, usa)
7. **Create `tenants` collection** and add your tenant documents
8. **Leave `leads` collection empty** (auto-created on first submission)
9. **Copy your Firebase config keys** to `.env.local`

---

## Field Definitions

### `global_regions` Fields
| Field | Type | Example | Description |
|-------|------|---------|-------------|
| id | string | "uk" | Region identifier |
| country | string | "United Kingdom" | Country name |
| currency | string | "£" | Currency symbol |
| energyRate | number | 0.28 | Cost per kWh |
| grantName | string | "BUS Grant" | Grant program name |
| grantValue | number | 7500 | Grant amount (or percentage if 0-1) |
| grantType | string | "fixed" | "fixed" or "percentage" |
| baseInstallationCost | number | 12000 | Average installation cost |
| efficiencyFactor | number | 0.6 | Energy reduction (0-1) |
| qualifiers | array | [...] | Region-specific questions |

### `tenants` Fields
| Field | Type | Example | Description |
|-------|------|---------|-------------|
| businessName | string | "Alex Solar Ltd" | Company name |
| brandColor | string | "#00aa44" | Widget button color (hex) |
| logoUrl | string | "https://..." | Company logo URL |
| bookingLink | string | "https://calendly.com/..." | Booking system link |

### `leads` Fields
| Field | Type | Example | Description |
|-------|------|---------|-------------|
| tenantId | string | "alex-solar-001" | Which tenant owns this lead |
| userFirstName | string | "John" | Lead's first name |
| userEmail | string | "john@example.com" | Lead's email |
| userPhone | string | "+44 7000 000000" | Lead's phone |
| country | string | "uk" | User's region |
| monthlyBill | number | 150 | Current bill amount |
| calculatedSavings | number | 47500 | 10-year savings total |
| timestamp | timestamp | (auto) | When lead was submitted |
| createdAt | string | "2026-01-16T..." | ISO timestamp |

---

## Testing Locally

Once you've set up Firestore and added your credentials to `.env.local`:

```bash
npm run dev
```

The widget will:
1. ✅ Auto-detect your location via IP
2. ✅ Fetch region logic from Firestore
3. ✅ Load tenant config if `tenantId` is provided
4. ✅ Calculate ROI on form submission
5. ✅ Submit leads to your `leads` collection

---

## Troubleshooting

**Widget shows "Could not detect location"**
- Check `.env.local` has valid Firebase credentials
- Ensure `global_regions` collection exists with at least one document
- Try manual location entry

**Leads not appearing in Firestore**
- Check Firestore Rules allow `create` on `leads` collection
- Verify `.env.local` has correct `projectId`
- Check browser console for error messages

**Region data not loading**
- Ensure document IDs in `global_regions` match exactly: "uk", "denmark", "usa"
- Check all required fields are present
- Verify data types match schema above
