<!--
 * @Author: liuchenxi
 * @Date: 2021-09-28 16:17:30
 * @LastEditTime: 2021-10-20 14:11:35
 * @LastEditors: Please set LastEditors
 * @Description: 项目首页
 * @FilePath: \widget-vue2\src\pages\Home.vue
-->
<template>
  <div class="home-wrapper">
    <header>Widget-vue2</header>
    <section>
      <div class="card">1</div>
      <div class="card">2</div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    // this.sockets.subscribe('heartBeat', (data) => {
    //   console.log('heartBeat', data)
    // })
    this.sockets.subscribe('index', (data) => {
      console.log('index', data)
    })
    setTimeout(() => {
      this.$socket.emit('index', 'Hello Server')
    }, 1000 * 8)
  }
}
</script>

<style lang="scss" scoped>
.home-wrapper {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #614385, #516395);

  header {
    width: 100%;
    height: 200px;
    text-align: center;
    line-height: 200px;
    font-size: 36px;
    font-weight: bold;
    color: #fff;
    font-family: BORN, Helvetica, Arial, sans-serif;
  }
  section {
    width: 100%;
    height: calc(100% - 300px);
    display: flex;
    padding: 0 15%;
    flex-wrap: wrap;
    .card {
      width: 200px;
      height: 200px;
      background: #fff;
      border-radius: 12px;
      margin: 0 24px;
      box-shadow: #9c9fa7;
    }
  }
}
</style>
