import {CREATE_PROFILE,GET_PROFILE, CLEAR_PROFILE, CREATE_EDUCATION,CREATE_WORK} from '../actions/profileActions';

const inititialstate = {
    isProfile : false,
    isLoading: true,
    profile:null,
    education:null
}

export default function(state = inititialstate, action) {
  switch (action.type) {
    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
   case GET_PROFILE:
      return {
        ...state,
        isProfile:true,
        isLoading:false,
        profile: action.payload
      }
    case CLEAR_PROFILE:
        return {
          ...state,
          isProfile:false,
          profile: null
        }
    case CREATE_EDUCATION:
        return {
            ...state,
         education: action.payload
          }
    case CREATE_WORK:
            return {
                ...state,
                work: action.payload
              }
    default:
      return state
  }
}
