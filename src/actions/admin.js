const SET_JURISDICTIONS = "SET_JURISDICTIONS";
const ADD_JURISDICTION = "ADD_JURISDICTION";
const UPDATE_JURISDICTION = "UPDATE_JURISDICTION";
const DELETE_JURISDICTION = "DELETE_JURISDICTION";

const SET_AGENCIES = "SET_AGENCIES";
const ADD_AGENCY = "ADD_AGENCY";
const UPDATE_AGENCY = "UPDATE_AGENCY";
const DELETE_AGENCY = "DELETE_AGENCY";

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

export const deleteJurisdiction = (jurisdictionId) => {
  return {
    type: DELETE_JURISDICTION,
    data: jurisdictionId
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

export const updateAgency = (agency) => {
  return {
    type: UPDATE_AGENCY,
    data: agency
  }
}

export const deleteAgency = (agencyId) => {
  return {
    type: DELETE_AGENCY,
    data: agencyId
  }
}


export default {
  setJurisdictions,
  addJurisdiction,
  updateJurisdiction,
  deleteJurisdiction,
  setAgencies,
  addAgency,
  updateAgency,
  deleteAgency,
}
