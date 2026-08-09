import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access")

        if (
            token &&
            !config.url.includes('/accounts/login') &&
            !config.url.includes('/accounts/register')
        ) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api