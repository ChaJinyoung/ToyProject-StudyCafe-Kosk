import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
  },
  TopContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  font4: {
    fontSize: Dimensions.get('window').width / 4,
    color: '#efefef',
    fontWeight: 'bold',
  },
  font18: {
    fontSize: Dimensions.get('window').width / 18,
    color: '#efefef',
    fontWeight: 'bold',
  },
});
export default styles;