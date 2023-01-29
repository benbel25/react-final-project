import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function ForgetPasswordForm({
    open,
    setOpen,
    handleSubmit,
    handleCancel,
    email,
    setEmail,
}) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    return (
        <Dialog open={open} onClose={() => setOpen(!open)}>
            <DialogTitle>Forgot your password?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To reset your password to this website, please enter your
                    email address here. We will send you a link to reset your
                    password.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {!email.match(regex) && (
                    <div className="alert alert-danger">
                        "Email Address" must be a valid email
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
