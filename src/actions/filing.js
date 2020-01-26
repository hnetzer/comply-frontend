import api from '../network/api'

const GET_FILINGS_RESPONSE = "GET_FILINGS_RESPONSE";
const GET_FILINGS_ERROR = "GET_FILINGS_ERROR";

const getFilingsResponse = (data) => {
  return {
    type: GET_FILINGS_RESPONSE,
    data: data
  }
}

const getFilingsError = (error) => {
  return {
    type: GET_FILINGS_ERROR,
    error: error
  }
}

export const getFilings = (companyId) => {
  return dispatch => {
    fetch(`${api.BASE_URI}/filings?companyId=${companyId}`)
    .then(resp => resp.json())
    .then(resp => {
      dispatch(getFilingsResponse(resp))
    })
    .catch(err => {
      dispatch(getFilingsError(err))
    })
  };
}

export default {
  getFilings
}
