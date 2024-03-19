import axios from "axios";
import Cookies from "js-cookie";

export const LOGIN = "LOGIN";
export const REGISTER = "REGISTER";
export const GET_USER = "GET_USER";
export const GET_BANK = "GET_BANK";
export const TOPUP = "TOPUP";
export const TRANSAKSI = "TRANSAKSI";
export const BAYAR = "BAYAR";

export const RegisterUsers = (data) => {
  return async (dispatch) => {
    dispatch({
      type: REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:3200/register",
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: REGISTER,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const LoginUsers = (data) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:3200/login",
      data: data,
      timeout: 120000,
    })
      .then((res) => {
        sessionStorage.setItem("userdata", JSON.stringify(res.data));
        Cookies.set("Authorization", res.data.token);
        // console.log(res.data.data);
        console.log(res.data.token);
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const getUser = (user_id) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      url: "http://localhost:3200/users/" + user_id,
      headers: {
        Authorization: Cookies.get("Authorization"),
      },
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: GET_USER,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const getBank = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_BANK,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //getAPI
    axios({
      method: "GET",
      url: "http://localhost:3200/bank",
      headers: {
        Authorization: Cookies.get("Authorization"),
      },
      timeout: 120000,
    })
      .then((response) => {
        //berhasil get API
        dispatch({
          type: GET_BANK,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal get API
        dispatch({
          type: GET_BANK,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const topUp_Saldo = (data, user_id) => {
  return async (dispatch) => {
    dispatch({
      type: TOPUP,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "PUT",
      url: "http://localhost:3200/users/" + user_id,
      headers: {
        Authorization: Cookies.get("Authorization"),
      },
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: TOPUP,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: TOPUP,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const getTransaksi = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: TRANSAKSI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    axios({
      method: "GET",
      url: "http://localhost:3200/transaksi",
      headers: {
        Authorization: Cookies.get("Authorization"),
      },
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: TRANSAKSI,
          payload: {
            loading: false,
            data: response.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: TRANSAKSI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};

export const transfer = (data) => {
  return async (dispatch) => {
    dispatch({
      type: BAYAR,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    await axios({
      method: "PUT",
      url: "http://localhost:3200/transaksi/" + data.user_id,
      headers: {
        Authorization: Cookies.get("Authorization"),
      },
      data: data,
      timeout: 120000,
    })
      .then((response) => {
        dispatch({
          type: BAYAR,
          payload: {
            loading: false,
            data: response.data.message,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: BAYAR,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.response.data.message,
          },
        });
      });
  };
};
