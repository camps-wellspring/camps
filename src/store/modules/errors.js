const errors = {
  state: {
    serverErrors: null
  },
  mutations: {
    SET_SERVER_ERRORS(state, payload) {
      state.serverErrors = payload;
    },
    CLEAR_SERVER_ERRORS(state) {
      state.serverErrors = null;
    }
  },
  actions: {
    SetServerErrors({ commit }, payload) {
      return new Promise(resolve => {
        commit("SET_SERVER_ERRORS", payload);
        resolve(true);
      });
    },
    ClearServerErrors({ commit }) {
      return new Promise(resolve => {
        commit("CLEAR_SERVER_ERRORS");
        resolve(true);
      });
    }
  }
};

export default errors;
