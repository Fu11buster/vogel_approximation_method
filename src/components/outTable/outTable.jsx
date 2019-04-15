import React from 'react';

import './outTable.css';

const OutTable = (props) => {

  const { matrix, storage, needs, colsDiffs = [], rowsDiffs = [], plan = [], maxEl } = props;

  return (
    <table border="1px">
      <tbody>
        <tr>
          <td className="text" rowSpan="2">Пункты отправления</td>
          <td className="text" colSpan={matrix[0].length}>Пункты назначения</td>
          <td className="text" rowSpan="2">Запасы</td>
          {colsDiffs.length > 0 && rowsDiffs.length > 0 ? <td className="text" rowSpan="2">&Delta;</td> : null}
        </tr>
        <tr>
          {
            matrix[0].map((item, index) => (
              <td key={index}>
                <i>B</i>
                <sub>{index + 1}</sub>
              </td>
            ))
          }
        </tr>
        {matrix.map((item, index) => (
          <tr>
            <td key={index}>
              <i>A</i>
              <sub>{index + 1}</sub>
            </td>
            {
              matrix[index].map((item, j) => (
                <td className={(needs[j] === 0 || storage[index] === 0) ? "disabled" : null} data-price={matrix[index][j]} key={`${index}:${j}`}>
                  <i>{plan.length > 0 ? plan[index][j] : null}</i>
                </td>
              ))
            }
            <td>
              <i>{storage[index]}</i>
            </td>
            {colsDiffs.length > 0 && rowsDiffs.length > 0 ? <td className={(maxEl.arrName==="rowsArr" && maxEl.elIndex===index) ? 'maxDiff' : null} >{rowsDiffs[index]}</td> : null}
          </tr>
        ))}
        <tr>
          <td>
            Потребности
          </td>
          {
            matrix[0].map((el, i) => (
              <td><i>{needs[i]}</i></td>
            ))
          }
        </tr>
        {colsDiffs.length > 0 && rowsDiffs.length > 0 ?
          <tr>
            <td>&Delta;</td>
            {
              matrix[0].map((el, index) => (
                <td className={(maxEl.arrName==="colsArr" && maxEl.elIndex===index) ? 'maxDiff' : null}>
                  {colsDiffs[index]}
                </td>
              ))
            }
          </tr>
          : null}
      </tbody>
    </table>
  )
}

export default OutTable;