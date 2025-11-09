import React from 'react'


interface BitbucketProps {
  size?: string | number;
}
function Bitbucket(props: BitbucketProps) {
  const size = props.size || 32
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} viewBox="0 0 63 63">
      <defs>
        <linearGradient id="A" x1="64.01" y1="30.27" x2="32.99" y2="54.48" gradientUnits="userSpaceOnUse"><stop offset=".18" stopColor="#0052cc" /><stop offset="1" stopColor="#2684ff" /></linearGradient>
      </defs>
      <path d="M2 6.26a2 2 0 0 0-2 2.32l8.5 51.54a2.72 2.72 0 0 0 2.66 2.27H51.9a2 2 0 0 0 2-1.68L62.4 8.6a2 2 0 0 0-2-2.32zM37.75 43.5h-13l-3.52-18.4H40.9z" fill="#2684ff" />
      <path d="M59.67 25.12H40.9l-3.15 18.4h-13L9.4 61.73a2.71 2.71 0 0 0 1.75.66H51.9a2 2 0 0 0 2-1.68z" fill="url(#A)" />
    </svg>
  )
}

export default Bitbucket