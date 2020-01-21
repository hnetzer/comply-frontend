
const initialState = {
  error: null,
  user: null,
  token: null,
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'CREATE_ACCOUNT_REQUEST':
   return state;
  case 'CREATE_ACCOUNT_RESPONSE':
    return {
      error: null,
      user: action.data.user,
      token: action.data.token,
      company: action.data.company,
    }
  case 'CREATE_ACCOUNT_ERROR':
   return {
     error: action.err,
     user: null,
     token: null,
   }
  case 'LOGIN':
    return {
      error: null,
      user: action.data.user,
      token: action.data.token,
      company: null
    }
  case 'LOGOUT':
    return initialState;
  default:
   return state
 }
}
