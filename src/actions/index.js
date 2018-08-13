import authService from "services/auth-service";
import axios from "axios";
import axiosService from "services/axios-service";
import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  FETCH_USER_BOOKINGS_INIT,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL
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

const fetchRentalsInit = () => ({
  type: FETCH_RENTALS_INIT
});

const fetchRentalsFail = errors => ({
  type: FETCH_RENTALS_FAIL,
  errors
});

export const fetchRentals = city => dispatch => {
  const url = city ? `/rentals?city=${city}` : "/rentals";
  dispatch(fetchRentalsInit());
  axiosInstance
    .get(url)
    .then(res => res.data)
    .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
    .catch(({ response }) => dispatch(fetchRentalsFail(response.data.errors)));
};

export const fetchRentalById = id => dispatch => {
  dispatch(fetchRentalByIdInit());

  axios
    .get(`http://localhost:3001/api/v1/rentals/${id}`)
    .then(res => res.data)
    .then(rental => dispatch(fetchRentalByIdSuccess(rental)));
};

export const createRental = rentalData => {
  return axiosInstance
    .post("/rentals", rentalData)
    .then(res => res.data, error => Promise.reject(error.response.data.errors));
};

// AUTH ACTIONS -------------------------------

export const register = userData => {
  return axiosInstance
    .post("/users/register", userData)
    .then(res => res.data, error => Promise.reject(error.response.data.errors));
};

const loginSuccess = () => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    username
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
    dispatch(loginSuccess());
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
    .catch(error => {
      dispatch(loginFailure(error.response.data.errors));
    });
};

export const logout = () => {
  authService.invalidateUser();
  return {
    type: LOG_OUT
  };
};

// BOOKING ACTIONS -------------------------------

const fetchUserBookingsInit = () => ({
  type: FETCH_USER_BOOKINGS_INIT
});

const fetchUserBookingsSuccess = userBookings => ({
  type: FETCH_USER_BOOKINGS_SUCCESS,
  userBookings
});

const fetchUserBookingsFail = errors => ({
  type: FETCH_USER_BOOKINGS_FAIL,
  errors
});

export const createBooking = booking => {
  return axiosInstance
    .post("/bookings", booking)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};

export const fetchUserBookings = () => dispatch => {
  dispatch(fetchUserBookingsInit());
  axiosInstance
    .get("/bookings/manage")
    .then(res => res.data)
    .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
    .catch(({ response }) =>
      dispatch(fetchUserBookingsFail(response.data.errors))
    );
};

export const getUserRentals = () => {
  return axiosInstance
    .get("/rentals/manage")
    .then(res => res.data)
    .catch(errors => Promise.reject(errors.response.data.errors));
};
