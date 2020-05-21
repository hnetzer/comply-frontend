const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";
const ONBOARDED = "ONBOARDED";

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
      company: data.company,
      token: data.token
    }
  }
}

const onboarded = () => {
  return {
    type: ONBOARDED
  }
}

export {
  logout,
  login,
  onboarded
}
