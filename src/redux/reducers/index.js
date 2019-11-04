import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

import RootNavigator from '../../navigator/rootNavigator';
import {reducerGetAllRoom} from './reducerRoom';
import {reducerGetAllCustomer} from './reducerCustomer';
import {reducerGetRoomById} from './reducerRoomById';
import {reducerGetAllOrder} from './reducerOrder';
import {setDarkMode, setVibrate} from './reducerSetting';
const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  getAllRoom: reducerGetAllRoom,
  getAllCustomer: reducerGetAllCustomer,
  getRoomById: reducerGetRoomById,
  getAllOrder: reducerGetAllOrder,
  setDarkMode,
  setVibrate,
});

export default appReducer;
