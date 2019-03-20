export const SET_ROOM_DATA = "SET_ROOM_DATA";
export const SET_USER_DATA = "SET_USER_DATA";

export function setRoomData(data) {
  return { type: SET_ROOM_DATA, payload: data };
}

export function setUserData(data) {
  return { type: SET_USER_DATA, payload: data };
}