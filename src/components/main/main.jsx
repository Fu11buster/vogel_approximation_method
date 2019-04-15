import React from 'react';
import Select from '../select/select.jsx';
import InputTable from '../InputTable/inputTable';
import { connect } from 'react-redux';

import { changeRowsCount, changeColumnsCount, updateMatrix, changeNeeds, changeStorage } from '../../actions/actionCreator';

import './main.css';

const Main = (props) => {
  const { rowsCount, columnsCount, matrix, needs, storage } = props;

  const changeColumnsCount = (colsCount) => {
    const { changeColumnsCount } = props;
    changeColumnsCount(colsCount);
  }

  const changeRowsCount = (rowsCount) => {
    const { changeRowsCount } = props;
    changeRowsCount(rowsCount);
  }

  const changeNeeds = (i, j, val) => {
    const {changeNeeds} = props;
    needs[j] = val;
    changeNeeds([...needs]);
  }

  const changeStorage = (i, j, val) => {
    const {changeStorage} = props;
    storage[i] = val;
    changeStorage([...storage]);
  }

  const updMatr = (i, j, val) => {
    const { updateMatrix } = props;
    let m = Array.from(matrix);
    m[i][j] = val;
    updateMatrix(m);
  };

  const clearTable = () => {
    changeRowsCount(rowsCount);
  }

  const checkData = () => {
    if ((matrix.indexOf('') !== -1) || (needs.indexOf('') !== -1) || (storage.indexOf('') !== -1)) {
      alert('Заполните все поля!')
      return;
    }
  }

  return (
    <div>
      <Select handleChange={changeRowsCount} val={rowsCount} text="Введите количество строк (поставщики):" />
      <Select handleChange={changeColumnsCount} val={columnsCount} text="Кол-во столбцов (Пункты назначения):" />
      <InputTable matrix={matrix} needs={needs} storage={storage} updMatr={updMatr} changeNeeds={changeNeeds} changeStorage={changeStorage} rows={rowsCount} columns={columnsCount} />
      <div className="btns-block">
        <button onClick={clearTable} id="resetTable">Очистить таблицу</button>
        <button onClick={checkData} id="resolveTable">Рассчитать план</button>
      </div>
    </div>
  )
}

export default connect(state => ({
  rowsCount: state.matrix.rowsCount,
  columnsCount: state.matrix.columnsCount,
  matrix: state.matrix.data,
  needs: state.matrix.needs,
  storage: state.matrix.storage
}), { changeRowsCount, changeColumnsCount, updateMatrix, changeNeeds, changeStorage })(Main);