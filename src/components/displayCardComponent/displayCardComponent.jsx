import './displayCardComponent.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { toast } from 'react-toastify'

const DisplayCardsComponent = ({
    productName,
    productDescription,
    productImage,
    productQuantity,
    productPrice,
    _id,
    onDelete,
    onEdit,
    fav,
}) => {
    const handleDeleteBtnClick = () => {
        onDelete(_id)
    }
    const handleEditBtnClick = () => {
        onEdit(_id)
    }
    const userData = useSelector((state) => state.auth.userData)

    const [isActive, setIsActive] = useState(false)

    const addToFav = async () => {
        const product_id = _id
        await axios
            .post('/users/update_favorites', {
                product_id,
            })
            .then((data) => {
                toast.success('Product added to the favorites!')
                console.log(data.data)
            })
            .catch((err) => {
                console.log(err.response.data)
                toast.error('Product already in your favorites')
            })
    }

    const handleClick = async () => {
        if (!isActive) await addToFav()
        else {
            // await removeFav();
        }
        setIsActive(!isActive)
    }

    const showBtns = () => {
        if (userData.admin === true) {
            return (
                <div className="card-body">
                    <button
                        className="card-link btn btn-warning"
                        onClick={handleEditBtnClick}
                    >
                        Edit
                    </button>
                    <button
                        className="card-link btn btn-danger"
                        onClick={handleDeleteBtnClick}
                    >
                        Delete
                    </button>
                </div>
            )
        }
    }
    return (
        <div className="card m-1">
            <img src={productImage} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{productName}</h5>
                <p className="card-text">{productDescription}</p>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Product Quantity: {productQuantity}
                    </li>
                    <li className="list-group-item">
                        Product Price: {productPrice}
                    </li>
                </ul>
                {fav && (
                    <FontAwesomeIcon style={{ color: 'pink' }} icon={faHeart} />
                )}
                {showBtns()}
                {!fav && !userData.admin && (
                    <button onClick={handleClick} className="fav">
                        <FontAwesomeIcon
                            style={{ color: isActive ? 'pink' : 'black' }}
                            icon={faHeart}
                        />
                    </button>
                )}
            </div>
        </div>
    )
}
export default DisplayCardsComponent
