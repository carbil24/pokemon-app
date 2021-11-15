<template>
  <div class="card">
    <div class="imgBx" :data-text="pokemon.name">
      <img :src="pokemon.image" alt="" width="144" height="144" />
    </div>
    <div class="content">
      <div>
        <h3>{{ pokemon.name }}</h3>
        <p>Height: {{ pokemon.height }} dm</p>
        <p>Weight: {{ pokemon.weight }} hg</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { pokemon: {} },
};
</script>

<style scoped>
.card {
  position: relative;
  height: 200px;
  border: solid 1px #333;
  background: #fff;
  box-shadow: 0px 9px 16px 3px rgb(0 0 0 /30%), 0px 9px 16px 3px rgb(0 0 0 /30%);
  display: flex;
  width: 30%;
  margin: 30px 0;
  cursor: pointer;
}

.card .imgBx {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: 0.5s ease-in-out;
}

.card:hover .imgBx {
  width: 50%;
  height: 100%;
  left: 0;
  top: 0;
  background: #333;
  font-size: 0;
  transition: 0.5s ease-in-out;
}

.card .imgBx:before {
  content: attr(data-text);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 3em;
  color: rgba(0, 0, 0, 0.25);
  font-weight: 700;
}

.card .imgBx img {
  transition: 0.5s ease-in-out;
  left: 0;
  top: 0;
}

.card .content {
  position: absolute;
  width: 50%;
  height: 100%;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card .content h3 {
  margin-bottom: 5px;
  font-size: 24px;
}

@media (max-width: 1200px) {
  .card {
    width: 320px;
  }
}

@media (max-width: 576px) {
  .card {
    width: 260px;
    flex-direction: column;
    height: auto;
  }

  .card .imgBx {
    position: relative;
  }

  .card .imgBx,
  .card:hover .imgBx {
    width: 100%;
    height: 200px;
    left: 0;
    font-size: 0;
    border-radius: 0;
  }

  .card .content {
    position: relative;
    width: 100%;
    height: 100px;
    right: 0;
    justify-content: center;
  }
}
</style>
