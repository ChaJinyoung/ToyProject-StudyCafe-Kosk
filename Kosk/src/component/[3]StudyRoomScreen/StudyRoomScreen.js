import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {roomSave, roomUsing} from '../../api/APIFunction';
import PushModal from '../../modal/PushModal/PushModal';
import ScreenModal from '../../modal/ScreenModal/ScreenModal';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import styles from './styles';

LocaleConfig.locales.fr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'i dag',
};

export default function StudyRoomScreen({navigation}) {
  LocaleConfig.defaultLocale = 'fr';
  const [boxVisible, setBoxVisible] = useState(false);
  const [id, setId] = useState(0);
  const [userName, setUserName] = useState('김철수');
  const [userNumber, setUserNumber] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [nextDate, setNextDate] = useState('');
  const [startTime, setStartTime] = useState(3000);
  const [endTime, setEndTime] = useState(3000);
  const [isStartTime, setIsStartTime] = useState(true);
  const [isSelectDate, setIsSelectDate] = useState(true);
  const [isPay, setIsPay] = useState(false);
  const [screenModalVisible, setScreenModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [usingRoomData] = useState([]);

  const dateFormat = 'YYYY-MM-DD';
  const today = moment().format(dateFormat);
  const maxDate = moment().add(2, 'month').format(dateFormat);

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

  useEffect(() => {
    if (isPay) {
      setScreenModalVisible(true);
    }
  }, [isPay]);

  useEffect(() => {
    ScreenModalTimer();
  }, [screenModalVisible]);

  useEffect(() => {
    if (id != 0 && selectDate != 0 && startTime != 3000 && endTime != 3000) {
      setBoxVisible(true);
    } else {
      setBoxVisible(false);
    }
  }, [id, selectDate, startTime, endTime]);

  const isUsing = n => {
    let bool = true;
    usingRoomData.map(item => {
      if (item.roomNumber == id) {
        if (item.endDate == selectDate && item.startDate == selectDate) {
          if (parseInt(item.start) <= n && parseInt(item.end) >= n) {
            bool = false;
          }
          if (
            startTime < parseInt(item.start) &&
            (n >= parseInt(item.start) || n <= startTime)
          ) {
            bool = false;
          }
        } else if (item.endDate == nextDate && item.startDate == selectDate) {
          if (parseInt(item.start) <= n) {
            bool = false;
          }
          if (
            startTime < parseInt(item.start) &&
            (n >= parseInt(item.start) || n <= startTime)
          ) {
            bool = false;
          }
        } else if (item.endDate == selectDate) {
          if (parseInt(item.end) >= n) {
            bool = false;
          }
        }
      }
    });
    return bool;
  };

  const OnLoad = () => {
    navigation.addListener('focus', () => {
      findData();
      getRoomUsing();
      PayCheck();
    });
  };

  const getRoomUsing = async () => {
    try {
      const response = await roomUsing();
      console.log('getRoomUsing success?', response.success);
      response.data.map(item => {
        usingRoomData.push(item);
        console.log(item);
      });
    } catch (error) {
      console.error('~~~ERROR getRoomUsing', error);
    }
  };

  const PayCheck = async () => {
    try {
      const value = await AsyncStorage.getItem('paymentResult');
      if (value) {
        const payResult = JSON.parse(value);
        setIsPay(payResult.isPay);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const PaySuccess = async () => {
    const roomSaveResponse = await postRoomSave();
    console.log('room save', roomSaveResponse.success);
    if (roomSaveResponse.success) {
      GoCharge();
    } else {
      setBody('이미 스터디룸을 예약하였습니다.');
      setPushModalVisible(true);
    }
  };

  const findData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      if (value) {
        const userInfo = JSON.parse(value);
        setUserName(userInfo.userName);
        setUserNumber(userInfo.userID);
        console.log('room id:' + userInfo.userID);
        console.log('room name:' + userInfo.userName);
      }
    } catch (error) {
      console.log('~~~~error' + error);
    }
  };

  const storeData = async data => {
    try {
      await AsyncStorage.setItem('StudyRoomData', JSON.stringify(data));
      console.log('등록완료', selectDate, startTime, endTime, id);
    } catch (error) {
      console.log('storeData error', error);
    }
  };

  const postRoomSave = async () => {
    try {
      console.log(
        'postRoomSave: ',
        id,
        startTime < 1000 ? `0${startTime.toString()}` : startTime.toString(),
        endTime < 1000 ? `0${endTime.toString()}` : endTime.toString(),
        selectDate,
        endTime > startTime ? selectDate : nextDate,
        userNumber,
      );
      const response = await roomSave({
        roomNumber: id,
        start:
          startTime < 1000 ? `0${startTime.toString()}` : startTime.toString(),
        end: endTime < 1000 ? `0${endTime.toString()}` : endTime.toString(),
        startDate: selectDate,
        endDate: endTime > startTime ? selectDate : nextDate,
        phoneNumber: userNumber,
      });
      console.log('success?', response.success);
      return response;
    } catch (error) {
      console.error('~~~ERROR postSeatSave', error);
    }
  };

  const GoCharge = () => {
    const data = {
      roomId: id,
      date: selectDate,
      startTime: startTime,
      endTime: endTime,
    };
    storeData(data);
    navigation.navigate('RoomCharge');
  };

  const isTime = n => {
    if (!isStartTime && TimeMeasure(n)) {
      return true;
    }
    return false;
  };

  const TimeMeasure = n => {
    if (startTime + 1200 < n || (startTime >= n && startTime - 1200 < n)) {
      return true;
    }
    if (!isUsing(n) && startTime < n) {
      return true;
    }
    return false;
  };

  const ScreenModalTimer = () => {
    if (screenModalVisible) {
      setTimeout(() => {
        navigation.goBack();
      }, 5000);
    }
  };

  const BackSpace = () => {
    if (!isStartTime) {
      setStartTime(3000);
      setEndTime(3000);
      setIsStartTime(true);
    } else if (!isSelectDate) {
      setIsSelectDate(true);
    }
  };

  const setTime = n => {
    if (isStartTime && isUsing(n)) {
      setStartTime(n);
      console.log('start time: ', startTime, isStartTime);
      setIsStartTime(false);
    } else {
      if (!isTime(n) && isUsing(n)) {
        setEndTime(n);
        console.log('end time: ', startTime, endTime);
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);

  return isLoading ? (
    <LoadingScreen body={'스터디룸 정보를 불러옵니다.'} />
  ) : (
    <View style={styles.Container}>
      <PushModal
        modalVisible={pushModalVisible}
        setModalVisible={setPushModalVisible}
        body={body}
      />

      <ScreenModal
        modalVisible={screenModalVisible}
        setModalVisible={setScreenModalVisible}
        head={'스터디룸'}
        body={id}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icons name="arrow-left-bold" size={40} color="#efefef" />
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.font18}>환영합니다. {userName} 님</Text>
        <Text style={styles.font18}>스터디룸을 선택하세요.</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.imagebottomContainer}>
          <TouchableOpacity
            style={[
              styles.largebutton,
              {
                borderColor: id == 1 ? '#efefef' : '#000000',
              },
            ]}
            onPress={() => {
              setId(1);
              setStartTime(3000);
              setEndTime(3000);
              setIsStartTime(true);
            }}>
            <Text style={styles.font22white}>R1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.largebutton,
              {
                borderColor: id == 2 ? '#efefef' : '#000000',
              },
            ]}
            onPress={() => {
              setId(2);
              setStartTime(3000);
              setEndTime(3000);
              setIsStartTime(true);
            }}>
            <Text style={styles.font22white}>R2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.largebutton,
              {
                borderColor: id == 3 ? '#efefef' : '#000000',
              },
            ]}
            onPress={() => {
              setId(3);
              setStartTime(3000);
              setEndTime(3000);
              setIsStartTime(true);
            }}>
            <Text style={styles.font22white}>R3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.largebutton,
              {
                borderColor: id == 4 ? '#efefef' : '#000000',
              },
            ]}
            onPress={() => {
              setId(4);
              setStartTime(3000);
              setEndTime(3000);
              setIsStartTime(true);
            }}>
            <Text style={styles.font22white}>R4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.largebutton,
              {
                borderColor: id == 5 ? '#efefef' : '#000000',
              },
            ]}
            onPress={() => {
              setId(5);
              setStartTime(3000);
              setEndTime(3000);
              setIsStartTime(true);
            }}>
            <Text style={styles.font22white}>R5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.largebutton,
              {
                borderColor: id == 6 ? '#efefef' : '#000000',
              },
            ]}
            onPress={() => {
              setId(6);
              setStartTime(3000);
              setEndTime(3000);
              setIsStartTime(true);
            }}>
            <Text style={styles.font22white}>R6</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dateContainer}>
        {!isSelectDate ? (
          <View style={styles.timeContainer}>
            <View style={styles.timetopContainer}>
              <TouchableOpacity
                onPress={() => {
                  BackSpace();
                }}>
                <Icons name="arrow-left-bold" size={30} color="#efefef" />
              </TouchableOpacity>
              <View style={styles.timesubContainer}>
                <View
                  style={[
                    styles.datemenu,
                    {borderColor: isStartTime ? '#efefef' : '#000000'},
                  ]}>
                  <Text style={styles.font34}>시작시간</Text>
                </View>
                <View
                  style={[
                    styles.datemenu,
                    {borderColor: isStartTime ? '#eab530' : '#efefef'},
                  ]}>
                  <Text style={styles.font34}>종료시간</Text>
                </View>
              </View>
            </View>
            <View style={styles.timebottomContainer}>
              <View style={styles.timeintervalconatiner}>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(0) || !isUsing(0) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 0 || endTime == 0 ? '#efefef' : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(0);
                  }}>
                  <Text style={styles.font34}>00:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(100) || !isUsing(100) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 100 || endTime == 100
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(100);
                  }}>
                  <Text style={styles.font34}>01:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(200) || !isUsing(200) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 200 || endTime == 200
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(200);
                  }}>
                  <Text style={styles.font34}>02:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(300) || !isUsing(300) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 300 || endTime == 300
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(300);
                  }}>
                  <Text style={styles.font34}>03:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(400) || !isUsing(400) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 400 || endTime == 400
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(400);
                  }}>
                  <Text style={styles.font34}>04:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(500) || !isUsing(500) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 500 || endTime == 500
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(500);
                  }}>
                  <Text style={styles.font34}>05:00</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.timeintervalconatiner,
                  {borderRightWidth: 2, borderColor: '#efefef'},
                ]}>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(600) || !isUsing(600) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 600 || endTime == 600
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(600);
                  }}>
                  <Text style={styles.font34}>06:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(700) || !isUsing(700) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 700 || endTime == 700
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(700);
                  }}>
                  <Text style={styles.font34}>07:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(800) || !isUsing(800) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 800 || endTime == 800
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(800);
                  }}>
                  <Text style={styles.font34}>08:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(900) || !isUsing(900) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 900 || endTime == 900
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    console.log(isUsing(900));
                    setTime(900);
                  }}>
                  <Text style={styles.font34}>09:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1000) || !isUsing(1000) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1000 || endTime == 1000
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1000);
                  }}>
                  <Text style={styles.font34}>10:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1100) || !isUsing(1100) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1100 || endTime == 1100
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1100);
                  }}>
                  <Text style={styles.font34}>11:00</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeintervalconatiner}>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1200) || !isUsing(1200) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1200 || endTime == 1200
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1200);
                  }}>
                  <Text style={styles.font34}>12:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1300) || !isUsing(1300) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1300 || endTime == 1300
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1300);
                  }}>
                  <Text style={styles.font34}>13:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1400) || !isUsing(1400) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1400 || endTime == 1400
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1400);
                  }}>
                  <Text style={styles.font34}>14:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1500) || !isUsing(1500) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1500 || endTime == 1500
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1500);
                  }}>
                  <Text style={styles.font34}>15:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1600) || !isUsing(1600) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1600 || endTime == 1600
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1600);
                  }}>
                  <Text style={styles.font34}>16:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1700) || !isUsing(1700) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1700 || endTime == 1700
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1700);
                    console.log(isTime(1700), isUsing(1700));
                  }}>
                  <Text style={styles.font34}>17:00</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.timeintervalconatiner}>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1800) || !isUsing(1800) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1800 || endTime == 1800
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1800);
                    console.log(isTime(1800), isUsing(1800));
                  }}>
                  <Text style={styles.font34}>18:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(1900) || !isUsing(1900) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 1900 || endTime == 1900
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(1900);
                  }}>
                  <Text style={styles.font34}>19:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(2000) || !isUsing(2000) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 2000 || endTime == 2000
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(2000);
                  }}>
                  <Text style={styles.font34}>20:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(2100) || !isUsing(2100) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 2100 || endTime == 2100
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(2100);
                  }}>
                  <Text style={styles.font34}>21:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(2200) || !isUsing(2200) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 2200 || endTime == 2200
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(2200);
                  }}>
                  <Text style={styles.font34}>22:00</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.datebutton,
                    {
                      backgroundColor:
                        isTime(2300) || !isUsing(2300) ? '#4f4f4f' : '#eab530',
                      borderColor:
                        startTime == 2300 || endTime == 2300
                          ? '#efefef'
                          : '#000000',
                    },
                  ]}
                  onPress={() => {
                    setTime(2300);
                  }}>
                  <Text style={styles.font34}>23:00</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <Calendar
            monthFormat={'yyyy년 MM월'}
            markingType={'custom'}
            hideExtraDays={true}
            disableAllTouchEventsForDisabledDays={true}
            minDate={today}
            maxDate={maxDate}
            onDayPress={day => {
              setIsSelectDate(false);
              setSelectDate(day.dateString);
              setNextDate(
                moment(day.dateString).add(1, 'days').format(dateFormat),
              );
            }}
            theme={{
              'stylesheet.calendar.header': {
                dayTextAtIndex0: {
                  color: 'red',
                },
                dayTextAtIndex6: {
                  color: 'blue',
                },
              },
              calendarBackground: '#1f1f1f',
              dayTextColor: '#efefef',
              textDisabledColor: '#3f3f3f',
              monthTextColor: '#efefef',
              textDayFontSize: Dimensions.get('window').width / 26,
              textMonthFontSize: Dimensions.get('window').width / 22,
              textDayHeaderFontSize: Dimensions.get('window').width / 26,
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
            }}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        {boxVisible ? (
          <View style={styles.bottomContainer}>
            <View style={styles.bottombox}>
              <View style={styles.boxtopContainer}>
                <Text style={styles.font22}>
                  {selectDate} /{' '}
                  {startTime / 100 < 10
                    ? `0${startTime / 100}`
                    : startTime / 100}
                  :00 ~{' '}
                  {endTime / 100 < 10 ? `0${endTime / 100}` : endTime / 100}
                  :00
                </Text>
                <Text style={styles.font22}>
                  {id}번 스터디룸을 선택하였습니다.
                </Text>
              </View>
              <View style={styles.boxbottomContainer}>
                <TouchableOpacity onPress={() => PaySuccess()}>
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
