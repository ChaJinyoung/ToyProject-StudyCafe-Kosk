/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import SelectModal from '../../modal/SelectModal/SelectModal';
import ScreenModal from '../../modal/ScreenModal/ScreenModal';
import {seatUsing, seatSave} from '../../api/APIFunction';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {seatdata} from '../../data/screendata';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import PushModal from '../../modal/PushModal/PushModal';

export default function MapScreen({navigation}) {
  const [boxVisible, setBoxVisible] = useState(false);
  const [userName, setUserName] = useState('김철수');
  const [userNumber, setUserNumber] = useState('');
  const [resttime, setResttime] = useState(11);
  const [id, setId] = useState(0);
  const [selectModalVisible, setSelectModalVisible] = useState(true);
  const [screenModalVisible, setScreenModalVisible] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [isTime, setIsTime] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [usingSeatData] = useState([]);

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
    PayCheck();
  }, []);

  useEffect(() => {
    PaySuccess();
  }, [isPay]);

  useEffect(() => {
    CheckPass();
  }, [resttime]);

  const CheckPass = () => {
    if (resttime > 9999) setIsTime(false);
  };

  const isUsing = n => {
    let bool = true;
    usingSeatData.map(item => {
      if (item.seatNumber == n) bool = false;
    });
    return bool;
  };

  const OnLoad = () => {
    navigation.addListener('focus', () => {
      findData();
      getSeatUsing();
    });
  };

  const PayCheck = async () => {
    try {
      const value = await AsyncStorage.getItem('paymentResult');
      if (value) {
        const payResult = JSON.parse(value);
        setIsTime(payResult.isTime);
        setIsPay(payResult.isPay);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const PaySuccess = async () => {
    if (isPay && isTime) {
      const roomSaveResponse = await postSeatSave();
      if (roomSaveResponse.success) setScreenModalVisible(true);
    }
  };

  const findData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        setUserNumber(userInfo.userID);
        setUserName(userInfo.userName);
        setResttime(userInfo.userTime);
        console.log('유저시간', userInfo.userTime);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const getSeatUsing = async () => {
    try {
      const response = await seatUsing();
      response.data.map(item => {
        usingSeatData.push(item);
      });
    } catch (error) {
      console.error('~~~ERROR getSeatUsing', error);
    }
  };

  const postSeatSave = async () => {
    try {
      const response = await seatSave({
        seatNumber: id,
        phoneNumber: userNumber,
      });
      if (!response.success) {
        setBody(response.error.message);
        setPushModalVisible(true);
      }
      return response;
    } catch (error) {
      console.error('~~~ERROR postSeatSave', error);
    }
  };

  const ModalFunction = async () => {
    if (resttime < 20) {
      if (isPay && !isTime) {
        const seatResponse = await postSeatSave();
        if (seatResponse.success) setScreenModalVisible(true);
      }
      setSelectModalVisible(true);
    } else {
      const seatResponse = await postSeatSave();
      if (seatResponse.success) setScreenModalVisible(true);
    }
  };

  const ScreenModalTimer = () => {
    if (screenModalVisible) {
      setTimeout(() => {
        navigation.popToTop();
      }, 5000);
    }
  };

  useEffect(() => {
    ScreenModalTimer();
  }, [screenModalVisible]);

  const GoCharge = () => {
    navigation.navigate('UserCharge');
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);

  return isLoading ? (
    <LoadingScreen body={'좌석 정보를 불러옵니다.'} />
  ) : (
    <View style={styles.Container}>
      <PushModal
        modalVisible={pushModalVisible}
        setModalVisible={setPushModalVisible}
        body={body}></PushModal>

      <ScreenModal
        modalVisible={screenModalVisible}
        setModalVisible={setScreenModalVisible}
        head={'지정석'}
        body={id}></ScreenModal>

      <SelectModal
        modalVisible={selectModalVisible}
        setModalVisible={setSelectModalVisible}
        isSelect={true}
        body={'남은 사용시간이 적습니다.\n충전하시겠습니까?'}
        isFirstEvent={GoCharge}
        isSecondEvent={setSelectModalVisible}></SelectModal>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.popToTop();
          }}>
          <Icons name="arrow-left-bold" size={40} color="#efefef"></Icons>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.font18white}>환영합니다. {userName} 님</Text>
        <Text style={styles.font18white}>좌석을 선택하세요.</Text>
        {isTime ? (
          <Text style={[styles.font18white, {margin: '2%'}]}>
            남은 시간:{' '}
            {resttime / 60 < 10
              ? `0${parseInt(resttime / 60)}`
              : `${parseInt(resttime / 60)}`}{' '}
            : {resttime % 60 < 10 ? `0${resttime % 60}` : `${resttime % 60}`}
          </Text>
        ) : (
          <Text style={[styles.font18white, {margin: '2%'}]}>
            당일이용권 이용중입니다.
          </Text>
        )}
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imagetopsubContainer}>
            <View style={styles.imagetopContainer}>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '6%',
                    backgroundColor: isUsing(1) ? '#eab530' : '#808080',
                    borderColor: id == 1 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(1);
                }}>
                <Text style={styles.font36}>z01</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(2) ? '#eab530' : '#808080',
                    borderColor: id == 2 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(2);
                }}>
                <Text style={styles.font36}>z02</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(3) ? '#eab530' : '#808080',
                    borderColor: id == 3 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(3);
                }}>
                <Text style={styles.font36}>z03</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(4) ? '#eab530' : '#808080',
                    borderColor: id == 4 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(4);
                }}>
                <Text style={styles.font36}>z04</Text>
              </TouchableOpacity>
              <View style={{marginRight: '12%'}}></View>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(5) ? '#eab530' : '#808080',
                    borderColor: id == 5 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(5);
                }}>
                <Text style={styles.font36}>z05</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(6) ? '#eab530' : '#808080',
                    borderColor: id == 6 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(6);
                }}>
                <Text style={styles.font36}>z06</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(7) ? '#eab530' : '#808080',
                    borderColor: id == 7 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(7);
                }}>
                <Text style={styles.font36}>z07</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(8) ? '#eab530' : '#808080',
                    borderColor: id == 8 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(8);
                }}>
                <Text style={styles.font36}>z08</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}></View>
            <View style={styles.imagemiddleContainer}>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '0%',
                    backgroundColor: isUsing(9) ? '#eab530' : '#808080',
                    borderColor: id == 9 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(9);
                }}>
                <Text style={styles.font36}>z09</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '17%',
                    backgroundColor: isUsing(13) ? '#eab530' : '#808080',
                    borderColor: id == 13 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(13);
                }}>
                <Text style={styles.font36}>z13</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(17) ? '#eab530' : '#808080',
                    borderColor: id == 17 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(17);
                }}>
                <Text style={styles.font36}>z17</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '13%',
                    backgroundColor: isUsing(21) ? '#eab530' : '#808080',
                    borderColor: id == 21 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(21);
                }}>
                <Text style={styles.font36}>z21</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(25) ? '#eab530' : '#808080',
                    borderColor: id == 25 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(25);
                }}>
                <Text style={styles.font36}>z25</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '15%',
                    backgroundColor: isUsing(29) ? '#eab530' : '#808080',
                    borderColor: id == 29 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(29);
                }}>
                <Text style={styles.font36}>z29</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imagemiddleContainer}>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '0%',
                    backgroundColor: isUsing(10) ? '#eab530' : '#808080',
                    borderColor: id == 10 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(10);
                }}>
                <Text style={styles.font36}>z10</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '17%',
                    backgroundColor: isUsing(14) ? '#eab530' : '#808080',
                    borderColor: id == 14 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(14);
                }}>
                <Text style={styles.font36}>z14</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(18) ? '#eab530' : '#808080',
                    borderColor: id == 18 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(18);
                }}>
                <Text style={styles.font36}>z18</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '13%',
                    backgroundColor: isUsing(22) ? '#eab530' : '#808080',
                    borderColor: id == 22 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(22);
                }}>
                <Text style={styles.font36}>z22</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(26) ? '#eab530' : '#808080',
                    borderColor: id == 26 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(26);
                }}>
                <Text style={styles.font36}>z26</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '15%',
                    backgroundColor: isUsing(30) ? '#eab530' : '#808080',
                    borderColor: id == 30 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(30);
                }}>
                <Text style={styles.font36}>z30</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imagemiddleContainer}>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '0%',
                    backgroundColor: isUsing(11) ? '#eab530' : '#808080',
                    borderColor: id == 11 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(11);
                }}>
                <Text style={styles.font36}>z11</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '17%',
                    backgroundColor: isUsing(15) ? '#eab530' : '#808080',
                    borderColor: id == 15 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(15);
                }}>
                <Text style={styles.font36}>z15</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(19) ? '#eab530' : '#808080',
                    borderColor: id == 19 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(19);
                }}>
                <Text style={styles.font36}>z19</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '13%',
                    backgroundColor: isUsing(23) ? '#eab530' : '#808080',
                    borderColor: id == 23 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(23);
                }}>
                <Text style={styles.font36}>z23</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(27) ? '#eab530' : '#808080',
                    borderColor: id == 27 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(27);
                }}>
                <Text style={styles.font36}>z27</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '15%',
                    backgroundColor: isUsing(31) ? '#eab530' : '#808080',
                    borderColor: id == 31 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(31);
                }}>
                <Text style={styles.font36}>z31</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imagemiddleContainer}>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '0%',
                    backgroundColor: isUsing(12) ? '#eab530' : '#808080',
                    borderColor: id == 12 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(12);
                }}>
                <Text style={styles.font36}>z12</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '17%',
                    backgroundColor: isUsing(16) ? '#eab530' : '#808080',
                    borderColor: id == 16 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(16);
                }}>
                <Text style={styles.font36}>z16</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(20) ? '#eab530' : '#808080',
                    borderColor: id == 20 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(20);
                }}>
                <Text style={styles.font36}>z20</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '13%',
                    backgroundColor: isUsing(24) ? '#eab530' : '#808080',
                    borderColor: id == 24 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(24);
                }}>
                <Text style={styles.font36}>z24</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    backgroundColor: isUsing(28) ? '#eab530' : '#808080',
                    borderColor: id == 28 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(28);
                }}>
                <Text style={styles.font36}>z28</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.smallbutton,
                  {
                    marginLeft: '15%',
                    backgroundColor: isUsing(32) ? '#eab530' : '#808080',
                    borderColor: id == 32 ? '#efefef' : '#000000',
                  },
                ]}
                onPress={() => {
                  setBoxVisible(true);
                  setId(32);
                }}>
                <Text style={styles.font36}>z32</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={styles.imagebottomsubContainer}>
            <View style={styles.imagebottomleftContainer}>
              <View style={styles.locker}>
                <Text style={styles.font36}>보관함</Text>
              </View>
              <View style={styles.door}></View>
            </View>
            <View style={styles.imagebottomrightContainer}>
              <Text style={styles.font18white}>스터디룸</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        {boxVisible ? (
          <View style={styles.bottomContainer}>
            <View style={styles.bottombox}>
              <View style={styles.boxtopContainer}>
                {isUsing(id) ? (
                  <Text style={styles.font18}>
                    {id}번 좌석을 선택하였습니다.
                  </Text>
                ) : (
                  <Text style={styles.font18}>사용 중인 좌석입니다.</Text>
                )}
              </View>
              <View style={styles.boxbottomContainer}>
                {isUsing(id) ? (
                  <TouchableOpacity onPress={() => ModalFunction()}>
                    <View style={styles.clickbutton}>
                      <Text style={styles.font20}>사용</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}
