import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../config/stylesheet';

const ActivityIndicatorDefault = (props) => {
  const { style, color = Colors.primaryDark, size = 'large' } = props;
  return <ActivityIndicator style={style} color={color} size={size} />;
};

export default ActivityIndicatorDefault;
