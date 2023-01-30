import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logOut } from '../../features/auth/authSlice'
import './navbar.component.css'

const Navbar = () => {
    const { user, admin } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logOut())
        navigate('/')
        window.location.reload()
    }

    const showLogin = () => {
        if (user) {
            return (
                <Fragment>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/mycards">
                            Products
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/favorites">
                            Favorites
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            onClick={() => {
                                onLogout()
                            }}
                        >
                            Logout
                        </NavLink>
                    </li>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signin">
                            Signin
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">
                            Signup
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin">
                            Admin
                        </NavLink>
                    </li>
                </Fragment>
            )
        }
    }
    const showAdmin = () => {
        if (admin) {
            return (
                <Fragment>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/newCard">
                            Create product card
                        </NavLink>
                    </li>
                </Fragment>
            )
        }
    }

    return (
        <nav className={`navbar navbar-expand-lg bg-dark fixed-top sticky-top`}>
            <div className="container-fluid">
                <NavLink className="navbar-brand text-white" to="/">
                    Home
                </NavLink>
                <button
                    className="navbar-toggler bg-primary"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon bg-primary"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                        {showAdmin()}
                        {showLogin()}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
