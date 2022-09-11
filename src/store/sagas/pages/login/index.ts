import Router from 'next/router'
import { call, take } from 'redux-saga/effects';


function* loginWatcher() {
  console.log('START LOGIN SAGA');
  try {
    while (true) {

      yield take('TEST');
      yield call(Router.push, '/test')
      console.log('LOGIN ACTION WORK');
    }
  } catch (e) {
    console.log('error', e);
  }
}

export default loginWatcher;