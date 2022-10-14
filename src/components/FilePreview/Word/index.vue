<template>
  <el-dialog append-to-body :visible.sync="previewDialog" width="70%" :title="title" :before-close="handleClose" :fullscreen="fullscreenChoice">
    <div ref="file" />
  </el-dialog>
</template>

<script>
import axios from 'axios'
const docx = require('docx-preview')
window.JSZip = require('jszip')
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
      fullscreenChoice: false,
      windowWidth: document.documentElement.clientWidth
    }
  },
  created() {
    if (this.windowWidth < 400) {
      this.fullscreenChoice = true
    }
  },
  mounted() {
    axios({
      method: 'get',
      responseType: 'blob', // 设置响应文件格式
      url: this.url
    }).then(({ data }) => {
      docx.renderAsync(data, this.$refs.file) // 渲染到页面预览
    })
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
