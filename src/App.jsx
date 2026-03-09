import React from 'react'
import GreenROIWidget from './components/GreenROIWidget'
import { CalculatorProvider } from './context/CalculatorContext'
import './index.css'

function App() {
  // Get tenant ID from URL params or use default
  const params = new URLSearchParams(window.location.search)
  const tenantId = params.get('tenantId')
  const brandColor = params.get('brandColor')

  return (
    <CalculatorProvider>
      <GreenROIWidget tenantId={tenantId} brandColor={brandColor} />
    </CalculatorProvider>
  )
}

export default App
