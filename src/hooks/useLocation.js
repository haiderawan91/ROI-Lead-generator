import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import GLOBAL_REGIONS from '../config/regions'

/**
 * Hook to detect user's location from IP and fetch region logic pack
 * Uses free ipapi.co service for IP geolocation
 * Falls back to manual zip code input if detection fails
 */
export const useLocation = () => {
  const [region, setRegion] = useState(null)
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Map country codes to our region IDs
  const countryToRegion = {
    'GB': 'uk',
    'UK': 'uk',
    'DK': 'denmark',
    'US': 'usa',
    'CA': 'usa', // Optional: treat Canada same as USA
  }

  // Fetch region data from Firestore by region ID
  const fetchRegionFromFirestore = async (regionId) => {
    try {
      const docRef = doc(db, 'global_regions', regionId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        console.log('✅ Fetched region from Firestore:', regionId, docSnap.data())
        return docSnap.data()
      } else {
        console.warn('Document not found in Firestore, using local config:', regionId)
        // Fallback to local config if Firestore not available
        return GLOBAL_REGIONS[regionId]
      }
    } catch (err) {
      console.warn('Firestore fetch failed, using local regions:', err)
      return GLOBAL_REGIONS[regionId]
    }
  }

  // Detect location from IP using CORS-friendly service
  const detectLocationFromIP = async () => {
    try {
      setLoading(true)
      // Using geolocation-db.com which supports CORS
      const response = await fetch('https://geolocation-db.com/json/')
      const data = await response.json()

      const countryCode = data.country_code
      const regionId = countryToRegion[countryCode]

      if (regionId) {
        const regionData = await fetchRegionFromFirestore(regionId)
        setCountry(countryCode)
        setRegion(regionData)
      } else {
        // Unsupported country
        setError(`We currently support UK, Denmark, and USA. You're in ${data.country_name}.`)
      }
    } catch (err) {
      console.error('IP detection failed:', err)
      setError('Could not detect location. Please select your country.')
    } finally {
      setLoading(false)
    }
  }

  // Manually set location by region ID (for manual zip code input)
  const setLocationByRegion = async (regionId) => {
    try {
      setLoading(true)
      const regionData = await fetchRegionFromFirestore(regionId)
      setRegion(regionData)
      setCountry(regionId.toUpperCase())
    } catch (err) {
      setError(`Failed to load region data for ${regionId}`)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Run IP detection on mount
  useEffect(() => {
    detectLocationFromIP()
  }, [])

  return {
    region,
    country,
    loading,
    error,
    setLocationByRegion,
    detectLocationFromIP,
  }
}

export default useLocation
