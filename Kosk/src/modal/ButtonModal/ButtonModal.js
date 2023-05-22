import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

export default function ButtonModal({
  modalVisible,
  setModalVisible,
  body,
  isFirstEvent,
  isSecondEvent,
}) {
  return (
    <Modal animationType={'none'} transparent={true} visible={modalVisible}>
      <View style={styles.Container}>
        <View style={styles.ModalView}>
          <View style={styles.TopContainer}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icons name="close-thick" size={20} color="#efefef"></Icons>
            </TouchableOpacity>
          </View>
          <View style={styles.MiddleContainer}>
            <Text style={styles.font24}>{body}</Text>
          </View>
          <View style={styles.BottomContainer}>
            <TouchableOpacity
              onPress={() => {
                isFirstEvent();
                setModalVisible(false);
              }}
              style={styles.Button}>
              <Icons name="desk" size={60} color="#efefef"></Icons>
              <Text style={styles.font28}>지정석</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                isSecondEvent();
                setModalVisible(false);
              }}
              style={styles.Button}>
              <Icons name="human-male-board" size={50} color="#efefef"></Icons>
              <Text style={styles.font28}>스터디룸</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
