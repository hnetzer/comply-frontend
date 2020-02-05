const SET_FILINGS = "SET_FILINGS";
const SET_AGENCIES = "SET_AGENCIES";

export const setFilings = (data) => {
  return {
    type: SET_FILINGS,
    data: data
  }
}

export const setAgencies = (data) => {
  return {
    type: SET_AGENCIES,
    data: data
  }
}


export default {
  setFilings,
  setAgencies,
}
