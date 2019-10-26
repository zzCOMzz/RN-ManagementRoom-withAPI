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
