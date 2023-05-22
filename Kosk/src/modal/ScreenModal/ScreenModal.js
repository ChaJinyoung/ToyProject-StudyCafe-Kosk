import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function ScreenModal({
  modalVisible,
  setModalVisible,
  head,
  body,
}) {
  return (
    <Modal animationType={'none'} transparent={true} visible={modalVisible}>
      <View style={styles.Container}>
        <View style={styles.TopContainer}>
          <Text style={styles.font18}>{head}</Text>
          <Text style={styles.font4}>{body}</Text>
        </View>
        <View style={styles.BottomContainer}>
          <Text style={styles.font18}>좋은 시간 되시길 바랍니다.</Text>
        </View>
      </View>
    </Modal>
  );
}
