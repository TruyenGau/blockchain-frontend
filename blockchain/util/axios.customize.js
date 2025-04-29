const axios = require('axios');

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "http://localhost:8081", // Thay thế bằng URL của API của bạn
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Không thêm token vào header
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        if (response && response.data) return response.data;
        return response;
    },
    function (error) {
        if (error?.response?.data) return error?.response?.data;
        return Promise.reject(error);
    }
);

module.exports = instance; // Xuất axios instance để sử dụng trong các file khác