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
        label="运输方式代码"
        align="center"
      />
      <el-table-column
        prop="name"
        label="运输方式名称"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import { getCarrierRouteCache, setCarrierRouteCache } from '@/api/cache'
import { getCarrierRouteSelect } from '@/api/select'

export default {
  name: 'CarrierRouteTable',
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
      var list = getCarrierRouteCache()
      if (list === null || list === undefined) {
        getCarrierRouteSelect().then(resp => {
          this.tableData = resp.data
          setCarrierRouteCache(this.tableData)
        })
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
