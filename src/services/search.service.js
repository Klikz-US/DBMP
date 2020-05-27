import axios from "axios";

export const petSearchService = async (req) => {
    try {
        return await axios.post(`${window.$server_url}/admin/pets/search`, req);
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};

export const ownerSearchService = async (req) => {
    try {
        return await axios.post(
            `${window.$server_url}/admin/owners/search`,
            req
        );
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};
