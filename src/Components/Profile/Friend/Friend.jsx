import React from 'react';
import icons_friend from "../../../assets/icons_friend.png";

const Friend = ({ friends }) => {
  return (
    <div className='col-md-12 box m-2'>
      <h3 className='text-start'>
        <img src={icons_friend} alt="Friends Icon" />Friends
      </h3>
      <div className="skillBoxAll " style={{ display: 'flex', flexWrap: 'wrap',justifyContent:"center" }}>
        {friends.map((friend, index) => (
          <>
          <div key={index} className='friendbox col-md-5 m-1' style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={friend.profilePicture ? friend.profilePicture : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} 
              alt="imgFriend" 
              className='imgFriend' 
              style={{ width: '55px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
            />
            <div>
              <div className='friendboxName' style={{ color: "#283747" }}>{friend.firstName + " " + friend.lastName}</div>
              <div className='friendboxName' style={{ color: "#3498DB" }}>Front-End</div>
            </div>
          </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Friend;
