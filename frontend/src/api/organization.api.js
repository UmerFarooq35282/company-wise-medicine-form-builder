import api from "./axios";

export const getOrganizations = async () => {
    const { data } = await api.get("/organizations");
    return data.data;
};

export const createOrganization = async (payload) => {
    const { data } = await api.post("/organizations", payload);
    return data.data;
};

export const deleteOrganization = async (id) => {
    const { data } = await api.delete(`/organizations/${id}`);
    return data;
};