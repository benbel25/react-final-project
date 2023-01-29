import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../utils'
import publicService from './publicService'

const initialState = {
    loading: false,
    products: [],
}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (thunkAPI) => {
        try {
            return await publicService.getPublicProducts()
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const publicSlice = createSlice({
    name: 'publicSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
    },
})

export default publicSlice.reducer
