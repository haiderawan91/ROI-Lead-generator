import React, { useState } from 'react'
import { useCalculator } from '../context/CalculatorContext'
import { submitLead } from '../utils/firestore'
import calculateROI from '../utils/calculations'

export const LeadCapture = () => {
  const {
    region,
    tenantId,
    userFirstName,
    setUserFirstName,
    userEmail,
    setUserEmail,
    userPhone,
    setUserPhone,
    monthlyBill,
    setCalculatedSavings,
    nextStep,
    previousStep,
  } = useCalculator()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Calculate ROI first
      const roi = calculateROI(region, parseFloat(monthlyBill))
      setCalculatedSavings(roi)

      const leadData = {
        tenantId: tenantId || 'direct',
        userFirstName,
        userEmail,
        userPhone,
        country: region?.id,
        monthlyBill: parseFloat(monthlyBill),
        calculatedSavings: roi.totalSavings10Years,
      }

      const result = await submitLead(leadData)

      if (result.success) {
        // Show results
        nextStep()
      } else {
        setError(result.error || 'Failed to submit. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = userFirstName && userEmail && userPhone

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Unlock your full savings report</h2>
      <p className="text-gray-600 mb-6">Enter your details to see your personalized 10-year roadmap.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
            placeholder="John"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="john@example.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder="+44 7000 000000"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-800">
          <p className="font-semibold mb-1">✓ Your data is secure</p>
          <p>We'll send you the detailed report and you'll hear from our partner installer.</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={previousStep}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition"
          >
            {isSubmitting ? 'Submitting...' : 'See My Savings'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LeadCapture
