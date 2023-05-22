import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: '2%',
    backgroundColor: '#2f2f2f',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '1%',
    borderBottomWidth: 2,
    borderBottomColor: '#efefef',
  },
  topsubContainer: {
    marginTop: '2%',
    marginLeft: '2%',
    marginRight: '2%',
    width: '13%',
    alignItems: 'center',
  },
  toptitle: {
    width: '100%',
    padding: '2%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  middleContainer: {
    flex: 2,
    justifyContent: 'center',
    padding: '3%',
  },

  bottomContainer: {
    flex: 4,
    padding: '2%',
    borderRadius: 10,
    borderColor: '#efefef',
    backgroundColor: '#1f1f1f',
  },
  boxtopContainer: {
    flex: 1,
    flexDirection:'row',
  },
  boxbottomContainer: {
    flex: 2,
    padding: '3%'
  },
  smallboxContainer: {
    flex: 1,
    margin: '3%',
    borderWidth: 3,
    borderColor: '#eab530',
    borderRadius: 10,
    backgroundColor: '#eab530',
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberContainer: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '4%',
  },
  bottomleftContainer: {
    flex: 4,
    padding: '2%',
    paddingBottom: '7%',
  },
  textinput: {
    width: '100%',
    backgroundColor: '#efefef',
    borderWidth: 2,
    paddingLeft: '3%',
    paddingRight: '3%',
    marginBottom: '2%',
  },
  loginbutton: {
    marginTop: '5%',
    padding: '3%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eab530',
    borderRadius: 5,
  },
  bottomrightContainer: {
    flex: 3,
    paddingTop: '6%',
    paddingBottom: '6%',
    padding: '2%',
  },
  numberboxContainer: {
    flex: 1,
    margin: '5%',
    borderRadius: 5,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },


  font36: {
    fontSize: (Dimensions.get('window').width / 36),
    fontWeight: 'bold',
    color: '#efefef',
  },
  font30: {
    fontSize: (Dimensions.get('window').width / 30),
    fontWeight: 'bold',
    color: '#efefef',
    margin: 2,
  },
  font24: {
    fontSize: (Dimensions.get('window').width / 24),
    fontWeight: 'bold',
    color: '#efefef',
  },
  font20: {
    fontSize: (Dimensions.get('window').width / 20),
    fontWeight: 'bold',
    color: '#000000',
  },
  font18: {
    fontSize: (Dimensions.get('window').width / 18),
    fontWeight: 'bold',
    color: '#efefef',
    margin: '2%',
  },
  font16: {
    fontSize: (Dimensions.get('window').width / 16),
    fontWeight: 'bold',
    color: '#efefef',
    margin: 2,
  },
  font14: {
    fontSize: (Dimensions.get('window').width / 14),
    fontWeight: 'bold',
    color: '#efefef',
  },
  font12: {
    fontSize: (Dimensions.get('window').width / 12),
    fontWeight: 'bold',
    color: '#efefef',
  },
});
export default styles;
