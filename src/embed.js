/**
 * GreenROI Embeddable Widget
 * 
 * Usage in tenant's website:
 * 
 * <div id="greenroi-widget"></div>
 * <script>
 *   GreenROI.embed('greenroi-widget', {
 *     tenantId: 'alex-solar-001',
 *     brandColor: '#00aa44'
 *   });
 * </script>
 * 
 * OR include the built bundle:
 * <script src="https://greenroi.com/widget.js"></script>
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import GreenROIWidget from './components/GreenROIWidget'
import { CalculatorProvider } from './context/CalculatorContext'
import './index.css'

// Global widget interface
window.GreenROI = {
  /**
   * Embed the widget in a specific DOM element
   * @param {string} containerId - ID of the container element
   * @param {Object} config - Configuration object
   * @param {string} config.tenantId - Unique tenant identifier
   * @param {string} config.brandColor - Hex color code for branding (e.g., '#00aa44')
   */
  embed: function (containerId, config = {}) {
    const container = document.getElementById(containerId)
    if (!container) {
      console.error(`GreenROI: Container with ID "${containerId}" not found`)
      return
    }

    // Clear container
    container.innerHTML = ''

    // Create root and render
    const root = ReactDOM.createRoot(container)
    root.render(
      <React.StrictMode>
        <CalculatorProvider>
          <GreenROIWidget tenantId={config.tenantId} brandColor={config.brandColor} />
        </CalculatorProvider>
      </React.StrictMode>
    )

    return root
  },

  /**
   * Check if widget is loaded
   */
  isLoaded: function () {
    return true
  },

  /**
   * Get version
   */
  version: '1.0.0',
}

// Export for module usage
export default window.GreenROI
