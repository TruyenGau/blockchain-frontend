const axios = require("./axios.customize");

const getAllProduct = () => {
    const URL_API = "/v1/api/getProduct";
    return axios.get(URL_API);

}

module.exports = {
    getAllProduct
}

