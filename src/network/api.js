import { store } from 'store';
import { navigate } from "@reach/router"

const BASE_URI = process.env.REACT_APP_API_BASE_URL;

// Wrapper for all network requests
export const sendRequest = async (method, path, data, includeAuth = true) => {
  const settings = {}
  settings.method = method;
  settings.headers = {};
  settings.headers['Content-Type'] = 'application/json';

  if (data) {
    settings.body = JSON.stringify(data);
  }

  if (includeAuth) {
    const token = store.getState().auth.token;
    settings.headers['Authorization'] = `Bearer ${token}`
  }

  let response = await fetch(`${BASE_URI}${path}`, settings);

  // Check for error codes
  if (response.status !== 200) {
    if (response.state === 401) {
      // Unauthorized request
      navigate('/')
    }

    let error = await response.json()
    throw error
  }

  try {
    let json = await response.json()
    return json;
  } catch (err) {
    console.error(err)
    return null;
  }
}


export const createAccount = async (data) => {
  return sendRequest('POST', '/account', data, false)
}

export const loginRequest = async (email, password) => {
  const data = { username: email, password: password };
  return sendRequest('POST', '/login', data, false)
}

export const updateCompany = async (data, companyId) => {
  return sendRequest('PUT', `/company/${companyId}`, data)
}

export const updateCompanyPremium = async (companyId) => {
  return sendRequest('PUT', `/company/${companyId}/premium`)
}

export const updateOffices = async (data, companyId) => {
  return sendRequest('PUT', `/company/${companyId}/offices`, data)
}

export const updateCompanyAgencies = async (data, companyId) => {
  return sendRequest('PUT', `/company/${companyId}/companyagencies`, data)
}

export const updateCompanyAgency = async (data, companyId, agencyId) => {
  return sendRequest('PUT', `/company/${companyId}/companyagencies/${agencyId}`, data);
}

export const getAgencies = async (companyId) => {
  return sendRequest('GET', `/agencies?companyId=${companyId}`)
}

export const getCompany = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}`);
}

export const getFilingsForCompany = async (companyId, startDate, endDate, unscheduled) => {
  let uri =  `/company/${companyId}/filings`
  if (startDate && endDate) {
    uri = `${uri}?startDate=${startDate}&endDate=${endDate}`
  }

  if (unscheduled) {
    uri = `${uri}&unscheduled=${unscheduled}`
  }
  return sendRequest('GET', uri);
}

export const getCompanyFilings = async (companyId, startDate, endDate, unscheduled) => {
  let uri = `/company/${companyId}/companyfilings`
  if (startDate && endDate) {
    uri = `${uri}?startDate=${startDate}&endDate=${endDate}`
  }

  if (unscheduled) {
    uri = `${uri}&unscheduled=${unscheduled}`
  }
  return sendRequest('GET', uri);
}

export const getFiling = async (filingId) => {
  return sendRequest('GET', `/filings/${filingId}`);
}

export const createCompanyFiling = async (companyId, filingId, data) => {
  return sendRequest('POST', `/company/${companyId}/companyfilings`, data);
}

export const getCompanyFiling = async (companyId, companyFilingId) => {
  return sendRequest('GET', `/company/${companyId}/companyfilings/${companyFilingId}`);
}

export const getCompanyFilingMessages = async (companyId, companyFilingId) => {
  return sendRequest('GET', `/company/${companyId}/companyfilings/${companyFilingId}/messages`);
}

export const updateCompanyFiling = async (companyId, companyFilingId, data) => {
  return sendRequest('PUT', `/company/${companyId}/companyfilings/${companyFilingId}`, data);
}

export const getCompanyAgencies = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}/companyagencies`);
}

