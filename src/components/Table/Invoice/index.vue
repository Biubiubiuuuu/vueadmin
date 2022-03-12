<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      type="selection"
      width="55"
    />
    <el-table-column
      fixed
      prop="hsCode"
      label="HsCode"
      width="150"
    />
    <el-table-column
      fixed
      prop="sku"
      label="SKU"
      width="150"
    />
    <el-table-column
      fixed
      prop="enName"
      label="英文品名"
      width="150"
    />
    <el-table-column
      fixed
      prop="cnName"
      label="中文品名"
      width="150"
    />
    <el-table-column
      fixed
      prop="quantity"
      label="数量"
      width="150"
    />
    <el-table-column
      fixed
      prop="unitCode"
      label="计量单位"
      width="150"
    />
    <el-table-column
      fixed
      prop="unitcharge"
      label="单价"
      width="150"
    />
    <el-table-column
      fixed
      prop="note"
      label="配货信息"
      width="150"
    />
    <el-table-column
      fixed
      prop="naterial"
      label="材质"
      width="150"
    />
    <el-table-column
      fixed
      prop="use"
      label="用途"
      width="150"
    />
    <el-table-column
      fixed
      prop="brand"
      label="品牌"
      width="150"
    />
  </el-table>
</template>

<script>
import { getCommonSenderAsync } from '@/api/select'

export default {
  name: 'SenderTable',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getCommonSenderAsync()
  },
  methods: {
    getCommonSenderAsync() {
      getCommonSenderAsync().then(resp => {
        this.tableData = resp.data
      })
    }
  }
}
</script>
