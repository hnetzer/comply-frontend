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

    throw Error(response.message)
  }

  let json = await response.json()
  return json;
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

export const updateOffices = async (data, companyId) => {
  return sendRequest('PUT', `/company/${companyId}/offices`, data)
}

export const updateAgencies = async (data, companyId) => {
  return sendRequest('PUT', `/company/${companyId}/agencies`, data)
}

export const getAgencies = async (companyId) => {
  return sendRequest('GET', `/agencies?companyId=${companyId}`)
}

export const getCompany = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}`);
}

export const getFilingsForCompany = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}/filings`);
}

export const getCompanyFilings = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}/companyfilings`);
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
  return sendRequest('GET', `/company/${companyId}/agencies`);
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

export const adminGetAgencies = async () => {
  return sendRequest('GET', `/admin/agencies`)
}

export const adminCreateAgency = async (data) => {
  return sendRequest('POST', `/admin/agencies`, data)
}

export const adminUpdateAgency = async (agencyId, data) => {
  return sendRequest('PUT', `/admin/agencies/${agencyId}`, data)
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

export const adminUpdateFiling = async (filingId, data) => {
  return sendRequest('PUT', `/admin/filings/${filingId}`, data)
}

export default {
  BASE_URI,
  createAccount,
  updateCompany,
  updateOffices,
  loginRequest,
  getAgencies,
  getCompany,
  updateAgencies,
  getFilingsForCompany,
  getCompanyFilings,
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  getCompanyFilingMessages,
  updateCompanyFiling,
  getCompanyAgencies,

  // admin requests
  getAllCompanyFilings,
  adminRejectCompanyFiling,
  adminUpdateCompanyFilingStatus,
  adminGetCompanyFiling,
  adminGetJurisdictions,
  adminCreateJurisdiction,
  adminUpdateJurisdiction,
  adminGetAgencies,
  adminCreateAgency,
  adminUpdateAgency,
  adminGetFilings,
  adminCreateFiling,
  adminGetFiling,
  adminUpdateFiling
}
