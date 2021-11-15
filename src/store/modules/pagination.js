const pagination = {
  namespaced: true,
  state: {
    limitPerPage: 6,
    pages: [],
  },
  getters: {
    getPaginationLength: (state) => state.pages.length,
    getPages: (state) => (page) => {
      if (state.pages.length > 5) {
        if (page < 5) {
          const content = [...state.pages].splice(0, 5);
          return [...content, false, state.pages.length];
        } else if (page > state.pages.length - 4) {
          const content = [...state.pages].splice(state.pages.length - 5, 5);
          return [state.pages[0], false, ...content];
        } else {
          const content = [...state.pages].splice(page - 2, 3);
          return [state.pages[0], false, ...content, false, state.pages.length];
        }
      }
      return state.pages;
    },
  },
  mutations: {
    SET_LIMIT_PER_PAGE(state, limitPerPage) {
      state.limitPerPage = limitPerPage;
    },
    SET_PAGES(state, pages) {
      state.pages = [...pages];
    },
  },
  actions: {
    updatePagination({ commit }, limit) {
      const pages = [];
      for (
        let i = 0;
        i < Math.ceil(process.env.VUE_APP_API_MAXIMUM_CALLS / limit);
        i++
      ) {
        pages.push(i + 1);
      }

      commit("SET_LIMIT_PER_PAGE", limit);
      commit("SET_PAGES", pages);
    },
  },
};
export default pagination;
