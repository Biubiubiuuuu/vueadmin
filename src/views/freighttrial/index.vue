<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-collapse v-model="activeNames" accordion @change="handleChange">
          <el-collapse-item title="" name="1">
            <template slot="title">
              <div style="line-height: 40px;border-bottom: 2px solid #409EFF;">
                运费试算
              </div>
            </template>
            <FormFreight ref="formFreight" :set-table-data="setTableData" style="margin-top: 20px;" />
          </el-collapse-item>
        </el-collapse>
      </div>
      <div id="boxFixed" class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px;min-height: 100px;" :class="{'is_fixed' : isFixed}">
        <el-tabs v-model="freighttrialTabs">
          <el-tab-pane label="查询条件" name="freighttrialTab">
            <el-row :gutter="20" style="padding-bottom: 15px;white-space: nowrap;overflow-x: auto; -webkit-overflow-scrolling: touch;">
              <el-form v-model="dataForm" label-width="90px">
                <el-col :span="4" :xs="12">
                  <el-form-item label="目的地："><el-tag>{{ dataForm.countryName }}</el-tag></el-form-item>
                </el-col>
                <el-col :span="4" :xs="12">
                  <el-form-item label="重量："><el-tag>{{ dataForm.weight }}</el-tag>KG</el-form-item>
                </el-col>
                <el-col :span="4" :xs="12">
                  <el-form-item label="类型：">
                    <template slot="label" />
                    <el-tag>{{ dataForm.goodsTypeDes }}</el-tag>
                  </el-form-item>
                </el-col>
                <el-col :span="4" :xs="12">
                  <el-form-item label="包装："><el-tag>{{ dataForm.packDes }}</el-tag></el-form-item>
                </el-col>
                <el-col :span="4" :xs="12">
                  <el-form-item v-if="dataForm.mLong > 0" label="长："><el-tag>{{ dataForm.mLong }}</el-tag>CM</el-form-item>
                </el-col>
                <el-col :md="4" :xs="12">
                  <el-form-item v-if="dataForm.mWidth > 0" label="宽："><el-tag>{{ dataForm.mLong }}</el-tag>CM</el-form-item>
                </el-col>
                <el-col :md="4" :xs="12">
                  <el-form-item v-if="dataForm.mHeight > 0" label="高："><el-tag>{{ dataForm.mHeight }}</el-tag>CM</el-form-item>
                </el-col>
                <el-col :md="24" :xs="24">
                  <el-form-item v-if="dataForm.types.length > 0" label="额外服务："><el-tag>{{ dataForm.types }}</el-tag></el-form-item>
                </el-col>
              </el-form>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 15px;min-height: 250px;">
        <FreightTable ref="freightTable" />
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
import FreightTable from '@/components/Table/Freight'
import FormFreight from '@/components/Form/Freight'

export default {
  name: 'Freighttrial',
  components: {
    FormFreight,
    FreightTable
  },
  data() {
    return {
      isFixed: false,
      offsetTop: 0,
      activeNames: '1',
      freighttrialTabs: 'freighttrialTab',
      isShowTags: false,
      countryName: '',
      dataForm: {
        countryName: '',
        weight: '',
        packDes: '',
        goodsTypeDes: '',
        mLong: '',
        mWidth: '',
        mHeight: '',
        types: []
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
    this.$nextTick(() => {
      this.offsetTop = document.querySelector('#boxFixed').offsetTop
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    initHeight() {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isFixed = scrollTop > this.offsetTop
    },
    setTableData(v) {
      this.$nextTick(() => {
        this.$refs['freightTable'].setData(v)
        this.setCollapse()
      })
    },
    setCollapse() {
      this.activeNames = ''
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

table .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 15px;
}

.el-form-item {
  margin-bottom: 0px;
}

.is_fixed{
  position: fixed;
  top: 0;
  z-index: 999;
}

::v-deep  .el-collapse-item__header{
    padding: 0px;
    border-bottom: 2px solid #EBEEF5;
    min-height: 40px !important;
    color: #409EFF;
    font-size: 14px;
    font-weight: 500;
}
</style>
