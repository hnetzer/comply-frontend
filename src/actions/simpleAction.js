const API_BASE_URI = 'http://localhost:8080'

const simpleAction = () => dispatch => {
 dispatch({
  type: 'SIMPLE_ACTION',
  payload: 'result_of_simple_action'
 })
}

const REQUEST = "REQUEST";
const RESPONSE = "RESPONSE";
const ERROR = "ERROR";

function Request() {
  return {
    type: REQUEST
  }
}

function Response(data) {
  return {
    type: RESPONSE,
    data: data
  }
}

function Error(error) {
  return {
    type: ERROR,
    error: error
  }
}

function getFilings(companyId) {
  return dispatch => {
    fetch(`${API_BASE_URI}/filings?companyId=${companyId}`)
    .then(resp => resp.json())
    .then(resp => {
      console.log('got response')
      dispatch(Response(resp))
      console.log(resp)
    })
    .catch(err => {
      dispatch(Error(err))
    })
  };
}

module.exports = {
  getFilings,
  simpleAction
};
