import api from '../network/api'

const CREATE_ACCOUNT_REQUEST = "CREATE_ACCOUNT_REQUEST";
const CREATE_ACCOUNT_RESPONSE = "CREATE_ACCOUNT_RESPONSE";
const CREATE_ACCOUNT_ERROR = "CREATE_ACCOUNT_ERROR";

const createAccountRequest = () => {
  return {
    type: CREATE_ACCOUNT_REQUEST
  }
}

const createAccountResponse = (data) => {
  return {
    type: CREATE_ACCOUNT_RESPONSE,
    data: data
  }
}

const createAccountError = (error) => {
  return {
    type: CREATE_ACCOUNT_ERROR,
    error: error
  }
}


export const createAccount = (data) => {
  return dispatch => {
    createAccountRequest()
    fetch(`${api.BASE_URI}/account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log('got response')
      dispatch(createAccountResponse(resp))
      console.log(resp)
    })
    .catch(err => {
      dispatch(createAccountError(err))
    })
  };
}

export default {
  createAccount
}
