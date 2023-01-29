import api from '../../App/api'
const prefix = '/public'
const getPublicProducts = async () => {
    const response = await api.get(`${prefix}/products`)
    return response.data
}

const publicService = {
    getPublicProducts,
}

export default publicService
