import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { fetchCards } from '../features/cards/cardsSlice'
import CardsList from './CardsList'

const CardsPage = () => {
    const { isLoading, cards } = useSelector((state) => state.cards)
    const dispatch = useDispatch();
        useEffect(() => {
            dispatch(fetchCards())
                .unwrap()
                .catch((error) => {
                    toast.error('Failed to load cards')
                })
        }, [])

    if (isLoading) {
        return <Spinner />
    }


    return <CardsList cards={cards} />
}

export default CardsPage
