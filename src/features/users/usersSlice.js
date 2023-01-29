import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../utils'
import usersService from './usersService'

const initialState = {
    favorites: [],
    loading: false,
}

export const fetchFavorites = createAsyncThunk(
    'users/fetchFavorites',
    async (_, thunkAPI) => {
        try {
            return await usersService.getFavorites()
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const addToFavorites = createAsyncThunk(
    'users/addToFavorites',
    async (_, thunkAPI) => {
        try {
            const id = thunkAPI.getState().cards.card._id
            return await usersService.addToFavorites(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const removeFromFavorites = createAsyncThunk(
    'users/removeFromFavorites',
    async (_, thunkAPI) => {
        try {
            const id = thunkAPI.getState().cards.card._id
            return await usersService.removeFromFavorites(id)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearFavorites: (state) => {
            state.favorites = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.favorites = action.payload
            })

        builder
            .addCase(addToFavorites.pending, (state) => {
                state.loading = true
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.favorites = action.payload.fav
            })

        builder
            .addCase(removeFromFavorites.pending, (state) => {
                state.loading = true
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.loading = false
                state.favorites = action.payload.fav
            })
    },
})

export const { clearFavorites } = usersSlice.actions

export default usersSlice.reducer
