import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import 'plugins/i18n';
import * as Toast from 'react-toastify';
import store from 'store/index';
import ProtectedRoutes from '../containers/protected-routes';
import { ThemeProvider } from 'next-themes';
import 'styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { InitComponent } from 'containers';

function MyApp({Component, pageProps, router}: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme={'light'}>
        <Toast.ToastContainer position={Toast.toast.POSITION.BOTTOM_LEFT} />
        <InitComponent />
        <ProtectedRoutes router={router}>
          <Component {...pageProps} />
        </ProtectedRoutes>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
