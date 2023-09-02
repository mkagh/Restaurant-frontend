import React, { useState } from 'react'
import axios from 'axios';
import MainMenu from "../components/MainMenu";
import { useGlobalContext } from '../context'

const OrderOnoline = () => {
  const { ordered, removeOrder, total, getTotal, otherErrors, assignotherError } = useGlobalContext()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    adress: '',
    order: [],
    total: 0
  });


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = {
      ...formData,
      order: ordered,
      total: total,
    };

    try {
      const response = await axios.post('/api/v1/onlineorder', updatedFormData);
      if (response.data.msg) {
        assignotherError(response.data.msg)
      }
    } catch {
      console.log("something is wrong");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
        order: ordered
      };
    });
  };

  return (
    <div className='orderOnline' >
      <div className="form">
        <form onSubmit={handleFormSubmit} action='' method="POST" >
          <div className="data">
            <div className="name">
              <label htmlFor="name">name</label>
              <input value={formData.name}
                onChange={handleInputChange} type="text" name="name" />
            </div>
            <div className="email">
              <label htmlFor="name">email</label>
              <input value={formData.email}
                onChange={handleInputChange} type="text" name="email" />
            </div>
            <div className="addres">
              <label htmlFor="name">adress</label>
              <input value={formData.adress}
                onChange={handleInputChange} type="adress" name="adress" />
            </div>
          </div>
          <div className="order">
            <div className='orderedItems'  >{ordered.map((order, index) => {
              const { price, amount, name } = order
              return <div key={index} className='orderedItem'>
                <p>{index + 1}.</p>
                <p>{name}</p>
                <div className="aboutPrice">
                  <p>{price}$ *</p>
                  <p>{amount} =</p>
                  <p className='totalOfOne'>{amount * price}$</p>
                </div>
                <button onClick={() => {
                  removeOrder(name)
                  getTotal()
                }} type='button'>X</button>
              </div>
            })}</div>
          </div>
          <div className="button">
            <button type='submit'  >Order</button>
            <p>YOUR PRICE IS: {total} $</p>
            {otherErrors && <p className='error'>{otherErrors}</p>}
          </div>
        </form>
      </div>
      <MainMenu showAmount={true} />
    </div>
  )
}

export default OrderOnoline