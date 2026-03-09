// Global regions logic packs - will be fetched from Firestore
// Structure template for reference

export const GLOBAL_REGIONS = {
  uk: {
    id: 'uk',
    country: 'United Kingdom',
    currency: '£',
    energyRate: 0.28, // per kWh
    grantName: 'Boiler Upgrade Scheme (BUS)',
    grantValue: 7500,
    grantType: 'fixed',
    baseInstallationCost: 12000, // Average heat pump installation
    efficiencyFactor: 0.6, // 60% reduction in energy consumption
    qualifiers: [
      {
        id: 'district_heating',
        question: 'Are you in a District Heating area?',
        key: 'inDistrictHeating'
      },
      {
        id: 'property_type',
        question: 'Is your property a detached house?',
        key: 'isDetached'
      }
    ]
  },
  denmark: {
    id: 'denmark',
    country: 'Denmark',
    currency: 'DKK',
    energyRate: 2.75, // per kWh
    grantName: 'Varmepumpepuljen (Heat Pump Pool)',
    grantValue: 27000,
    grantType: 'fixed',
    baseInstallationCost: 80000, // Average in DKK
    efficiencyFactor: 0.65,
    qualifiers: [
      {
        id: 'heating_type',
        question: 'Do you currently use oil heating?',
        key: 'usesOilHeating'
      },
      {
        id: 'apartment',
        question: 'Do you own your property (not an apartment)?',
        key: 'ownsProperty'
      }
    ]
  },
  usa: {
    id: 'usa',
    country: 'United States',
    currency: '$',
    energyRate: 0.19, // per kWh (national average)
    grantName: 'Residential Clean Energy Credit (Section 48)',
    grantValue: 0.30, // 30% percentage
    grantType: 'percentage',
    baseInstallationCost: 25000, // Average in USD
    efficiencyFactor: 0.58,
    qualifiers: [
      {
        id: 'tax_liability',
        question: 'Do you have federal tax liability?',
        key: 'hasTaxLiability'
      },
      {
        id: 'ownership',
        question: 'Do you own your home (not rent)?',
        key: 'ownHome'
      }
    ]
  }
}

export default GLOBAL_REGIONS
