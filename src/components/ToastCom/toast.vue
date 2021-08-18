<!--  -->
<template>
  <!-- <div v-show="visible">{{msg}}</div> -->
  <div class="wrap" v-if="visible" :class="showContent ?'fadein':'fadeout'">{{msg}}</div>
</template>

<script>
export default {

  components: {},

  computed: {},
}

</script>
<style lang='scss' scoped>
  .wrap{
    position: fixed;
    left: 50%;
    top:50%;
    background: rgba(0,0,0,.35);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
  }
  .fadein {
    animation: animate_in 0.25s;
  }
  .fadeout {
    animation: animate_out 0.25s;
    opacity: 0;
  }
  @keyframes animate_in {
    0% {
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes animate_out {
    0% {
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
</style>