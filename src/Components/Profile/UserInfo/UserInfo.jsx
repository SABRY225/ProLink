import React from 'react'
import { useSelector } from 'react-redux';

const UserInfo=({firstName,lastName,backImage,profilePicture,followersCount,jobTitle,isFollowed,isFriend})=> {
    console.log(jobTitle);
    const jopTitle = useSelector((state) => state.profile.jopTitle);
    const Name = firstName+" "+lastName;
    console.log(followersCount);
    const handelFollow=()=>{

    }
    const handelUnFollow=()=>{
        
    }
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
            <h4 style={{color:"#ABB2B9"}}>{jobTitle}</h4>
            </div>
            <div className="col-md-12 p-2">
            <h4 style={{color:"#197BE3"}}>{followersCount} Followers</h4>
            </div>
            <div className="col-md-12 p-2">
            <h4 style={{color:"#566573"}}><hr/></h4>
            </div>
            <div className="col-md-12">
            {isFollowed ? <>
            <button onClick={handelFollow}>Follow</button>
            </>:<>
            <button nClick={handelUnFollow}>UnFollow</button>
            </>}
            </div>

        </div>

        </>
)
}

export default UserInfo;