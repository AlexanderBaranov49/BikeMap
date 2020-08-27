import { getRandomItem } from './array';
import { log } from '../utils';

const RANDOM_STATION_POSITION_DELTA = 0.05;
const STATIONS_COUNT = 20;
const MAX_BIKES_POSSIBLE = 40;
const BIKE_MODELS = [
  'TREK 820',
  'Silverback Stride 15',
  'Stinger Element D 26',
  'Giant Suede 2',
];

export const STATUS_AVAILABLE = 'AVAILABLE';
export const STATUS_BOOKED = 'BOOKED';
export const STATUS_MALFUNCTION = 'MALFUNCTION';
export const STATUS_OTHER = 'OTHER';
const UNAVAILABLE_STATUSES = [STATUS_BOOKED, STATUS_MALFUNCTION, STATUS_OTHER];

let lastBikeId = 0;

export const DEFAULT_LOCATION = {
  latitude: 59.916,
  longitude: 10.7522,
  latitudeDelta: 0.1,
  longitudeDelta: 0.05,
};

export const generateStationDetails = (station) => {
  const bikes = [];
  if (station.bikesTotal && station.bikesAvailable) {
    for (let i = 0; i < station.bikesTotal; i++) {
      bikes.push({
        id: lastBikeId++,
        model: BIKE_MODELS[Math.floor(Math.random() * BIKE_MODELS.length)],
        battery: Math.round(100 * Math.random()),
        status:
          i < station.bikesAvailable
            ? STATUS_AVAILABLE
            : getRandomItem(UNAVAILABLE_STATUSES),
      });
    }
  }
  return { ...station, bikes };
};

let mockStations = [];

export const generateMockStations = (count, location) => {
  if (!mockStations || mockStations.length === 0) {
    mockStations = Array.from(Array(count), (value, index) => {
      const bikesTotal = Math.ceil(Math.random() * MAX_BIKES_POSSIBLE);
      return {
        id: index.toString(),
        name: 'Station on St. Random #' + index,
        description: 'Best bikes just for you',
        location: {
          latitude: (
            location.latitude +
            (0.5 - Math.random()) * RANDOM_STATION_POSITION_DELTA
          ).toString(),
          longitude: (
            location.longitude +
            (0.5 - Math.random()) * RANDOM_STATION_POSITION_DELTA
          ).toString(),
        },
        bikesTotal,
        bikesAvailable: Math.round(bikesTotal * 0.8),
      };
    });
  }
  return { stations: mockStations };
};

export const getStationDetails = (stationId) => {
  if (mockStations) {
    for (let station of mockStations) {
      if (station.id === stationId) {
        log.debug('Found mock station:', station);
        return generateStationDetails(station);
      }
    }
  }
  return null;
};
