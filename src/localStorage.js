export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {

  // whitelist the reducers we want to cache
  const stateToStore = {
    auth: state.auth,
  }

  try {
    const serializedState = JSON.stringify(stateToStore);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
