const SET_JURISDICTIONS = "ADMIN_SET_JURISDICTIONS";
const ADD_JURISDICTION = "ADMIN_ADD_JURISDICTION";
const UPDATE_JURISDICTION = "ADMIN_UPDATE_JURISDICTION";
const DELETE_JURISDICTION = "ADMIN_DELETE_JURISDICTION";

const SET_AGENCIES = "ADMIN_SET_AGENCIES";
const ADD_AGENCY = "ADMIN_ADD_AGENCY";
const UPDATE_AGENCY = "ADMIN_UPDATE_AGENCY";
const DELETE_AGENCY = "ADMIN_DELETE_AGENCY";

export const adminSetJurisdictionsAction = (data) => {
  return {
    type: SET_JURISDICTIONS,
    data: data
  }
}

export const adminAddJurisdictionAction = (jurisdiction) => {
  return {
    type: ADD_JURISDICTION,
    data: jurisdiction
  }
}

export const adminUpdateJurisdictionAction = (jurisdiction) => {
  return {
    type: UPDATE_JURISDICTION,
    data: jurisdiction
  }
}

export const adminDeleteJurisdictionAction = (jurisdictionId) => {
  return {
    type: DELETE_JURISDICTION,
    data: jurisdictionId
  }
}

export const adminSetAgenciesAction = (agencies) => {
  return {
    type: SET_AGENCIES,
    data: agencies
  }
}

export const adminAddAgencyAction = (agency) => {
  return {
    type: ADD_AGENCY,
    data: agency
  }
}

export const adminUpdateAgencyAction = (agency) => {
  return {
    type: UPDATE_AGENCY,
    data: agency
  }
}

export const adminDeleteAgencyAction = (agencyId) => {
  return {
    type: DELETE_AGENCY,
    data: agencyId
  }
}


export default {
  adminSetJurisdictionsAction,
  adminAddJurisdictionAction,
  adminUpdateJurisdictionAction,
  adminDeleteJurisdictionAction,
  adminSetAgenciesAction,
  adminAddAgencyAction,
  adminUpdateAgencyAction,
  adminDeleteAgencyAction,
}
