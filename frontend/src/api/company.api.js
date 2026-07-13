import api from "./axios";

export const getCompaniesByOrganization = async (organizationId) => {
    const { data } = await api.get(
        `/companies/organization/${organizationId}`
    );

    return data.data;
};

export const getCompanyById = async (id) => {
    const { data } = await api.get(`/companies/${id}`);
    return data.data;
};

export const createCompany = async (payload) => {
    const { data } = await api.post("/companies", payload);

    return data.data;
};

export const deleteCompany = async (id) => {
    const { data } = await api.delete(`/companies/${id}`);

    return data;
};