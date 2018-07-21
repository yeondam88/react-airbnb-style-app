import { FETCH_RENTALS, FETCH_RENTAL_BY_ID_SUCCESS } from "../actions/types";

const initialState = {
  rentals: {
    data: []
  },
  rental: {
    data: {}
  }
};

export const rentalReducer = (state = initialState.rentals, action) => {
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

export const selectedRentalReducer = (state = initialState.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.rental
      };
    default:
      return state;
  }
};
