import { getStationDetails } from '../requests';
import { errorMessages, actionTypes as types } from '../constants';
import { log } from '../utils';

export const getStationDetailsAction = (stationId) => {
  return (dispath, getState) => {
    log.debug('Get station details for id:', stationId);
    dispath({ type: types.GET_STATION_DETAILS_REQUEST.START });
    getStationDetails(stationId).then(
      (result) => {
        log.debug('Get station details:', result);
        if (result) {
          dispath(getStationDetailsSuccess(stationId, result.station));
        } else {
          dispath(getStationDetailsError(errorMessages.ERROR_UNKOWN));
        }
      },
      (error) => {
        dispath(getStationDetailsError(error));
        log.debug('Get station details error:', error);
      },
    );
  };
};

export const getStationDetailsSuccess = (stationId, station) => {
  return {
    type: types.GET_STATION_DETAILS_REQUEST.SUCCESS,
    stationId,
    station,
  };
};

export const getStationDetailsError = (error) => {
  return {
    type: types.GET_STATION_DETAILS_REQUEST.FAILURE,
    error,
  };
};
