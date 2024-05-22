import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        Authorization: `Base ${localStorage.getItem('token')}`
    }
});

export default axiosInstance;