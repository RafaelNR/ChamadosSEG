import api, { source } from "./Api";

export function get(url) {
	setToken();
	return api.get("/" + url, { cancelToken: source().token });
}

export async function getOne(url, data) {
	setToken();
	return await api.get("/" + url + "/" + data);
}

export function insert(url, data) {
	setToken();
	return api.post("/" + url, data);
}

export function update(url, data) {
	setToken();
	return api.put(`/${url}/${data.id}`, data);
}

export function disabled(url, id) {
	setToken();
	return api.delete(`/${url}/${id}`);
}

export function actived(url, id) {
	setToken();
	console.log('usuarios')
	return api.put(`/${url}/actived/${id}`);
}

export function setToken() {
	api.defaults.headers.access_token = JSON.parse(localStorage.getItem("token"));
}

export { source };
