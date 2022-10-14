<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="remoteTabs">
          <el-tab-pane label="偏远查询" name="remoteTab">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small" label-width="auto">
              <el-row class="row-bg" type="flex" justify="center">
                <el-col :sm="12" :md="10" :lg="8" :xl="5" :xs="24">
                  <el-form-item label="承运商" prop="carrierId">
                    <el-select v-model="ruleForm.type" clearable placeholder="请选择承运商" style="width: 100%;">
                      <el-option
                        v-for="item in remoteOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="国家/地区" prop="countryCode">
                    <CountryCode
                      v-model="ruleForm.countryCode"
                      style="width: 100%"
                      @setValue="(val) => (ruleForm.countryCode = val)"
                    />
                  </el-form-item>
                  <el-form-item label="邮编" prop="postalCode">
                    <Addressbook v-model="ruleForm.postalCode" placeholder="请输入邮编关键字并选择搜索结果" :querytype="'postalCode'" :query-data="ruleForm" :is-dhl="true" :set-search-addressbook="setSearchAddressbook" @setValue="(val) => (ruleForm.postalCode = val)" />
                  </el-form-item>
                  <el-form-item label="城市" prop="city">
                    <Addressbook v-model="ruleForm.city" placeholder="请输入城市关键字并选择搜索结果" :is-dhl="true" :querytype="'city'" :query-data="ruleForm" :set-search-addressbook="setSearchAddressbook" @setValue="(val) => (ruleForm.city = val)" />
                  </el-form-item>
                  <div style="text-align: center;margin-top:5px;">
                    <el-button
                      type="primary"
                      size="medium"
                      icon="el-icon-search"
                      @click="onQuery('ruleForm')"
                    >查询</el-button>
                    <el-button
                      plain
                      size="medium"
                      icon="el-icon-refresh"
                      @click="resetForm('ruleForm')"
                    >重置</el-button>
                  </div>
                  <div class="remoteTipsRemake">偏远查询说明：<br>• 需选择搜索结果进行查询。<br>• 提供DHL、UPS、Fedex及TNT的偏远地区查询数据功能。<br>• 数据源自官网提供的偏远地区邮政编码清单。<br>• 如果您对查询结果有异议，请在各大快递服务商官网进行核实。</div>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px;min-height: 100px;">
        <el-tabs v-model="remoteTabs">
          <el-tab-pane label="查询结果" name="remoteTab">
            <el-table
              ref="table"
              size="medium"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              style="width: 100%; margin-bottom: 10px;"
              highlight-current-row
              :data="tableData"
              :stripe="true"
            >
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
              <el-table-column label="结果" align="center" min-width="80px" show-overflow-tooltip>
                <template slot-scope="props">
                  <el-tag v-if="props.row.isRemoteArea" type="danger">偏远</el-tag>
                  <el-tag v-else>非偏远</el-tag>
                </template>
              </el-table-column>
            </el-table>
            <div class="remoteTips">*仅供参考，最终是否偏远，请以官方为准</div>
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
import CountryCode from '@/components/Select/CountryCode'
import Addressbook from '@/components/Select/Addressbook'
import { SearchRemotebook } from '@/api/tool'

import { getCountryListCache } from '@/api/cache'

let that

export default {
  name: 'Freighttrial',
  components: {
    CountryCode,
    Addressbook
  },
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
    var validateCity = (rule, value, callback) => {
      if (value === '' && this.ruleForm.postalCode === '') {
        callback(new Error('城市或邮编至少输入一项！'))
      } else {
        callback()
      }
    }
    var validatePostalCode = (rule, value, callback) => {
      if (value === '' && this.ruleForm.city === '') {
        callback(new Error('城市或邮编至少输入一项！'))
      } else {
        callback()
      }
    }
    return {
      countryList: [],
      remoteTabs: 'remoteTab',
      isShowTags: false,
      labelposition: 'left',
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
      }],
      ruleForm: {
        type: '0',
        countryCode: '',
        city: '',
        postalCode: ''
      },
      rulesForm: {
        countryId: [{
          required: true,
          message: '请选择国家/地区',
          trigger: ['blur', 'change']
        }],
        type: [{
          required: true,
          message: '请选择承运商',
          trigger: ['blur', 'change']
        }],
        city: [
          { validator: validateCity, trigger: ['blur', 'change'] }
        ],
        postalCode: [
          { validator: validatePostalCode, trigger: ['blur', 'change'] }
        ]
      },
      tableData: []
    }
  },
  watch: {
    'ruleForm.countryCode'(oldval, newval) {
      if (oldval !== newval) {
        this.ruleForm.city = ''
        this.ruleForm.postalCode = ''
      }
    }
  },
  created() {
    this.countryList = getCountryListCache()
  },
  beforeCreate() {
    that = this
  },
  methods: {
    onQuery(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项后重新提交')
          return false
        }
        const loading = this.$loading({
          lock: true,
          text: '查询中，请勿刷新页面.....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        var queryData = this.ruleForm
        queryData.type = this.ruleForm.type
        SearchRemotebook(this.ruleForm).then(resp => {
          this.tableData = resp.data
        }).finally(() => {
          loading.close()
        })
      })
    },
    resetForm(formName) {
      this.ruleForm = {
        carrierId: '',
        countryId: undefined,
        city: '',
        postalCode: ''
      }
      this.$refs[formName].resetFields()
    },
    setSearchAddressbook(querytype, val) {
      this.ruleForm.city = val.city
      this.ruleForm.postalCode = val.postalCode
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
