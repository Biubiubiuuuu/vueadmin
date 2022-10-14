<template>
  <!-- 预览PDF -->
  <el-dialog
    append-to-body
    :visible.sync="previewDialog"
    width="70%"
    :title="title"
    :before-close="handleClose"
    :fullscreen="fullscreenChoice"
  >
    <div class="tools">
      <el-button
        :theme="'default'"
        type="success"
        :title="'上一页'"
        class="mr10"
        @click.stop="prePage"
      >
        上一页</el-button>
      <el-button
        :theme="'default'"
        type="success"
        :title="'下一页'"
        class="mr10"
        @click.stop="nextPage"
      >
        下一页</el-button>
      <el-button
        :theme="'default'"
        type="info"
        :title="'顺时针旋转'"
        class="mr10"
        @click.stop="clock"
      >
        顺时针旋转</el-button>
      <el-button
        :theme="'default'"
        type="info"
        :title="'逆时针旋转'"
        class="mr10"
        @click.stop="counterClock"
      >
        逆时针旋转</el-button>
      <el-button
        :theme="'default'"
        type="primary"
        :title="'打印'"
        class="mr10"
        @click.stop="pdfPrintAll"
      >
        打印</el-button>
      <div class="page">{{ pageNum }}/{{ pageTotalNum }}</div>
    </div>
    <PDF
      ref="pdf"
      :src="url"
      :page="pageNum"
      :rotate="pageRotate"
      @progress="loadedRatio = $event"
      @page-loaded="pageLoaded($event)"
      @num-pages="pageTotalNum = $event"
      @error="pdfError($event)"
      @link-clicked="page = $event"
    />
  </el-dialog>
</template>

<script>
import PDF from 'vue-pdf'

export default {
  components: {
    PDF
  },
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
      pageNum: 1,
      pageTotalNum: 1,
      fullscreenChoice: false,
      windowWidth: document.documentElement.clientWidth,
      pageRotate: 0,
      loadedRatio: 0,
      curPageNum: 0
    }
  },
  created() {
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
    // 上一页函数，
    prePage() {
      var page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },
    // 下一页函数
    nextPage() {
      var page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },
    // 页面顺时针翻转90度。
    clock() {
      this.pageRotate += 90
    },
    // 页面逆时针翻转90度。
    counterClock() {
      this.pageRotate -= 90
    },
    // 页面加载回调函数，其中e为当前页数
    pageLoaded(e) {
      this.curPageNum = e
    },
    // 错误时回调函数。
    pdfError(error) {
      console.error(error)
    },
    // 打印全部
    pdfPrintAll() {
      /**
       * 打印界面字符乱码是因为你pdf中使用了自定义字体导致的,谷歌浏览器打印的时候预览界面真的变成了真·方块字 ,解决方案如下：
       * 用文章最后的pdfjsWrapper.js在替换掉node_modules/vue-pdf/src/pdfjsWrapper.js
       */
      this.$refs.pdf.print()
    },
    handleClose() {
      const show = false
      this.$emit('hidePlugDialog', show)
    }
  }
}
</script>
