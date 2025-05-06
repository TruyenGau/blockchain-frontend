const axios = require("./axios.customize");

const getAllProductContract = () => {
    const URL_API = "/v1/api/getProductContract";
    return axios.get(URL_API);

}

module.exports = {
    getAllProductContract
}

