import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL
} from "actions/types";

const initialState = {
  rentals: {
    data: [],
    errors: []
  },
  rental: {
    data: {}
  }
};

export const rentalReducer = (state = initialState.rentals, action) => {
  switch (action.type) {
    case FETCH_RENTALS_INIT:
      return {
        ...state,
        data: [],
        errors: []
      };
    case FETCH_RENTALS_SUCCESS:
      return {
        ...state,
        data: action.rentals
      };
    case FETCH_RENTALS_FAIL:
      return {
        ...state,
        data: [],
        errors: action.errors
      };
    default:
      return state;
  }
};

export const selectedRentalReducer = (state = initialState.rental, action) => {
  switch (action.type) {
    case FETCH_RENTAL_BY_ID_INIT:
      return {
        ...state,
        data: {}
      };
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return {
        ...state,
        data: action.rental
      };

    default:
      return state;
  }
};
