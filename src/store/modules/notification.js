const notification = {
  state: {
    snackbar: {
      visible: false,
      text: null,
      timeout: 5000,
      multiline: false,
      color: ""
    }
  },

  mutations: {
    SHOW(state, payload) {
      state.snackbar.text = payload.text;
      state.snackbar.color = payload.color;
      state.snackbar.visible = true;
    },
    CLOSE(state) {
      state.snackbar.visible = false;
      state.snackbar.text = null;
    }
  },

  actions: {
    ShowNotification({ commit }, payload) {
      console.log("Show Notification");
      commit("SHOW", payload);
    },
    CloseNotification({ commit }) {
      console.log("Close Notification");
      commit("CLOSE");
    }
  }
};

export default notification;
