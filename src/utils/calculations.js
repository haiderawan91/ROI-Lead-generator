/**
 * ROI Calculation Engine
 * 
 * Formulas:
 * 1. Net_Cost = (Base_Installation_Cost - Grant_Value)
 * 2. Annual_Savings = (Monthly_Bill * 12 * Efficiency_Factor)
 * 3. Payback_Period = Net_Cost / Annual_Savings
 * 4. Scenario A (Status Quo): Cumulative cost with 5% yearly inflation
 * 5. Scenario B (GreenROI): Net_Cost + Reduced bills over 10 years
 * 6. Daily Loss: (Scenario A - Scenario B) / 3650
 */

/**
 * Calculate net cost after applying grant
 */
export const calculateNetCost = (baseInstallationCost, grantValue, grantType) => {
  if (grantType === 'percentage') {
    return baseInstallationCost * (1 - grantValue)
  }
  // Fixed grant
  return Math.max(0, baseInstallationCost - grantValue)
}

/**
 * Calculate annual savings from reduced energy bills
 */
export const calculateAnnualSavings = (monthlyBill, efficiencyFactor) => {
  return monthlyBill * 12 * efficiencyFactor
}

/**
 * Calculate payback period in years
 */
export const calculatePaybackPeriod = (netCost, annualSavings) => {
  if (annualSavings <= 0) return Infinity
  return netCost / annualSavings
}

/**
 * Calculate 10-year cumulative cost with 5% yearly inflation (Status Quo)
 */
export const calculateScenarioA = (monthlyBill) => {
  const inflationRate = 0.05
  let cumulativeCost = 0

  for (let year = 0; year < 10; year++) {
    const yearlyCost = monthlyBill * 12 * Math.pow(1 + inflationRate, year)
    cumulativeCost += yearlyCost
  }

  return cumulativeCost
}

/**
 * Calculate 10-year cost with heat pump (GreenROI Scenario)
 */
export const calculateScenarioB = (netCost, monthlyBill, efficiencyFactor) => {
  const inflationRate = 0.05
  const annualSavings = monthlyBill * 12 * efficiencyFactor
  const reducedMonthlyBill = monthlyBill * (1 - efficiencyFactor)
  
  let totalCost = netCost // Initial installation

  for (let year = 0; year < 10; year++) {
    const yearlyCost = reducedMonthlyBill * 12 * Math.pow(1 + inflationRate, year)
    totalCost += yearlyCost
  }

  return totalCost
}

/**
 * Calculate daily loss without taking action
 */
export const calculateDailyLoss = (scenarioA, scenarioB) => {
  return (scenarioA - scenarioB) / 3650 // 365 days * 10 years
}

/**
 * Main calculation function - returns comprehensive ROI breakdown
 */
export const calculateROI = (region, monthlyBill) => {
  if (!region || !monthlyBill) {
    return null
  }

  const {
    baseInstallationCost,
    grantValue,
    grantType,
    efficiencyFactor,
    currency,
    energyRate,
  } = region

  // Core calculations
  const netCost = calculateNetCost(baseInstallationCost, grantValue, grantType)
  const annualSavings = calculateAnnualSavings(monthlyBill, efficiencyFactor)
  const paybackPeriod = calculatePaybackPeriod(netCost, annualSavings)

  // 10-year scenarios
  const scenarioA = calculateScenarioA(monthlyBill)
  const scenarioB = calculateScenarioB(netCost, monthlyBill, efficiencyFactor)
  const totalSavings10Years = scenarioA - scenarioB
  const dailyLoss = calculateDailyLoss(scenarioA, scenarioB)

  // Year-by-year breakdown for chart
  const yearByYear = []
  const inflationRate = 0.05
  let cumulativeSavings = 0

  for (let year = 1; year <= 10; year++) {
    const statusQuoCost = monthlyBill * 12 * Math.pow(1 + inflationRate, year - 1)
    const heatPumpBill = monthlyBill * (1 - efficiencyFactor) * Math.pow(1 + inflationRate, year - 1)
    const yearlySavings = statusQuoCost - heatPumpBill
    
    // Subtract initial cost from year 1
    if (year === 1) {
      cumulativeSavings = yearlySavings - netCost
    } else {
      cumulativeSavings += yearlySavings
    }

    yearByYear.push({
      year,
      statusQuo: statusQuoCost,
      heatPump: heatPumpBill,
      savings: yearlySavings,
      cumulativeSavings: cumulativeSavings,  // Show negative values during payback period
    })
  }

  return {
    // Key metrics
    netCost: Math.round(netCost),
    annualSavings: Math.round(annualSavings),
    paybackPeriod: paybackPeriod === Infinity ? '> 10 years' : paybackPeriod.toFixed(1),
    
    // 10-year summary
    totalSavings10Years: Math.round(totalSavings10Years),
    dailyLoss: Math.round(dailyLoss),
    
    // Scenarios
    scenarioA: Math.round(scenarioA),
    scenarioB: Math.round(scenarioB),
    
    // Chart data
    yearByYear,
    
    // Grant info
    grantValue: grantType === 'percentage' 
      ? Math.round(baseInstallationCost * grantValue)
      : grantValue,
    grantType,
    
    // Energy metrics
    currency,
    energyRate,
    efficiency: (efficiencyFactor * 100).toFixed(0),
  }
}

export default calculateROI
