import * as types from '../types';
import axios from 'axios';
import {Host} from '../../functions/Host';

export const actionGetAllOrder = token => ({
  type: `${types.GET_ALL_ORDER}`,
  payload: axios.get(`${Host}/order`, {
    headers: {authorization: `${token}`},
  }),
});
