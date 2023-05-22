import axios from 'axios';
import {server_url, roomExit_url, timeDelay_url} from './server_url';

export const memberLogin = async (reqData) => {
  try {
    const baseurl = server_url.memberLogin;
    const response = await axios.post(baseurl, reqData);
    console.log('memberLogin response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~memberLogin ERROR', e);
  }
};

export const seatSave = async (reqData) => {
  try {
    const baseurl = server_url.seatSave;
    const response = await axios.post(baseurl, reqData);
    console.log('seatSave response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~seatSave ERROR', e);
  }
};

export const seatUsing = async () => {
  try {
    const baseurl = server_url.seatUsing;
    const response = await axios.get(baseurl);
    console.log(`seatUsing get response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~seatUsing ERROR!`, e);
  }
};

export const seatExit = async (reqData) => {
  try {
    const baseurl = server_url.seatExit;
    const response = await axios.post(baseurl, reqData);
    console.log('seatExit response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~seatExit ERROR', e);
  }
};

export const countSeat = async () => {
  try {
    const baseurl = server_url.seatCount;
    const response = await axios.get(baseurl);
    console.log(`countSeat get response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~countSeat ERROR!`, e);
  }
};


export const roomSave = async (reqData) => {
  try {
    const baseurl = server_url.roomSave;
    const response = await axios.post(baseurl, reqData);
    console.log('roomSave response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~roomSave ERROR', e);
  }
};

export const roomUsing = async () => {
  try {
    const baseurl = server_url.roomUsing;
    const response = await axios.get(baseurl);
    console.log(`roomUsing get response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~roomUsing ERROR!`, e);
  }
};

export const countRoom = async () => {
  try {
    const baseurl = server_url.roomCount;
    const response = await axios.get(baseurl);
    console.log(`countRoom get response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~countRoom ERROR!`, e);
  }
};

export const roomExit = async (reqData) => {
  try {
    const baseurl = server_url.roomExit;
    const response = await axios.post(baseurl, reqData);
    console.log('roomExit response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~roomExit ERROR', e);
  }
};


export const lockerSave = async (reqData) => {
  try {
    const baseurl = server_url.lockerSave;
    const response = await axios.post(baseurl, reqData);
    console.log('lockerSave response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~lockerSave ERROR', e);
  }
};

export const lockerUsing = async () => {
  try {
    const baseurl = server_url.lockerUsing;
    const response = await axios.get(baseurl);
    console.log(`lockerUsing get response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~lockerUsing ERROR!`, e);
  }
};

export const countLocker = async () => {
  try {
    const baseurl = server_url.lockerCount;
    const response = await axios.get(baseurl);
    console.log(`countLocker get response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~countLocker ERROR!`, e);
  }
};

export const timeDelay = async (reqData) => {
  try {
    const baseurl = timeDelay_url;
    const response = await axios.post(baseurl, reqData);
    console.log('timeDelay response', response.data);
    return response.data;
  } catch (e) {
    console.log('~~~timeDelay ERROR!', e);
  }
};

export const ChargeTime = async (reqData) => {
  try {
    const baseurl = server_url.chargeTime;
    const response = await axios.post(baseurl, reqData);
    console.log(`ChargeTime post response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~ChargeTime ERROR!`, e);
  }
};

export const Payment = async (reqData) => {
  try {
    const baseurl = server_url.pay;
    const response = await axios.post(baseurl, reqData);
    console.log(`Payment post response`, response.data);
    return response.data;
  } catch (e) {
    console.log(`~~~Payment ERROR!`, e);
  }
};