export const initialState = {
  user: null,
  message: [],
};

export const actionTypes = {
  SET_USER: "SET_USER",
  UPDATE_MESSAGE: "UPDATE_MESSAGE",
  SET_MESSAGE: "SET_MESSAGE",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case actionTypes.UPDATE_MESSAGE:
      return {};
    default:
      return state;
  }
};

export default reducer;
