import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ChargeTime, Payment} from '../../../api/APIFunction';
import ScreenModal from '../../../modal/ScreenModal/ScreenModal';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import styles from './styles';

export default function UserChargeScreen({navigation}) {
  const [id, setId] = useState(0);
  const [way, setWay] = useState(0);
  const [userNumber, setUserNumber] = useState('');
  const [userName, setUserName] = useState('김철수');
  const [resttime, setResttime] = useState(70);
  const [totalTime, setTotalTime] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [screenModalVisible, setScreenModalVisible] = useState(false);

  useEffect(() => {
    OnLoad();
  }, []);

  useEffect(() => {
    TimeCharge();
  }, [id]);

  useEffect(() => {
    setTotalPay((totalTime / 60) * 5000);
  }, [totalTime]);

  const OnLoad = () => {
    navigation.addListener('focus', () => {
      FindData();
    });
  };

  const FindData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        setUserNumber(userInfo.userID);
        setUserName(userInfo.userName);
        setResttime(userInfo.userTime);
        console.log('charge id:' + userInfo.userID);
        console.log('charge name:' + userInfo.userName);
        console.log('charge resttime:' + userInfo.userTime);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const TimeCharge = () => {
    switch (id) {
      case 1:
        setTotalTime(60);
        setTotalPay(2000);
        break;
      case 2:
        setTotalTime(120);
        setTotalPay(4000);
        break;
      case 3:
        setTotalTime(180);
        setTotalPay(6000);
        break;
      case 4:
        setTotalTime(300);
        setTotalPay(10000);
        break;
      case 5:
        setTotalTime(900);
        setTotalPay(30000);
        break;
      case 6:
        setTotalTime(1500);
        setTotalPay(50000);
        break;
    }
  };

  const postCharge = async () => {
    try {
      const response = await ChargeTime({
        time: totalTime,
        type: '시간',
        phoneNumber: userNumber,
      });
      console.log('postCharge success?', response.success);
      return response;
    } catch (error) {
      console.error('~~~ERROR postCharge', error);
    }
  };

  const postPay = async () => {
    try {
      const response = await Payment({
        pay: totalPay,
        phoneNumber: userNumber,
        type: true,
      });
      console.log('postPay success?', response.success);
      return response;
    } catch (error) {
      console.error('~~~ERROR postPay', error);
    }
  };

  const PaymentResult = async () => {
    const PayResponse = await postCharge();
    if (PayResponse.success) {
      await postPay();
      const data = {
        isPay: true,
        isTime: true,
      };
      await SavePayResult(data);
      setScreenModalVisible(true);
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

  const ScreenModalTimer = () => {
    if (screenModalVisible) {
      setTimeout(() => {
        navigation.goBack();
      }, 5000);
    }
  };

  useEffect(() => {
    ScreenModalTimer();
  }, [screenModalVisible]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [setIsLoading]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.Container}>
      <ScreenModal
        modalVisible={screenModalVisible}
        setModalVisible={setScreenModalVisible}
        head={'감사합니다.\n충전이 완료되었습니다.'}
        body={''}></ScreenModal>

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
        <Text style={styles.font18white}>시간 충전을 선택하였습니다.</Text>
        {resttime < 10000 ?
        <Text style={[styles.font18white, {margin: '2%'}]}>
          남은 시간:{' '}
          {resttime / 60 < 10
            ? `0${parseInt(resttime / 60)}`
            : `${parseInt(resttime / 60)}`}{' '}
          : {resttime % 60 < 10 ? `0${resttime % 60}` : `${resttime % 60}`}
        </Text>
        : <Text style={styles.font18white}>당일이용권 이용중입니다.</Text>}
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 1 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(1);
            }}>
            <Text style={styles.font20}>01 : 00</Text>
            <Text style={styles.font20}>2000원</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 2 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(2);
            }}>
            <Text style={styles.font20}>02 : 00</Text>
            <Text style={styles.font20}>4000원</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 3 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(3);
            }}>
            <Text style={styles.font20}>03 : 00</Text>
            <Text style={styles.font20}>6000원</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 4 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(4);
            }}>
            <Text style={styles.font20}>05 : 00</Text>
            <Text style={styles.font20}>10000원</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 5 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(5);
            }}>
            <Text style={styles.font20}>15 : 00</Text>
            <Text style={styles.font20}>30000원</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 6 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(6);
            }}>
            <Text style={styles.font20}>25 : 00</Text>
            <Text style={styles.font20}>50000원</Text>
          </TouchableOpacity>
        </View>
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
