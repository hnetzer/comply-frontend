const CREATE_ACCOUNT_RESPONSE = "CREATE_ACCOUNT_RESPONSE";

const createAccountResponse = (data) => {
  return {
    type: CREATE_ACCOUNT_RESPONSE,
    data: data
  }
}

export {
  createAccountResponse,
}
