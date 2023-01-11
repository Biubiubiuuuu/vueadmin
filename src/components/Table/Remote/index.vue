<template>
  <div>
    <el-table
      ref="table"
      size="medium"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%; margin-bottom: 10px;"
      highlight-current-row
      :data="tableData"
      :stripe="true"
    >
      <el-table-column label="结果" align="center" min-width="80px" show-overflow-tooltip>
        <template slot-scope="props">
          <el-tag v-if="props.row.isRemoteArea" type="danger">偏远</el-tag>
          <el-tag v-else>非偏远</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="运输商" align="center" min-width="80px" show-overflow-tooltip>
        <template slot-scope="props">
          {{ props.row.expressType | carrierIdFilter }}
        </template>
      </el-table-column>
      <el-table-column label="国家/地区" align="center" min-width="80px" show-overflow-tooltip>
        <template slot-scope="props">
          {{ props.row.countryId | countryIdFilter }}
        </template>
      </el-table-column>
      <el-table-column label="邮编" align="center" min-width="100px" show-overflow-tooltip>
        <template slot-scope="props">
          {{ props.row.startPostCode === null ? '':props.row.startPostCode +'-'+ props.row.endPostCode === null ? '': props.row.endPostCode }}
        </template>
      </el-table-column>
      <el-table-column label="城市" align="center" prop="city" min-width="100px" show-overflow-tooltip />
    </el-table>
    <div class="remoteTips">*仅供参考，最终是否偏远，请以官方为准</div>
  </div>
</template>

<script>
import { getCountryListCache } from '@/api/cache'
let that
export default {
  name: 'RemoteTable',
  filters: {
    countryIdFilter(val) {
      const item = that.countryList.find((f) => f.id === val)
      return item ? `${item.cnName}(${item.code})` : '--'
    },
    carrierIdFilter(val) {
      const item = that.remoteOptions.find((f) => parseInt(f.value) === val)
      return item ? item.label : '--'
    }
  },
  data() {
    return {
      countryList: [],
      tableData: [],
      remoteOptions: [{
        label: '全部',
        value: '0'
      }, {
        label: 'DHL',
        value: '1'
      },
      {
        label: 'Fedex',
        value: '2'
      },
      {
        label: 'UPS',
        value: '3'
      },
      {
        label: 'TNT',
        value: '4'
      }]
    }
  },
  beforeCreate() {
    that = this
  },
  created() {
    this.countryList = getCountryListCache()
  },
  methods: {
    setData(v) {
      this.tableData = v
    }
  }
}
</script>

<style lang="scss" scoped>
  .main  {
   background-color: #EAEDF1 !important;
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    height: 100%;
    overflow-x: hidden;
  }

.dashboard {
  &-container {
    margin: 10px 5px 10px 5px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-form-item--small.el-form-item {
     margin-bottom: 15px;
}

.remoteTipsRemake{
  margin-top: 10px;
  color: red;
  font-size: 13px;
}

.remoteTips{
  color: red;
  float: right;
  font-size: 13px;
}

.el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
   overflow: scroll!important;
}

::v-deep .el-dialog__body{
  padding: 10px 20px 20px 20px;
}
</style>
