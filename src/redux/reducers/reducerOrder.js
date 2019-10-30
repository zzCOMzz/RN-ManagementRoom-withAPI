import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const reducerGetAllOrder = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_ALL_ORDER}`:
      return {
        isLoading: true,
        data: action.payload,
      };
    case `${types.GET_ALL_ORDER}_FULFILLED`:
      return {
        isLoading: false,
        isSuccess: true,
        data: action.payload.data,
      };
    case `${types.GET_ALL_ORDER}_REJECTED`:
      return {
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
