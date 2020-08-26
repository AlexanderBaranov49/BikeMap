import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, Image } from 'react-native';

import { useDispatch } from 'react-redux';
import { bikeReturnedAction } from '../../actions/bikes';

import Button from '../../components/button';

import MapView from 'react-native-map-clustering';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useSelector, shallowEqual } from 'react-redux';

import StationCallout from '../../components/stationMarkerCallout';

import { Colors } from '../../config/stylesheet';
import images from '../../constants/images';
import routes from '../../nav/routes';
import { DEFAULT_LOCATION } from '../../utils/mockData';
import { getNearbyStations, returnBike } from '../../requests';
import styles from './styles';
import { log } from '../../utils';
import * as i18n from '../../i18n';

export default function MapScreen(props) {
  const { navigation } = props;
  const [stations, setStations] = useState([]);
  const { bookedBike, bookingId } = useSelector(
    ({ bikes: { bookedBike, bookingId } }) => ({
      bookedBike,
      bookingId,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    getNearbyStations(DEFAULT_LOCATION).then(
      (result) => {
        log.debug('Get stations success:', result);
        setStations(result);
      },
      (error) => {
        log.debug('Get stations error:', error);
        Alert('Error fetching stations', error);
      },
    );
  }, []);

  const onOpenDetailsPressed = React.useCallback(
    (station) => {
      navigation.navigate(routes.STATION_DETAILS, {
        stationId: station.id,
        stationName: station.name,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <MapView
        style={{ ...StyleSheet.absoluteFillObject }}
        provider={PROVIDER_GOOGLE}
        initialRegion={DEFAULT_LOCATION}
        clusterColor={Colors.primary}>
        {stations &&
          stations.map((station, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(station.location.latitude),
                longitude: parseFloat(station.location.longitude),
              }}
              title={station.name}
              description={station.description}>
              <StationCallout
                station={station}
                navigation={navigation}
                onPressed={onOpenDetailsPressed}
              />
            </Marker>
          ))}
      </MapView>
      {bookedBike && (
        <View style={styles.bookedBikeContainer}>
          <Image source={images.icBike} style={styles.bikeIcon} resizeMode="contain" />
          <View style={styles.bikeTextContainer}>
            <Text style={styles.bikeModel}>{bookedBike.model}</Text>
            <Text style={styles.bikeId}>ID: {bookedBike.id}</Text>
          </View>
          <Button
            text={i18n.strings('returnBike')}
            onPress={() => {
              // TODO: add progress indicator
              returnBike(bookingId).then(
                (result) => {
                  log.debug('Get stations details:', result);
                  if (result && result.success) {
                    dispatch(bikeReturnedAction());
                  } else {
                    log.debug("Can't return the bike. Booking :", bookingId);
                  }
                },
                (error) => {
                  log.debug('Returning bike error:', error);
                  Alert('Error returning bike', error);
                },
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
