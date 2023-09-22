import React from 'react'
import "./Header.css"
import {AiOutlineClose} from "react-icons/ai"


const Header = () => {
  return (
    <div className='header'>
        <div className="nav">
          <h3 className='title'>Your Notes</h3>
          <strong className='close'><AiOutlineClose /></strong>
        </div>
    </div>
  )
}

export default Header