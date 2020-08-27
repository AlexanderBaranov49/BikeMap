import { StyleSheet } from 'react-native';
import { Colors } from '../../config/stylesheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookedBikeContainer: {
    borderColor: Colors.white,
    borderTopWidth: 2,
    paddingHorizontal: 25,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.primaryLight,
  },
  bikeIcon: { width: 60, height: 60 },
  bikeTextContainer: { flex: 1, marginHorizontal: 20 },
  bikeModel: { fontSize: 14, fontWeight: 'bold' },
  bikeId: { fontSize: 14 },
});

export default styles;
