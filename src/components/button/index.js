import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

import styles from './styles';

// TODO: delete when not needed
function Button(props) {
  const { fetching = false, text, onPress, containerStyle, disabled = false } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={fetching ? () => {} : onPress}
      style={[styles.container, containerStyle, disabled && { backgroundColor: 'grey' }]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
