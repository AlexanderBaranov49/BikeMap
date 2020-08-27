import React, { useState, useLayoutEffect, useCallback } from 'react';
import { View, FlatList, Text, Alert } from 'react-native';

import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { bookBikeAction } from '../../actions/bikeBooking';

import ActivityIndicator from '../../components/activityIndicator';
import Button from '../../components/button';

import * as i18n from '../../i18n';
import { log } from '../../utils';
import { STATUS_AVAILABLE } from '../../utils/mockData';
import { getStationDetails, bookBike } from '../../requests';
import styles from './styles';
import { Colors } from '../../config/stylesheet';

const BATTERY_THRESHOLD = 25;

export default function StationDetailsScreen(props) {
  const { route, navigation } = props;
  const { stationId, stationName } = route.params;
  const [stationDetails, setStationDetails] = useState([]);
  const [bikesloading, setBikesLoading] = useState(true);
  const dispatch = useDispatch();

  const { bookedBike, bookingId, isLoading, error } = useSelector(
    ({ bikeBooking: { isLoading, error, bookedBike, bookingId } }) => ({
      bookedBike,
      bookingId,
      isLoading,
      error,
    }),
    shallowEqual,
  );

  React.useEffect(() => {
    setBikesLoading(true);
    getStationDetails(stationId).then(
      (result) => {
        setBikesLoading(false);
        log.debug('Get stations details:', result);
        if (result) {
          setStationDetails(result);
        } else {
          log.debug("Can't find station details for id:", stationId);
        }
      },
      (error) => {
        setBikesLoading(false);
        log.debug('Get stations error:', error);
        Alert('Error fetching stations', error);
      },
    );
  }, [stationId]);

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
      {!bikesloading && (
        <FlatList
          style={styles.list}
          data={stationDetails.bikes}
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
      {(bikesloading || isLoading) && (
        <View style={styles.loadingBg}>
          <ActivityIndicator color={Colors.white} />
        </View>
      )}
    </View>
  );
}
