import React from 'react';

import './select.css';

let options = [];

for (let i = 1; i <= 20; i++) {
  options.push(React.createElement('option', {value: i, key: i}, i))
};

const Select = ({val, id, text, handleChange}) => (
  <div className="select">
    <label htmlFor={id}>{text} </label>
    <select value={val} onChange={(e) => handleChange(+e.target.value)} name={id} id={id}>
      {[...options]}
    </select>
  </div>
);

export default Select;