import * as types from '../constants/actionTypes';

let initialState = {
  stationId: null,
  station: null,
  isStationLoading: false,
  stationError: null,
};

const stationDetails = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATION_DETAILS_REQUEST.START:
      return {
        ...state,
        stationId: action.stationId,
        stationError: null,
        isStationLoading: true,
      };
    case types.GET_STATION_DETAILS_REQUEST.SUCCESS:
      return {
        ...state,
        isStationLoading: false,
        stationError: null,
        stationId: action.stationId,
        station: action.station,
      };
    case types.GET_STATION_DETAILS_REQUEST.FAILURE:
      return {
        ...state,
        isStationLoading: false,
        stationError: action.error,
        station: null,
      };
    default:
      return state;
  }
};

export default stationDetails;
