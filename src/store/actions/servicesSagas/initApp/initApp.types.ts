import { Action } from '@redux-saga/types';
import { Base } from '../../../constants/base';

export  interface InitApp extends Action<Base> {
  type: typeof Base.INIT_APP
}