import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default function LoadingScreen({body}) {
  return (
    <View style={styles.Container}>
      <Text style={styles.font16}>{body}</Text>
    </View>
  );
}
