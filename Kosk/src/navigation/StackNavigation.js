import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MainScreen from '../component/[1]MainScreen/MainScreen';
import MapScreen from '../component/[2]MapScreen/MapScreen';
import StudyRoomScreen from '../component/[3]StudyRoomScreen/StudyRoomScreen';
import LockerScreen from '../component/[4]LockerScreen/LockerScreen';
import UserChargeScreen from '../component/[5]ChargeScreen/[5-1]UserChargeScreen/UserChargeScreen';
import RoomChargeScreen from '../component/[5]ChargeScreen/[5-2]RoomChargeScreen/RoomChargeScreen';
import PassChargeScreen from '../component/[5]ChargeScreen/[5-3]PassChargeScreen/PassChargeScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Room" component={StudyRoomScreen}/>
      <Stack.Screen name="Locker" component={LockerScreen} />
      <Stack.Screen name="UserCharge" component={UserChargeScreen} />
      <Stack.Screen name="RoomCharge" component={RoomChargeScreen} />
      <Stack.Screen name="PassCharge" component={PassChargeScreen} />
    </Stack.Navigator>
  );
}
