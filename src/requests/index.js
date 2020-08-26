import { callApi } from '../services/rest';
import { USE_MOCK_REQUESTS } from '../config';
import * as mock from '../utils/mockData';
import { log } from '../utils';

const PATH_STATIONS = '/stations';
const PATH_BIKE = '/bike';
const PATH_BOOK = '/book';
const PATH_RETURN = '/return';

export const getNearbyStations = (location) => {
  return !USE_MOCK_REQUESTS
    ? callApi(`${PATH_STATIONS}`, 'GET', { location })
    : mockRequest(() => {
        return mock.generateMockStations(20, location);
      });
};

export const getStationDetails = (stationId) => {
  return !USE_MOCK_REQUESTS
    ? callApi(`${PATH_STATIONS}/${stationId}`, 'GET')
    : mockRequest(() => {
        return mock.getStationDetails(stationId);
      });
};

export const bookBike = (bikeId) => {
  return !USE_MOCK_REQUESTS
    ? callApi(`${PATH_BIKE}/${PATH_BOOK}`, 'POST', { bike_id: bikeId })
    : mockRequest(() => {
        return { bookingId: (bikeId + Math.ceil(1000 * Math.random())).toString() };
      });
};

export const returnBike = (bookingId) => {
  return !USE_MOCK_REQUESTS
    ? callApi(`${PATH_BIKE}/${PATH_RETURN}`, 'POST', { bookingId: bookingId })
    : mockRequest(() => {
        return { success: true };
      });
};

// returns a Promise
const mockRequest = (requestFun) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      log.debug('Request timer fired');
      resolve(requestFun());
    }, 500);
  });
};
