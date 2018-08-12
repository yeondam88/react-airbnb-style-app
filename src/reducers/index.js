import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { rentalReducer, selectedRentalReducer } from "./rental-reducer";
import { userBookingsReducer } from "./booking-reducer";
import { authReducer } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    userBookings: userBookingsReducer,
    form: formReducer,
    auth: authReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
};
