import BookConstants from '../constants/BookConstants';


export function reducer(state = {}, action = {}) {
  switch (action.type) {
    case BookConstants.CATEGORIES_LOADED:
      return { ...state, categories: action.categories };
      break;

    case BookConstants.BOOK_LOADED:
      return { ...state, photos: action.book };
      break;

    default:
      return state;
  }
}