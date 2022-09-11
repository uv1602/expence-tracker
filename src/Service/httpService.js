import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Content-Type"] = "application/json";

const get = (url) => {
    return axios.get(url);
}

const post = (url,data) => {
    return axios.post(url,data);
}

export {get , post};
