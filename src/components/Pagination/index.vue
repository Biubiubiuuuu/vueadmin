<template>
  <div class="block" style="padding-top:20px">
    <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[15,25,35]"
      :page-size="15"
      layout="total, sizes, prev, pager, next, jumper"
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
    }
  },
  methods: {

  }
}
</script>
