import * as types from '../constants/actionTypes';

let initialState = {
  bookedBike: null,
  bokingId: null,
  isLoading: false,
  error: null,
};

const bikeBooking = (state = initialState, action) => {
  switch (action.type) {
    // book bike request actions
    case types.BOOK_BIKE_REQUEST.START:
      return {
        ...state,
        isLoading: true,
      };
    case types.BOOK_BIKE_REQUEST.SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookedBike: action.bike,
        bookingId: action.bookingId,
      };
    case types.BOOK_BIKE_REQUEST.FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case types.BIKE_RETURNED_ACTION: {
      return {
        ...state,
        bookedBike: null,
        bookingId: null,
      };
    }
    default:
      return state;
  }
};

export default bikeBooking;
