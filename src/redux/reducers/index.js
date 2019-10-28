import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

import RootNavigator from '../../navigator/rootNavigator';
import {reducerGetAllRoom} from './reducerRoom';
import {reducerGetAllCustomer} from './reducerCustomer';
import {reducerGetRoomById} from './reducerRoomById';

const reducerRouter = createNavigationReducer(RootNavigator);

const appReducer = combineReducers({
  router: reducerRouter,
  getAllRoom: reducerGetAllRoom,
  getAllCustomer: reducerGetAllCustomer,
  getRoomById: reducerGetRoomById,
});

export default appReducer;
