<template>
  <div class="card-set">
    <slot></slot>
  </div>
</template>

<style scoped>
.card-set {
  position: relative;
  width: 1100px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

@media (max-width: 1200px) {
  .card-set {
    width: 720px;
  }
}

@media (max-width: 992px) {
  .card-set {
    width: 700px;
  }
}

@media (max-width: 768px) {
  .card-set {
    width: 100%;
    flex-direction: column;
  }
}
</style>
