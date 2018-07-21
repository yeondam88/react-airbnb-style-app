import { createStore, combineReducers, applyMiddleware } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import thunk from "redux-thunk";

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer
  });
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
};
