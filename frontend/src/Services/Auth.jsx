import api from "./Api";

export function Login(user, passwd) {
	return api.post("/login", {
		user: user,
		passwd: passwd,
	});
}

export function Auth() {
	return api.get("/auth");
}
