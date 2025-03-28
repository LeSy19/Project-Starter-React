import axios from "./axios.customize";

const createCompanyAPI = (name, description, address) => {
    const URL_BACKEND = "/api/v1/companies";
    const data = {
        name: name,
        description: description,
        address: address
    }

    return axios.post(URL_BACKEND, data)
}

const updateCompanyAPI = (id, name, description, address) => {
    const URL_BACKEND = "/api/v1/companies";
    const data = {
        id: id,
        name: name,
        description: description,
        address: address
    }

    return axios.put(URL_BACKEND, data)
}

const deleteCompanyAPI = (id) => {
    const URL_BACKEND = `/api/v1/companies/${id}`;
    return axios.delete(URL_BACKEND)
}


const fetchAllCompanyAPI = () => {
    const URL_BACKEND = "/api/v1/companies";
    return axios.get(URL_BACKEND);
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = "/api/v1/files";
    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append("file", file)
    bodyFormData.append("folder", folder);

    return axios.post(URL_BACKEND, bodyFormData, config);

}

const updateCompanyLogoAPI = (logo, id, name, address, description) => {
    const URL_BACKEND = "/api/v1/companies";
    const data = {
        logo: logo,
        id: id,
        name: name,
        address: address,
        description: description
    }

    return axios.put(URL_BACKEND, data)
}

export {
    createCompanyAPI,
    fetchAllCompanyAPI,
    updateCompanyAPI,
    deleteCompanyAPI,
    handleUploadFile,
    updateCompanyLogoAPI
};