<template>
  <el-dialog append-to-body :visible.sync="previewDialog" width="70%" :title="title" :before-close="handleClose" :fullscreen="fullscreenChoice">
    <div id="luckysheet" style="margin:0px;padding:0px;width:100%;min-height:400px;" />
  </el-dialog>
</template>

<script>
import { asynLoad } from '@/utils/excel'
import LuckyExcel from 'luckyexcel'

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
    this.loadPlugins()
    if (this.windowWidth < 400) {
      this.fullscreenChoice = true
    }
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
    loadPlugins() {
      const baseURL = '//cdn.jsdelivr.net/npm/luckysheet@latest/dist'
      Promise.all([
        asynLoad(`${baseURL}/plugins/css/pluginsCss.css`, true),
        asynLoad(`${baseURL}/plugins/plugins.css`, true),
        asynLoad(`${baseURL}/css/luckysheet.css`, true),
        asynLoad(`${baseURL}/assets/iconfont/iconfont.css`, true),
        asynLoad(`${baseURL}/plugins/js/plugin.js`),
        asynLoad(`${baseURL}/luckysheet.umd.js`)
      ])
        .then(() => {
          this.loadExcel()
        })
        .catch(() => {})
    },
    loadExcel() {
      LuckyExcel.transformExcelToLuckyByUrl(this.url, this.name, (exportJson, luckysheetfile) => {
        if (exportJson.sheets == null || exportJson.sheets.length === 0) {
          this.$message.warning('excel预览失败')
          return
        }
        // 销毁原来的表格
        window.luckysheet.destroy()
        // 重新创建新表格
        window.luckysheet.create({
          container: 'luckysheet', // 设定DOM容器的id
          showtoolbar: false, // 是否显示工具栏
          showinfobar: false, // 是否显示顶部信息栏
          showstatisticBar: false, // 是否显示底部计数栏
          sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
          allowEdit: false, // 是否允许前台编辑
          enableAddRow: false, // 是否允许增加行
          enableAddCol: false, // 是否允许增加列
          sheetFormulaBar: false, // 是否显示公式栏
          enableAddBackTop: false, // 返回头部按钮
          data: exportJson.sheets, // 表格内容
          title: exportJson.info.name // 表格标题
        })
      })
    },
    handleClose() {
      const show = false
      this.$emit('hidePlugDialog', show)
    }
  }
}
</script>
