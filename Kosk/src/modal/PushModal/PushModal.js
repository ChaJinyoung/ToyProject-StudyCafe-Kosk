import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function PushModal({
  modalVisible,
  setModalVisible,
  body,
}) {
  return (
    <Modal animationType={'fade'} onDismiss={'fade'} transparent={true} visible={modalVisible}>
      <View style={styles.Container}>
        <View style={styles.ModalView}>
          <View style={styles.TopContainer}>
            <Text style={styles.font24}>{body}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
