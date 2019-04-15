import React from 'react';
import { connect } from 'react-redux';
import OutTable from '../outTable/outTable';

import './solve.css';

const Solve = (props) => {
  const { storageVolume, needsVolume, closedMatrix, starterNeeds, starterStorage, solve } = props;

  return (
    <section className="solve">
      <h2>Решение:</h2>
      <p>Для начала определим, нужно ли вводить фиктивного поставщика или потребителя: {(storageVolume !== needsVolume) ? '(надо)' : '(нет)'}</p>
      <div className="volume">
        <p>Общий объем поставок: <b>{storageVolume}</b></p>
        <p>Общий объем потребностей: <b>{needsVolume}</b></p>
        <p>&sum; A<sub>i</sub> {(storageVolume > needsVolume) ? '>' : (storageVolume < needsVolume) ? '<' : '='} &sum; B<sub>i</sub> -
        модель является {(storageVolume !== needsVolume) ? 'от' : 'за'}крытой</p>
      </div>
      <p>В результате получим закрытую модель транспортной задачи:</p>
      {closedMatrix &&
      <OutTable matrix={closedMatrix} storage={starterStorage} needs={starterNeeds}/>}
      <h3>Решение по шагам:</h3>
      {
        solve.map(solve => 
          <OutTable matrix={closedMatrix} storage={solve.storage} needs={solve.needs} colsDiffs={solve.colsDiffs} rowsDiffs={solve.rowsDiffs} plan={solve.matr} maxEl={solve.maxEl} />
        )
      }
      <h3>Стоимость транспортировки по полученному плану равна: {solve[solve.length - 1].matr ? findPrice(closedMatrix, solve[solve.length - 1].matr) : 'Нет решения'}</h3>
    </section>
  )
}

function findPrice(tariffs, plan) {
  let price = 0;
  for (let i = 0; i < plan.length; i++) {
    for (let j = 0; j < plan[0].length; j++) {
      if (plan[i][j] !== "") {
        price += plan[i][j] * tariffs[i][j];
      }
    }
  }
  return price;
}

export default connect((state) => ({
  storageVolume: state.solve.storageVolume,
  needsVolume: state.solve.needsVolume,
  closedMatrix: state.solve.closedMatrix,
  starterNeeds: state.solve.starterNeeds,
  starterStorage: state.solve.starterStorage,
  solve: state.solve.solve,
}))(Solve);