import { API_BASE_URI } from '../actions'

function createAccount(data) {
  return dispatch => {
    fetch(`${API_BASE_URI}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
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
