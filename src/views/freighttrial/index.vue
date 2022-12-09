<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="freighttrialTabs">
          <el-tab-pane label="运费试算" name="freighttrialTab">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small" label-width="80px">
              <el-row type="flex" class="row-bg" justify="center">
                <el-col :sm="12" :md="10" :lg="8" :xl="5" :xs="24">
                  <el-form-item label="目的地" prop="countryId">
                    <CountryId
                      v-model="ruleForm.countryId"
                      style="width: 100%"
                      @setValue="(val) => (ruleForm.countryId = val)"
                    />
                  </el-form-item>
                  <el-form-item label="货物类型" prop="goodsType">
                    <GoodsType v-model="ruleForm.goodsType" style="width:100%" @setValue="(val) => ruleForm.goodsType = val" />
                  </el-form-item>
                  <el-form-item label="包装方式" prop="pack">
                    <PackType v-model="ruleForm.pack" style="width:100%" @setValue="(val) => ruleForm.pack = val" />
                  </el-form-item>
                  <el-form-item label="重量" prop="weight">
                    <el-input v-model="ruleForm.weight" placeholder="请输入重量（KG）" clearable size="small" @keyup.native="ruleForm.weight = oninput(ruleForm.weight,3)" />
                  </el-form-item>
                  <el-form-item label="长" prop="mLong">
                    <el-input v-model="ruleForm.mLong" placeholder="请输入长（CM）" clearable size="small" @keyup.native="ruleForm.mLong = oninput(ruleForm.mLong,2)" />
                  </el-form-item>
                  <el-form-item label="宽" prop="mWidth">
                    <el-input v-model="ruleForm.mWidth" placeholder="请输入宽（CM）" clearable size="small" @keyup.native="ruleForm.mWidth = oninput(ruleForm.mWidth,2)" />
                  </el-form-item>
                  <el-form-item label="高" prop="mHeight">
                    <el-input v-model="ruleForm.mHeight" placeholder="请输入高（CM）" clearable size="small" @keyup.native="ruleForm.mHeight = oninput(ruleForm.mHeight,2)" />
                  </el-form-item>
                  <el-form-item label="额外服务" prop="types">
                    <ExtraService ref="extraServices" :set-extra-service="setExtraService" />
                  </el-form-item>
                  <div style="text-align: center;">
                    <el-button type="primary" size="medium" @click="freighttrial('ruleForm')">运费试算</el-button>
                    <el-button plain size="medium" icon="el-icon-refresh" @click="resetForm('formQuery')">重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="isShowTags" class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px;min-height: 100px;">
        <el-tabs v-model="freighttrialTabs">
          <el-tab-pane label="查询条件" name="freighttrialTab">
            <el-row :gutter="20" style="padding-bottom: 15px;white-space: nowrap;overflow-x: auto; -webkit-overflow-scrolling: touch;">
              <el-form v-model="dataForm" label-width="90px" :label-position="right">
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
        <Freight ref="freight" />
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
import CountryId from '@/components/Select/CountryId'
import GoodsType from '@/components/Select/GoodsType'
import Freight from '@/components/Table/Freight'
import PackType from '@/components/Select/PackType'
import ExtraService from '@/components/ExtraService'
import { getCountryListCache, getPackTypeCache, getGoodsTypeCache } from '@/api/cache'

export default {
  name: 'Freighttrial',
  components: {
    CountryId,
    GoodsType,
    ExtraService,
    PackType,
    Freight
  },
  data() {
    var validateCountryId = (rule, value, callback) => {
      if (value === 0 || value === '') {
        callback(new Error('请选择国家/地区'))
      } else {
        callback()
      }
    }
    return {
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
      },
      ruleForm: {
        countryId: 0,
        weight: '',
        pack: 1,
        goodsType: 1,
        mLong: '',
        mWidth: '',
        mHeight: '',
        extraServices: []
      },
      rulesForm: {
        countryId: [{ validator: validateCountryId, trigger: ['blur', 'change'] }],
        pack: {
          required: true,
          message: '请选择包装方式',
          trigger: ['blur', 'change']
        },
        goodsType: {
          required: true,
          message: '请选择货物类型',
          trigger: ['blur', 'change']
        },
        weight: {
          required: true,
          message: '请输入重量',
          trigger: ['blur', 'change']
        }
      }
    }
  },
  methods: {
    freighttrial(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项后重新提交')
          return false
        }
        this.dataForm = JSON.parse(JSON.stringify(this.ruleForm))
        this.dataForm.countryName = getCountryListCache().find(item => item.id === this.ruleForm.countryId).cnName
        this.dataForm.goodsTypeDes = getGoodsTypeCache().find(item => item.id === this.ruleForm.goodsType).name
        this.dataForm.packDes = getPackTypeCache().find(item => item.id === this.ruleForm.pack).name
        if (this.ruleForm.types) {
          this.dataForm.types = this.options.filter(i => this.ruleForm.types.includes(i.value)).map(x => { return x.value }).join('、')
          if (this.dataForm.types.length > 0) {
            this.dataForm.types = this.dataForm.types.substring(0, this.dataForm.types.length - 1)
          }
        }
        this.isShowTags = true
        this.$refs.freight.getData()
      })
    },
    oninput(val, limit = 0) {
      val = val.replace(/[^\d.]/g, '')
      val = val.replace(/^00/, '0.')
      val = val.replace(/^\./g, '0.')
      val = val.replace(/\.{2,}/g, '.')
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      ;/^0\d+/.test(val) ? (val = val.slice(1)) : ''
      const str = '^(\\d+)\\.(\\d{' + limit + '}).*$'
      const reg = new RegExp(str)
      if (limit === 0) {
        val = val.replace(reg, '$1')
      } else {
        val = val.replace(reg, '$1.$2')
      }
      return val
    },
    setExtraService(v) {
      this.ruleForm.extraServices = Array.isArray(v) ? v : JSON.parse(v)
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
</style>
