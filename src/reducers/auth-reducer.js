import { LOGIN_SUCCESS, LOGIN_FAILURE } from "actions/types";
import { LOG_OUT } from "../actions/types";

const initialState = {
  isAuth: false,
  errors: [],
  username: ""
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        username: action.username
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        errors: action.errors
      };
    case LOG_OUT:
      return {
        ...state,
        isAuth: false
      };
    default:
      return state;
  }
};
