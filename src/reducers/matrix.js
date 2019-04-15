import c from '../constants.js';

function getEmptyMatrix(i, j) {
  let matrix = [];
  for (let k = 0; k < i; k++) {
    let cols = new Array(j);
    for (let c = 0; c< j; c++) {
      cols[c] = '';
    }
    matrix.push(cols);
  }
  return matrix;
}

function getEmptyArray(i) {
  let cols = [];
  for (let k = 0; k < i; k++) {
    cols.push('');
  }
  return cols;
}

const matrix = (state = {}, {type, rowsCount, columnsCount, data, needs, storage}) => {
  switch (type) {
    case c.CHANGE_ROWS_COUNT:
      return {
        ...state,
        rowsCount,
        data: getEmptyMatrix(rowsCount, state.columnsCount),
        needs: getEmptyArray(state.columnsCount),
        storage: getEmptyArray(rowsCount)
      };

    case c.CHANGE_COLUMNS_COUNT:
      return {
        ...state,
        columnsCount,
        data: getEmptyMatrix(state.rowsCount, columnsCount),
        needs: getEmptyArray(columnsCount),
        storage: getEmptyArray(state.rowsCount)
      };

    case c.UPDATE_MATRIX:
      return {
        ...state,
        data
      }

    case c.CHANGE_NEEDS:
      return {
        ...state,
        needs
      }

    case c.CHANGE_STORAGE:
      return {
        ...state,
        storage
      }

    default:
      return state;
  }
}

export default matrix;