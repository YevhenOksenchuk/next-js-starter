import { call } from 'redux-saga/effects';
import Router from 'next/router';

export function* checkAuthorization() {
  console.log('CHECK AUTH');
  const currentPath = Router.pathname;

  if ()
}