<template>
  <div v-if="list.length > 0">
    <Pagination />
    <CardSet>
      <Card v-for="(item, idx) in list" :key="`poke${idx}`" :pokemon="item" />
    </CardSet>
    <Pagination />
  </div>
  <LoadingSpinner v-else />
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import CardSet from "../components/CardSet.vue";
import Card from "../components/Card.vue";
import Pagination from "../components/Pagination.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  components: { CardSet, Card, Pagination, LoadingSpinner },
  setup() {
    const store = useStore();
    const route = useRoute();
    const list = computed(() => store.getters["pokemons/getList"]);

    computed(store.dispatch("pagination/updatePagination", route.query.limit));
    computed(
      store.dispatch("pokemons/loadByQuery", {
        limit: route.query.limit,
        page: route.query.page,
      })
    );

    watch(
      () => route.query,
      () =>
        store.dispatch("pokemons/loadByQuery", {
          limit: route.query.limit,
          page: route.query.page,
        })
    );

    return { list };
  },
};
</script>
