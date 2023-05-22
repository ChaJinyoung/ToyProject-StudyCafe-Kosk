import React from 'react';
import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function SelectModal ({modalVisible, setModalVisible, isSelect, body, isFirstEvent, isSecondEvent}) {
  return (
    <Modal
      animationType={'none'}
      transparent={true}
      visible={modalVisible}>
      <View style={styles.Container}>
        <View style={styles.ModalView}>
          <View style={styles.TopContainer}>
            <Text style={styles.font24}>{body}</Text>
          </View>
          {isSelect ? (
            <View style={styles.BottomContainer}>
              <TouchableOpacity
                style={styles.Button}
                onPress={()=> {
                  isFirstEvent();
                  setModalVisible(false);
                }}>
                <Text style={[styles.font28, {color: 'white'}]}>예</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  isSecondEvent();
                  setModalVisible(false);
                }}>
                <Text style={[styles.font28, {color: 'white'}]}>아니오</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.BottomContainer}>
              <TouchableOpacity
                style={styles.Button}
                onPress={() => {
                  console.log(isSelect);
                  setModalVisible(false);
                }}>
                <Text style={[styles.font28, {color: 'white'}]}>닫기</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
