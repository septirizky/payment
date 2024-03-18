import {
  BAYAR,
  GET_BANK,
  GET_USER,
  LOGIN,
  REGISTER,
  TOPUP,
  TRANSAKSI,
} from "../../Actions/actions";

const initialState = {
  registerResult: false,
  registerLoading: false,
  registerError: false,

  loginResult: false,
  loginLoading: false,
  loginError: false,

  getBankResult: false,
  getBankLoading: false,
  getBankError: false,

  getUserResult: false,
  getUserLoading: false,
  getUserError: false,

  topUpResult: false,
  topUpLoading: false,
  topUpError: false,

  getTransaksiResult: false,
  getTransaksiLoading: false,
  getTransaksiError: false,

  bayarResult: false,
  bayarLoading: false,
  bayarError: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        registerResult: action.payload.data,
        registerLoading: action.payload.loading,
        registerError: action.payload.errorMessage,
      };

    case LOGIN:
      return {
        ...state,
        loginResult: action.payload.data,
        loginLoading: action.payload.loading,
        loginError: action.payload.errorMessage,
      };

    case GET_BANK:
      return {
        ...state,
        getBankResult: action.payload.data,
        getBankLoading: action.payload.loading,
        getBankError: action.payload.errorMessage,
      };

    case GET_USER:
      return {
        ...state,
        getUserResult: action.payload.data,
        getUserLoading: action.payload.loading,
        getUserError: action.payload.errorMessage,
      };

    case TOPUP:
      return {
        ...state,
        topUpResult: action.payload.data,
        topUpLoading: action.payload.loading,
        topUpError: action.payload.errorMessage,
      };

    case TRANSAKSI:
      return {
        ...state,
        getTransaksiResult: action.payload.data,
        getTransaksiLoading: action.payload.loading,
        getTransaksiError: action.payload.errorMessage,
      };

    case BAYAR:
      return {
        ...state,
        bayarResult: action.payload.data,
        bayarLoading: action.payload.loading,
        bayarError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default UserReducer;
