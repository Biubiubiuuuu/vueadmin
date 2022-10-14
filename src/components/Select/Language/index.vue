<template>
  <el-dropdown size="mini" @command="handleSetLanguage">
    <i class="icon iconfont el-icon-dy-zhongyingwenyingwen-01" style="font-size: 25px;" />
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh">中文</el-dropdown-item>
      <el-dropdown-item command="en">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LangSelect',
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.language = lang
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message.success(this.$t('language'))
      // 重新刷新页面更改语言
      setTimeout(() => {
        location.reload()
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button--mini{
  line-height: 13px;
}
</style>
