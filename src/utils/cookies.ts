import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getCookie(name: string = '') {
  return cookies.get(name);
}

export function setCookie(name: string = '') {
  return cookies.get(name);
}