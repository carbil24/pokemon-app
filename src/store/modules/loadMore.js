const pagination = {
  namespaced: true,
  state: {
    showScrollTop: true,
  },
  mutations: {
    SET_SHOW_SCROLL_TOP(state, showScrollTop) {
      state.showScrollTop = showScrollTop;
    },
  },
  actions: {
    onScroll({ commit }) {
      commit("SET_SHOW_SCROLL_TOP", window.scrollY < 1000);
    },
  },
};
export default pagination;
