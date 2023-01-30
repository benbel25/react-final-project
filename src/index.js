import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { persistor, store } from './App/store'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'))

const theme = createTheme()

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
