import c from '../constants.js';

export const changeRowsCount = (rowsCount) => ({
  type: c.CHANGE_ROWS_COUNT,
  rowsCount
});

export const changeColumnsCount = (columnsCount) => ({
  type: c.CHANGE_COLUMNS_COUNT,
  columnsCount
});

export const updateMatrix = (data) => ({
  type: c.UPDATE_MATRIX,
  data
})

export const changeNeeds = (needs) => ({
  type: c.CHANGE_NEEDS,
  needs
})

export const changeStorage = (storage) => ({
  type: c.CHANGE_STORAGE,
  storage
})

export const updateStorageVolume = (storageVolume) => ({
  type: c.GET_STORAGE_VOLUME,
  storageVolume
})

export const updateNeedsVolume = (needsVolume) => ({
  type: c.GET_NEEDS_VOLUME,
  needsVolume
})

export const updateState = (newState) => ({
  type: c.UPDATE_STATE,
  newState
})