import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const API_BASE_URL = apiUrl

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// export const getData = async <T>(): Promise<T> => {
//     const response: AxiosResponse<T> = await api.get('/data')
//     return response.data;
// }