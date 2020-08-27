import { BIKE_BOOKED_ACTION, BIKE_RETURNED_ACTION } from '../constants/actionTypes';
import { bookBike } from '../requests';
import { errorMessages, actionTypes as types } from '../constants';
import { log } from '../utils';

export const bookBikeAction = (bike, navigation) => {
  return (dispath, getState) => {
    log.debug('Book bike:', bike);
    dispath({ type: types.BOOK_BIKE_REQUEST.START });
    bookBike(bike.id).then(
      (result) => {
        log.debug('Book bike result:', result);
        if (result) {
          dispath(bikeBookingSuccess(bike, result.bookingId));
          navigation && navigation.goBack();
        } else {
          dispath(bikeBookingError(errorMessages.ERROR_UNKOWN));
        }
      },
      (error) => {
        dispath(bikeBookingError(error));
        log.debug('Book bike error:', error);
      },
    );
  };
};

export const bikeBookingSuccess = (bike, bookingId) => {
  return {
    type: types.BOOK_BIKE_REQUEST.SUCCESS,
    bike,
    bookingId,
  };
};

export const bikeBookingError = (error) => {
  return {
    type: types.BOOK_BIKE_REQUEST.FAILURE,
    error,
  };
};

export const bikeReturnedAction = () => {
  return {
    type: BIKE_RETURNED_ACTION,
  };
};
