import axios from "./axios.customize";

const createUserAPI = (name, email, password, age, gender, address) => {
    const URL_BACKEND = "/api/v1/users";
    const data = {
        name: name,
        email: email,
        password: password,
        age: age,
        gender: gender,
        address: address
    }

    return axios.post(URL_BACKEND, data)
}

const fetchAllUserAPI = () => {
    const URL_BACKEND = "/api/v1/users/fetchAll";
    return axios.get(URL_BACKEND);
}

export {
    createUserAPI,
    fetchAllUserAPI
};