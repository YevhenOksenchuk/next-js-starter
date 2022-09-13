import { InitApp } from './initApp.types';
import { BaseConstants } from 'store/constants/base';

export const initApp = (): InitApp => ({type: BaseConstants.INIT_APP});