import { getNearbyStations } from '../requests';
import { errorMessages, actionTypes as types } from '../constants';
import { log } from '../utils';

export const getStationsAction = (location) => {
  return (dispath, getState) => {
    log.debug('Get stations for location:', location);
    dispath({ type: types.GET_STATIONS_REQUEST.START });
    getNearbyStations(location).then(
      (result) => {
        log.debug('Get stations result:', result);
        if (result) {
          dispath(getStationsSuccess(result.stations));
        } else {
          dispath(getStationsError(errorMessages.ERROR_UNKOWN));
        }
      },
      (error) => {
        dispath(getStationsError(error));
        log.debug('Get stations error:', error);
      },
    );
  };
};

export const getStationsSuccess = (stations) => {
  return {
    type: types.GET_STATIONS_REQUEST.SUCCESS,
    stations,
  };
};

export const getStationsError = (error) => {
  return {
    type: types.GET_STATIONS_REQUEST.FAILURE,
    error,
  };
};

export const bikeReturnedAction = () => {
  return {
    type: types.BIKE_RETURNED_ACTION,
  };
};
