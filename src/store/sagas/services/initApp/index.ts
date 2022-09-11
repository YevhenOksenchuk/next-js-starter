import { fork } from '@redux-saga/core/effects';
import { checkAuthorization } from './checkAuthorization';

function* initApp() {
  console.log('INIT APP SAGA START');
  yield fork(checkAuthorization)
}

export default initApp;