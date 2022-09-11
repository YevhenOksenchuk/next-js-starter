import { fork } from '@redux-saga/core/effects';
import { watchGetUserData } from './watchGetUserData';

function* user() {
  console.log('INIT APP SAGA START');
  yield fork(watchGetUserData);
}

export default user;