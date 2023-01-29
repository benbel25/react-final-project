import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api'

const api = axios.create({
    baseURL: axios.defaults.baseURL,

    headers: {
        'Content-Type': 'application/json',
        'allow-access-control-origin': '*',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token)
        }

        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
