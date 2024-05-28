import React from 'react'
import icons_follower from "../../../assets/icons_follower.png"

function Follower() {
  return (
    <div className='col-md-12 box m-2'>
      <h3 className='text-start'><img src={icons_follower} />Followers</h3>
      {/* <p>{skill}</p> */}
    </div>
  )
}

export default Follower