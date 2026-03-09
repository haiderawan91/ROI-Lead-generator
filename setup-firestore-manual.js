/**
 * Simple Firestore Setup - No Environment Variables Needed
 * 
 * INSTRUCTIONS:
 * 1. Replace YOUR_PROJECT_ID below with your Firebase project ID
 * 2. Run: node setup-firestore-manual.js
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// REPLACE WITH YOUR VALUES FROM .env.local

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const regions = {
  uk: {
    id: 'uk',
    country: 'United Kingdom',
    currency: '£',
    energyRate: 0.28,
    grantName: 'Boiler Upgrade Scheme (BUS)',
    grantValue: 7500,
    grantType: 'fixed',
    baseInstallationCost: 12000,
    efficiencyFactor: 0.6,
    qualifiers: [
      {
        id: 'district_heating',
        question: 'Are you in a District Heating area?',
        key: 'inDistrictHeating',
      },
      {
        id: 'property_type',
        question: 'Is your property a detached house?',
        key: 'isDetached',
      },
    ],
  },
  denmark: {
    id: 'denmark',
    country: 'Denmark',
    currency: 'DKK',
    energyRate: 2.75,
    grantName: 'Varmepumpepuljen (Heat Pump Pool)',
    grantValue: 27000,
    grantType: 'fixed',
    baseInstallationCost: 80000,
    efficiencyFactor: 0.65,
    qualifiers: [
      {
        id: 'heating_type',
        question: 'Do you currently use oil heating?',
        key: 'usesOilHeating',
      },
      {
        id: 'apartment',
        question: 'Do you own your property (not an apartment)?',
        key: 'ownsProperty',
      },
    ],
  },
  usa: {
    id: 'usa',
    country: 'United States',
    currency: '$',
    energyRate: 0.19,
    grantName: 'Residential Clean Energy Credit (Section 48)',
    grantValue: 0.3,
    grantType: 'percentage',
    baseInstallationCost: 25000,
    efficiencyFactor: 0.58,
    qualifiers: [
      {
        id: 'tax_liability',
        question: 'Do you have federal tax liability?',
        key: 'hasTaxLiability',
      },
      {
        id: 'ownership',
        question: 'Do you own your home (not rent)?',
        key: 'ownHome',
      },
    ],
  },
}

async function setup() {
  try {
    console.log('🚀 Adding regions to Firestore...\n')
    for (const [id, data] of Object.entries(regions)) {
      await setDoc(doc(db, 'global_regions', id), data)
      console.log(`✅ Added: ${id}`)
    }
    console.log('\n✅ Setup complete! Refresh your browser.\n')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

setup()
