import React, { useState } from 'react'
import { useCalculator } from '../context/CalculatorContext'

export const HomeDetails = () => {
  const {
    region,
    monthlyBill,
    setMonthlyBill,
    currentHeatingType,
    setCurrentHeatingType,
    nextStep,
    previousStep,
  } = useCalculator()

  const heatingTypes = ['Gas', 'Oil', 'Electric']

  const handleContinue = () => {
    if (monthlyBill && currentHeatingType) {
      nextStep()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell us about your home</h2>
      <p className="text-gray-600 mb-6">This helps us calculate your personalized savings.</p>

      <div className="space-y-6">
        {/* Monthly Bill Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's your current monthly utility bill?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-600 font-semibold">
              {region?.currency}
            </span>
            <input
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              placeholder="e.g., 150"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Include electricity, heating, water, etc.</p>
        </div>

        {/* Heating Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What type of heating do you currently use?
          </label>
          <div className="space-y-2">
            {heatingTypes.map((type) => (
              <button
                key={type}
                onClick={() => setCurrentHeatingType(type)}
                className={`w-full p-3 text-left rounded-lg border-2 transition font-medium ${
                  currentHeatingType === type
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                🔥 {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={previousStep}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!monthlyBill || !currentHeatingType}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default HomeDetails
