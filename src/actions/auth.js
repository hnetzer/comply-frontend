const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";
const ONBOARDED = "ONBOARDED";
const UPDATE_USER_SETTINGS = "UPDATE_USER_SETTINGS";
const UPDATE_USER_COMPANIES = "UPDATE_USER_COMPANIES";

const logout = (data) => {
  return {
    type: LOGOUT,
  }
}

const setLogin = (data) => {
  return {
    type: LOGIN,
    data: {
      user: data.user,
      company: data.company,
      companies: data.companies,
      token: data.token
    }
  }
}

const onboarded = () => {
  return {
    type: ONBOARDED
  }
}

const updateUserSettings = (settings) => {
  return {
    type: UPDATE_USER_SETTINGS,
    data: settings
  }
}

const updateUserCompanies = (companies) => {
  return {
    type: UPDATE_USER_COMPANIES,
    data: companies
  }
}

export {
  logout,
  setLogin,
  onboarded,
  updateUserSettings,
  updateUserCompanies
}
