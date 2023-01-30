import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material'
import { useLayoutEffect } from 'react'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getProducts } from '../../features/public/publicSlice'
import Spinner from '../../components/Spinner'
import './homepage.css'
const HomePage = () => {
    const { products, loading } = useSelector((state) => state.public)
    const [fetchedProducts, setFetchedProducts] = useState(products || [])

    const dispatch = useDispatch()
    useLayoutEffect(() => {
        dispatch(getProducts())
            .unwrap()
            .then((result) => {
                if (result) {
                    console.log(result)
                    setFetchedProducts(result)
                }
            })
            .catch(() => {
                toast.error('Failed to load products')
            })
    }, [])

    if (loading) return <Spinner />

    return (
        <Fragment>
            <div className="bg-image p-5 text-center shadow-1-strong  text-white bg-pic">
                <h1 className="text-center mt-5 h1-home ">
                    Welcome to the best online phone store! <br /> <br /> Here
                    you can find every phone you want and for cheap price
                </h1>
            </div>

            <Box>
                {fetchedProducts.map((product) => {
                    return (
                        <Box
                            key={product._id}
                            sx={{
                                margin: '10px',
                                display: 'inline-block',
                            }}
                        >
                            <Card
                                sx={{
                                    maxWidth: 345,
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={product.productImage || ''}
                                    alt="product"
                                    sx={{
                                        height: 350,
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {product.productName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {product.productDescription}
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
                                        Price: ₪{product.productPrice}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )
                })}
            </Box>
            <h2 className="text-center mt-5  ">
                In order to see all our products and get information, you need
                to signUp
            </h2>
        </Fragment>
    )
}
export default HomePage
