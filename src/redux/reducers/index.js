import { ActionTypes } from "../constants/action-types";
const intialState = {
  id: "",
  title: "",
  data: [],
  isCheck: false,
  isFocus: false,
  logs: [],
};

export const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_DATA:
      return { ...state, data: action.payload };
    case ActionTypes.DEFAULT_INPUT:
      return { ...state, isCheck: false, isFocus: false };
    case ActionTypes.CHANGE_INPUT:
      return { ...state, title: action.payload, isFocus: true };
    case ActionTypes.ADD_INPUT:
      return {
        ...state,
        data: [...state.data, action.payload],
        title: "",
        isFocus: false,
      };
    case ActionTypes.SELECT_INPUT:
      return {
        ...state,
        title: action.payload.title,
        id: action.payload.id,
        isCheck: true,
        isFocus: true,
      };
    case ActionTypes.DELETE_INPUT:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
        title: "",
        id: "",
        isCheck: false,
        isFocus: false,
      };
    case ActionTypes.UPDATE_INPUT:
      return {
        ...state,
        data: state.data.map((item) => {
          return item.id === action.payload.id ? action.payload : item;
        }),
        isCheck: false,
        isFocus: false,
        title: "",
        id: "",
      };

    case ActionTypes.ADD_LOGS:
      return {
        ...state,
        logs: [...state.logs, { title: `${action.message} ${action.payload}` }],
      };

    default:
      return state;
  }
};
