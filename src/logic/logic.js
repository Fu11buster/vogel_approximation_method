function solveMatrix(matrixTariffs, storage, needs, callback) {
  let state = {};

  state.solve = [];

  state.storageVolume = sumArray(storage);
  state.needsVolume = sumArray(needs);

  state.closedMatrix = getClosedMatrix(matrixTariffs, state.storageVolume, state.needsVolume);

  let starterNeeds = Array.from(needs);
  if (state.storageVolume > state.needsVolume) {
    starterNeeds[starterNeeds.length] = (state.storageVolume - state.needsVolume);
  }
  state.starterNeeds = starterNeeds;

  let starterStorage = Array.from(storage);
  if (state.storageVolume < state.needsVolume) {
    starterStorage[starterStorage.length] = (state.needsVolume - state.storageVolume)
  }
  state.starterStorage = starterStorage;

  const diffs = findMatrixDiffs(state.closedMatrix);
  const maxEl = findMaxDiff(diffs.rowsDiffs, diffs.colsDiffs);
  const matr = state.closedMatrix.map(arr => arr.map(el => ''));

  state.solve[0] = {matr, maxEl, ...diffs, curStorVolume: state.storageVolume, curNeedVolume: state.needsVolume, needs: starterNeeds, storage: starterStorage};

  while (state.solve[state.solve.length - 1].curStorVolume > 0 || state.solve[state.solve.length - 1].curNeedVolume > 0 ) {
    state.solve = [...state.solve, fillBasicPlan(state.closedMatrix, state.solve[state.solve.length - 1])];
  }

  callback(state);
}

function fillBasicPlan(tariffs, { matr, maxEl, colsDiffs, rowsDiffs, needs, storage}) {
  let curMatr = matr.map(el => Array.from(el));
  let curColsDiffs = [...colsDiffs];
  let curRowsDiffs = [...rowsDiffs];
  let curNeeds= [...needs];
  let curStorage = [...storage];

  if (maxEl.arrName === "colsArr") {
    let arr = getColumnArray(tariffs, maxEl.elIndex); //получение массива из столбца с максимальной разностью
    arr = arr.map((el, index) => ({ //сортировка полученного массива по возрастанию
      el,
      index
    })).sort((a, b) =>(
      a.el - b.el
    ));

    let k = 0;

    while (curStorage[arr[k].index] <= 0) {
      k++;
    }

    curMatr[arr[k].index][maxEl.elIndex] = Math.min(curNeeds[maxEl.elIndex], curStorage[arr[k].index]);
    curNeeds[maxEl.elIndex] = curNeeds[maxEl.elIndex] - curMatr[arr[k].index][maxEl.elIndex];
    curStorage[arr[k].index] = curStorage[arr[k].index] - curMatr[arr[k].index][maxEl.elIndex];
  } else {
    let arr = tariffs[maxEl.elIndex];
    arr = arr.map((el, index) => ({
      el,
      index
    })).sort((a, b) =>(
      a.el - b.el
    ));

    let k = 0;

    while (curNeeds[arr[k].index] <= 0) {
      k++;
    }

    curMatr[maxEl.elIndex][arr[k].index] = Math.min(curNeeds[arr[k].index], curStorage[maxEl.elIndex]);
    curNeeds[arr[k].index] = curNeeds[arr[k].index] - curMatr[maxEl.elIndex][arr[k].index];
    curStorage[maxEl.elIndex] = curStorage[maxEl.elIndex] - curMatr[maxEl.elIndex][arr[k].index];
  }

  curColsDiffs.forEach((el, index) => {
    curColsDiffs[index] = getDiffMinEls(getColumnArray(tariffs, index).filter((el, ind) => {
      return curStorage[ind] > 0;
    }));
    if (curNeeds[index] === 0) {
      curColsDiffs[index] = null;
    }
  })

  curRowsDiffs.forEach((el, index) => {
    curRowsDiffs[index] = getDiffMinEls(tariffs[index].filter((el, ind) => {
      return curNeeds[ind] > 0;
    }));
    if (curStorage[index] === 0) {
      curRowsDiffs[index] = null;
    }
  })



  const mEl = findMaxDiff(curRowsDiffs, curColsDiffs);

  return {
    matr: curMatr,
    maxEl: mEl,
    colsDiffs:curColsDiffs,
    rowsDiffs:curRowsDiffs,
    curStorVolume: sumArray(curStorage),
    curNeedVolume: sumArray(curNeeds),
    needs: curNeeds,
    storage: curStorage
  }
}

function findMaxDiff(rowsArr, colsArr) {
  const rowsMax = Math.max(...rowsArr);
  const colsMax = Math.max(...colsArr);

  const maxEl = {};
  if (rowsMax > colsMax) {
    maxEl.arrName = 'rowsArr';
    maxEl.elIndex = rowsArr.indexOf(rowsMax);
  } else {
    maxEl.arrName = 'colsArr';
    maxEl.elIndex = colsArr.indexOf(colsMax);
  }
  return maxEl;
}

//поиск разностей
function findMatrixDiffs(matrix) {
  let colsDiffs = matrix[0].map((el, index) => (
    getDiffMinEls(getColumnArray(matrix, index))
  ))
  let rowsDiffs = matrix.map((el, index) => (
    getDiffMinEls(el)
  ))
  
  return {
    colsDiffs: colsDiffs,
    rowsDiffs: rowsDiffs
  }
}

//возвращает разность двух минимальных элементов массива
function getDiffMinEls(arr) {
  let array = [...arr].sort((a, b) => a - b)
  return array.length > 1 ? array[1] - array[0] : 0;
}

//создать массив из столбца
function getColumnArray(matrix, j) {
  let arr = [];
  matrix.forEach(element => {
    arr.push(element[j]);
  });
  return arr;
}

function getClosedMatrix(matrix, storageVolume, needsVolume) {
  let currentMatrix = Array.from(matrix);

  if (storageVolume > needsVolume) {
    currentMatrix = currentMatrix.map((arr) => {
      return [...arr, 0];
    })
  } else if (storageVolume < needsVolume) {
    currentMatrix[matrix.length] = [...Array(currentMatrix[0].length)].map(() => 0);
  }
  return currentMatrix;
}

const sumArray = (arr) => {
  return arr.reduce((prev, next) => prev + next)
}

export default solveMatrix;