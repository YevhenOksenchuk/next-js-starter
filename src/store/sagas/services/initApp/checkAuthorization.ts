import { call } from 'redux-saga/effects';
import Router from 'next/router';
import { getCookie } from '../../../../common/helpers/cookies';

export function* checkAuthorization(api) {
  console.log('CHECK AUTH');
  try {
    const token = getCookie('token');
    if (!token) {
      yield call(Router.push, '/login');
      return;
    }

  } catch (e) {
    console.log('checkAuthorization error', e);
  }
}