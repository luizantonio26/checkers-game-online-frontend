import axios from "axios"

const API_BASE_URL = 'http://localhost:8000/api'

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