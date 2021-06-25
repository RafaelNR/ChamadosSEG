import Service from '../Api/Service';

export function Auth() {
  return Service.exec('get', '/auth');
}