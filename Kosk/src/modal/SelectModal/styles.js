import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalView: {
    width: '75%',
    height: '25%',
    padding: '2%',
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#eab530'
  },
  TopContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomContainer: {
    flex: 2,
    marginBottom: '3%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  Button: {
    width: '20%',
    marginLeft: '5%',
    marginRight: '5%',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
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