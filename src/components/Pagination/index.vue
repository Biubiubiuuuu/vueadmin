<template>
  <div class="block">
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :pager-count="5"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
    />
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [30, 50, 100]
    },
    pageSize: {
      type: Number,
      default: 30
    },
    changePape: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      currentPage: 1,
      windowWidth: document.documentElement.clientWidth,
      layout: 'total, sizes, prev, pager, next, jumper',
      priPageSize: this.pageSize
    }
  },
  created() {
    if (this.windowWidth < 400) {
      this.layout = 'total, prev, pager, next'
    }
  },
  methods: {
    handleSizeChange(val) {
      this.priPageSize = val
      this.changePape(this.currentPage, this.priPageSize)
    },
    handlePrevClick(val) {
      this.handleCurrentChange(val)
    },
    handleNextClick(val) {
      this.handleCurrentChange(val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.changePape(this.currentPage, this.pageSize)
    }
  }
}
</script>
