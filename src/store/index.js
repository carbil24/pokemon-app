import { createStore } from "vuex";
import { pokemons, pagination, loadMore } from "./modules";

export default createStore({
  modules: { pokemons, pagination, loadMore },
});
