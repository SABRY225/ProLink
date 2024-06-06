import React from 'react';
import iconsSkills from '../../../assets/icons_skills.png';

const Skills = ({ skills }) => {
  console.log(skills);
  return (
    <div className='col-md-12 box m-2'>
      <h3 className='text-start'>
        <img src={iconsSkills} alt="Skills Icon" /> Skills
      </h3>
      <div className="skillBoxAll">
        {skills.map((skill, index) => (
          <span key={index} className='skillbox'>{skill}</span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
