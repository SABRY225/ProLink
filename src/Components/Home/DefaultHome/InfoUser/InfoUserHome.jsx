import React from 'react'
import { useSelector } from 'react-redux';

function InfoUserHome() {
    const Name = useSelector((state) => state.profile.Name);
    const jopTitle = useSelector((state) => state.profile.jopTitle);
    const followersCount = useSelector((state) => state.profile.followersCount);

    return (
        <div className="container InfoUserHome">
            <div className="row">
                <div className="col-12">
                    <img style={{ width: "10rem" }} src="https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png" />
                </div>
                <div className="col-12">
                    <h4> {Name}</h4>
                </div>
                <div className="col-12">
                    <h6> {jopTitle}</h6>
                </div>
                <div className="col-12 Followers">
                    <div> {followersCount} Followers</div>
                </div>
            </div>
        </div>
    )
}

export default InfoUserHome