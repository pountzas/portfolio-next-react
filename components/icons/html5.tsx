import React from 'react'


interface html5Props {
  fill?: string;
  size?: string | number;
}
function html5(props: html5Props) {
  const fill = props.fill || 'white'
  const size = props.size || '30px'
  return (

    <svg fill={fill} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width={size} height={size}>
      <path d="M25.428,3.333C25.238,3.121,24.967,3,24.683,3H5.317C5.033,3,4.762,3.121,4.572,3.333c-0.19,0.212-0.28,0.495-0.249,0.777 l2.202,19.823c0.044,0.403,0.329,0.74,0.719,0.851l7.48,2.137c0.09,0.026,0.183,0.039,0.275,0.039s0.185-0.013,0.275-0.039 l7.48-2.137c0.39-0.111,0.674-0.448,0.719-0.851L25.676,4.11C25.708,3.828,25.618,3.545,25.428,3.333z M20.629,10.43h-8.93 l0.212,2.542h8.503l-0.638,7.51L15.003,22l-0.047-0.015l-4.72-1.505L9.978,17.42h2.312l0.101,1.189l2.637,0.581l2.591-0.582 l0.275-3.213h-8.09L9.178,8h11.659L20.629,10.43z" />
    </svg>
  )
}

export default html5

