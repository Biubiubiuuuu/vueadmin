<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column
      type="selection"
      width="55"
    />
    <el-table-column
      fixed
      prop="name"
      label="姓名"
      width="150"
    />
    <el-table-column
      fixed
      prop="company"
      label="公司"
      width="150"
    />
    <el-table-column
      fixed
      prop="countryCnName"
      label="国家名称"
      width="150"
    />
    <el-table-column
      fixed
      prop="province"
      label="州/省"
      width="150"
    />
    <el-table-column
      fixed
      prop="city"
      label="城市"
      width="150"
    />
    <el-table-column
      fixed
      prop="postCode"
      label="邮编"
      width="150"
    />
    <el-table-column
      fixed
      prop="address"
      label="地址"
      width="250"
    />
    <el-table-column
      fixed
      prop="telephone"
      label="电话"
      width="150"
    />
    <el-table-column
      fixed
      prop="mobile"
      label="手机"
      width="150"
    />
    <el-table-column
      fixed
      prop="email"
      label="邮箱"
      width="150"
    />
    <el-table-column
      fixed
      prop="taxID"
      label="税号"
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
