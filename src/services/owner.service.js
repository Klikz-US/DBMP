import axios from "axios";

export const ownerGetListService = async (activePage) => {
    try {
        return await axios.get(
            `${window.$server_url}/admin/owners/page/${activePage}`
        );
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};

export const ownerGetService = async (_id) => {
    try {
        return await axios.get(`${window.$server_url}/admin/owners/${_id}`);
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};

export const ownerRegisterService = async (owner) => {
    try {
        return await axios.post(
            `${window.$server_url}/admin/owners/add`,
            owner
        );
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};

export const ownerDeleteService = async (_id) => {
    try {
        return await axios.delete(
            `${window.$server_url}/admin/owners/delete/${_id}`
        );
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};

export const ownerUpdateService = async (id, owner) => {
    try {
        return await axios.patch(
            `${window.$server_url}/admin/owners/update/${id}`,
            owner
        );
    } catch (err) {
        return {
            error: true,
            errMsg: err.message,
        };
    }
};
