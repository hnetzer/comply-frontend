
const initialState = {
  error: null,
  user: null,
  token: null,
  company: null,
  companies: null,
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
      companies: action.data.companies,
    }
  case 'CREATE_ACCOUNT_ERROR':
   return {
     error: action.err,
     user: null,
     token: null,
   }
  case 'UPDATE_USER_SETTINGS':
    return {
      ...state,
      user: {
        ...state.user,
        settings: action.data
      }
    }
  case 'LOGIN':
    return {
      error: null,
      user: action.data.user,
      token: action.data.token,
      company: action.data.company,
      companies: action.data.companies
    }
  case 'LOGOUT':
    return initialState;
  case 'ONBOARDED':
    return {
      ...state,
      company: {
        ...state.company,
        onboarded: true
      }
    }
  default:
   return state
 }
}
