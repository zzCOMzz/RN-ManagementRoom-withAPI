import * as types from '../types';
import axios from 'axios';
import {Host} from '../../functions/Host';

export const actionGetRoomById = (token, roomId) => ({
  type: `${types.GET_ROOM_BY_ID}`,
  payload: axios.get(`${Host}/room/${roomId}`, {
    headers: {authorization: `${token}`},
  }),
});
