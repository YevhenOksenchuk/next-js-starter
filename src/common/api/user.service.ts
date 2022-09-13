import instance from './apiInstance';

export default {
  getUser: async () => {
    try {
      const data = await instance.get('user');
      return data

    } catch (e) {
      return e
    }
  },
}