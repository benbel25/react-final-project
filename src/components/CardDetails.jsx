import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Chip, Typography } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Fab from '@mui/material/Fab'

import { Box } from '@mui/system'
import { deleteCard } from '../features/cards/cardsSlice'
import { toast } from 'react-toastify'
import { extractErrorMessage } from '../utils'
import { useNavigate } from 'react-router-dom'
import {
    addToFavorites,
    removeFromFavorites,
} from '../features/users/usersSlice'

const CardDetails = () => {
    const card = useSelector((state) => state.cards.card)
    const { admin } = useSelector((state) => state.auth)
    const { favorites } = useSelector((state) => state.users)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const checkFavorite = () => {
        const isFavorite = favorites.find(
            (favorite) => favorite._id === card._id
        )
        return isFavorite ? setIsFavorite(true) : setIsFavorite(false)
    }
    const [isFavorite, setIsFavorite] = useState(false)

    const handleAddToFavorites = () => {
        dispatch(addToFavorites())
            .unwrap()
            .then(() => {
                toast.success('Card added to favorites')
                setIsFavorite(true)
                navigate('/favorites')
            })
            .catch((error) => {
                toast.error(extractErrorMessage(error))
            })
    }

    const handleRemoveFromFavorites = () => {
        dispatch(removeFromFavorites())
            .unwrap()
            .then(() => {
                toast.success('Card removed from favorites')
                setIsFavorite(false)
                navigate('/favorites')
            })
            .catch((error) => {
                toast.error(extractErrorMessage(error))
            })
    }

    const handleFavorite = () => {
        if (isFavorite) {
            handleRemoveFromFavorites()
        } else {
            handleAddToFavorites()
        }
    }

    useEffect(() => {
        checkFavorite()
    }, [isFavorite])

    const handleEdit = () => {
        console.log('edit')
        navigate(`/edit/${card._id}`)
    }

    const handleDelete = () => {
        const confirm = window.confirm(
            'Are you sure you want to delete this card?'
        )
        if (confirm) {
            dispatch(deleteCard())
                .unwrap()
                .catch((error) => {
                    toast.error(extractErrorMessage(error))
                })
                .then(() => {
                    toast.success('Card deleted successfully')
                    navigate(-1)
                })
        }
    }
    return (
        <Box
            sx={{
                marginTop: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img
                src={card.productImage}
                alt={card.productName}
                style={{
                    borderRadius: '25%',
                    width: '300px',
                    height: '300px',
                    objectFit: 'cover',
                }}
            />

            <Typography
                variant="h6"
                component="h2"
                style={{ marginTop: '10px' }}
            >
                Name: {card.productName}
            </Typography>
            <Typography
                variant="h6"
                component="h2"
                style={{ marginTop: '10px' }}
            >
                Price: ₪{card.productPrice}
            </Typography>
            <Typography
                variant="h6"
                component="h2"
                style={{ marginTop: '10px' }}
            >
                Description : {card.productDescription}
            </Typography>
            <Typography
                variant="h6"
                component="h2"
                style={{ marginTop: '10px' }}
            >
                Quantity : {card.productQuantity}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    marginTop: '10px',
                    alignItems: 'center',
                }}
            >
                
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    marginTop: '10px',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}
                >
                    Categories:
                </Typography>

                {card.productCategories.map((c) => (
                    <Chip
                        key={Math.random() * 1001}
                        label={c}
                        sx={{
                            marginTop: '10px',
                        }}
                    />
                ))}
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                {card.authUser_id && (
                    <Typography variant="h6" component="h2">
                        Owner :{' '}
                        {card.authUser_id
                            ? `${
                                  card.authUser_id?.firstName[0].toUpperCase() +
                                  card.authUser_id?.firstName.slice(1)
                              } ${
                                  card.authUser_id?.lastName[0].toUpperCase() +
                                  card.authUser_id?.lastName.slice(1)
                              }`
                            : 'Unknown'}
                    </Typography>
                )}
            </Box>

            <Box
                onClick={handleFavorite}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10px',
                    ':hover': {
                        cursor: 'pointer',
                    },
                }}
            >
                <Fab
                    variant="extended"
                    aria-label="like"
                    sx={{
                        marginTop: '10px',
                    }}
                >
                    <FavoriteIcon
                        color={isFavorite ? 'error' : 'inherit'}
                        sx={{
                            marginRight: '5px',
                        }}
                    />
                    {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Fab>
            </Box>

            {admin && (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            m: '20px',
                        }}
                    >
                        <Button variant="contained" onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button
                            onClick={handleDelete}
                            color="error"
                            variant="contained"
                            sx={{
                                marginLeft: '10px',
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default CardDetails
