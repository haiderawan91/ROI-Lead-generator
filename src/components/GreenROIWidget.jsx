import React, { useEffect, useState } from 'react'
import { useCalculator } from '../context/CalculatorContext'
import useLocation from '../hooks/useLocation'
import calculateROI from '../utils/calculations'
import LocationGate from './LocationGate'
import HomeDetails from './HomeDetails'
import Qualifiers from './Qualifiers'
import LeadCapture from './LeadCapture'
import Results from './Results'

export const GreenROIWidget = ({ tenantId, brandColor }) => {
  const {
    step,
    region,
    monthlyBill,
    setRegion,
    setTenantId,
    setCalculatedSavings,
  } = useCalculator()

  // Set tenant ID on mount
  useEffect(() => {
    if (tenantId) {
      setTenantId(tenantId)
    }
  }, [tenantId, setTenantId])

  // Calculate ROI when moving to results step
  useEffect(() => {
    if (step === 'results' && region && monthlyBill) {
      const roi = calculateROI(region, parseFloat(monthlyBill))
      setCalculatedSavings(roi)
    }
  }, [step, region, monthlyBill, setCalculatedSavings])

  // Apply brand color to Tailwind
  const customStyle = brandColor
    ? `
        :root {
          --color-brand-500: ${brandColor};
          --color-brand-600: ${adjustColorBrightness(brandColor, -20)};
          --color-brand-700: ${adjustColorBrightness(brandColor, -40)};
        }
        .bg-brand-500, .border-brand-500, .text-brand-500 {
          --tw-bg-opacity: 1;
          background-color: var(--color-brand-500);
          border-color: var(--color-brand-500);
          color: var(--color-brand-500);
        }
      `
    : ''

  return (
    <div
      style={customStyle ? { ...parseStyleString(customStyle) } : {}}
      className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Progress Indicator */}
        {step !== 'results' && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Location', 'Home', 'Questions', 'Contact', 'Results'].map((label, idx) => (
                <div
                  key={label}
                  className={`flex-1 h-1 mx-1 rounded ${
                    idx <=
                    ['location', 'homeDetails', 'qualifiers', 'leadCapture', 'results'].indexOf(
                      step
                    )
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step Component */}
        {step === 'location' && <LocationGate />}
        {step === 'homeDetails' && <HomeDetails />}
        {step === 'qualifiers' && <Qualifiers />}
        {step === 'leadCapture' && <LeadCapture />}
        {step === 'results' && <Results />}
      </div>
    </div>
  )
}

/**
 * Helper function to adjust color brightness
 */
function adjustColorBrightness(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = Math.min(255, Math.max(0, (num >> 16) + amt))
  const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt))
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt))
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)
}

/**
 * Helper to parse CSS string to React style object
 */
function parseStyleString(styleString) {
  const style = {}
  if (!styleString) return style

  styleString.split(';').forEach((rule) => {
    if (rule.trim()) {
      const [prop, value] = rule.split(':')
      if (prop && value) {
        const camelCaseProp = prop
          .trim()
          .replace(/^-ms-/, 'ms-')
          .replace(/-./g, (x) => x[1].toUpperCase())
        style[camelCaseProp] = value.trim()
      }
    }
  })

  return style
}

export default GreenROIWidget
