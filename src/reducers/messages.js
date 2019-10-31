import * as types from '../constants/ActionTypes';

const messages = (state = [], action) => {
  const { type } = action;
  switch(type) {
    case types.ADD_MESSAGE:
    case types.MESSAGE_RECIEVED:
      return state.concat([
        {
          message: action.message,
          author: action.author,
          id: action.id
        }
      ])
    default:
      return state;
  }
}

export default messages;
