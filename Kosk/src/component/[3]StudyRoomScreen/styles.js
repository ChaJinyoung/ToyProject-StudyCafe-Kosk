import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2f2f2f',
  },
  header: {
    flex: 3,
    padding: '3%',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 5,
    margin: '5%',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2%',
    marginRight: '2%',
  },

  imagebottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  largebutton: {
    flex: 1,
    borderWidth: 2,
    margin: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#eab530',
  },
  dateContainer: {
    flex: 28,
    margin: '4%',
    marginBottom: '1%',
    borderRadius: 10,
    backgroundColor: '#1f1f1f',
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: '2%',
  },
  timetopContainer: {
    flex: 1,
    paddingBottom: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timesubContainer: {
    margin: '1%',
    marginLeft: '5%',
    flex: 1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  timebottomContainer: {
    flex: 8,
    flexDirection: 'row',
  },
  datemenu: {
    flex: 1,
    borderWidth: 2,
    padding: '1%',
    marginLeft: '5%',
    marginRight: '5%',
    borderColor:'#eab530',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eab530',
    borderRadius: 5,
  }, 
  timeintervalconatiner: {
    flex: 1,
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  datebutton: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    margin: '5%',
    padding: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eab530',
    borderRadius: 5,
  },

  bottomContainer: {
    flex: 10,
  },
  bottombox: {
    flex: 1,
    margin: '3%',
    paddingTop: '2%',
    paddingBottom: '2%',
    padding: '4%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#eab530',
    backgroundColor: '#1f1f1f',
  },
  boxtopContainer: {
    flex: 5,
  },
  boxbottomContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  clickbutton: {
    padding: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eab530',
    borderRadius: 5,
  },

  font36: {
    fontSize: Dimensions.get('window').width / 36,
    fontWeight: 'bold',
    color: '#000000',
  },
  font34: {
    fontSize: Dimensions.get('window').width / 34,
    fontWeight: 'bold',
    color: '#efefef',
  },
  font20: {
    fontSize: Dimensions.get('window').width / 20,
    fontWeight: 'bold',
    color: '#efefef',
  },
  font22: {
    fontSize: Dimensions.get('window').width / 22,
    fontWeight: 'bold',
    color: '#efefef',
  },
  font22white: {
    fontSize: Dimensions.get('window').width / 22,
    fontWeight: 'bold',
    color: '#efefef',
  },
  font18: {
    fontSize: Dimensions.get('window').width / 18,
    fontWeight: 'bold',
    color: '#efefef',
    margin: 2,
  },
});
export default styles;
