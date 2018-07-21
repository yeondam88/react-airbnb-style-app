import { FETCH_RENTALS } from "../actions/types";

const initialState = {
  data: []
};

export const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return {
        ...state,
        data: action.rentals
      };
    default:
      return state;
  }
};
