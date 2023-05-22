import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'flex-end',
  },
  ModalView: {
    width: '75%',
    height: '25%',
    padding: '2%',
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eab530'
  },
  MiddleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomContainer: {
    flex: 6,
    marginBottom: '3%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  Button: {
    width: '35%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#eab530',
  },

  font24: {
    fontSize: Dimensions.get('window').width / 24,
    color: '#efefef',
    fontWeight: 'bold',
  },
  font28: {
    fontSize: Dimensions.get('window').width / 28,
    color: '#efefef',
    fontWeight: 'bold',
  },
});
export default styles;