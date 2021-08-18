<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <button class="btn" @click="showToast">点击toast</button> -->
    <div id="nav" class="flex-center">
      <router-link to="/draw1" class="flex-center btn">转盘</router-link>
      <router-link to="/draw2" class="flex-center btn">九宫格</router-link>
      <router-link to="/draw3" class="flex-center btn">刮奖</router-link>
      <router-link to="/draw3" class="flex-center btn">刮奖</router-link>
    </div>
    <!-- <draw1></draw1> -->

    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import draw1 from '@/components/draw1.vue'

export default {
  name: 'Home',
  components: {
    draw1,
  },

  created(){
    
  },

  methods:{
    showToast(){
      this.$toast('提示一些信息')
    }
  }
}
</script>

<style scoped>
  .btn {
    width: 200px;
    height: 80px;
  }
</style>

