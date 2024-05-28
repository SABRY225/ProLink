import React from 'react'
import { useSelector } from 'react-redux';
import icons_skills from "../../../assets/icons_skills.png"

function Skills() {
  const skill = useSelector((state) => state.profile.skill);
  console.log(skill);
  return (
    <div className='col-md-12 box m-2'>
      <h3 className='text-start'><img src={icons_skills} />Skilles</h3>
      <p>{skill}</p>
    </div>
  )
}

export default Skills