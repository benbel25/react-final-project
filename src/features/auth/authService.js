import api from '../../App/api'

const prefix = '/auth'

// payload = { email, password }

const login = async (payload) => {
    const response = await api.post(`${prefix}/login`, payload)
    return response.data
}

const logOut = () => {
    localStorage.clear()
}

// payload = { name, email, password }

const register = async (payload) => {
    const response = await api.post(`${prefix}/register`, payload)
    return response.data
}

const forgotPassword = async (email) => {
    const response = await api.post(`${prefix}/forgetpassword`, {
        email,
    })
    return response.data
}

const authService = {
    login,
    logOut,
    register,
    forgotPassword,
}

export default authService
