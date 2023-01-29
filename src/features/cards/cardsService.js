import api from '../../App/api'

const prefix = '/cards'

const fetchCards = async () => {
    const response = await api.get(`${prefix}/`)
    return response.data
}

const createCard = async (payload) => {
    const response = await api.post(`${prefix}/`, payload )
    return response.data
}

const updateCard = async (id, payload) => {
    const response = await api.put(`${prefix}/${id}`,  payload )
    return response.data
}

const deleteCard = async (id) => {
    const response = await api.delete(`${prefix}/${id}`)
    return response.data
}

const cardsService = {
    fetchCards,
    createCard,
    updateCard,
    deleteCard,
}

export default cardsService
