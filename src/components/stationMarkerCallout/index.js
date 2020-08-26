import React from 'react';
import { View, Text } from 'react-native';
import { Callout } from 'react-native-maps';
import { strings } from '../../i18n';

import styles from './styles';

const DefaultCallout = (props) => {
  const { station, onPressed } = props;

  return (
    <Callout onPress={() => onPressed(station)} tooltip>
      <View style={styles.calloutContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.stationName}>{station.name}</Text>
          <Text style={styles.bicyclesAmountText}>
            {strings('total')}: {station.bikesTotal}
          </Text>
          <Text style={styles.bicyclesAmountText}>
            {strings('available')}: {station.bikesAvailable}
          </Text>
        </View>
        <View style={styles.calloutButtonIOS}>
          <Text style={styles.buttonText}>{strings('tapForDetails')}</Text>
        </View>
      </View>
    </Callout>
  );
};

export default DefaultCallout;