export const getCompanyJurisdictions = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}/jurisdictions`)
}

export const getAllCompanyFilings = async () => {
  return sendRequest('GET', `/admin/companyfilings`)
}

export const adminRejectCompanyFiling = async (companyFilingId, data) => {
  return sendRequest('PUT', `/admin/companyfilings/${companyFilingId}/reject`, data)
}

export const adminUpdateCompanyFilingStatus = async (companyFilingId, data) => {
  return sendRequest('PUT', `/admin/companyfilings/${companyFilingId}`, data)
}

export const adminGetCompanyFiling = async (companyFilingId) => {
  return sendRequest('GET', `/admin/companyfilings/${companyFilingId}`)
}

export const adminGetJurisdictions = async () => {
  return sendRequest('GET', `/admin/jurisdictions`)
}

export const adminCreateJurisdiction = async (data) => {
  return sendRequest('POST', `/admin/jurisdictions`, data)
}

export const adminUpdateJurisdiction = async (jurisdictionId, data) => {
  return sendRequest('PUT', `/admin/jurisdictions/${jurisdictionId}`, data)
}

export const adminDeleteJurisdiction = async (jurisdictionId) => {
  return sendRequest('DELETE', `/admin/jurisdictions/${jurisdictionId}`)
}


export const adminGetAgencies = async () => {
  return sendRequest('GET', `/admin/agencies`)
}

export const adminCreateAgency = async (data) => {
  return sendRequest('POST', `/admin/agencies`, data)
}

export const adminUpdateAgency = async (agencyId, data) => {
  return sendRequest('PUT', `/admin/agencies/${agencyId}`, data)
}
export const adminDeleteAgency = async (agencyId) => {
  return sendRequest('DELETE', `/admin/agencies/${agencyId}`)
}

export const adminGetFilings = async () => {
  return sendRequest('GET', `/admin/filings/`)
}

export const adminGetFiling = async (id) => {
  return sendRequest('GET', `/admin/filings/${id}`)
}

export const adminCreateFiling = async (data) => {
  return sendRequest('POST', `/admin/filings/`, data)
}

export const adminDeleteFiling = async (filingId) => {
  return sendRequest('DELETE', `/admin/filings/${filingId}`)
}

export const adminUpdateFiling = async (filingId, data) => {
  return sendRequest('PUT', `/admin/filings/${filingId}`, data)
}

export const adminGetCompanies = async () => {
  return sendRequest('GET', `/admin/companies`)
}

export const adminGetCompany = async (companyId) => {
  return sendRequest('GET', `/admin/companies/${companyId}`)
}

export const sendFeedback = async (feedback) => {
  return sendRequest('POST', `/feedback`, feedback)
}

export const adminGetCompanyFilings = async (companyId, startDate, endDate, unscheduled) => {
  let uri =  `/admin/companies/${companyId}/filings`
  if (startDate && endDate) {
    uri = `${uri}?startDate=${startDate}&endDate=${endDate}`
  }

  if (unscheduled) {
    uri = `${uri}&unscheduled=${unscheduled}`
  }
  return sendRequest('GET', uri);
}

export default {
  BASE_URI,
  createAccount,
  updateCompany,
  updateCompanyPremium,
  updateOffices,
  loginRequest,
  getAgencies,
  getCompany,
  updateCompanyAgencies,
  getFilingsForCompany,
  getCompanyFilings,
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  getCompanyFilingMessages,
  updateCompanyFiling,
  getCompanyAgencies,
  getCompanyJurisdictions,
  sendFeedback,

  // admin requests
  getAllCompanyFilings,
  adminRejectCompanyFiling,
  adminUpdateCompanyFilingStatus,
  adminGetCompanyFiling,
  adminGetJurisdictions,
  adminCreateJurisdiction,
  adminUpdateJurisdiction,
  adminDeleteJurisdiction,
  adminGetAgencies,
  adminCreateAgency,
  adminUpdateAgency,
  adminDeleteAgency,
  adminGetFilings,
  adminCreateFiling,
  adminGetFiling,
  adminUpdateFiling,
  adminGetCompanies,
  adminGetCompany,
  adminGetCompanyFilings,
  adminDeleteFiling
}
