<template>
  <!-- 引入组件 -->
  <ContentBase>
    首页
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase.vue';

// 引用组件

export default {
  name: 'HomeView',
  components: {
    // 在template会用到哪些组件就放入
    ContentBase
  }
}
</script>

<style scoped>

</style>
