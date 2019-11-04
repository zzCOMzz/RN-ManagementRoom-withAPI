import * as types from '../types';

export const actionSetVibrate = () => ({
  type: types.SET_VIBRATE,
});

export const actionSetDarkMode = params => ({
  type: types.SET_DARK_MODE,
  payload: params,
});
