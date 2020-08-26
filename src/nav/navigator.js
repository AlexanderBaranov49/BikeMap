import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from '../containers/mapScreen';
import StationDetailsScreen from '../containers/stationDetailsScreen';
import * as i18n from '../i18n';
import routes from './routes';

const Stack = createStackNavigator();
export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={routes.MAP}
          component={MapScreen}
          options={{
            headerTitle: i18n.strings('headerTitle.mapScreen'),
            headerBackTitle: ' ',
          }}
        />
        <Stack.Screen name={routes.STATION_DETAILS} component={StationDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
