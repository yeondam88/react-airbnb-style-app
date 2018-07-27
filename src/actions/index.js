import axios from "axios";
import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./types";

// RENTALS ACTIONS -------------------------------

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
  axios
    .get("http://localhost:3001/api/v1/rentals")
    .then(res => res.data)
    .then(rentals => dispatch(fetchRentalsSuccess(rentals)));
};

export const fetchRentalById = id => dispatch => {
  dispatch(fetchRentalByIdInit());

  axios
    .get(`http://localhost:3001/api/v1/rentals/${id}`)
    .then(res => res.data)
    .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
};

// AUTH ACTIONS -------------------------------

export const register = userData => {
  return axios
    .post("http://localhost:3001/api/v1/users/register", { ...userData })
    .then(res => res.data, error => Promise.reject(error.response.data.errors));
};

const loginSuccess = token => {
  return {
    type: LOGIN_SUCCESS,
    token
  };
};

const loginFailure = errors => {
  return {
    type: LOGIN_FAILURE,
    errors
  };
};

export const login = userData => dispatch => {
  return axios
    .post("http://localhost:3001/api/v1/users/auth", { ...userData })
    .then(res => res.data)
    .then(token => {
      localStorage.setItem("auth_token", token);
      dispatch(loginSuccess(token));
    })
    .catch(({ res }) => {
      dispatch(loginFailure(res.data.errors));
    });
};
