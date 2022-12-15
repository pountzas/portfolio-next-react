import React, { useState } from 'react';

function SkillTemplate({ id, icon, skillName }) {

  return (
    <div className='relative flex items-center justify-center w-16 h-16 p-2 m-2 text-gray-500 transition duration-150 ease-in-out border shadow-xl rounded-xl border-borderSecondary grayscale hover:grayscale-0 bg-quaternary hover:border-borderTertiary md:w-20 md:h-20 hover:bg-tertiary duration-400 shadow-primary hover:shadow-quaternary/50'
      key={id}
    >
      <div className='hover:animate-pulse'>
        <div className='flex items-center justify-center '>

          {/* <Flip duration={4000} left cascade> */}
          <div className='text-3xl md:text-5xl'>{icon && icon}</div>
          {/* </Flip> */}

        </div>
        <span className='absolute inset-0 z-10 flex justify-center text-sm font-semibold opacity-0 text-textTertiary -top-6 hover:opacity-100 whitespace-nowrap'>
          {skillName}
        </span>
      </div>
    </div>
  );
}

export default SkillTemplate;
