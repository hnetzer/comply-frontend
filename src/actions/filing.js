const API_BASE_URI = 'https://comply-api.herokuapp.com';

// const GET_FILINGS_REQUEST = "GET_FILINGS_REQUEST";
const GET_FILINGS_RESPONSE = "GET_FILINGS_RESPONSE";
const GET_FILINGS_ERROR = "GET_FILINGS_ERROR";

/*function Request() {
  return {
    type: REQUEST
  }
}*/

const GetFilingsResponse = (data) => {
  return {
    type: GET_FILINGS_RESPONSE,
    data: data
  }
}

const GetFilingsError = (error) => {
  return {
    type: GET_FILINGS_ERROR,
    error: error
  }
}

export const getFilings = (companyId) => {
  return dispatch => {
    fetch(`${API_BASE_URI}/filings?companyId=${companyId}`)
    .then(resp => resp.json())
    .then(resp => {
      console.log('got response')
      dispatch(GetFilingsResponse(resp))
      console.log(resp)
    })
    .catch(err => {
      dispatch(GetFilingsError(err))
    })
  };
}

export default {
  getFilings
}
