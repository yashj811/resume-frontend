export const SET_ERRORS = 'SET_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

export const SetErrors = data => {
  return {
    type: SET_ERRORS,
    payload: data,
  };
};

export const RemoveErrors = () => {
  return {
    type: REMOVE_ERRORS,
  };
};
