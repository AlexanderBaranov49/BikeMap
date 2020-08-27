import { combineReducers } from 'redux';
import bikeBooking from './bikeBooking';
import stations from './stations';

export default combineReducers({
  bikeBooking,
  stations,
});
