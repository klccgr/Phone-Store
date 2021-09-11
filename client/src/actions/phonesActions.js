import {
  PHONES_CREATE_FAIL,
  PHONES_CREATE_REQUEST,
  PHONES_CREATE_SUCCESS,
  PHONES_DELETE_FAIL,
  PHONES_DELETE_REQUEST,
  PHONES_DELETE_SUCCESS,
  PHONES_LIST_FAIL,
  PHONES_LIST_REQUEST,
  PHONES_LIST_SUCCESS,
  PHONES_UPDATE_FAIL,
  PHONES_UPDATE_REQUEST,
  PHONES_UPDATE_SUCCESS,
} from "../constants/phonesConstants";
import axios from "axios";

export const listPhones = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHONES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/phones`, config);

    dispatch({
      type: PHONES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PHONES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createPhoneAction =
  (brand, price, model, opsys, pic) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PHONES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/phones/create`,
        { brand, model, price, opsys, pic },
        config
      );

      dispatch({
        type: PHONES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PHONES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deletePhoneAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHONES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/phones/${id}`, config);

    dispatch({
      type: PHONES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PHONES_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updatePhoneAction =
  (id, brand, model, price, opsys, pic) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PHONES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/phones/${id}`,
        { brand, price, model, opsys, pic },
        config
      );

      dispatch({
        type: PHONES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PHONES_UPDATE_FAIL,
        payload: message,
      });
    }
  };
