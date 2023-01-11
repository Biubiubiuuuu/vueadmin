<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container firtscollapse" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-collapse v-model="activeNames" accordion @change="handleChange">
          <el-collapse-item title="" name="1">
            <template slot="title">
              <div style="line-height: 40px;border-bottom: 2px solid #409EFF;">
                轨迹跟踪
              </div>
            </template>
            <TrackForm ref="formTrack" :set-table-data="setTableData" style="margin-top: 20px;" />
          </el-collapse-item>
        </el-collapse>
      </div>
      <TrackTable ref="trackTable" />
    </div>
    <el-backtop>
      <div width="100%" title="返回顶部">
        <i class="el-icon-top" />
      </div>
    </el-backtop>
  </div>
</template>

<script>
import TrackForm from '@/components/Form/Track'
import TrackTable from '@/components/Table/Track'

export default {
  name: 'Track',
  components: {
    TrackForm,
    TrackTable
  },
  data() {
    return {
      activeNames: '1',
      trackTabs: 'trackTab'
    }
  },
  created() {

  },
  methods: {
    setTableData(v) {
      this.$nextTick(() => {
        this.$refs['trackTable'].setData(v)
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
.el-collapse-item__header{
  min-height: 48px !important;
  height: auto;
  padding: 10px;
  line-height: initial;
}

.el-collapse-item__content{
  padding-bottom: 0px;
}

.el-collapse-item__header.is-active {
  border-bottom-color:#EBEEF5;
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

::v-deep .collapse-title {
  flex: 1 0 90%;
  order: 1;
  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
  }
}

.el-col-item-leftconent{
     font-size: 15px;
    height: 20px;
    float: none;
    width: 100%;
    margin-left: 70px;
}

.el-col-item-middle{
  height: 38px;
  line-height: 38px;
  text-align: center;
}

.el-form-item--small.el-form-item {
     margin-bottom: 5px;
}

.remoteTips{
  color: red;
  font-size: 10px;
  margin-bottom: 10px;
}

.codeInp{
    border: 1px solid #DCDFE6;
    height: 200px;
    border-radius: 4px;
}

.el-timeline{
  margin-top: 15px;
}

::v-deep .firtscollapse .el-collapse-item__header{
    padding: 0px;
    border-bottom: 2px solid #EBEEF5;
    min-height: 40px !important;
    color: #409EFF;
    font-size: 14px;
    font-weight: 500;
}
</style>
