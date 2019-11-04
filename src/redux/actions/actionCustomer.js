import * as types from '../types';
import axios from 'axios';
import {Host} from '../../functions/Host';

export const actionGetAllCustomer = (token, id) => ({
  type: `${types.GET_ALL_CUSTOMER}`,
  payload: axios.get(`${Host}/customer/${id}`, {
    headers: {authorization: `${token}`},
  }),
});
