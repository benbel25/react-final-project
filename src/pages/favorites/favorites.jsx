import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import {
    fetchFavorites,
    removeFromFavorites,
} from '../../features/users/usersSlice'
import { extractErrorMessage } from '../../utils'
import CardsList from '../CardsList'

const FavoritesPage = () => {
    const { isLoading, favorites } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            dispatch(fetchFavorites()).unwrap()
        } catch (error) {
            toast.error(extractErrorMessage(error))
        }
    }, [dispatch])
    if (isLoading) {
        return <Spinner />
    }

    return (
        <Box>
            {favorites.length === 0 ? (
                <Typography
                    className="text-center"
                    variant="h4"
                    component="h1"
                    gutterBottom
                >
                    You have no favorites
                </Typography>
            ) : (
                <Typography
                    className="text-center"
                    variant="h4"
                    component="h1"
                    gutterBottom
                >
                    Favorites
                </Typography>
            )}

            <CardsList cards={favorites} />
        </Box>
    )
}
export default FavoritesPage
