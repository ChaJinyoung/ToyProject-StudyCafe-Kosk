/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

import {
  countLocker,
  countRoom,
  countSeat,
  memberLogin,
  roomExit,
  seatExit,
} from '../../api/APIFunction';
import ButtonModal from '../../modal/ButtonModal/ButtonModal';
import PushModal from '../../modal/PushModal/PushModal';

export default function MainScreen({navigation}) {
  const [number, setNumber] = useState('010');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const [id, setId] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [buttonModalVisible, setButtonModalVisible] = useState(false);
  const [seatCount, setSeatCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [lockerCount, setLockerCount] = useState(0);
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
    setIsLogin(false);
    if (number.length < 11 && password.length == 4) LoginCheck();
  }, [number, password]);

  useEffect(() => {
    OnLoad();
    getSeatCount();
    getRoomCount();
    getLockerCount();
    return setIsLogin(false);
  }, []);

  const OnLoad = () => {
    navigation.addListener('focus', () => {
      AsyncStorage.clear();
    });
  };

  const storeData = async data => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.log('storeData error', error);
    }
  };

  const LoginCheck = async () => {
    const loginResponse = await postLoginData();
    if (loginResponse.success) {
      const data = {
        userID: loginResponse.data.phoneNumber,
        userName: loginResponse.data.nickName,
        userTime: loginResponse.data.time,
      };
      setIsLogin(true);
      storeData(data);
    } else setIsLogin(false);
  };

  const postLoginData = async () => {
    try {
      const response = await memberLogin({
        phoneNumber: number,
        password: password,
      });
      return response;
    } catch (error) {
      console.error('~~~ERROR postLoginData', error);
    }
  };

  const postSeatExit = async () => {
    try {
      const response = await seatExit({
        phoneNumber: number,
      });
      if (response.success) {
        setBody('좌석 퇴실이 완료되었습니다.');
        setPushModalVisible(true);
      }
      return response;
    } catch (error) {
      console.error('~~~ERROR postSeatExit', error);
    }
  };

  const postRoomExit = async () => {
    try {
      const response = await roomExit({
        phoneNumber: number,
      });
      if (response.success) {
        setBody('스터디룸 퇴실이 완료되었습니다.');
        setPushModalVisible(true);
      }
      return response;
    } catch (error) {
      console.error('~~~ERROR postRoomExit', error);
    }
  };

  const getSeatCount = async () => {
    try {
      const response = await countSeat();
      setSeatCount(response.data);
    } catch (error) {
      console.error('~~~ERROR getSeatCount', error);
    }
  };

  const getRoomCount = async () => {
    try {
      const response = await countRoom();
      setRoomCount(response.data);
    } catch (error) {
      console.error('~~~ERROR getRoomCount', error);
    }
  };
  const getLockerCount = async () => {
    try {
      const response = await countLocker();
      setLockerCount(response.data);
    } catch (error) {
      console.error('~~~ERROR getLockerCount', error);
    }
  };

  const PressNumber = n => {
    if (!isPassword && number.length < 11) {
      setNumber(number + n);
    } else if (isPassword && password.length < 4) {
      setPassword(password + n);
    }
  };
  const BackNumber = () => {
    if (!isPassword && number.length > 3) {
      setNumber(number.slice(0, -1));
    } else if (isPassword) {
      setPassword(password.slice(0, -1));
    }
  };
  const ResetNumber = () => {
    if (!isPassword) setNumber('010');
    else setPassword('');
  };

  const ModalFunction = () => {
    setButtonModalVisible(true);
  };

  const NavigateScreen = () => {
    if (isLogin) {
    switch (id) {
      case 1:
        navigation.navigate('Map');
        break;
      case 2:
        navigation.navigate('Room');
        break;
      case 3:
        navigation.navigate('Locker');
        break;
      case 4:
        navigation.navigate('UserCharge');
        break;
      case 5:
        navigation.navigate('PassCharge');
        break;
      case 6:
        ModalFunction();
    }
    } else {
      setBody('로그인 정보가 잘못되었습니다');
      setPushModalVisible(true);
    }
  };

  return (
    <View style={styles.Container}>
      <PushModal
        modalVisible={pushModalVisible}
        setModalVisible={setPushModalVisible}
        body={body}></PushModal>

      <ButtonModal
        modalVisible={buttonModalVisible}
        setModalVisible={setButtonModalVisible}
        isSelect={true}
        body={'퇴실 목록을 선택하세요.'}
        isFirstEvent={() => {
          postSeatExit();
        }}
        isSecondEvent={() => {
          postRoomExit();
        }}></ButtonModal>

      <View style={styles.topContainer}>
        <View style={styles.topsubContainer}>
          <View style={styles.toptitle}>
            <Text style={[styles.font36]}>지정석</Text>
          </View>
          <Text
            style={[styles.font16, {color: seatCount === 0 ? 'red' : 'white'}]}>
            {seatCount}
          </Text>
        </View>
        <View style={styles.topsubContainer}>
          <View style={styles.toptitle}>
            <Text style={[styles.font36]}>스터디룸</Text>
          </View>
          <Text
            style={[styles.font16, {color: roomCount === 0 ? 'red' : 'white'}]}>
            {roomCount}
          </Text>
        </View>
        <View style={styles.topsubContainer}>
          <View style={styles.toptitle}>
            <Text style={[styles.font36]}>보관함</Text>
          </View>
          <Text
            style={[
              styles.font16,
              {color: lockerCount === 0 ? 'red' : 'white'},
            ]}>
            {lockerCount}
          </Text>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.font14}>Study Cafe Kosk</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.boxtopContainer}>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 1 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(1);
            }}>
            <Icons name="desk" size={40} color="#efefef"></Icons>
            <Text style={styles.font30}>좌석 사용</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 2 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(2);
            }}>
            <Icons name="human-male-board" size={40} color="#efefef"></Icons>
            <Text style={styles.font30}>스터디룸 예약</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 3 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(3);
            }}>
            <Icons name="lock-open" size={40} color="#efefef"></Icons>
            <Text style={styles.font30}>보관함 이용</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxtopContainer}>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 4 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(4);
            }}>
            <Icons
              name="credit-card-check-outline"
              size={40}
              color="#efefef"></Icons>
            <Text style={styles.font30}>시간 충전</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 5 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(5);
            }}>
            <Icons name="calendar-plus" size={40} color="#efefef"></Icons>
            <Text style={styles.font30}>당일이용권</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.smallboxContainer,
              {borderColor: id == 6 ? '#efefef' : '#eab530'},
            ]}
            onPress={() => {
              setId(6);
            }}>
            <Icons name="door-open" size={40} color="#efefef"></Icons>
            <Text style={styles.font30}>퇴실하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.numberContainer}>
        <View style={styles.bottomleftContainer}>
          <Text style={styles.font24}>휴대폰번호</Text>
          <TouchableOpacity
            style={[
              styles.textinput,
              {borderColor: !isPassword ? '#eab530' : '#000000'},
            ]}
            onPress={() => {
              setIsPassword(false);
            }}>
            <Text style={styles.font20}>{number}</Text>
          </TouchableOpacity>
          <Text style={styles.font24}>비밀번호</Text>
          <TouchableOpacity
            style={[
              styles.textinput,
              {borderColor: isPassword ? '#eab530' : '#000000'},
            ]}
            onPress={() => {
              setIsPassword(true);
            }}>
            <Text style={styles.font20}>{password}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginbutton}
            onPress={() => {
              NavigateScreen();
            }}>
            <Text style={styles.font24}>선택 완료</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomrightContainer}>
          <View style={styles.boxtopContainer}>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(1);
              }}>
              <Text style={styles.font20}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(2);
              }}>
              <Text style={styles.font20}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(3);
              }}>
              <Text style={styles.font20}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.boxtopContainer}>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(4);
              }}>
              <Text style={styles.font20}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(5);
              }}>
              <Text style={styles.font20}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(6);
              }}>
              <Text style={styles.font20}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.boxtopContainer}>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(7);
              }}>
              <Text style={styles.font20}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(8);
              }}>
              <Text style={styles.font20}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(9);
              }}>
              <Text style={styles.font20}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.boxtopContainer}>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                BackNumber();
              }}>
              <Text style={styles.font20}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                PressNumber(0);
              }}>
              <Text style={styles.font20}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberboxContainer}
              onPress={() => {
                ResetNumber();
              }}>
              <Text style={styles.font20}>del</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
