import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../features/auth/authSlice'
import cardsReducer from '../features/cards/cardsSlice'
import usersReducer from '../features/users/usersSlice'
import publicReducer from '../features/public/publicSlice'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    auth: authReducer,
    cards: cardsReducer,
    users: usersReducer,
    public: publicReducer,
    // add more reducers here
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})

export const persistor = persistStore(store)
