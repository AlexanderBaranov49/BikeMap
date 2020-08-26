import { StyleSheet } from 'react-native';
import { Colors } from '../../config/stylesheet';

export default StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.primaryDark,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
