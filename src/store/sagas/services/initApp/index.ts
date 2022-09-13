import { fork, take } from '@redux-saga/core/effects';
import { checkAuthorization } from './checkAuthorization';
import { BaseConstants } from 'store/constants/base';

function* initApp() {
  console.log('INIT APP SAGA START');
  try {
    yield take(BaseConstants.INIT_APP);

    yield fork(checkAuthorization);
  } catch (e) {
    console.log('initApp error', e);
  }
}

export default initApp;