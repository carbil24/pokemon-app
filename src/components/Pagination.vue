<template>
  <div class="pagination">
    <div>
      <select v-model="limitPerPage">
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="18">18</option>
        <option value="24">24</option>
        <option value="30">30</option>
      </select>
      <span> per page </span>
    </div>
    <ul>
      <li>
        <router-link
          v-if="parseInt($route.query.page) > 1"
          :to="{
            query: {
              page: parseInt($route.query.page) - 1,
              limit: limitPerPage,
            },
          }"
          class="arrow-left"
        />
        <div v-else class="number-box arrow-left disabled" />
      </li>
      <li v-for="(item, idx) in pages" :key="idx">
        <div v-if="!item" class="number-box dots" />
        <router-link
          v-else
          :class="{ active: item === parseInt($route.query.page) }"
          :to="{ query: { page: item, limit: limitPerPage } }"
          >{{ item }}</router-link
        >
      </li>
      <li>
        <router-link
          v-if="parseInt($route.query.page) < paginationLength"
          :to="{
            query: {
              page: parseInt($route.query.page) + 1,
              limit: limitPerPage,
            },
          }"
          class="arrow-right"
        />
        <div v-else class="number-box arrow-right disabled" />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const paginationLength = computed(
      () => store.getters["pagination/getPaginationLength"]
    );
    const pages = computed(() =>
      store.getters["pagination/getPages"](route.query.page)
    );

    const limitPerPage = computed({
      get: () => store.state.pagination.limitPerPage,
      set: (value) => {
        const page = 1;
        const limit = parseInt(value);
        router.push({ query: { page, limit } });
        store.dispatch("pagination/updatePagination", limit);
      },
    });

    return { limitPerPage, pages, paginationLength };
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 0;
}

ul {
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;
  background: #fff;
  border-radius: 25px;
}

ul li {
  list-style: none;
}

ul li a,
.number-box {
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 0.9em;
  background: #fff;
  color: #262626;
  text-decoration: none;
  border-radius: 4px;
  margin: 5px;
  box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
}

.dots::before {
  content: "...";
}

.arrow-left {
  border-radius: 20px 0 0 20px;
}

.arrow-left:before {
  content: "<";
}

.arrow-left.disabled,
.arrow-right.disabled {
  opacity: 0.2;
}

.arrow-right {
  border-radius: 0 20px 20px 0;
}

.arrow-right:before {
  content: ">";
}

.active {
  background: #333;
  color: blanchedalmond;
}

ul li a:hover {
  background: rgb(146, 145, 145);
  color: blanchedalmond;
}

select {
  position: relative;
  padding: 15px;
  margin: 0 10px;
  border: none;
  border-right: 10px solid #fff;
  text-align: center;
  outline: none;
  width: 100px;
  border-radius: 25px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

@media (max-width: 992px) {
  ul li a,
  .number-box {
    width: 30px;
    height: 30px;
    font-size: 0.75em;
    line-height: 30px;
  }

  select {
    padding: 15px;
    margin: 0 10px;
    width: 80px;
    height: 45px;
  }
}

@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
    align-items: center;
  }

  ul li a,
  .number-box {
    width: 20px;
    height: 20px;
    font-size: 0.75em;
    line-height: 20px;
  }

  select {
    padding: 5px;
    margin: 0 10px;
    width: 60px;
    height: 25px;
    margin-bottom: 20px;
  }
}
</style>
