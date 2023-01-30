import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Joi from 'joi-browser'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { toast } from 'react-toastify'
import api from '../../App/api'
import passwordReset from '../../validation/passwordReset'
const ForgetPasswordPage = () => {
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false)
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    const { token } = useParams()

    const handleFormSubmit = (ev) => {
        ev.preventDefault()
        const { password, confirmPassword } = formData

        api.patch(`/auth/forgetpassword/${token}`, {
            password,
            confirmPassword,
        })
            .then((res) => {
               
                toast.success('Your password has been successfully reset')
                navigate('/signin')
            })
            .catch((err) => {
                console.log('err', err)
                toast.error('"password" and "confirmPassword" does not match')
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        const errors = { ...formData.errors }
        const errorMessage = Joi.validate(value, passwordReset[name]).error

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
                    Forget Password?
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleFormSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    {formData.password !== formData.confirmPassword && (
                        <div className="alert alert-danger">
                            "password" and "confirmPassword" does not match
                        </div>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={disabled}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default ForgetPasswordPage
