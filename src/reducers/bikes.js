import * as types from '../constants/actionTypes';

let initialState = {
  bookedBike: null,
  bokingId: null,
};

const bicycles = (state = initialState, action) => {
  switch (action.type) {
    case types.BIKE_BOOKED_ACTION: {
      return {
        ...state,
        bookedBike: action.bike,
        bookingId: action.bookingId,
      };
    }
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

export default bicycles;
