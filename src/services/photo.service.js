import axios from "axios";

export const photoGetService = async (_id) => {
    try {
        return await axios.get(`${window.$server_url}/admin/photos/${_id}`, {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "Access-Control-Max-Age": 1728000,
            },
        });
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};

export const photoAddService = async (pet) => {
    try {
        return await axios.post(`${window.$server_url}/admin/photos/add`, pet);
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};
