import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
  },
  header: {
    flex: 1,
    padding: '3%',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 3,
    margin: '5%',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 5,
    padding: '2%',
    margin: '5%',
    borderRadius: 10,
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallboxContainer: {
    flex: 1,
    height: '75%',
    margin: '3%',
    borderWidth: 2,
    borderColor: '#eab530',
    borderRadius: 10,
    backgroundColor: '#eab530',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 6,
    margin: '5%',
  },
  paymentContainer: {
    flex: 3,
    margin: '8%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  largeboxContainer: {
    width: '40%',
    height: '100%',
    margin: '8%',
    backgroundColor: '#eab530',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#eab530',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickContainer: {
    flex: 1,
    margin: '6%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  font36: {
    fontSize: (Dimensions.get('window').width / 36),
    fontWeight: 'bold',
    color: '#000000',
  },
  font20: {
    fontSize: (Dimensions.get('window').width / 20),
    fontWeight: 'bold',
    color: '#efefef',
  },
  font18: {
    fontSize: (Dimensions.get('window').width / 18),
    fontWeight: 'bold',
    color: '#000000',
  },
  font18white: {
    fontSize: (Dimensions.get('window').width / 18),
    fontWeight: 'bold',
    color: '#efefef',
    margin: 2,
  },
  });
  export default styles;