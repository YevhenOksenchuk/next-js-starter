import { take } from 'redux-saga/effects';
import { UserConstants } from 'store/constants/user';

export function* watchGetUserData() {
  while (true) {
    try {
    const token: string = yield take(UserConstants.GET_USER_DATA);

    } catch (e) {
      console.log('watchGetUserData error', e);
    } finally {
      // Get initial data after user data
    }
  }
}