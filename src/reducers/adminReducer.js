
const initialState = {
  companyfilings: [],
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'SET_COMPANY_FILINGS':
   return {
     companyfilings: action.data
   }
  case 'UPDATE_COMPANY_FILING':
    {
      let index = 0;
      for (let i =0; i < state.companyfilings.length; i++) {
        const x = state.companyfilings[i]
        if (x.id = action.data.id) {
          index = i;
          break;
        }
      }
      const array = state.companyfilings.slice()
      array[index] = action.data;
      return {
        companyfilings: array
      }
    }
  default:
   return state
 }
}
