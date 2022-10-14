<template>
  <el-dialog append-to-body :visible.sync="previewDialog" width="70%" :title="title" :before-close="handleClose" :fullscreen="fullscreenChoice">
    <iframe style="margin:0px;padding:0px;width:100%;min-height:400px;" :src="url" frameborder="0" />
  </el-dialog>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    previewDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      windowWidth: document.documentElement.clientWidth,
      fullscreenChoice: false
    }
  },
  created() {
    this.url = 'https://view.xdocin.com/view?src=' + this.url
    if (this.windowWidth < 400) {
      this.fullscreenChoice = true
    }
    this.loadPlugins()
  },
  mounted() {
    var that = this
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        that.windowWidth = window.fullWidth // 宽
        that.fullscreenChoice = false
        if (that.windowWidth < 400) {
          that.fullscreenChoice = true
        }
      })()
    }
  },
  methods: {
    handleClose() {
      const show = false
      this.$emit('hidePlugDialog', show)
    }
  }
}
</script>
