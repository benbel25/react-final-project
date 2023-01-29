import { useNavigate } from 'react-router-dom'
import Joi from 'joi-browser'
import { toast } from 'react-toastify'
import signInSchema from '../../validation/signin'
import react, { useState } from 'react'

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
import { extractErrorMessage } from '../../utils'
import { useDispatch } from 'react-redux'
import { forgotPassword, login } from '../../features/auth/authSlice'
import ForgetPasswordForm from '../../components/ForgotPopUp'

const SignInPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [forgotEmail, setForgotEmail] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [formData, setFormData] = useState({
        email: 'benbel4@gmail.com',
        password: 'Ben180696!',
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        delete formData.errors
        dispatch(login(formData))
            .unwrap()
            .then((result) => {
                if (result) {
                    toast.success('Login successful')
                    navigate('/')
                }
            })
            .catch((error) => {
                toast.error('Invalid email and/or password')
            })
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        //check for errors
        const errors = { ...formData.errors }
        const errorMessage = Joi.validate(value, signInSchema[name]).error
        if (errorMessage) errors[name] = errorMessage.details[0].message
        else delete errors[name]
        //update state
        setFormData({ ...formData, [name]: value, errors })

        if (Object.keys(errors).length === 0) setDisabled(false)
        else setDisabled(true)
    }

    const showErrors = (name) => {
        const { errors } = formData
        if (errors && errors[name]) return errors[name]
    }

    const handleCancel = () => {
        setOpen(false)
    }
    const handleForgotPassword = () => {
        console.log('forgot password')
        console.log(forgotEmail)

        dispatch(forgotPassword(forgotEmail))
            .unwrap()
            .then((result) => {
                if (result) {
                    toast.success('Reset password email sent')
                    setOpen(false)
                }
            })
            .catch((error) => {
                toast.success('If the email exsit, the email was sent')
            })
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
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    {showErrors('email') && (
                        <div className="alert alert-danger">
                            Please provide a valid email
                        </div>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    {showErrors('password') && (
                        <div className="alert alert-danger">
                            Password must contain at least 8 characters, 1
                            uppercase letter, 1 lowercase letter, 4 numbers and
                            1 special character
                        </div>
                    )}

                    <Button
                        disabled={disabled}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                style={{ cursor: 'pointer' }}
                                variant="body2"
                                onClick={() => setOpen(true)}
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <ForgetPasswordForm
                open={open}
                setOpen={setOpen}
                handleSubmit={handleForgotPassword}
                handleCancel={handleCancel}
                email={forgotEmail}
                setEmail={setForgotEmail}
            />
        </Container>
    )
}
export default SignInPage
