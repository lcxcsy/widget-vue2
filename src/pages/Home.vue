<!--
 * @Author: liuchenxi
 * @Date: 2021-09-28 16:17:30
 * @LastEditTime: 2021-09-28 17:36:06
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
  name: "Home",
  setup () {

    return {}
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
      box-shadow: #516395;
    }
  }
}
</style>