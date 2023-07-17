import React from 'react'
import {GiQueenCrown} from 'react-icons/gi'
import Slide from './Slide'
function Header() {
  return (
    <div className='header'>
      <Slide />
      <div className='logo'>
      <GiQueenCrown className='logoimg'/>
        <h4>Track It</h4>
       </div>
 
    </div>
  )
}

export default Header
