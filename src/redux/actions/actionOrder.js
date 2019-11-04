import * as types from '../types';
import axios from 'axios';
import {Host} from '../../functions/Host';

export const actionGetAllOrder = (token, id) => ({
  type: `${types.GET_ALL_ORDER}`,
  payload: axios.get(`${Host}/order/${id}`, {
    headers: {authorization: `${token}`},
  }),
});
