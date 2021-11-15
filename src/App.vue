<template>
  <div class="app-container">
    <div id="nav">
      <router-link to="/">Navigation 1</router-link>
      <router-link to="/paginated/?page=1&limit=6">Navigation 2</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  background: #fff;
}
</style>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
}
#nav {
  position: relative;
  display: flex;
  background: #fff;
  width: 300px;
  border-radius: 30px;
  overflow: hidden;
  margin-top: 20px;
  border: 2px solid black;
  padding: 0;
  margin-bottom: 50px;
}

#nav a {
  display: block;
  padding: 20px;
  width: 50%;
  text-align: center;
  color: #333;
  transition: 0.5s;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  background: #333;
  color: #fff;
}

@media (max-width: 768px) {
  #nav {
    width: 220px;
    font-size: 0.7em;
  }
}
</style>
