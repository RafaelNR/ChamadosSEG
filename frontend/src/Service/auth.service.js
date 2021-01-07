import Service from '../Api/Service';

export function Login(user, passwd) {
  return Service.exec('post', '/login', {
    user: user,
    passwd: passwd
  });
}

export function Auth() {
  return Service.exec('get', '/auth');
}

export function removeToken() {
  Service.removeToken();
}
