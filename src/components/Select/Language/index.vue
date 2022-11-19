<template>
  <el-dropdown size="mini" :is-background="isBackground" @command="handleSetLanguage">
    <i :class=" language==='en'? 'icon iconfont el-icon-dy-zhongyingwenyingwen-01':'icon iconfont el-icon-dy-zhongyingwen2zhongwen'" :style="isBackground?'font-size: 25px;color:black;':'font-size: 25px;'" />
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" style="font-size: 14px;">中文</el-dropdown-item>
      <el-dropdown-item command="en" style="font-size: 14px;">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'LangSelect',
  props: {
    isBackground: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message.success(this.$t('language'))
      // 重新刷新页面更改语言
      setTimeout(() => {
        this.language = lang
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
