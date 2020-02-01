const SET_FILINGS = "SET_FILINGS";

export const setFilings = (data) => {
  return {
    type: SET_FILINGS,
    data: data
  }
}


export default {
  setFilings
}
