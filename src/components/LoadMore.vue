<template>
  <div class="load-more-container">
    <button
      class="scroll-top"
      @click="scrollTopHandler"
      :class="{ active: !showScrollTop }"
    >
      Top
    </button>
    <span> {{ current }} of {{ total }} </span>
    <button
      v-if="current !== parseInt(total)"
      class="load-more"
      @click="loadMoreHandler"
    >
      Load More
    </button>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const next = computed(() => store.state.pokemons.next);
    const current = computed(() => store.getters["pokemons/getListLength"]);
    const total = ref(process.env.VUE_APP_API_MAXIMUM_CALLS);
    const showScrollTop = computed(() => store.state.loadMore.showScrollTop);

    onMounted(() => {
      window.addEventListener("scroll", () =>
        store.dispatch("loadMore/onScroll")
      );
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", () =>
        store.dispatch("loadMore/onScroll")
      );
    });

    const scrollTopHandler = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const loadMoreHandler = () => {
      computed(store.dispatch("pokemons/loadMore", next.value));
    };

    return {
      loadMoreHandler,
      scrollTopHandler,
      showScrollTop,
      current,
      total,
    };
  },
};
</script>

<style scoped>
.load-more-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 120px;
}

.load-more {
  display: block;
  width: 120px;
  height: 50px;
  text-align: center;
  font-size: 1em;
  background: #333;
  color: blanchedalmond;
  border-radius: 25px;
  cursor: pointer;
  margin: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}

.scroll-top {
  position: fixed;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #333;
  color: blanchedalmond;
  cursor: pointer;
  z-index: 100000;
  visibility: hidden;
  opacity: 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: 0.5s;
}
.load-more:hover,
.scroll-top:hover {
  background: #fff;
  color: #262626;
}

.scroll-top.active {
  visibility: visible;
  opacity: 1;
}
</style>
