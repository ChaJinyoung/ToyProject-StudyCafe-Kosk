import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ChargeTime, Payment} from '../../../api/APIFunction';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import styles from './styles';
import moment from 'moment';
import SelectModal from '../../../modal/SelectModal/SelectModal';
import PushModal from '../../../modal/PushModal/PushModal';

export default function PassChargeScreen({navigation}) {
  const [way, setWay] = useState(0);
  const [userNumber, setUserNumber] = useState('');
  const [userName, setUserName] = useState('김철수');
  const [isLoading, setIsLoading] = useState(true);
  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [isPay, setIsPay] = useState(false);

  const dateFormat = 'YYYY-MM-DD';
  const today = moment().format(dateFormat);

  const [pushModalVisible, setPushModalVisible] = useState(false);
  const [body, setBody] = useState('');

  useEffect(() => {
    PushModalFunction();
  }, [pushModalVisible]);

  const PushModalFunction = () => {
    if (pushModalVisible) {
      setTimeout(() => {
        setPushModalVisible(false);
      }, 500);
    }
  };

  useEffect(() => {
    OnLoad();
  }, []);

  const OnLoad = () => {
    navigation.addListener('focus', () => {
      FindData();
      if (isPay) navigation.popToTop();
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

  const postCharge = async () => {
    try {
      const response = await ChargeTime({
        time: 0,
        type: '당일',
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
        pay: 10000,
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
    const Response = await postCharge();
    if (Response.success) {
      setIsPay(true);
      await postPay();
      const data = {
        isPay: true,
        isTime: false,
      };
      console.log('isPay: ', isPay);
      await SavePayResult(data);
      setSelectModalVisible(true);
    } else {
      setBody('이미 당일권을 결제하였습니다.');
      setPushModalVisible(true);
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

  const GoMap = () => {
    navigation.navigate('Map');
  };

  const GoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [setIsLoading]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View style={styles.Container}>
      <PushModal
        modalVisible={pushModalVisible}
        setModalVisible={setPushModalVisible}
        body={body}></PushModal>

      <SelectModal
        modalVisible={selectModalVisible}
        setModalVisible={setSelectModalVisible}
        isSelect={true}
        body={'당일이용권을 구매하였습니다.\n지정석을 선택하시겠습니까?'}
        isFirstEvent={GoMap}
        isSecondEvent={GoBack}></SelectModal>

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
        <Text style={styles.font18white}>
          당일이용권 구매를 선택하였습니다.
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.font28}>
          당일이용권은 00:00부터 23:59까지 적용됩니다.
        </Text>
        <Text style={styles.font28}>이 점 유의하시길 바랍니다.</Text>
        <Text style={styles.font18white}></Text>
        <Text style={styles.font18white}>{today} 이용</Text>
        <Text style={styles.font18white}>이용요금: 10000원</Text>
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
              console.log('chargeTime: ' + userNumber);
              PaymentResult();
            }}>
            <Text style={styles.font20}>결제</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
