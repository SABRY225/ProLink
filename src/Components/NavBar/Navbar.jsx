import { Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import Profile from "../../assets/profile.png"
import lessThen from "../../assets/less-than.png"
import setting from "../../assets/setting.png"
import Logout from "../../assets/logout.png"
import Home from "../../assets/icons_home.png"
import "./Navbar.css"
import React, { useState, useRef, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logoutSuccess } from '../../Redux/authSlice';
import {
    setId,
    setName,
    setBackImage,
    setCv,
    setDescription,
    setFollowersCount,
    setIsFollowed,
    setIsFriend,
    setJopTitle,
    setPhoneNumber,
    setProfilePicture,
    setRate,
    setRateCount,
    setSkill,
    setEmail,
} from "../../Redux/profileSlice";
import axios from 'axios';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tok = useSelector((state) => state.auth.token);
    const [isOpen, setIsOpen] = useState(false);
    const subMenuRef = useRef(null);
    const [data, setData] = useState([]);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    const handleClickOutside = (event) => {
        if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const getDataUser = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_USER, {
                headers: {
                    'Authorization': 'Bearer ' + tok,
                    "Content-Type": "application/json"
                }
            });
            setData(data);
            console.log(data);
        } catch (error) {
            if (error.message === "Request failed with status code 401") {
                dispatch(loginSuccess(""))
            }
        }
    };
     
    useEffect(() => {
        getDataUser();
    }, [tok]);

    const name = data.firstName + " " + data.lastName;
    const ImgProfile = data.profilePicture;
console.log(data);
    dispatch(setId(data.id))
    dispatch(setName(name));
    dispatch(setBackImage(data.backImage));
    dispatch(setCv(data.cv));
    dispatch(setIsFriend(data.isFriend));
    dispatch(setIsFollowed(data.isFollowed));
    dispatch(setFollowersCount(data.followersCount));
    dispatch(setDescription(data.description));
    dispatch(setJopTitle(data.jopTitle));
    dispatch(setPhoneNumber(data.phoneNumber));
    dispatch(setProfilePicture(data.profilePicture));
    dispatch(setRate(data.rate));
    dispatch(setRateCount(data.rateCount));
    dispatch(setSkill(data.skill));
    dispatch(setEmail(data.email));
    
    const id = useSelector((state) => state.profile.skill);

    const logout = () => {
        dispatch(logoutSuccess())
        navigate('/signin')
    };
    
    return (
        <>
            <nav className="navbar navbar-expand-lg " style={{ background: "#FBFCFC", padding: "0rem" }}>
                <div className="container-fluid">
                    <div className="navbar-brand Logo" style={{ marginLeft: "5%" }}>ProLink</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav mx-auto"> 
                            {/* <SearchBar /> */}
                        </div>
                        <div className="d-flex ml-auto"> {/* Align user info to the right */}
                            <div className='User'>
                                <div className='UserText p-1'>{name}</div>
                                <div>
                                    <img className='UserImage' src={data.profilePicture != null ? data.profilePicture : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} alt="" onClick={toggleMenu} />
                                    <div id="subMenu" ref={subMenuRef} className={isOpen ? 'sub-menu-wrap' : 'sub-menu-wrap-2'}>
                                        <div className="sub-menu">
                                            <div className='user-info'>
                                                <img className='UserImage' src={data.profilePicture != null ? data.profilePicture : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} alt="" />
                                                <h3 style={{marginLeft:'1rem'}}>{name}</h3>
                                            </div>
                                            <hr />
                                            <Link to='/home/' className='sub-menu-link' >
                                                <img src={Home} alt="Profile" />
                                                <p>Home</p>
                                                <span><img src={lessThen} alt="lessThen" /></span>
                                            </Link>
                                            <Link to='/profile' className='sub-menu-link' >
                                                <img src={Profile} alt="Profile" />
                                                <p>Profile</p>
                                                <span><img src={lessThen} alt="lessThen" /></span>
                                            </Link>
                                            <Link to='/setting' className='sub-menu-link'>
                                                <img src={setting} alt="setting" />
                                                <p>setting</p>
                                                <span><img src={lessThen} alt="lessThen" /></span>
                                            </Link>
                                            <div className='sub-menu-link' onClick={logout}>
                                                <img src={Logout} alt="Logout" />
                                                <p>Logout</p>
                                                <span><img src={lessThen} alt="lessThen" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
