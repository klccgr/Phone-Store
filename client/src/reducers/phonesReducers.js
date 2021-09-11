import {
  PHONES_UPDATE_REQUEST,
  PHONES_UPDATE_SUCCESS,
  PHONES_UPDATE_FAIL,
  PHONES_CREATE_FAIL,
  PHONES_CREATE_REQUEST,
  PHONES_CREATE_SUCCESS,
  PHONES_DELETE_FAIL,
  PHONES_DELETE_REQUEST,
  PHONES_DELETE_SUCCESS,
  PHONES_LIST_FAIL,
  PHONES_LIST_REQUEST,
  PHONES_LIST_SUCCESS,
} from "../constants/phonesConstants";

export const phoneListReducer = (state = { phones: [] }, action) => {
  switch (action.type) {
    case PHONES_LIST_REQUEST:
      return { loading: true };
    case PHONES_LIST_SUCCESS:
      return { loading: false, phones: action.payload };
    case PHONES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const phoneCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PHONES_CREATE_REQUEST:
      return { loading: true };
    case PHONES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PHONES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const phoneDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PHONES_DELETE_REQUEST:
      return { loading: true };
    case PHONES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PHONES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const phoneUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PHONES_UPDATE_REQUEST:
      return { loading: true };
    case PHONES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PHONES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
