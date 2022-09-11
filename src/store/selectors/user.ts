import { RootState } from 'store';

export const userSelector = (state: RootState) => state.user;
export const userRoleSelector = (state: RootState) => state.user.role;