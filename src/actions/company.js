const SET_FILINGS = "SET_FILINGS";
const SET_COMPANY_AGENCIES = "SET_COMPANY_AGENCIES";

export const setFilings = (data) => {
  return {
    type: SET_FILINGS,
    data: data
  }
}

export const setCompanyAgencies = (data) => {
  return {
    type: SET_COMPANY_AGENCIES,
    data: data
  }
}


export default {
  setFilings,
  setCompanyAgencies,
}
