import React from 'react'
import { useSelector } from 'react-redux';

export default  function UserInfo() {
    const backImage = useSelector((state) => state.profile.backImage);
    const profilePicture = useSelector((state) => state.profile.profilePicture);
    const jopTitle = useSelector((state) => state.profile.jopTitle);
    const Name = useSelector((state) => state.profile.Name);
    const followersCount = useSelector((state) => state.profile.followersCount);
    console.log(followersCount);
  return (
        <>
        <div className="row">
            <img className='backImage' src={backImage!= null ? backImage :"https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg"} alt="backImage" />
        </div>
        <div className="row d-flex text-center">
            <div className="col-md-12">
            <img className='profilePicture' src={profilePicture != null ? profilePicture :"https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg"} alt="backImage" />
            </div>
            <div className="col-md-12 p-3">
            <h2>{Name}</h2>
            </div>
            <div className="col-md-12 p-2">
            <h3 style={{color:"#ABB2B9"}}>{jopTitle}</h3>
            </div>
            <div className="col-md-12 p-2">
            <h4 style={{color:"#ABB2B9"}}>{followersCount} Followers</h4>
            </div>
            <div className="col-md-12 p-2">
            <h4 style={{color:"#566573"}}><hr/></h4>
            </div>

        </div>
        </>
)
}
