import { InitApp } from './initApp.types';
import { Base } from 'store/constants/base';

export const initAppAction = (): InitApp => ({type: Base.INIT_APP});