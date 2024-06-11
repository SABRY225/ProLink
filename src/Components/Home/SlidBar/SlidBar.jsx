import React, { useState } from 'react';
import Home from "../../../assets/home.png";
import Explor from "../../../assets/search.png";
import message from "../../../assets/message.png";
import notification from "../../../assets/notification.png";
import Friend from "../../../assets/icons_friend.png";
import Jobs_Icon from "../../../assets/icons_Jobs.png";
import { Link } from 'react-router-dom';
import './Droplist.css'; // Import the CSS file

function SlidBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='SlidBar'>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                Menu
            </button>
            <div className={`menu-items ${isOpen ? 'open' : ''}`}>
                <div className="menu-item">
                    <Link to='/home/' className='sub-menu-link-2'>
                        <img src={Home} alt="Home" />
                        <p>Home</p>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to='/home/explor' className='sub-menu-link-2'>
                        <img src={Explor} alt="Explor" />
                        <p>Explor</p>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to='/home/friend' className='sub-menu-link-2'>
                        <img src={Friend} alt="Friend" />
                        <p>Friends</p>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to='/home/Jobs' className='sub-menu-link-2'>
                        <img src={Jobs_Icon} alt="Jobs" />
                        <p>Jobs</p>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to='/home/notification' className='sub-menu-link-2'>
                        <img src={notification} alt="Notification" />
                        <p>Notification</p>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to='/home/message' className='sub-menu-link-2'>
                        <img src={message} alt="Messages" />
                        <p>Messages</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SlidBar;
