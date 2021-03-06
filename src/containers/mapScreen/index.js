import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, Image } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MapView from 'react-native-map-clustering';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useSelector, shallowEqual } from 'react-redux';

import { useDispatch } from 'react-redux';
import { bikeReturnedAction } from '../../actions/bikeBooking';
import { getStationsAction } from '../../actions/getStations';

import Button from '../../components/button';

import StationCallout from '../../components/stationMarkerCallout';

import { Colors } from '../../config/stylesheet';
import images from '../../constants/images';
import routes from '../../nav/routes';
import { DEFAULT_LOCATION } from '../../utils/mockData';
import styles from './styles';
import { log } from '../../utils';
import * as i18n from '../../i18n';

export default function MapScreen(props) {
  const { navigation } = props;
  const { stations, bookedBike, bookingId } = useSelector(
    ({ stations: { stations }, bikeBooking: { bookedBike, bookingId } }) => ({
      bookedBike,
      bookingId,
      stations,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  const safeAreaInsets = useSafeAreaInsets();

  React.useEffect(() => {
    dispatch(getStationsAction(DEFAULT_LOCATION));
  }, [dispatch]);

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
      {/* Show booked bike info on bottom */}
      {bookedBike && (
        <View
          style={{
            ...styles.bookedBikeContainer,
            paddingBottom: 10 + safeAreaInsets.bottom * 0.5,
          }}>
          <Image source={images.icBike} style={styles.bikeIcon} resizeMode="contain" />
          <View style={styles.bikeTextContainer}>
            <Text style={styles.bikeModel}>{bookedBike.model}</Text>
            <Text style={styles.bikeId}>ID: {bookedBike.id}</Text>
          </View>
          <Button
            text={i18n.strings('returnBike')}
            onPress={() => {
              // TODO: add request call
              dispatch(bikeReturnedAction());
            }}
          />
        </View>
      )}
    </View>
  );
}
