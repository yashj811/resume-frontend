export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setCurrentUser = data => {
  return {
    type: SET_USER,
    payload: data.user,
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_USER,
  };
};
