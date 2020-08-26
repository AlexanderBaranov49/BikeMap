import { StyleSheet } from 'react-native';
import { Colors } from '../../config/stylesheet';

const styles = StyleSheet.create({
  calloutContainer: {
    width: 230,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingTop: 5,
    overflow: 'hidden',
  },
  textContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  stationName: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bicyclesAmountText: {
    fontSize: 16,
  },
  calloutButtonIOS: {
    width: '100%',
    marginTop: 5,
    backgroundColor: Colors.primaryDark,
    borderRadius: 0,
    paddingVertical: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 14,
    paddingHorizontal: 10,
  },
});

export default styles;
