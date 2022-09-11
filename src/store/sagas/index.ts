import {all, call, spawn } from 'redux-saga/effects';
import loginWatcher from "./pages/login";
import initApp from './services/initApp';
import user from './services/user';
import api from 'common/api'

export default function* rootSaga(): Generator {
    const sagas: Array<any> = [loginWatcher, initApp, user];

    try {
        const retry: any = yield sagas.map((saga: any) => {
            return spawn(function* () {
                while (true) {
                    try {
                        // second argument can be api requests
                        yield call(saga, api);
                        break;
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        });

        yield all(retry);

    } catch (e) {
        console.log(e)
    }
}
