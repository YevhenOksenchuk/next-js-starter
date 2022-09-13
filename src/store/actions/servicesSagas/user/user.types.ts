import { Action } from '@redux-saga/types';
import { UserConstants } from 'store/constants/user';

export  interface GetUser extends Action<UserConstants> {
  type: typeof UserConstants.GET_USER_DATA
}