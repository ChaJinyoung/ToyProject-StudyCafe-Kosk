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
    flex: 5,
    margin: '5%',
    justifyContent: 'center',
  },
  middleContainer: {
    flex: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#2f2f2f',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef'
  }, 
  imageContainer: {
    flex: 1,
    margin: '2%',
  },
  imagetopsubContainer: {
    flex: 4,
    backgroundColor: '#1f1f1f',
    borderWidth: 1,
  },
  imagetopContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imagemiddleContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '2%',
  },
  smallbutton: {
    width: '8%',
    height: '100%',
    borderWidth: 2,
    marginLeft: '1%',
    marginRight: '1%',
    marginBottom: '1%',
    alignItems:'center',
    justifyContent: 'center',
  },

  imagebottomsubContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#efefef',
    backgroundColor: '#1f1f1f',
  },
  imagebottomleftContainer: {
    flex: 17,
    flexDirection: 'row',
    borderRightWidth: 4,
    borderColor: '#efefef',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  imagebottomrightContainer: {
    flex: 13,
    alignItems:'center',
    justifyContent:'center',
  },
  imagebottomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '1%',
    marginBottom: '3%',
  },
  locker: {
    width: '60%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#efefef',
  },

  door: {
    width: 0,
    height: 0,
    marginRight: '8%',
    borderLeftWidth: (Dimensions.get('window').width / 24),
    borderRightWidth: (Dimensions.get('window').width / 24),
    borderTopWidth: (Dimensions.get('window').width / 36),
    borderBottomWidth: (Dimensions.get('window').width / 36),
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: '#efefef',
    borderBottomColor: '#efefef',
  },
  largebutton: {
    width: '45%',
    height: '100%',
    borderWidth: 2,
    margin: '1%',
    alignItems:'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    flex: 5,
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