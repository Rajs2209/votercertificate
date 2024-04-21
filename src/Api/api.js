import axios from 'axios';

const apiurl = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default apiurl;
