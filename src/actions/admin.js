const SET_COMPANY_FILINGS = "SET_COMPANY_FILINGS";
const UPDATE_COMPANY_FILING = "UPDATE_COMPANY_FILING";

const SET_JURISDICTIONS = "SET_JURISDICTIONS";
const ADD_JURISDICTION = "ADD_JURISDICTION";
const UPDATE_JURISDICTION = "UPDATE_JURISDICTION";

const SET_AGENCIES = "SET_AGENCIES";
const ADD_AGENCY = "ADD_AGENCY";


export const setCompanyFilings = (data) => {
  return {
    type: SET_COMPANY_FILINGS,
    data: data
  }
}

export const updateCompanyFiling = (data) => {
  return {
    type: UPDATE_COMPANY_FILING,
    data: data
  }
}

export const setJurisdictions = (data) => {
  return {
    type: SET_JURISDICTIONS,
    data: data
  }
}

export const addJurisdiction = (jurisdiction) => {
  return {
    type: ADD_JURISDICTION,
    data: jurisdiction
  }
}

export const updateJurisdiction = (jurisdiction) => {
  return {
    type: UPDATE_JURISDICTION,
    data: jurisdiction
  }
}

export const setAgencies = (agencies) => {
  return {
    type: SET_AGENCIES,
    data: agencies
  }
}

export const addAgency = (agency) => {
  return {
    type: ADD_AGENCY,
    data: agency
  }
}

export default {
  setCompanyFilings,
  setJurisdictions,
  addJurisdiction,
  updateJurisdiction,
  setAgencies,
  addAgency
}
