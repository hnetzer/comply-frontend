
const initialState = {
  agencies: [],
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'SET_AGENCIES':
   return {
     agencies: action.data
   }
  default:
   return state
 }
}
