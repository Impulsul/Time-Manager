const state = {
    backendURL: process.env.VUE_APP_BACKEND_URL,
    appTitle: process.env.VUE_APP_TITLE
  };
  
  const getters = {
    backendURL: (state) => state.backendURL,
    appTitle: (state) => state.appTitle,
  };
  
  export default {
    state,
    getters,
  };
  