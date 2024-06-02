import React from 'react'
import back_image from "../../../assets/back_image.png"
import icons_user from "../../../assets/icons_user.png"
import user_image from "../../../assets/user_image.png"
import Change_password from "../../../assets/change-password.png"
import { Link } from 'react-router-dom'
function SlidBarSetting() {
    return (
        <div className='SlidBar '>
            <div className="col-md-12">
                <Link to='/setting/' className='sub-menu-link-2' >
                    <img src={icons_user} alt="icons_user" />
                    <p>User Info</p>
                    <span></span>
                </Link>
            </div>
            <div className="col-md-12">
                <Link to='/setting/UserImage/' className='sub-menu-link-2' >
                    <img src={user_image} alt="user_image" />
                    <p>Edite User Image</p>
                    <span></span>
                </Link>
            </div>
            <div className="col-md-12">
                <Link to='/setting/BackImage/' className='sub-menu-link-2' >
                    <img src={back_image} alt="back_image" />
                    <p>Edite background Image</p>
                    <span></span>
                </Link>
            </div>
            <div className="col-md-12">
                <Link to='/setting/NewPasswordRouter/' className='sub-menu-link-2' >
                <img src={Change_password} alt="Change_password" />
                    <p>Change Password Account</p>
                    <span></span>
                </Link>
            </div>
        </div>
    )
}

export default SlidBarSetting