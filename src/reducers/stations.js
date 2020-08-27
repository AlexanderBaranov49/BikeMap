import * as types from '../constants/actionTypes';

let initialState = {
  stations: [],
  isLoading: false,
  error: null,
};

const stations = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATIONS_REQUEST.START:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_STATIONS_REQUEST.SUCCESS:
      return {
        ...state,
        isLoading: false,
        stations: action.stations,
      };
    case types.GET_STATIONS_REQUEST.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default stations;
