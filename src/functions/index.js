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
    `${Host}/${id}/room`,
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
    `${Host}/${id}/room/${roomId}`,
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
    `${Host}/${id}/room/${roomId}/${orderId}`,
    {
      headers: {Authorization: `${token}`},
    },
  );

  return response;
};

export const deleteRoom = async roomId => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.delete(`${Host}/${id}/room/${roomId}`, {
    headers: {Authorization: `${token}`},
  });

  return response;
};

export const addCustomer = async form => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.post(`${Host}/${id}/customer`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const updateCustomer = async (form, cusId) => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.put(`${Host}/${id}/customer/${cusId}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const deletCustomer = async customerId => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.delete(`${Host}/${id}/customer/${customerId}`, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const addNewOrder = async form => {
  const id = await getAdminId();
  const token = await getUserToken();
  const response = await axios.post(`${Host}/${id}/order`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};

export const checkoutOrder = async (form, orderId) => {
  const token = await getUserToken();
  const id = await getAdminId();
  const response = await axios.put(`${Host}/${id}/order/${orderId}`, form, {
    headers: {Authorization: `${token}`},
  });
  return response;
};
