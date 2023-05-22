import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    Container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2f2f2f',
    },
    font16: {
      fontSize: (Dimensions.get('window').width / 16),
      fontWeight: 'bold',
      color: '#efefef',
      margin: 2,
    },
  });
  export default styles;