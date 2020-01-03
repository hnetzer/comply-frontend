
const initialState = {
  filings: [],
  company: null,
  agencies: [],
  jurisdictions: [],
  error: null,
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'REQUEST':
   return state;
  case 'RESPONSE':
    return {
      filings: action.data.filings,
      company: action.data.company,
      agencies: action.data.agencies,
      jurisdictions: action.data.jurisdictions,
      error: null
    }
  case 'ERROR':
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
