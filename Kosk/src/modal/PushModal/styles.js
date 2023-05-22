import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalView: {
    width: '80%',
    height: '20%',
    padding: '2%',
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eab530'
  },
  TopContainer: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
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