import Api from "./Api";

export function Login(user, passwd) {
	return Api.exec('post', '/login', {
		user: user,
		passwd: passwd,
	})
}

export function Auth() {
	return Api.exec('get', '/auth')
}
