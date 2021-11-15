import { API } from "../../api/pokemons.api";

const pokemons = {
  namespaced: true,
  state: {
    list: [],
    masterList: [],
    next: null,
  },
  getters: {
    getList: (state) =>
      state.list.map((el) => ({
        id: el.id,
        name: el.name[0].toUpperCase() + el.name.substring(1),
        height: el.height,
        weight: el.weight,
        image: el.sprites.front_shiny,
      })),
    getListLength: (state) => state.list.length,
  },
  mutations: {
    SET_LIST(state, data) {
      state.list = [...data];
    },
    SET_MASTER_LIST(state, data) {
      state.masterList.push(data);
    },
    SET_NEXT(state, next) {
      state.next = next;
    },
  },
  actions: {
    async initialLoad({ commit, dispatch }) {
      try {
        commit("SET_NEXT", null);
        commit("SET_LIST", []);

        const response = await API.getDataByQuery(30, 0);
        dispatch("populateLists", {
          type: "notPaginated",
          data: response.data.results,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async loadMore({ commit, dispatch, state }, url) {
      try {
        let response;
        if (state.list.length < process.env.VUE_APP_API_MAXIMUM_CALLS) {
          if (url) {
            response = await API.getDataByUrl(url);
            dispatch("populateLists", {
              type: "notPaginated",
              data: response.data.results,
            });
          } else {
            response = await API.getDataByQuery(15, 30);
            dispatch("populateLists", {
              type: "notPaginated",
              data: response.data.results,
            });
          }
          commit("SET_NEXT", response.data.next);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async loadByQuery({ dispatch }, { limit, page }) {
      try {
        const offset = limit * page - limit;
        if (offset >= 0 && offset < process.env.VUE_APP_API_MAXIMUM_CALLS) {
          const limitPerPage =
            limit * page < process.env.VUE_APP_API_MAXIMUM_CALLS
              ? limit
              : process.env.VUE_APP_API_MAXIMUM_CALLS - offset;

          const response = await API.getDataByQuery(limitPerPage, offset);
          dispatch("populateLists", {
            type: "paginated",
            data: response.data.results,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async populateLists({ commit, state }, { type, data }) {
      try {
        const list = [];
        for (const el of data) {
          const pokemonExists = state.masterList.find(
            (item) => item.name === el.name
          );
          if (!pokemonExists) {
            const response = await API.getDataByUrl(el.url);
            list.push(response.data);
            commit("SET_MASTER_LIST", response.data);
          } else {
            list.push(pokemonExists);
          }
        }

        if (type === "paginated") commit("SET_LIST", list);
        else commit("SET_LIST", [...state.list, ...list]);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
export default pokemons;
