import type { NextPage } from 'next';

import s from './InitComponent.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { useEffect } from 'react';
import { initAppAction } from '../../store/actions/servicesSagas/initApp/initApp.actions';

const InitComponent: NextPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAppAction())
  }, [])

  return null;
};

export default InitComponent;
