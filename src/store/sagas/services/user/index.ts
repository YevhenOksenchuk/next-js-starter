import { fork } from '@redux-saga/core/effects';
import { watchGetUserData } from './watchGetUserData';

function* user(api) {
  console.log('INIT APP SAGA START');
  try {
    yield fork(watchGetUserData, api);
  } catch (e) {
    console.log('user saga', e);
  }
}

export default user;