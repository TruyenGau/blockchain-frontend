import axios from "./axios.customize";

const createUserApi = (name, email, password, confirmPassword) => {
    const URL_API = "/v1/api/register";
    const data = { name, email, password, confirmPassword };
    return axios.post(URL_API, data);
}

const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = { email, password };
    return axios.post(URL_API, data);
}

const fetchUserApi = () => {
    const URL_API = "/v1/api/user";
    return axios.get(URL_API);
}

const updateAccount = (email, address) => {
    {
        const URL_API = "/v1/api/updateAccount";
        const data = { email, address };
        return axios.put(URL_API, data);
    }
}
const getCountUser = () => {

    {
        const URL_API = "/v1/api/countUser";
        return axios.get(URL_API);
    }
}

const getCountProduct = () => {

    {
        const URL_API = "/v1/api/countProduct";
        return axios.get(URL_API);
    }
}

const getAllProduct = () => {
    const URL_API = "/v1/api/getProduct";
    return axios.get(URL_API);

}


export {
    createUserApi,
    loginApi,
    fetchUserApi,
    updateAccount,
    getCountUser,
    getCountProduct,
    getAllProduct

}