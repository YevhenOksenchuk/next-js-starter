import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export function makeStore() {
  return configureStore({
    reducer: {
      ...reducers,
    },
    middleware: (getDefaultMiddleware: () => any[]) =>
        getDefaultMiddleware().concat(middleware),
  })
}

const store = makeStore();

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// For thunk without sagas
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;


export default store;
