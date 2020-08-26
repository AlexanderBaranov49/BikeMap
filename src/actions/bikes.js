import { BIKE_BOOKED_ACTION, BIKE_RETURNED_ACTION } from '../constants/actionTypes';

export const bikeBookedAction = (bike, bookingId) => {
  return {
    type: BIKE_BOOKED_ACTION,
    bike,
    bookingId,
  };
};

export const bikeReturnedAction = () => {
  return {
    type: BIKE_BOOKED_ACTION,
  };
};
