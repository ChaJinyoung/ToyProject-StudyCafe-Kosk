import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Payment} from '../../../api/APIFunction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import styles from './styles';

export default function RoomChargeScreen({navigation}) {
  const [way, setWay] = useState(0);
  const [userNumber, setUserNumber] = useState('');
  const [userName, setUserName] = useState('김철수');
  const [roomId, setRoomId] = useState(0);
  const [roomDate, setRoomDate] = useState('');
  const [roomStartTime, setRoomStartTime] = useState(0);
  const [roomEndTime, setRoomEndTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    OnLoad();
  }, []);

  useEffect(() => {
    RoomTotalTime();
  }, [roomStartTime, roomEndTime]);

  useEffect(() => {
    setTotalPay((totalTime / 60) * 5000);
  }, [totalTime]);

  const OnLoad = () => {
    navigation.addListener('focus', () => {
      FindData();
      CallStudyRoomData();
    });
  };

  const FindData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        setUserNumber(userInfo.userID);
        setUserName(userInfo.userName);
        console.log('charge id:' + userInfo.userID);
        console.log('charge name:' + userInfo.userName);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const CallStudyRoomData = async () => {
    try {
      const value = await AsyncStorage.getItem('StudyRoomData');
      if (value) {
        const roomData = JSON.parse(value);
        setRoomId(roomData.roomId);
        setRoomDate(roomData.date);
        setRoomStartTime(roomData.startTime);
        setRoomEndTime(roomData.endTime);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const RoomTotalTime = async () => {
    if (roomEndTime < roomStartTime) {
      setTotalTime(((roomEndTime + 2400 - roomStartTime) / 100) * 60);
    } else {
      setTotalTime(((roomEndTime - roomStartTime) / 100) * 60);
    }
  };

  const postPay = async () => {
    try {
      const response = await Payment({
        pay: totalPay,
        phoneNumber: userNumber,
        type: false,
      });
      console.log('postPay success?', response.success);
      return response;
    } catch (error) {
      console.error('~~~ERROR postPay', error);
    }
  };

  const PaymentResult = async () => {
    const PayResponse = await postPay();
    if (PayResponse.success) {
      const data = {
        isPay: true,
        isTime: true
      };
      await SavePayResult(data);
      navigation.goBack();
    }
  };

  const SavePayResult = async data => {
    try {
      await AsyncStorage.setItem('paymentResult', JSON.stringify(data));
      console.log('등록완료', data);
    } catch (error) {
      console.log('SavePayResult error', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300)
  }, [setIsLoading]);

  return isLoading ? <LoadingScreen/> : (
    <View style={styles.Container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icons name="arrow-left-bold" size={40} color="#efefef"></Icons>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.font18white}>환영합니다. {userName} 님</Text>
        <Text style={styles.font18white}>스터디룸을 예약합니다.</Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.font18white}>스터디룸 {roomId}번 방</Text>
        <Text style={styles.font18white}>날짜: {roomDate}</Text>
        <Text style={styles.font18white}>
          {roomStartTime / 100}:00 ~ {roomEndTime / 100}:00
        </Text>
        <Text style={styles.font18white}>
          {totalTime / 60}시간 이용: {totalPay}원
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.paymentContainer}>
          <TouchableOpacity
            style={[
              styles.largeboxContainer,
              {borderColor: way == 1 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setWay(1);
            }}>
            <Icons name="currency-krw" size={40} color="#efefef"></Icons>
            <Text style={styles.font20}>현금결제</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.largeboxContainer,
              {borderColor: way == 2 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setWay(2);
            }}>
            <Icons name="credit-card-outline" size={40} color="#efefef"></Icons>
            <Text style={styles.font20}>카드결제</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.clickContainer}>
          <TouchableOpacity
            style={styles.largeboxContainer}
            onPress={() => {
              console.log('chargeTime: ' + totalTime, userNumber);
              console.log('postPay: ' + totalPay, userNumber);
              PaymentResult();
            }}>
            <Text style={styles.font20}>결제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
