
const initialState = {
  filings: [],
  company: null,
  agencies: [],
  jurisdictions: [],
  error: null,
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'GET_FILINGS_REQUEST':
   return state;
  case 'GET_FILINGS_RESPONSE':
    return {
      filings: action.data.filings,
      company: action.data.company,
      agencies: action.data.agencies,
      jurisdictions: action.data.jurisdictions,
      error: null
    }
  case 'GET_FILINGS_ERROR':
   return {
     filings: [],
     company: null,
     agencies: [],
     jurisdictions: [],
     error: action.err,
   }
  default:
   return state
 }
}
