import { LOGIN_SUCCESS, LOGIN_FAILURE } from "actions/types";

const initialState = {
  isAuth: false,
  errors: []
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
};
