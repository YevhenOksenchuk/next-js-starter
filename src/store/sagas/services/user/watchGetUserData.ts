import { take, call } from 'redux-saga/effects';
import { UserConstants } from 'store/constants/user';
import { toast } from 'react-toastify';

export function* watchGetUserData(api) {
  while (true) {
    try {
    yield take(UserConstants.GET_USER_DATA);

    const data = yield call(api.user.getUser);
      console.log('DATA', data);
    } catch (e) {
       toast.error('error to get user');
       yield call(toast.error, 'error to get user')
      console.log('watchGetUserData error', e);
    }
  }
}