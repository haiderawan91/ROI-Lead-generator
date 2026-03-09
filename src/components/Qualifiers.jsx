import React from 'react'
import { useCalculator } from '../context/CalculatorContext'

export const Qualifiers = () => {
  const {
    region,
    qualifierAnswers,
    updateQualifier,
    nextStep,
    previousStep,
  } = useCalculator()

  if (!region) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600">Loading region data...</p>
      </div>
    )
  }

  if (!region.qualifiers || region.qualifiers.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
          <p className="text-yellow-800">No qualifiers available for this region.</p>
        </div>
        <button
          onClick={nextStep}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Continue to Next Step
        </button>
      </div>
    )
  }

  const handleContinue = () => {
    nextStep()
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">A few quick questions</h2>
      <p className="text-gray-600 mb-6">These help us refine your savings estimate.</p>

      <div className="space-y-6">
        {region.qualifiers.map((qualifier) => (
          <div key={qualifier.id}>
            <p className="block text-sm font-medium text-gray-700 mb-3">{qualifier.question}</p>
            <div className="flex gap-3">
              <button
                onClick={() => updateQualifier(qualifier.id, true)}
                className={`flex-1 p-3 rounded-lg border-2 font-semibold transition ${
                  qualifierAnswers[qualifier.id] === true
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => updateQualifier(qualifier.id, false)}
                className={`flex-1 p-3 rounded-lg border-2 font-semibold transition ${
                  qualifierAnswers[qualifier.id] === false
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
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
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Qualifiers
