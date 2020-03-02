const SET_COMPANY_FILINGS = "SET_COMPANY_FILINGS";
const UPDATE_COMPANY_FILING = "UPDATE_COMPANY_FILING";

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


export default {
  setCompanyFilings,
}
