<template>
  <div class="notFound">
    <span class="code">404</span>
    <el-link type="primary" @click="goHome">Home</el-link>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  methods: {
    goHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.notFound {
  height: 100%;
  display: flex;
  background: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.code {
  display: inline-block;
  font-size: 200px;
  color: #d9d9d9;
}
</style>
