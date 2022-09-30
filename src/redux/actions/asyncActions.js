import { ActionTypes } from "../constants/action-types";
import axios from "axios";
export const fetchData = () => {
  return async function (dispatch, getState) {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1/todos?id=1&id=2"
    );

    dispatch({ type: ActionTypes.FETCH_DATA, payload: res.data });
  };
};

export const changeInput = (value) => {
  return function (dispatch) {
    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: value });
  };
};

export const addInput = (value) => {
  return function (dispatch) {
    dispatch({ type: ActionTypes.ADD_INPUT, payload: value });
    dispatch({
      type: ActionTypes.ADD_LOGS,
      payload: value.title,
      message: "เพิ่มข้อมูล",
    });
  };
};

export const selectInput = (value) => {
  return function (dispatch) {
    dispatch({ type: ActionTypes.SELECT_INPUT, payload: value });
  };
};

export const deleteInput = (value) => {
  return async function (dispatch) {
    dispatch({ type: ActionTypes.DELETE_INPUT, payload: value.id });

    dispatch({
      type: ActionTypes.ADD_LOGS,
      payload: value.title,
      message: "ลบข้อมูล",
    });
  };
};

export const updateInput = (value) => {
  return async function (dispatch, getState) {
    dispatch({ type: ActionTypes.UPDATE_INPUT, payload: value });
    dispatch({
      type: ActionTypes.ADD_LOGS,
      payload: value.title,
      message: "อัพเดทข้อมูล",
    });
  };
};
