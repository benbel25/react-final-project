import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { extractErrorMessage } from '../../utils'
import authService from './authService'

const initialState = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    admin: false,
    loading: false,
    user: null,
}

export const login = createAsyncThunk(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            return await authService.login(payload)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            return await authService.register(payload)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, thunkAPI) => {
        try {
            return await authService.forgotPassword(email)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    }
)


export const logOut = createAsyncThunk('auth/logout', async () => {
    authService.logOut()
    return {}
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(register.pending, (state, action) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.admin = action.payload.admin

                console.log(action.payload)
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.admin = action.payload.admin
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.loading = false
                state.user = null
                state.token = null
                state.admin = false
            })
    },
})

export const authActions = {
    login,
    register,
    logOut,
}

export default authSlice.reducer
