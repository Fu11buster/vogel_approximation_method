import c from '../constants';

const solve = (state = {}, {type, storageVolume, needsVolume, newState}) => {
  switch(type) {
    case c.GET_STORAGE_VOLUME:
      return {
        ...state,
        storageVolume,
      };
    case c.GET_NEEDS_VOLUME:
      return {
        ...state,
        needsVolume
      };
    case c.UPDATE_STATE:
      return {
        ...state,
        ...newState
      }
    
      default:
        return state;
  }
}

export default solve;