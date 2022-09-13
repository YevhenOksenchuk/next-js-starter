import { call, put } from 'redux-saga/effects';
import Router from 'next/router';
import { getCookie } from 'common/helpers/cookies';
import actions from 'store/actions';

const {
  userActions: {
    getUser
  }
} = actions;

export function* checkAuthorization() {
  console.log('CHECK AUTH');
  try {
    const token = getCookie('token');

    if (!token) {
      yield call(Router.push, '/login');
    } else {
      yield put(getUser());
    }
  } catch (e) {
    console.log('checkAuthorization error', e);
  }
}