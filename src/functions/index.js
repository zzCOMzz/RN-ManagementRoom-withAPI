import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {Host} from './Host';

export const getUserToken = async () => {
  let token = await AsyncStorage.getItem('token');
  return token;
};

export const getAdminId = async () => {
  let id = await AsyncStorage.getItem('admin-id');
  return id;
};

export const AddNewRoom = async roomName => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.post(
    `${Host}/room/${id}`,
    {
      roomName,
    },
    {headers: {Authorization: `${token}`}},
  );
  return response;
};

export const updateRoom = async (roomName, roomId) => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.put(
    `${Host}/room/${id}/${roomId}`,
    {
      roomName,
    },
    {headers: {Authorization: `${token}`}},
  );
  return response;
};

export const deleteRoomWithOrder = async (roomId, orderId) => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.delete(
    `${Host}/room/${id}/${roomId}/${orderId}`,
    {
      headers: {Authorization: `${token}`},
    },
  );

  return response;
};

export const deleteRoom = async roomId => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.delete(`${Host}/room/${id}/${roomId}`, {
    headers: {Authorization: `${token}`},
  });

  return response;
};

export const addCustomer = async form => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.post(`${Host}/customer/${id}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const updateCustomer = async (form, cusId) => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.put(`${Host}/customer/${id}/${cusId}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const deletCustomer = async customerId => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.delete(`${Host}/customer/${id}/${customerId}`, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const addNewOrder = async form => {
  const id = await getAdminId();
  const token = await getUserToken();
  const response = await axios.post(`${Host}/order/${id}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const checkoutOrder = async (form, orderId) => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.put(`${Host}/order/${id}/${orderId}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};
