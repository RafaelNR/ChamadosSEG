import axios from "axios";

export default axios.create({
	baseURL: "http://localhost:3000",
});

const source = () => {
	return axios.CancelToken.source();
};

export { source };
