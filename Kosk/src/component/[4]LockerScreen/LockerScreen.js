import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import { set } from 'react-native-reanimated';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {lockerSave, lockerUsing} from '../../api/APIFunction';
import PushModal from '../../modal/PushModal/PushModal';
import ScreenModal from '../../modal/ScreenModal/ScreenModal';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import styles from './styles';

export default function LockerScreen({navigation}) {
  const [boxVisible, setBoxVisible] = useState(false);
  const [userName, setUserName] = useState('김철수');
  const [userNumber, setUserNumber] = useState('');
  const [id, setId] = useState(0);
  const [screenModalVisible, setScreenModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [usingLockerData] = useState([]);

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
      findData();
      getLockerUsing();
    });
  };

  const isUsing = n => {
    let bool = true;
    usingLockerData.map(item => {
      if (item.lockerNumber == n) bool = false;
    });
    return bool;
  };

  const findData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        setUserNumber(userInfo.userID);
        setUserName(userInfo.userName);
        console.log('map id:' + userInfo.userID);
        console.log('map name:' + userInfo.userName);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const getLockerUsing = async () => {
    try {
      const response = await lockerUsing();
      console.log('getLockerUsing success?', response.success);
      response.data.map(item => {
        usingLockerData.push(item);
        console.log(item);
      });
    } catch (error) {
      console.error('~~~ERROR getLockerUsing', error);
    }
  };

  const LockerCheck = async () => {
    const lockerResponse = await postLockerSave();
    if (lockerResponse.success) {
      setScreenModalVisible(true);
    }
  };

  const ScreenModalTimer = () => {
    if (screenModalVisible) {
      setTimeout(() => {
        navigation.goBack();
      }, 5000);
    }
  }
  useEffect(() => {
    ScreenModalTimer();
  }, [screenModalVisible]);

  const postLockerSave = async () => {
    try {
      const response = await lockerSave({
        lockerNumber: id,
        phoneNumber: userNumber,
      });
      console.log('success?', response.success);
      if(!response.success) {
        setBody(response.error.message);
        setPushModalVisible(true);
      }
      return response;
    } catch (error) {
      console.error('~~~ERROR postLockerSave', error);
    }
  };

  useEffect(() => {
    if(isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300)
    }
  }, []);

  return isLoading ? <LoadingScreen body={'보관함 정보를 불러옵니다.'}/> : (
    <View style={styles.Container}>
      <PushModal
        modalVisible={pushModalVisible}
        setModalVisible={setPushModalVisible}
        body={body}></PushModal>

      <ScreenModal
        modalVisible={screenModalVisible}
        setModalVisible={setScreenModalVisible}
        head={'보관함'}
        body={id}></ScreenModal>

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
        <Text style={styles.font18white}>보관함을 선택하세요.</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(1) ? '#eab530' : '#808080',
                  borderColor: id == 1 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(1);
              }}>
              <Text style={styles.font36}>L01</Text>
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
              <Text style={styles.font36}>L02</Text>
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
              <Text style={styles.font36}>L03</Text>
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
              <Text style={styles.font36}>L04</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
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
              <Text style={styles.font36}>L05</Text>
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
              <Text style={styles.font36}>L06</Text>
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
              <Text style={styles.font36}>L07</Text>
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
              <Text style={styles.font36}>L08</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(9) ? '#eab530' : '#808080',
                  borderColor: id == 9 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(9);
              }}>
              <Text style={styles.font36}>L09</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(10) ? '#eab530' : '#808080',
                  borderColor: id == 10 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(10);
              }}>
              <Text style={styles.font36}>L10</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(11) ? '#eab530' : '#808080',
                  borderColor: id == 11 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(11);
              }}>
              <Text style={styles.font36}>L11</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(12) ? '#eab530' : '#808080',
                  borderColor: id == 12 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(12);
              }}>
              <Text style={styles.font36}>L12</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(13) ? '#eab530' : '#808080',
                  borderColor: id == 13 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(13);
              }}>
              <Text style={styles.font36}>L13</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(14) ? '#eab530' : '#808080',
                  borderColor: id == 14 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(14);
              }}>
              <Text style={styles.font36}>L14</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(15) ? '#eab530' : '#808080',
                  borderColor: id == 15 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(15);
              }}>
              <Text style={styles.font36}>L15</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(16) ? '#eab530' : '#808080',
                  borderColor: id == 16 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(16);
              }}>
              <Text style={styles.font36}>L16</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
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
              <Text style={styles.font36}>L17</Text>
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
              <Text style={styles.font36}>L18</Text>
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
              <Text style={styles.font36}>L19</Text>
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
              <Text style={styles.font36}>L20</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(21) ? '#eab530' : '#808080',
                  borderColor: id == 21 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(21);
              }}>
              <Text style={styles.font36}>L21</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(22) ? '#eab530' : '#808080',
                  borderColor: id == 22 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(22);
              }}>
              <Text style={styles.font36}>L22</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(23) ? '#eab530' : '#808080',
                  borderColor: id == 23 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(23);
              }}>
              <Text style={styles.font36}>L23</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(24) ? '#eab530' : '#808080',
                  borderColor: id == 24 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(24);
              }}>
              <Text style={styles.font36}>L24</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.rowContainer}>
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
              <Text style={styles.font36}>L25</Text>
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
              <Text style={styles.font36}>L26</Text>
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
              <Text style={styles.font36}>L27</Text>
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
              <Text style={styles.font36}>L28</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(29) ? '#eab530' : '#808080',
                  borderColor: id == 29 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(29);
              }}>
              <Text style={styles.font36}>L29</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(30) ? '#eab530' : '#808080',
                  borderColor: id == 30 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(30);
              }}>
              <Text style={styles.font36}>L30</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(31) ? '#eab530' : '#808080',
                  borderColor: id == 31 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(31);
              }}>
              <Text style={styles.font36}>L31</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(32) ? '#eab530' : '#808080',
                  borderColor: id == 32 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(32);
              }}>
              <Text style={styles.font36}>L32</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(33) ? '#eab530' : '#808080',
                  borderColor: id == 33 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(33);
              }}>
              <Text style={styles.font36}>L33</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(34) ? '#eab530' : '#808080',
                  borderColor: id == 34 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(34);
              }}>
              <Text style={styles.font36}>L34</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(35) ? '#eab530' : '#808080',
                  borderColor: id == 35 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(35);
              }}>
              <Text style={styles.font36}>L35</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.smallbutton,
                {
                  backgroundColor: isUsing(36) ? '#eab530' : '#808080',
                  borderColor: id == 36 ? '#efefef' : '#000000',
                },
              ]}
              onPress={() => {
                setBoxVisible(true);
                setId(36);
              }}>
              <Text style={styles.font36}>L36</Text>
            </TouchableOpacity>
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
                    {id}번 보관함을 선택하였습니다.
                  </Text>
                ) : (
                  <Text style={styles.font18}>사용 중인 보관함입니다.</Text>
                )}
              </View>
              <View style={styles.boxbottomContainer}>
                <TouchableOpacity onPress={() => LockerCheck()}>
                  <View style={styles.clickbutton}>
                    <Text style={styles.font20}>예약</Text>
                  </View>
                </TouchableOpacity>
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
