import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS
} from "actions/types";

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
    case FETCH_RENTALS_SUCCESS:
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
