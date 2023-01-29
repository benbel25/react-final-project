import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    )
}

export default Spinner
