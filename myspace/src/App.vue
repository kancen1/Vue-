<template>
  <!-- 使用组件 -->
   <NavBar></NavBar>
   
   <!-- :key="$route.fullPath" 用完整路径判断重复 -->
  <router-view :key="$route.fullPath"/>
</template>

<script>
// 引入导航栏
import NavBar from './components/NavBar.vue';

export default {
  name: "APP",
  // 当使用组件时候需要引入
  components: {
    NavBar,
  }
}
</script>

<style>

</style>
  