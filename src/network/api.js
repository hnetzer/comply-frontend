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

export const updateCompanyAgency = async (data, companyId, agencyId) => {
  return sendRequest('PUT', `/company/${companyId}/agencies/${agencyId}`, data);
}

export const getAgencies = async (companyId) => {
  return sendRequest('GET', `/agencies?companyId=${companyId}`)
}

export const getCompany = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}`);
}

export const getCompanyFilings = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}/filings`);
}

export const getFiling = async (filingId) => {
  return sendRequest('GET', `/filings/${filingId}`);
}

export const createCompanyFiling = async (companyId, filingId, data) => {
  return sendRequest('POST', `/company/${companyId}/filings`, data);
}

export const getCompanyFiling = async (companyId, companyFilingId) => {
  return sendRequest('GET', `/company/${companyId}/filings/${companyFilingId}`);
}

export const updateCompanyFiling = async (companyId, companyFilingId, data) => {
  return sendRequest('PUT', `/company/${companyId}/filings/${companyFilingId}`, data);
}

export const getCompanyAgencies = async (companyId) => {
  return sendRequest('GET', `/company/${companyId}/agencies`);
}

export const getAllCompanyFilings = async () => {
  return sendRequest('GET', `/admin/companyfilings`)
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
  getCompanyFilings,
  getFiling,
  createCompanyFiling,
  getCompanyFiling,
  updateCompanyFiling,
  getCompanyAgencies,

  // admin requests
  getAllCompanyFilings,
}
