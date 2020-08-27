import { combineReducers } from 'redux';
import bikeBooking from './bikeBooking';
import stations from './stations';
import stationDetails from './stationDetails';

export default combineReducers({
  bikeBooking,
  stations,
  stationDetails,
});
