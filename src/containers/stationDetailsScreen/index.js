import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bookBikeAction } from '../../actions/bikeBooking';
import { getStationDetailsAction } from '../../actions/getStationDetails';

import ActivityIndicator from '../../components/activityIndicator';
import Button from '../../components/button';

import * as i18n from '../../i18n';
import { log } from '../../utils';
import { STATUS_AVAILABLE } from '../../utils/mockData';
import { getStationDetails } from '../../requests';
import styles from './styles';
import { Colors } from '../../config/stylesheet';

const BATTERY_THRESHOLD = 25;

export default function StationDetailsScreen(props) {
  const { route, navigation } = props;
  const { stationId, stationName } = route.params;
  const dispatch = useDispatch();

  // TODO: show error messages
  const { isLoading, error, isStationLoading, stationError, station } = useSelector(
    ({
      bikeBooking: { isLoading, error },
      stationDetails: { isStationLoading, stationError, station },
    }) => ({
      isLoading,
      error,
      isStationLoading,
      stationError,
      station,
    }),
    shallowEqual,
  );

  React.useEffect(() => {
    dispatch(getStationDetailsAction(stationId));
  }, [stationId, dispatch]);

  const onBookBikePressed = useCallback(
    (bike) => {
      dispatch(bookBikeAction(bike, navigation));
    },
    [dispatch, navigation],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: stationName,
    });
  }, [navigation, stationName]);

  return (
    <View style={styles.container}>
      {!isStationLoading && station && (
        <FlatList
          style={styles.list}
          data={station.bikes}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.bikeItemContainer}>
              <View style={styles.itemDetailsContainer}>
                <Text style={styles.modelName}>{item.model}</Text>
                <Text>
                  {i18n.strings('id')}: {item.id}
                </Text>
                <Text style={item.battery < BATTERY_THRESHOLD && styles.statusRed}>
                  {i18n.strings('battery')}: {item.battery}%
                </Text>
                <Text style={item.status !== STATUS_AVAILABLE && styles.statusRed}>
                  {i18n.strings('status')}: {item.status}
                </Text>
              </View>
              <Button
                disabled={item.status !== STATUS_AVAILABLE}
                text={i18n.strings('book')}
                onPress={() => {
                  onBookBikePressed(item);
                }}
              />
            </View>
          )}
        />
      )}
      {(isStationLoading || isLoading) && (
        <View style={styles.loadingBg}>
          <ActivityIndicator color={Colors.white} />
        </View>
      )}
    </View>
  );
}
