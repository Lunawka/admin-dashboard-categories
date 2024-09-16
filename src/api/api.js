import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1'
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem('refreshToken')

                const response = await api.post('/auth/refresh-token', { refreshToken })
                const { access_token } = response.data

                localStorage.setItem('accessToken', access_token)

                originalRequest.headers.Authorization = `Bearer ${access_token}`
                return axios(originalRequest)
            } catch (error) {}
        }

        return Promise.reject(error)
    }
)
