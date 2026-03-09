import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

/**
 * Submit lead to Firestore
 */
export const submitLead = async (leadData) => {
  try {
    const leadsCollection = collection(db, 'leads')
    
    const docRef = await addDoc(leadsCollection, {
      ...leadData,
      timestamp: Timestamp.now(),
      createdAt: new Date().toISOString(),
    })

    return {
      success: true,
      leadId: docRef.id,
    }
  } catch (error) {
    console.error('Error submitting lead:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Fetch tenant configuration
 */
export const fetchTenantConfig = async (tenantId) => {
  try {
    const tenantsCollection = collection(db, 'tenants')
    const q = query(tenantsCollection, where('__name__', '==', tenantId))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      return {
        success: true,
        data: snapshot.docs[0].data(),
      }
    }

    // Fallback: try direct document fetch
    const docRef = await getDocs(collection(db, 'tenants'))
    const doc = docRef.docs.find(d => d.id === tenantId)
    
    if (doc) {
      return {
        success: true,
        data: doc.data(),
      }
    }

    return {
      success: false,
      error: 'Tenant not found',
    }
  } catch (error) {
    console.error('Error fetching tenant config:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Fetch region logic pack from Firestore
 */
export const fetchRegionLogic = async (regionId) => {
  try {
    const regionsCollection = collection(db, 'global_regions')
    const q = query(regionsCollection, where('id', '==', regionId))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      return {
        success: true,
        data: snapshot.docs[0].data(),
      }
    }

    return {
      success: false,
      error: 'Region not found',
    }
  } catch (error) {
    console.error('Error fetching region logic:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export default {
  submitLead,
  fetchTenantConfig,
  fetchRegionLogic,
}
