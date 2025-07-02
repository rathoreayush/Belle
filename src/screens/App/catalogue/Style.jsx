import {StyleSheet, Dimensions} from 'react-native';

const ITEM_WIDTH = Dimensions.get('window').width / 2.4;
const Style = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: ITEM_WIDTH,
    height: 100,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Style;
