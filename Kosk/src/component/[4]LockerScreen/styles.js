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
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    backgroundColor:'#1f1f1f',
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
    marginBottom: '8%',
    marginLeft: '1%',
    marginRight: '1%',
    borderWidth: 2,
    borderColor: '#efefef',
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallbutton: {
    flex: 1,
    width: '90%',
    borderWidth: 2,
    margin: '15%',
    alignItems:'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    flex: 4,
  },
  bottombox: {
    flex: 1,
    margin: '3%',
    padding: '4%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#eab530',
    backgroundColor: '#1f1f1f'
  },
  boxtopContainer: {
    flex: 2,
  },
  boxbottomContainer: {
    flex: 1,
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
    fontSize: (Dimensions.get('window').width / 36),
    fontWeight: 'bold',
    color: '#efefef',
  },
  font20: {
    fontSize: (Dimensions.get('window').width / 20),
    fontWeight: 'bold',
    color: '#efefef',
  },
  font18: {
    fontSize: (Dimensions.get('window').width / 18),
    fontWeight: 'bold',
    color: '#efefef',
  },
  font18white: {
    fontSize: (Dimensions.get('window').width / 18),
    fontWeight: 'bold',
    color: '#efefef',
    margin: 2,
  },
    
  });
  export default styles;