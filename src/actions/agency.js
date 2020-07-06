const SET_AGENCIES = "SET_AGENCIES";

export const setAgencies = (agencies) => {
  return {
    type: SET_AGENCIES,
    data: agencies
  }
}

export default {
  setAgencies
}
