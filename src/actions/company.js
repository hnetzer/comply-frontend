const SET_COMPANY_AGENCIES = "SET_COMPANY_AGENCIES";
const SET_COMPANY_OFFICES = "SET_COMPANY_OFFICES";
const SET_COMPANY_DETAILS = "SET_COMPANY_DETAILS";

export const setCompanyOffices = (offices) => {
  return {
    type: SET_COMPANY_OFFICES,
    data: offices
  }
}

export const setCompanyAgencies = (companyAgencies) => {
  return {
    type: SET_COMPANY_AGENCIES,
    data: companyAgencies
  }
}

export const setCompanyDetails = (data) => {
  return {
    type: SET_COMPANY_DETAILS,
    data: data
  }
}


export default {
  setCompanyDetails,
  setCompanyOffices,
  setCompanyAgencies
}
