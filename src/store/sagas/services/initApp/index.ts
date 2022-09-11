import { fork, take } from '@redux-saga/core/effects';
import { checkAuthorization } from './checkAuthorization';
import { Base } from 'store/constants/base';

function* initApp(api: () => void) {
  console.log('INIT APP SAGA START', api);
  console.log('api', api);
  try {
    yield take(Base.INIT_APP);

    yield fork(checkAuthorization, api);
  } catch (e) {
    console.log('initApp error', e);
  }
}

export default initApp;