import * as types from '../types';
import axios from 'axios';
import {Host} from '../../functions/Host';

export const actionGetAllRoom = (token, id) => ({
  type: `${types.GET_ALL_ROOM}`,
  payload: axios.get(`${Host}/${id}/room`, {
    headers: {authorization: `${token}`},
  }),
});
