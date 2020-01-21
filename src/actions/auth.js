const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";

const logout = (data) => {
  return {
    type: LOGOUT,
  }
}

const login = (data) => {
  return {
    type: LOGIN,
    data: {
      user: data.user,
      token: data.token
    }
  }
}

export {
  logout,
  login
}
