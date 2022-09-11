import instance from './apiInstance';

export default {
  getUser: () => instance.get('user'),
}