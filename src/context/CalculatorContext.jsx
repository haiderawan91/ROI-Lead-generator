import React, { createContext, useState, useCallback } from 'react'

export const CalculatorContext = createContext()

export const CalculatorProvider = ({ children }) => {
  const [step, setStep] = useState('location') // location, homeDetails, qualifiers, leadCapture, results
  const [region, setRegion] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [monthlyBill, setMonthlyBill] = useState('')
  const [currentHeatingType, setCurrentHeatingType] = useState('') // Gas, Oil, Electric
  const [qualifierAnswers, setQualifierAnswers] = useState({})
  const [calculatedSavings, setCalculatedSavings] = useState(null)
  const [tenantId, setTenantId] = useState(null)

  const nextStep = useCallback(() => {
    const stepSequence = ['location', 'homeDetails', 'qualifiers', 'leadCapture', 'results']
    const currentIndex = stepSequence.indexOf(step)
    if (currentIndex < stepSequence.length - 1) {
      setStep(stepSequence[currentIndex + 1])
    }
  }, [step])

  const previousStep = useCallback(() => {
    const stepSequence = ['location', 'homeDetails', 'qualifiers', 'leadCapture', 'results']
    const currentIndex = stepSequence.indexOf(step)
    if (currentIndex > 0) {
      setStep(stepSequence[currentIndex - 1])
    }
  }, [step])

  const goToStep = useCallback((targetStep) => {
    setStep(targetStep)
  }, [])

  const updateQualifier = useCallback((qualifierId, value) => {
    setQualifierAnswers(prev => ({
      ...prev,
      [qualifierId]: value
    }))
  }, [])

  const resetForm = useCallback(() => {
    setStep('location')
    setRegion(null)
    setUserEmail('')
    setUserPhone('')
    setUserFirstName('')
    setMonthlyBill('')
    setCurrentHeatingType('')
    setQualifierAnswers({})
    setCalculatedSavings(null)
  }, [])

  const value = {
    // Step management
    step,
    setStep,
    nextStep,
    previousStep,
    goToStep,

    // Location & Tenant
    region,
    setRegion,
    tenantId,
    setTenantId,

    // User data
    userEmail,
    setUserEmail,
    userPhone,
    setUserPhone,
    userFirstName,
    setUserFirstName,

    // Home details
    monthlyBill,
    setMonthlyBill,
    currentHeatingType,
    setCurrentHeatingType,

    // Qualifiers
    qualifierAnswers,
    updateQualifier,

    // Results
    calculatedSavings,
    setCalculatedSavings,

    // Reset
    resetForm,
  }

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  )
}

export const useCalculator = () => {
  const context = React.useContext(CalculatorContext)
  if (!context) {
    throw new Error('useCalculator must be used within CalculatorProvider')
  }
  return context
}
