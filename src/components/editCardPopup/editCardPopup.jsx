/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./editCardPopup.css";
import cardSchmea from "../../validation/card";
import Joi from "joi-browser";

const EditProductCardPopupComponent = (props) => {
  const [productName, setProductName] = useState(props.productName);
  const [productDescription, setProductDescription] = useState(
    props.productDescription
  );
  const [productPrice, setProductPrice] = useState(props.productPrice);
  const [productQuantity, setProductQuantity] = useState(props.productQuantity);
  const [productImage, setProductImage] = useState(props.productImage);

  const handleProductNameChange = (ev) => {
    setProductName(ev.target.value);
  };
  const handleProductDescriptionChange = (ev) => {
    setProductDescription(ev.target.value);
  };
  const handleProductPriceChange = (ev) => {
    setProductPrice(ev.target.value);
  };
  const handleProductQuantityChange = (ev) => {
    setProductQuantity(ev.target.value);
  };
  const handleProductImageChange = (ev) => {
    setProductImage(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleFormClick = (ev) => {
    ev.stopPropagation();
  };

  const handleConfirmClick = () => {
    const validatedValue = Joi.validate(
      {
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productImage,
      },
      cardSchmea,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedValue;
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""));
      }
    } else {
      let dataToSend = {
        productName,
        productDescription,
        productPrice,
        productQuantity,
      };
      if (productImage) {
        dataToSend.productImage = productImage;
      }
      props.onEditDone(props._id, dataToSend);
    }
  };

  const handleCancelClick = () => {
    props.onCancelEdit();
  };

  return (
    <div className="center-wrapper" onClick={handleCancelClick}>
      <form
        onSubmit={handleSubmit}
        className="center-absolut"
        onClick={handleFormClick}
      >
        <div className="mb-3">
          <h3>Edit card</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="bizNameInput" className="form-label">
            Product Name:
          </label>
          <input
            type="text"
            className="form-control popupInput"
            id="bizNameInput"
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bizDescriptionInput" className="form-label">
            Product Description:
          </label>
          <input
            type="text"
            className="form-control popupInput"
            id="bizDescriptionInput"
            value={productDescription}
            onChange={handleProductDescriptionChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bizAddressInput" className="form-label">
            Product Price:
          </label>
          <input
            type="text"
            className="form-control popupInput"
            id="bizAddressInput"
            value={productPrice}
            onChange={handleProductPriceChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bizPhoneInput" className="form-label">
            Product Quantity:
          </label>
          <input
            type="text"
            className="form-control popupInput"
            id="bizPhoneInput"
            value={productQuantity}
            onChange={handleProductQuantityChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bizImageInput" className="form-label">
            Product Image (url):
          </label>
          <input
            type="text"
            className="form-control popupInput"
            id="bizImageInput"
            value={productImage}
            onChange={handleProductImageChange}
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={handleConfirmClick}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          </div>
          <div className="col">
            <button
              type="submit"
              className="btn btn-danger w-100"
              onClick={handleCancelClick}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductCardPopupComponent;
