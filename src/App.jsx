import { ToastContainer } from 'react-toastify'
// import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/footer/footer.component'
import Navbar from './components/navbar/navbar.component'
import AboutPage from './pages/about/about.page'
import AdminUserPage from './pages/adminUser/adminUserPage'
import HomePage from './pages/homepage/homepage'
import SigninPage from './pages/signin/signin.page'
import SignupPage from './pages/signup/signup.page'
import FavoritesPage from './pages/favorites/favorites'
import CardDetails from './components/CardDetails'
import CreateProductCardPage from './pages/createProductCard/createProductCard'
import CardsPage from './pages/CardsPage'
import EditCard from './components/EditCard'
import ForgetPasswordPage from './pages/forgetPassword/forgetPasswordPage'
import PrivateRoute from './components/PrivateRoute'
function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/signin" element={<SigninPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/mycards" element={<PrivateRoute />}>
                        <Route path="/mycards" element={<CardsPage />} />
                    </Route>
                    <Route path="/card/:id" element={<PrivateRoute />}>
                        <Route path="/card/:id" element={<CardDetails />} />
                    </Route>

                    <Route path="/favorites" element={<PrivateRoute />}>
                        <Route path="/favorites" element={<FavoritesPage />} />
                    </Route>
                    <Route path="/edit/:id" element={<PrivateRoute />}>
                        <Route path="/edit/:id" element={<EditCard />} />
                    </Route>
                    <Route path="/admin" element={<AdminUserPage />} />
                    <Route path="/newcard" element={<PrivateRoute />}>
                        <Route
                            path="/newcard"
                            element={<CreateProductCardPage />}
                        />
                    </Route>
                    <Route
                        path="/resetpassword/:token"
                        element={<ForgetPasswordPage />}
                    />
                    <Route path="*" element={<HomePage />} />
                </Routes>
                <Footer />
            </Router>
            <ToastContainer />
        </>
    )
}

export default App
