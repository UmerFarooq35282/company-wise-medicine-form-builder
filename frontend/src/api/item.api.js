import api from "./axios";

export const getItemsByCompany = async (companyId) => {
    const { data } = await api.get(`/items/company/${companyId}`);
    return data.data;
};

export const getItemsByOrganization = async (organizationId) => {
    const response = await api.get(
        `/items/organization/${organizationId}`
    );

    return response.data.data;
};

export const createItem = async (payload) => {
    const { data } = await api.post("/items", payload);
    return data.data;
};

export const deleteItem = async (id) => {
    const { data } = await api.delete(`/items/${id}`);
    return data;
};