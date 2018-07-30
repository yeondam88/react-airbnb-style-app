import authService from "services/auth-service";
import axiosService from "services/axios-service";
import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT
} from "./types";

// RENTALS ACTIONS -------------------------------

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => ({
  type: FETCH_RENTAL_BY_ID_INIT
});

const fetchRentalByIdSuccess = rental => ({
  type: FETCH_RENTAL_BY_ID_SUCCESS,
  rental
});

const fetchRentalsSuccess = rentals => ({
  type: FETCH_RENTALS_SUCCESS,
  rentals
});

export const fetchRentals = () => dispatch => {
  axiosInstance
    .get("/rentals")
    .then(res => res.data)
    .then(rentals => dispatch(fetchRentalsSuccess(rentals)));
};

export const fetchRentalById = id => dispatch => {
  dispatch(fetchRentalByIdInit());

  axiosInstance
    .get(`/rentals/${id}`)
    .then(res => res.data)
    .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
};

// AUTH ACTIONS -------------------------------

export const register = userData => {
  return axiosInstance
    .post("/users/register", { ...userData })
    .then(res => res.data, error => Promise.reject(error.response.data.errors));
};

const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS
  };
};

const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};

export const checkAuthState = () => dispatch => {
  if (authService.isAuthenticated()) {
    dispatch(loginSuccess);
  }
};

export const login = userData => dispatch => {
  return axiosInstance
    .post("/users/auth", userData)
    .then(res => res.data)
    .then(token => {
      authService.saveToken(token);
      dispatch(loginSuccess());
    })
    .catch(({ response: { errors } }) => {
      dispatch(loginFailure(errors));
    });
};

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOG_OUT
  };
};
