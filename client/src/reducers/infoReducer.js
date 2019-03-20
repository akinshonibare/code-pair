import { SET_ROOM_DATA, SET_USER_DATA } from "../actions/infoAction";

const initialState = {
  userData: {},
  roomData: {}
};

export function infoReducer(state = initialState, action) {
  switch (action.type) {

    case SET_USER_DATA:
      var user = action.payload;
      return { ...state, userData: user };

    case SET_ROOM_DATA:
      var room = action.payload;
      return { ...state, roomData: room };

    default:
      return state;
  }
}
