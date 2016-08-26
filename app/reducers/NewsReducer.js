import NewsConstants from '../constants/NewsConstants';
import NoteConstants from '../constants/NoteConstants';


export function reducer(state = {}, action = {}) {
  switch (action.type) {
    case NewsConstants.LOAD:
      // return { ...state, news: action.news };
      break;

    case NewsConstants.LOADED:
      return { ...state, news: action.news };
      break;

    case NoteConstants.NOTE_LOAD:
      return { ...state, note: action.note };
      break;

    default:
      return state;
  }
}