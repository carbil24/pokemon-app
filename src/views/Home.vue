<template>
  <div v-if="list.length > 0">
    <CardSet>
      <Card v-for="(item, idx) in list" :key="`poke${idx}`" :pokemon="item" />
    </CardSet>
    <LoadMore />
  </div>
  <LoadingSpinner v-else />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CardSet from "../components/CardSet.vue";
import Card from "../components/Card.vue";
import LoadMore from "../components/LoadMore.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default {
  components: { CardSet, Card, LoadMore, LoadingSpinner },
  setup() {
    const store = useStore();
    const list = computed(() => store.getters["pokemons/getList"]);
    computed(store.dispatch("pokemons/initialLoad"));

    return { list };
  },
};
</script>
