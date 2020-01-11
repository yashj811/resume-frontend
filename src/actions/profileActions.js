import axios from 'axios';
import { SET_ERRORS } from './errorActions';
import { getCookie } from '../utils/Helpers';

export const LOADING = 'LOADING';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const GET_PROFILE = 'GET_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const CREATE_EDUCATION = 'CREATE_EDUCATION';
export const CREATE_WORK = 'CREATE_WORK';

export const CreateProfile = data => {
  return {
    type: CREATE_PROFILE,
    payload: data,
  };
};

export const ClearProfile = () => {
  return {
    type: CLEAR_PROFILE,
  };
};

export const GetProfile = () => dispatch => {
  dispatch(Loading());
  const cookieChecked = getCookie('token');
  axios({
    method: 'GET',
    url: `http://localhost:5000/api/v1/profile/get`,
    headers: {
      Authorization: 'Bearer ' + cookieChecked,
    },
  })
    .then(response => {
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data.error,
      });
    });
};

export const CreateEducation = data => {
  return {
    type: CREATE_EDUCATION,
    payload: data,
  };
};

export const CreateWork = data => {
  return {
    type: CREATE_WORK,
    payload: data,
  };
};

export const Loading = () => {
  return {
    type: LOADING,
  };
};
