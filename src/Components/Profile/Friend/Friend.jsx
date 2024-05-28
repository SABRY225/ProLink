import React, { useEffect, useState } from 'react'
import icons_friend from "../../../assets/icons_friend.png"
import axios from 'axios';
import { useSelector } from 'react-redux';

function Friend() {
  const tok = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const getFrientData = async () => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_GETFRIEND, {
            headers: {
                'Authorization': 'Bearer ' + tok,
                "Content-Type": "application/json"
            }
        });
        setData(data);
    } catch (error) {
            console.log(error.message);
    }

};
useEffect(() => {
  getFrientData();
}, [tok]);
console.log(data);
  return (
    <div className='col-md-12 box m-2'>
      <h3 className='text-start'><img src={icons_friend} />Friends</h3>
      {/* <p>{skill}</p> */}
    </div>
  )
}

export default Friend