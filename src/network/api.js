const BASE_URI = 'http://localhost:8080';

export const createAccount = async (data) => {
  try {
    const settings = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    let response = await fetch(`${BASE_URI}/account`, settings);
    let json = await response.json()

    // Check response to make sure it was successful
    if (response.status !== 200) {
      throw Error(json.message)
    }

    return json;
  }
  catch (err) {
    throw Error(err);
  }
}


export default {
  BASE_URI,
  createAccount,
}
