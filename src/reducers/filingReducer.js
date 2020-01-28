
const initialState = {
  filings: [],
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'SET_FILINGS':
   return {
     filings: action.data
   }
  default:
   return state
 }
}
