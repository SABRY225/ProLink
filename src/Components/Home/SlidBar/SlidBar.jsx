import React from 'react'
import Home from "../../../assets/home.png"
import Explor from "../../../assets/search.png"
import message from "../../../assets/message.png"
import notification from "../../../assets/notification.png"
import Friend from "../../../assets/icons_friend.png"
import { Link } from 'react-router-dom'
function SlidBar() {
    return (
        <div className='SlidBar '>
            <div className="col-md-12">
                <Link to='/home/' className='sub-menu-link-2' >
                    <img src={Home} alt="Home" />
                    <p>Home</p>
                    <span></span>
                </Link>
            </div>
            <div className="col-md-12">
                <Link to='/home/explor' className='sub-menu-link-2' >
                    <img src={Explor} alt="Explor" />
                    <p>Explor</p>
                    <span></span>
                </Link>
            </div>
            <div className="col-md-12">
                <Link to='/home/friend' className='sub-menu-link-2' >
                    <img src={Friend} alt="Friend" />
                    <p>Friends</p>
                    <span></span>
                </Link>
            </div>
            <div className="col-md-12">
                <Link to='/home/notification' className='sub-menu-link-2' >
                    <img src={notification} alt="notification" />
                    <p>Notification</p>
                    <span></span>
                </Link>
            </div>
            <div className="col-md-12">
                <Link to='/home/message' className='sub-menu-link-2' >
                    <img src={message} alt="message" />
                    <p>Messages</p>
                    <span></span>
                </Link>
            </div>
        </div>
    )
}

export default SlidBar