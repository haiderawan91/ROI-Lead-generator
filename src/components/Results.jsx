import React from 'react'
import { useCalculator } from '../context/CalculatorContext'

export const Results = () => {
  const { calculatedSavings, region, resetForm } = useCalculator()

  if (!calculatedSavings) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <p className="text-gray-600">Loading results...</p>
      </div>
    )
  }

  const {
    netCost,
    annualSavings,
    paybackPeriod,
    totalSavings10Years,
    dailyLoss,
    grantValue,
    efficiency,
    yearByYear,
    currency,
  } = calculatedSavings

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-2">
          {currency}{totalSavings10Years.toLocaleString()}
        </h1>
        <p className="text-green-100 text-lg">Your 10-year savings with a heat pump</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Annual Savings</p>
          <p className="text-3xl font-bold text-green-600">
            {currency}{Math.round(annualSavings).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Payback Period</p>
          <p className="text-3xl font-bold text-blue-600">{paybackPeriod} years</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">Installation Cost (after grant)</p>
          <p className="text-3xl font-bold text-gray-700">
            {currency}{Math.round(netCost).toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">Grant applied: {currency}{grantValue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm mb-1">You're losing this daily</p>
          <p className="text-3xl font-bold text-red-600">{currency}{Math.round(dailyLoss)}</p>
          <p className="text-xs text-red-600 mt-2">by not switching to a heat pump</p>
        </div>
      </div>

      {/* 10-Year Chart */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">10-Year Savings Projection</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Year</th>
                <th className="px-4 py-2 text-right">Status Quo Cost</th>
                <th className="px-4 py-2 text-right">Heat Pump Cost</th>
                <th className="px-4 py-2 text-right">Yearly Savings</th>
                <th className="px-4 py-2 text-right">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {yearByYear.map((year) => (
                <tr key={year.year} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 font-semibold">{year.year}</td>
                  <td className="px-4 py-2 text-right">
                    {currency}{Math.round(year.statusQuo).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {currency}{Math.round(year.heatPump).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold text-green-600">
                    {currency}{Math.round(year.savings).toLocaleString()}
                  </td>
                  <td className={`px-4 py-2 text-right font-bold ${year.cumulativeSavings < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                    {year.cumulativeSavings < 0 ? '-' : ''}{currency}{Math.abs(Math.round(year.cumulativeSavings)).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Efficiency & Info */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-blue-900 mb-4">How we calculated this</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>✓ Heat pump efficiency: {efficiency}% energy reduction</li>
          <li>✓ 5% yearly energy inflation applied</li>
          <li>✓ Grant of {currency}{grantValue.toLocaleString()} deducted from installation</li>
          <li>✓ Payback period: {paybackPeriod} years</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg text-center shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
        <p className="mb-6">Our team will be in touch shortly with next steps and available installers in your area.</p>
        <button
          onClick={resetForm}
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
        >
          Calculate another estimate
        </button>
      </div>
    </div>
  )
}

export default Results
