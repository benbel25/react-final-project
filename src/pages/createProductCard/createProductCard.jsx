import { useState } from 'react'
import { toast } from 'react-toastify'
import Joi from 'joi-browser'
import cardSchmea from '../../validation/card'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createCard } from '../../features/cards/cardsSlice'
import { extractErrorMessage } from '../../utils'
import { useNavigate } from 'react-router-dom'

const CreateProductCardPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [cardData, setCardData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        productImage: '',
        productQuantity: '',
        productCategories: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        const errors = { ...cardData.errors }
        const errorMessage = Joi.validate(value, cardSchmea[name]).error
        if (errorMessage) errors[name] = errorMessage.details[0].message
        else delete errors[name]
        setCardData({ ...cardData, [name]: value, errors })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        delete cardData.errors
        dispatch(createCard(cardData))
            .unwrap()
            .then((result) => {
                if (result) {
                    toast.success('Card created successfully')
                    navigate('/mycards')
                }
            })
            .catch((error) => {
                toast.error(extractErrorMessage(error))
            })
    }

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit}
            sx={{
                marginTop: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h3" sx={{ marginBottom: '10px' }}>
                Create a new product
            </Typography>
            <TextField
                sx={{ width: '300px', marginBottom: '10px' }}
                name="productName"
                label="Product Name"
                variant="outlined"
                value={cardData.productName}
                onChange={handleChange}
                error={cardData.errors?.productName}
                helperText={cardData.errors?.productName}
            />
            <TextField
                sx={{ width: '300px', marginBottom: '10px' }}
                name="productDescription"
                label="Product Description"
                variant="outlined"
                value={cardData.productDescription}
                onChange={handleChange}
                error={cardData.errors?.productDescription}
                helperText={cardData.errors?.productDescription}
            />
            <TextField
                sx={{ width: '300px', marginBottom: '10px' }}
                name="productPrice"
                label="Product Price"
                variant="outlined"
                value={cardData.productPrice}
                onChange={handleChange}
                error={cardData.errors?.productPrice}
                helperText={cardData.errors?.productPrice}
            />
            <TextField
                sx={{ width: '300px', marginBottom: '10px' }}
                name="productImage"
                label="Product Image"
                variant="outlined"
                value={cardData.productImage}
                type="text"
                onChange={handleChange}
                error={cardData.errors?.productImage}
                helperText={cardData.errors?.productImage}
            />

            <TextField
                sx={{ width: '300px', marginBottom: '10px' }}
                name="productQuantity"
                label="Product Quantity"
                variant="outlined"
                value={cardData.productQuantity}
                onChange={handleChange}
                error={cardData.errors?.productQuantity}
                helperText={cardData.errors?.productQuantity}
            />

            <Typography variant="h6">
                Add product categories with comma separated values
            </Typography>
            <TextField
                sx={{ width: '300px', marginBottom: '10px' }}
                name="productCategories"
                label="productCategories"
                variant="outlined"
                value={cardData.productCategories}
                onChange={handleChange}
                error={cardData.errors?.productCategories}
                helperText={cardData.errors?.productCategories}
            />

            <Button type="submit" variant="contained">
                Create Product Card
            </Button>
        </Box>
    )
}

export default CreateProductCardPage
