
const initialState = {
  agencies: [],
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'SET_COMPANY_AGENCIES':
   return {
     agencies: action.data
   }
  case 'LOGOUT':
    return initialState;
  default:
   return state
 }
}
