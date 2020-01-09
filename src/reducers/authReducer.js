import {SET_USER, REMOVE_USER} from '../actions/authActions';

const inititialstate = {
    isAuthenticated : false,
    user:{}
}


function IsEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export default function(state = inititialstate, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !IsEmpty(action.payload),
        user: action.payload
      }
      case REMOVE_USER:
        return inititialstate
    default:
      return state
  }
}
