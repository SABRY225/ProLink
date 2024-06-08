import React from 'react'
import { useSelector } from 'react-redux';
import icon_about from "../../../assets/icon_about.png"
const About=({description})=> {
  return (
    <div className='col-md-12 box m-2'>
        <h3 className='text-start'><img src={icon_about}/>About</h3>
        <p>{description}</p>
    </div>
  )
}

export default About