import React from 'react'

function Figma(props) {
  const size = props.size || 32
  return (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width={size} height={size}>
      {/* <style type="text/css">
        .st0{fill = "#0acf83"}
        .st1{fill = "#a259ff"}
        .st2{fill = "#f24e1e"}
        .st3{fill = "#ff7262"}
        .st4{fill = "#1abcfe"}
      </style> */}
      <title>Figma.logo</title>
      <desc>Created using Figma</desc>
      <path fill="#0acf83" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" />
      <path fill="#a259ff" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" />
      <path fill="#f24e1e" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" />
      <path fill="#ff7262" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" />
      <path fill="#1abcfe" class="st4" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" />
    </svg>
  )
}

export default Figma