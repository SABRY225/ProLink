import React from 'react'
import { useSelector } from 'react-redux';

const InfoUserHome=({data})=> {
    const followersCount = useSelector((state) => state.profile.followersCount);
    const profilePicture = useSelector((state) => state.profile.profilePicture);

    return (
        <div className="container InfoUserHome">
            <div className="row">
                <div className="col-12">
                    <img  className='profilePictureHome' src={profilePicture?profilePicture:"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} />
                </div>
                <div className="col-12 m-1">
                    <h4> {data.firstName+" "+data.lastName}</h4>
                </div>
                <div className="col-12">
                    <h5> {data.jopTitle}</h5>
                </div>
                <div className="col-12 Followers">
                    <div> {followersCount} Followers</div>
                </div>
            </div>
        </div>
    )
}

export default InfoUserHome