<template>
  <div id="app">
    <router-link to="/about">about</router-link>
    <router-view />
  </div>
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    padding: 10px 20px;
    border-radius: 10px;
    /* background-color: green; */
    color: #fff;
    font-size: 18px;
    text-decoration: none;
  }
</style>