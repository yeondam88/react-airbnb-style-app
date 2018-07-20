import { createStore, combineReducers } from "redux";
import { rentalReducer } from "./rental-reducer";

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer
  });
  const store = createStore(reducer);
  return store;
};
