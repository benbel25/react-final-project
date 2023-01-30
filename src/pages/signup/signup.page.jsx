import react, { useState } from 'react'
import { toast } from 'react-toastify'
import Joi from 'joi-browser'
import signUpSchema from '../../validation/signup'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useDispatch } from 'react-redux'
import { register } from '../../features/auth/authSlice'

const SignUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [disabled, setDisabled] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        delete formData.errors
        dispatch(register(formData))
            .unwrap()
            .then((result) => {
                if (result) {
                    toast.success('Registration successful')
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error('One or more fields are invalid')
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        const errors = { ...formData.errors }
        const errorMessage = Joi.validate(value, signUpSchema[name]).error
        if (errorMessage) errors[name] = errorMessage.details[0].message
        else delete errors[name]
        setFormData({ ...formData, [name]: value, errors })

        if (Object.keys(errors).length === 0) setDisabled(false)
        else setDisabled(true)
    }

    const showErrors = (name) => {
        const { errors } = formData
        if (errors && errors[name]) return errors[name]
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange}
                            />
                            {showErrors('firstName') && (
                                <div className="alert alert-danger">
                                    "First Name" must be at least 2 characters
                                    long
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={handleChange}
                            />
                            {showErrors('lastName') && (
                                <div className="alert alert-danger">
                                    "Last Name" must be at least 2 characters
                                    long
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                                onChange={handleChange}
                            />
                            {showErrors('phone') && (
                                <div className="alert alert-danger">
                                    Please provide valid phone number
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                            {showErrors('email') && (
                                <div className="alert alert-danger">
                                    Please provide a valid email
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                            {showErrors('password') && (
                                <div className="alert alert-danger">
                                    Password must contain at least 8 characters,
                                    1 uppercase letter, 1 lowercase letter, 4
                                    numbers and 1 special character
                                </div>
                            )}
                        </Grid>
                    </Grid>
                    <Button
                        disabled={disabled}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
export default SignUpPage
