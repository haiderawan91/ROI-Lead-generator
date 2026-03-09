/**
 * Firestore Data Initialization Script
 * 
 * Usage: npm install dotenv && node setup-firestore.js
 * 
 * This script adds all region and tenant documents to your Firestore database.
 * Run this after you have npm install complete and .env.local configured.
 */

import dotenv from 'dotenv'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

// Import Firebase config from your environment
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

// Validate config
if (!firebaseConfig.projectId) {
  console.error('❌ Error: Firebase credentials not loaded from .env.local')
  console.error('Make sure .env.local exists and has all required variables')
  process.exit(1)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Region data
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

// Tenant data (example)
const tenants = {
  'alex-solar-001': {
    businessName: 'Alex Solar Solutions',
    brandColor: '#00aa44',
    logoUrl: 'https://cdn.example.com/logos/alex-solar.png',
    bookingLink: 'https://calendly.com/alex-solar/consultation',
  },
  'solar-king-dk': {
    businessName: 'Solar King Denmark',
    brandColor: '#0055ff',
    logoUrl: 'https://cdn.example.com/logos/solar-king.png',
    bookingLink: 'https://calendly.com/solar-king/møde',
  },
}

async function setupFirestore() {
  try {
    console.log('🚀 Starting Firestore setup...\n')

    // Add regions to global_regions collection
    console.log('📍 Adding regions to global_regions collection...')
    for (const [regionId, regionData] of Object.entries(regions)) {
      await setDoc(doc(db, 'global_regions', regionId), regionData)
      console.log(`   ✅ Added region: ${regionId}`)
    }

    // Add tenants to tenants collection
    console.log('\n👥 Adding tenants to tenants collection...')
    for (const [tenantId, tenantData] of Object.entries(tenants)) {
      await setDoc(doc(db, 'tenants', tenantId), tenantData)
      console.log(`   ✅ Added tenant: ${tenantId}`)
    }

    console.log('\n✅ Firestore setup complete!\n')
    console.log('Your collections are now ready:')
    console.log('  • global_regions (3 documents)')
    console.log('  • tenants (2 documents)')
    console.log('  • leads (will be created on first submission)')
    console.log('\n🎉 Ready to run: npm run dev')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error setting up Firestore:', error)
    process.exit(1)
  }
}

setupFirestore()
