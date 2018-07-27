import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import thunk from "redux-thunk";

import { reducer as formReducer } from "redux-form";

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    form: formReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
