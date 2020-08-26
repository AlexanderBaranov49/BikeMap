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
  list: { width: '100%' },
  listContent: { paddingHorizontal: 20, paddingVertical: 10 },
  bikeItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: Colors.primaryLight,
  },
  itemDetailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  modelName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusRed: {
    color: Colors.redError,
  },
  loadingBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000AA',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
