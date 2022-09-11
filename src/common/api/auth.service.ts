import instance from './apiInstance';

export default {
  login: () => instance.get('login'),
}