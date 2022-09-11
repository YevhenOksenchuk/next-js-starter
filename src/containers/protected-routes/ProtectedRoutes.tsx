import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useAppSelector } from 'hooks/redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import s from './ProtectedRoutes.module.scss';
import { userSelector } from 'store/selectors/user';
import { UnprotectedRoutes, UserRoutes } from 'common/constants/appRoutes';
import { Roles } from '../../common/constants/roles';


interface Props {
  children: any,
  router: any
}

const ProtectedRoutes: NextPage<Props> = ({children, router}) => {
  const user = useAppSelector(userSelector);
  const {isLogin, role} = user;
  const { t } = useTranslation();

  useEffect(() => {
    (() => {
      if (Object.values(UnprotectedRoutes).some(path => router.pathname.includes(path))) {
        return;
      }

      if (!isLogin) {
        router.push(UnprotectedRoutes.LOGIN);
      }

      if (role === Roles.USER && Object.values(UserRoutes).some(path => router.pathname.includes(path))) {
        toast.error(t('common:notEnoughPermissionsForPage'))
        router.push(UserRoutes.START);
      }
    })();
  }, [isLogin, role, router, router.pathname]);

  return children;
};

export default ProtectedRoutes;
