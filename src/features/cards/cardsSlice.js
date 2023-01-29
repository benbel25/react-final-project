import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../utils'

import cardsService from './cardsService'

const initialState = {
    cards: [],
    loading: false,
    card: {},
}

export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async (_, thunkAPI) => {
        try {
            return await cardsService.fetchCards()
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const createCard = createAsyncThunk(
    'cards/createCard',
    async (data, thunkAPI) => {
        try {
            return await cardsService.createCard(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const updateCard = createAsyncThunk(
    'cards/updateCard',
    async (data, thunkAPI) => {
        try {
            const id = thunkAPI.getState().cards.card._id
            return await cardsService.updateCard(id, data)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const deleteCard = createAsyncThunk(
    'cards/deleteCard',
    async (_, thunkAPI) => {
        try {
            const id = thunkAPI.getState().cards.card._id
            return await cardsService.deleteCard(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCard: (state, action) => {
            state.card = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.loading = false
                state.cards = action.payload.cards
            })

            .addCase(createCard.pending, (state) => {
                state.loading = true
            })
            .addCase(createCard.fulfilled, (state, action) => {
                state.loading = false
                state.cards.push(action.payload)
            })

            .addCase(updateCard.pending, (state) => {
                state.loading = true
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                state.loading = false
                console.log('action.payload ', action.payload)

                state.cards = state.cards.map((card) =>
                    card._id === action.payload._id ? action.payload : card
                )
            })

            .addCase(deleteCard.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.loading = false

                console.log('action.payload ', action.payload._id)

                state.cards = state.cards.filter(
                    (card) => card._id !== action.payload._id
                )
            })
    },
})

export const { setCard } = cardsSlice.actions

export default cardsSlice.reducer
