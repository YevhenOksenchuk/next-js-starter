import { GetUser } from './user.types';
import { UserConstants } from 'store/constants/user';

export const getUser = (): GetUser => ({type: UserConstants.GET_USER_DATA});