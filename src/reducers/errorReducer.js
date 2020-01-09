import {SET_ERRORS, REMOVE_ERRORS} from '../actions/errorActions';

const inititialstate = {
   errors:{}
}


export default function(state = inititialstate, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
      case REMOVE_ERRORS:
        return inititialstate
    default:
      return state
  }
}
