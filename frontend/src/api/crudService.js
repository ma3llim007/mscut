import axiosInstance from "./apiInstance";

const crudService = {
    get: async (url, params = {}) => {
        const response = await axiosInstance.get(url, { params });
        return response.data;
    },
    post: async (url, data = {}, contentType = "application/json", moreHeaders = {}) => {
        const response = await axiosInstance.post(url, data, {
            headers: {
                "Content-Type": contentType,
                ...moreHeaders,
            },
        });
        return response.data;
    },
    put: async (url, data = {}) => {
        const response = await axiosInstance.put(url, data);
        return response.data;
    },
    delete: async (url) => {
        const response = await axiosInstance.delete(url);
        return response.data;
    },
    patch: async (url, data = {}) => {
        const response = await axiosInstance.patch(url, data);
        return response.data;
    },
};

export default crudService;
