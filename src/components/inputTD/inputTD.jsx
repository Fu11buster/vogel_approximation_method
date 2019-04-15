import React from 'react';

import './inputTD.css';

const validation = (e) => {
  e.target.value = e.target.value.replace(/[^\d.]/g, '');
}

const InputTD = ({ i, j, color, val, handleChange }) => {
  return (
  <td className={color}>
    <input type="text" value={val} data-i={i} data-j={j} onChange={(e) => {
      validation(e);
      handleChange(i, j, Number(e.target.value));
    }} />
  </td>
)}

export default InputTD;