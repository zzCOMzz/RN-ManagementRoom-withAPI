import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Host} from './Host';

export const getUserToken = async () => {
  let token = await AsyncStorage.getItem('token');
  return token;
};

export const AddNewRoom = async roomName => {
  const token = await getUserToken();
  const response = await axios.post(
    `${Host}/room`,
    {
      roomName,
    },
    {headers: {Authorization: `${token}`}},
  );
  return response;
};

export const updateRoom = async (roomName, roomId) => {
  const token = await getUserToken();
  const response = await axios.put(
    `${Host}/room/${roomId}`,
    {
      roomName,
    },
    {headers: {Authorization: `${token}`}},
  );
  return response;
};

export const deleteRoomWithOrder = async (roomId, orderId) => {
  const token = await getUserToken();

  const response = await axios.delete(`${Host}/room/${roomId}/${orderId}`, {
    headers: {Authorization: `${token}`},
  });

  return response;
};

export const deleteRoom = async roomId => {
  const token = await getUserToken();

  const response = await axios.delete(`${Host}/room/${roomId}`, {
    headers: {Authorization: `${token}`},
  });

  return response;
};

export const addCustomer = async form => {
  const token = await getUserToken();
  const response = await axios.post(`${Host}/customer`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const updateCustomer = async (form, cusId) => {
  const token = await getUserToken();
  const response = await axios.put(`${Host}/customer/${cusId}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const deletCustomer = async customerId => {
  const token = await getUserToken();
  const response = await axios.delete(`${Host}/customer/${customerId}`, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const addNewOrder = async form => {
  const token = await getUserToken();
  const response = await axios.post(`${Host}/order`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const checkoutOrder = async (form, orderId) => {
  const token = await getUserToken();
  const response = await axios.put(`${Host}/order/${orderId}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};
