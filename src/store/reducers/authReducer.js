import { getUserFromStorage } from "../actions/sharedActions";

const _initUser = getUserFromStorage();

const initState = {
  UserID: _initUser.UserID,
  Access_Token: _initUser.Access_Token,
  Refresh: _initUser.Refresh,
  ExpiryTime: _initUser.ExpiryTime,
  //
  UserName: _initUser.UserName,
  FullName: _initUser.FullName,
  FunctionSettings: _initUser.FunctionSettings,
};

export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return {
        ...state,
        UserID: payload.UserID,
        Access_Token: payload.Access_Token,
        Refresh: payload.Refresh,
        ExpiryTime: payload.ExpiryTime,
        //
        UserName: payload.UserName,
        FullName: payload.FullName,
        FunctionSettings: payload.FunctionSettings,
      };
    case "CLEAR_USER":
      return {
        ...state,
        UserID: 0,
        Access_Token: "",
        Refresh: "",
        ExpiryTime: null,
        UserName: "",
        FullName: null,
        FunctionSettings: [],
      };
    case "RESET_TOKEN":
      return {
        ...state,
        Access_Token: payload.Access_Token,
        Refresh: payload.Refresh,
        ExpiryTime: payload.ExpiryTime,
      };
    default:
      return state;
  }
};
