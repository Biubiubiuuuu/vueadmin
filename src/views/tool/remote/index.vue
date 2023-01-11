<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-collapse v-model="activeNames" accordion @change="handleChange">
          <el-collapse-item title="" name="1">
            <template slot="title">
              <div style="line-height: 40px;border-bottom: 2px solid #409EFF;">
                偏远查询
              </div>
            </template>
            <FormRemote ref="formRemote" :set-table-data="setTableData" style="margin-top: 20px;" />
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 5px 15px;min-height: 100px;">
        <el-tabs v-model="remoteTabs">
          <el-tab-pane label="查询结果" name="remoteTab">
            <RemoteTable ref="remoteTable" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-backtop>
      <div width="100%" title="返回顶部">
        <i class="el-icon-top" />
      </div>
    </el-backtop>
  </div>
</template>

<script>
import FormRemote from '@/components/Form/Remote'
import RemoteTable from '@/components/Table/Remote'

export default {
  name: 'Remote',
  components: {
    FormRemote,
    RemoteTable
  },

  data() {
    return {
      activeNames: '1',
      remoteTabs: 'remoteTab'
    }
  },
  created() {

  },
  methods: {
    setTableData(v) {
      this.$nextTick(() => {
        this.$refs['remoteTable'].setData(v)
        this.setCollapse()
      })
    },
    setCollapse() {
      this.activeNames = ''
    }
  }
}
</script>

<style>
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
   overflow: scroll!important;
}
</style>

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

::v-deep .el-collapse-item__header{
    padding: 0px;
    border-bottom: 2px solid #EBEEF5;
    min-height: 40px !important;
    color: #409EFF;
    font-size: 14px;
    font-weight: 500;
}

.el-form-item--small.el-form-item {
     margin-bottom: 15px;
}

.remoteTipsRemake{
  margin-top: 10px;
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
}

.remoteTips{
  color: red;
  float: right;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>
