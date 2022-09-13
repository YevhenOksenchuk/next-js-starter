import { Action } from '@redux-saga/types';
import { BaseConstants } from 'store/constants/base';

export  interface InitApp extends Action<BaseConstants> {
  type: typeof BaseConstants.INIT_APP
}