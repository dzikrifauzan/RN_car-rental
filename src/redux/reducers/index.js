import {combineReducers} from '@reduxjs/toolkit';
import userSlice from './user';
import carsSlice from './cars';
import orderSlice from './Order';
import orderListSlice from './Order/list';

const rootReducer = combineReducers({
  user: userSlice,
  cars: carsSlice,
  order: orderSlice,
  orderList: orderListSlice,
});

export default rootReducer;
