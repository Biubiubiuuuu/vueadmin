<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%; margin-bottom: 10px;"
      max-height="500"
      size="small"
      highlight-current-row
    >
      <el-table-column
        label="序号"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.$index+1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="code"
        label="国家/地区二字码"
        min-width="140px"
        align="center"
      />
      <el-table-column
        prop="cnName"
        label="国家/地区中文名称"
        min-width="140px"
        align="center"
      />
      <el-table-column
        prop="enName"
        label="国家/地区英文名称"
        min-width="140px"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import { getCountryListCache, setCountryListCache } from '@/api/cache'
import { getCountrySelect } from '@/api/select'

export default {
  name: 'CountryTable',
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      var list = getCountryListCache()
      if (list === null || list === undefined) {
        this.tableData = getCountrySelect()
        setCountryListCache(this.tableData)
      } else {
        this.tableData = list
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
