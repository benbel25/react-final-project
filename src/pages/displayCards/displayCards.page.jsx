import axios from 'axios'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { toast } from 'react-toastify'
import DisplayCardsComponent from '../../components/displayCardComponent/displayCardComponent'
import EditProductCardPopupComponent from '../../components/editCardPopup/editCardPopup'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteCard,
    fetchCards,
    updateCard,
} from '../../features/cards/cardsSlice'

const DisplayCards = () => {
    const cardsArr = useSelector((state) => state.cards.cards)
    const dispatch = useDispatch()
    const [dataToEdit, setDataToEdit] = useState(null)
    // const navigate = useNavigate()

    useEffect(() => {
        // getAllCards();
        try {
            dispatch(fetchCards()).unwrap()
        } catch (error) {
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
    }, [])

    // const handleDeleteCard = (id) => {
    //     try {
    //         dispatch(deleteCard(id)).unwrap()
    //     } catch (error) {
    //         toast.error('cannot delete card', {
    //             position: 'top-right',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         })
    //     }
    // }

    // const handleShowPopup = (id) => {
    //     let ktemp = cloneDeep(cardsArr.find((item) => item._id === id))
    //     setDataToEdit(ktemp)
    // }

    // const handleCancelEdit = () => {
    //     setDataToEdit(null)
    // }

    // const handleEditCard = (id, updatedCard) => {
    //     try {
    //         dispatch(updateCard(id, updatedCard)).unwrap()
    //     } catch (error) {
    //         toast.error('cannot update card', {
    //             position: 'top-right',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         })
    //     }
    // }

    return (
        <div className="">
            <div className="flex flex-wrap justify-center">
                {cardsArr.map((item) => (
                    <DisplayCardsComponent
                        key={item._id}
                        item={item}
                        
                       
                    />
                ))}
            </div>
        </div>
    )
}
export default DisplayCards
