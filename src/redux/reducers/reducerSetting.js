import * as types from '../types';

const initialState = {
  isDarkmode: false,
  button: '#f1f2f6',
  header: '#fff',
  bottom: '#fff',
  text: '#2d3436',
  background: '#fff',
  status: '#dfe4ea',
  card: '#fff',
};

export const setDarkMode = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DARK_MODE:
      if (action.payload) {
        return {
          isDarkmode: true,
          bottom: '#2f3542',
          text: '#ffffff',
          header: '#34495e',
          background: '#353b48',
          button: '#57606f',
          status: '#2c3e50',
          card: '#57606f',
        };
      } else {
        return {
          isDarkmode: false,
          button: '#f1f2f6',
          header: '#fff',
          bottom: '#fff',
          text: '#2d3436',
          background: '#fff',
          status: '#dfe4ea',
          card: '#fff',
        };
      }
    default:
      return state;
  }
};

const vibrateState = {
  isVibrate: true,
};
export const setVibrate = (state = vibrateState, action) => {
  switch (action.type) {
    case types.SET_VIBRATE:
      return {
        isVibrate: !state.isVibrate,
      };
    default:
      return state;
  }
};
