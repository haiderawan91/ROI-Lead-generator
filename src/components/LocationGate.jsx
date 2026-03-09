import React, { useState } from 'react'
import { useCalculator } from '../context/CalculatorContext'
import useLocation from '../hooks/useLocation'

export const LocationGate = () => {
  const { setRegion: setContextRegion, nextStep } = useCalculator()
  const { region: detectedRegion, country, loading, error, setLocationByRegion } = useLocation()
  const [manualMode, setManualMode] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('')

  const handleLocationConfirm = (selectedRegion) => {
    if (selectedRegion && selectedRegion.id) {
      // Set region in BOTH hook and context
      setContextRegion(selectedRegion)
      nextStep()
    }
  }

  if (loading && !manualMode) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Where are you located?</h2>
      <p className="text-gray-600 mb-6">We'll customize the savings calculation for your region.</p>

      {error && !manualMode && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded mb-4">
          <p className="text-sm">{error}</p>
          <button
            onClick={() => setManualMode(true)}
            className="text-yellow-600 font-semibold mt-2 hover:text-yellow-700"
          >
            Enter location manually →
          </button>
        </div>
      )}

      {detectedRegion && !manualMode && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 font-semibold">📍 {detectedRegion.country}</p>
          <p className="text-green-700 text-sm mt-1">Currency: {detectedRegion.currency}</p>
        </div>
      )}

      {manualMode ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Select your country:</label>
          <div className="space-y-2 mb-6">
            {['uk', 'denmark', 'usa'].map((regionId) => (
              <button
                key={regionId}
                onClick={() => setSelectedRegion(regionId)}
                className={`w-full p-3 text-left rounded-lg border-2 transition ${
                  selectedRegion === regionId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-semibold capitalize">{regionId}</span>
              </button>
            ))}
          </div>
          <button
            onClick={async () => {
              await setLocationByRegion(selectedRegion)
              setManualMode(false)
              // The region will be set via the hook, now pass to context
              setTimeout(() => {
                // Get the region data after fetching
                const regionData = detectedRegion
                if (regionData) {
                  setContextRegion(regionData)
                  nextStep()
                }
              }, 500)
            }}
            disabled={!selectedRegion}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => handleLocationConfirm(detectedRegion)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Confirm & Continue
          </button>
          <button
            onClick={() => setManualMode(true)}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition"
          >
            Change Location
          </button>
        </div>
      )}
    </div>
  )
}

export default LocationGate
