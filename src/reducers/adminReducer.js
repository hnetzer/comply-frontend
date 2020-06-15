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

function removeObjectFromArray(array, objectId) {
  return array.filter((item, index) => {
    if (item.id !== objectId) return true;
    return false;
  })
}

function insertItem(array, action) {
  let newArray = array.slice()
  newArray.splice(0, 0, action.data)
  return newArray
}


const initialState = {
  jurisdictions: [],
  agencies: []
}

export default (state = initialState, action) => {
 switch (action.type) {
  case 'SET_JURISDICTIONS':
    return {
      ...state,
      jurisdictions: action.data
    }
  case 'UPDATE_JURISDICTION':
    return {
      ...state,
      jurisdictions: updateObjectInArray(state.jurisdictions, action)
    }
  case 'ADD_JURISDICTION':
    return {
      ...state,
      jurisdictions: insertItem(state.jurisdictions, action)
    }
  case 'DELETE_JURISDICTION': {
    return {
      ...state,
      jurisdictions: removeObjectFromArray(state.jurisdictions, action.data)
    }
  }
  case 'SET_AGENCIES':
    return {
      ...state,
      agencies: action.data
    }
  case 'ADD_AGENCY':
    return {
      ...state,
      agencies: insertItem(state.agencies, action)
    }
  case 'UPDATE_AGENCY':
    return {
      ...state,
      agencies: updateObjectInArray(state.agencies, action)
    }
    case 'DELETE_AGENCY': {
      return {
        ...state,
        agencies: removeObjectFromArray(state.agencies, action.data)
      }
    }
  default:
   return state
 }
}
