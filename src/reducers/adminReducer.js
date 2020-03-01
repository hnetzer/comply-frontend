
function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (item.id !== action.data.id) {
      // This isn't the item we care about - keep it as-is
      return item
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.data
    }
  })
}


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
      return {
        companyfilings: updateObjectInArray(state.companyfilings, action)
      }
    }
  default:
   return state
 }
}
