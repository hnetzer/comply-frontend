export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    const state = JSON.parse(serializedState);

    if (window.FS) {
      // Send the user info to full story
      const FS = window.FS;
      const user = state.auth.user
      FS.identify(user.id, {
        displayName: `${user.first_name} ${user.last_name}`,
        email: user.email,
      })
    }

    return state;
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
