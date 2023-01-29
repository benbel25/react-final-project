import api from '../../App/api'
const prefix = '/users'

const addToFavorites = async (id) => {
    const response = await api.post(`${prefix}/addFav`, {
        id,
    })
    return response.data
}

const removeFromFavorites = async (id) => {
    const response = await api.post(`${prefix}/removeFav`, {id})
    return response.data
}

const getFavorites = async () => {
    const response = await api.get(`${prefix}/fav`)
    return response.data
}

const usersService = {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
}

export default usersService
