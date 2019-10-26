import * as types from '../types';
import axios from 'axios';
import {Host} from '../../functions/Host';

export const actionGetAllCustomer = token => ({
  type: `${types.GET_ALL_CUSTOMER}`,
  payload: axios.get(`${Host}/customer`, {
    headers: {authorization: `${token}`},
  }),
});
