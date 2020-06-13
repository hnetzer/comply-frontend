
const initialState = {
  agencies: null,
  offices: null,
  company: null,
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'SET_COMPANY_AGENCIES':
   return {
     ...state,
     agencies: action.data
   }
  case 'SET_COMPANY_OFFICES':
    return {
      ...state,
      offices: action.data
    }
  case 'SET_COMPANY_DETAILS':
    return {
      ...state,
      company: action.data
    }
  case 'LOGOUT':
    return initialState;
  default:
   return state
 }
}
