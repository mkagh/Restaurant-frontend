import React, { useState } from 'react'
import { AiFillPhone, AiTwotoneMail, AiOutlineWhatsApp } from 'react-icons/ai'
import { BiCurrentLocation } from 'react-icons/bi'
import { FaViber } from 'react-icons/fa'
import axios from 'axios'
import { useGlobalContext } from '../context'



const Contact = () => {
  const { otherErrors, assignotherError } = useGlobalContext()


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/contact', formData);
      if (response.data.msg) {
        assignotherError("to contact us all fields are necessary")
      }
    } catch {
      console.log("ne valja nesto");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <div className='contactUs'  >
      <div className="title">
        <h1>Contact</h1>
      </div>
      <div className="contactInformation">
        <div className="social">
          <div className="phone">
            <div className="phone-ico">
              <AiFillPhone />
            </div>
            <h4>(555) 123-xxxx</h4>
          </div>
          <div className="email">
            <div className="email-ico">
              <AiTwotoneMail />
            </div>
            <h4>john.doe123@example.com</h4>
          </div>
          <div className="ourAdress">
            <div className="adress-ico">
              <div className="phone-ico">
                <BiCurrentLocation />
              </div>
            </div>
            <h4>1234 Elm Street
              Springfield, CA 12345
              United States</h4>
          </div>
          <div className="androidApps">
            <div className="viber"><AiOutlineWhatsApp /></div>
            <div className="whatsUp"><FaViber /></div>
          </div>
        </div>
        <div className="form">
          <form onSubmit={handleFormSubmit} action="">
            <div className="fullName">
              <div className="name">
                <label htmlFor="name">name</label>
                <input value={formData.name}
                  onChange={handleInputChange} required type="text" name='name' />
              </div>
              <div className="email">
                <label htmlFor="email">email</label>
                <input value={formData.email}
                  onChange={handleInputChange} type="email" name='email' />
              </div>
            </div>
            <div className="message">
              <label htmlFor="message">message</label>
              <input className='inputMessage' value={formData.message}
                onChange={handleInputChange} name="message" id="" cols="30" rows="10"></input>
            </div>
            <div className="order">
              <button type='submit'>CONTACT</button>
            </div>
            {otherErrors && <p className='error'>{otherErrors}</p>}
          </form>
        </div>
      </div>

    </div>
  )
}

export default Contact