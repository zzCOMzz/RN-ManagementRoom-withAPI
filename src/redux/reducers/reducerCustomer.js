import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const reducerGetAllCustomer = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_ALL_CUSTOMER}`:
      return {
        isLoading: true,
        data: action.payload,
      };
    case `${types.GET_ALL_CUSTOMER}_FULFILLED`:
      return {
        isLoading: false,
        isSuccess: true,
        data: action.payload.data,
      };
    case `${types.GET_ALL_CUSTOMER}_REJECTED`:
      return {
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
