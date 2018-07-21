import { createStore, combineReducers } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer
  });
  const store = createStore(reducer);
  return store;
};
