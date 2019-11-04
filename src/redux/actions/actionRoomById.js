import * as types from '../types';
import axios from 'axios';
import {Host} from '../../functions/Host';

export const actionGetRoomById = (token, roomId, id) => ({
  type: `${types.GET_ROOM_BY_ID}`,
  payload: axios.get(`${Host}/room/${id}/${roomId}`, {
    headers: {authorization: `${token}`},
  }),
});
