import React from 'react';
import Flip from 'react-reveal/Flip';
import config from 'react-reveal/globals';

config({ ssrFadeout: true });

function SkillTemplate({ id, icon, skillName }) {
  return (
    <div
      className='flex justify-center bg-gray-900 border border-blue-300 hover:border-blue-900 w-16 h-16 md:w-20 md:h-20 items-center m-2 p-2 rounded-md text-gray-500 hover:text-blue-400 hover:bg-gray-800 ease-in-out duration-400 shadow-lg shadow-blue-500/50 hover:shadow-blue-900/50'
      key={id}
    >
      <div className='relative group-hover:opacity-100'>
        <Flip duration={2000} left cascade>
          <div className='text-3xl md:text-5xl'>{icon}</div>
        </Flip>
        <span className='absolute inset-0 z-10 -top-10 opacity-0 hover:opacity-100 flex justify-center text-blue-300 text-sm font-semibold whitespace-nowrap'>
          {skillName}
        </span>
      </div>
    </div>
  );
}

export default SkillTemplate;
