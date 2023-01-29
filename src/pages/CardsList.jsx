import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCards, setCard } from '../features/cards/cardsSlice'
import Card from '@mui/material/Card'
import {
    CardContent,
    CardMedia,
    Chip,
    List,
    Slider,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { toast } from 'react-toastify'

function CardItem(props) {
    return (
        <Card
            sx={{
                maxWidth: 345,
            }}
            style={{
                cursor: 'pointer',
            }}
            onClick={() => {
                props.dispatch(setCard(props.item))

                props.item.favorite
                    ? props.navigate(`/favorites`)
                    : props.navigate(`/card/${props.item._id}`, {
                          state: props.homePage,
                      })
            }}
        >
            <CardMedia
                component="img"
                image={props.item.productImage || ''}
                alt="product"
                sx={{
                    height: 350,
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.item.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.item.productDescription}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        marginTop: '10px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}
                >
                    Price: ₪{props.item.productPrice}
                </Typography>
            </CardContent>
        </Card>
    )
}

const CardsList = ({ cards, favorite, homePage }) => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const cardsArr = cards || []
    const [filteredCards, setFilteredCards] = useState([cardsArr])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getLowestPrice = (cards) => {
        const prices = cards.map((item) => item.productPrice)
        const lowestPrice = Math.min(...prices)
        return lowestPrice
    }

    const getHighestPrice = (cards) => {
        const prices = cards.map((item) => item.productPrice)
        const highestPrice = Math.max(...prices)
        return highestPrice
    }

    const [priceRange, setPriceRange] = useState([
        getLowestPrice(cardsArr),
        getHighestPrice(cardsArr),
    ])

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue)

        setFilteredCards(
            cardsArr.filter((item) => {
                if (
                    item.productPrice >= newValue[0] &&
                    item.productPrice <= newValue[1]
                ) {
                    return item
                }
            })
        )
    }
    const categories = cardsArr
        .flatMap((item) => item.productCategories)
        .filter((item) => item !== '')

    const generateUniqueCategoriesObj = (categories) => {
        const uniqueCategories = [...new Set(categories)]

        const categoriesObj = uniqueCategories.map((item, index) => {
            return {
                label: item,
                key: index,
            }
        })
        return categoriesObj
    }

    useEffect(() => {
        try {
            console.log(generateUniqueCategoriesObj(categories))
            // console.log(categories)
        } catch (error) {
            console.log(error)
            toast.error('cannot get cards', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }, [dispatch])

    useEffect(() => {
        if (selectedCategory === '') {
            setFilteredCards(cardsArr)
        } else {
            setFilteredCards(
                cardsArr.filter((item) =>
                    item.productCategories.includes(selectedCategory)
                )
            )
        }
    }, [selectedCategory, cardsArr])
    return (
        <Box width={{}}>
            {generateUniqueCategoriesObj(categories).length > 0 && (
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        boxShadow: 1,
                        p: 2,
                        borderRadius: 15,
                        alignItems: 'center',

                        width: '60%',
                        margin: 'auto',
                        mt: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="div"
                        gutterBottom
                        sx={{
                            p: 2,
                        }}
                    >
                        Categories List:
                    </Typography>
                    <List
                        sx={{
                            maxWidth: 400,
                            bgcolor: 'background.paper',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 3,
                        }}
                    >
                        {generateUniqueCategoriesObj(categories).map((item) => {
                            return (
                                <Chip
                                    key={item.key}
                                    label={item.label}
                                    onClick={() => {
                                        setSelectedCategory(
                                            selectedCategory === item.label
                                                ? ''
                                                : item.label
                                        )
                                        console.log(selectedCategory)
                                    }}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: `${
                                            selectedCategory === item.label
                                                ? 'green'
                                                : 'inherit'
                                        }`,
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                        },
                                    }}
                                />
                            )
                        })}
                    </List>
                </Box>
            )}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 4,
                    flexDirection: 'column',
                }}
            >
                <Typography id="range-slider" gutterBottom>
                    Price range
                </Typography>

                <Slider
                    sx={{
                        width: 300,
                        color: 'red',
                        height: 8,
                    }}
                    label="Temperature"
                    aria-labelledby="range-slider"
                    getAriaLabel={() => 'Temperature range'}
                    value={priceRange}
                    onChange={(event, newValue) => {
                        handlePriceChange(event, newValue)
                    }}
                    valueLabelFormat={(value) => `${value}` + '₪'}
                    min={getLowestPrice(cardsArr)}
                    max={getHighestPrice(cardsArr)}
                    valueLabelDisplay="auto"
                    getAriaValueText={(value) => `${value}` + '₪'}
                />
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 2,
                    p: 2,
                }}
            >
                {cardsArr.length === 0 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{
                                textAlign: 'center',
                                color: 'red',
                            }}
                        >
                            No Cards Found
                        </Typography>
                    </Box>
                )}

                {filteredCards.map((item) => {
                    return (
                        <CardItem
                            key={item._id}
                            dispatch={dispatch}
                            navigate={navigate}
                            item={item}
                            favorite={favorite}
                            homePage={homePage}
                        />
                    )
                })}
            </Box>
        </Box>
    )
}

export default CardsList
