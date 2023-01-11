<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small" label-width="auto">
      <el-row class="row-bg" type="flex" justify="center">
        <el-col :sm="sm" :md="md" :lg="lg" :xl="xl" :xs="24">
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
          <el-form-item label="国家/地区" prop="countryId">
            <CountryId
              v-model="ruleForm.countryId"
              style="width: 100%"
              @setValue="(val) => (ruleForm.countryId = val)"
            />
          </el-form-item>
          <el-form-item label="邮编" prop="postalCode">
            <Addressbook v-model="ruleForm.postalCode" placeholder="请输入邮编关键字并选择搜索结果" :querytype="'postalCode'" :query-data="ruleForm" :is-dhl="true" :set-search-addressbook="setSearchAddressbook" @setValue="(val) => (ruleForm.postalCode = val)" />
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <Addressbook v-model="ruleForm.city" placeholder="请输入城市关键字并选择搜索结果" :is-dhl="true" :querytype="'city'" :query-data="ruleForm" :set-search-addressbook="setSearchAddressbook" @setValue="(val) => (ruleForm.city = val)" />
          </el-form-item>
          <div style="text-align: center;margin-bottom: 20px;margin-top: 20px;">
            <el-button type="primary" size="medium" icon="el-icon-search" @click="onQuery('ruleForm')">偏远查询</el-button>
            <el-button plain size="medium" icon="el-icon-refresh" @click="resetForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      title="结果"
      :visible.sync="centerDialogVisible"
      width="80%"
      :close-on-click-modal="false"
      :fullscreen="fullscreen"
      @close="closeDialogClick('ruleForm')"
    >
      <RemoteTable ref="remoteTableRef" />
    </el-dialog>
  </div>
</template>

<script>
import { SearchRemotebook } from '@/api/tool'
import CountryId from '@/components/Select/CountryId'
import Addressbook from '@/components/Select/Addressbook'
import RemoteTable from '@/components/Table/Remote'

export default {
  name: 'RemoteForm',
  components: {
    CountryId,
    Addressbook,
    RemoteTable
  },
  props: {
    setTableData: {
      type: Function,
      default: () => () => {}
    },
    sm: {
      type: Number,
      default: 15
    },
    md: {
      type: Number,
      default: 13
    },
    lg: {
      type: Number,
      default: 11
    },
    xl: {
      type: Number,
      default: 7
    },
    showDialog: {
      type: Boolean,
      default: false
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
    var validateCountryId = (rule, value, callback) => {
      if (value === 0 || value === '') {
        callback(new Error('请选择国家/地区'))
      } else {
        callback()
      }
    }
    return {
      windowWidth: document.documentElement.clientWidth,
      centerDialogVisible: false,
      fullscreen: false,
      ruleForm: {
        type: '0',
        countryId: 0,
        city: '',
        postalCode: ''
      },
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
      rulesForm: {
        countryId: [{ validator: validateCountryId, trigger: ['blur', 'change'] }],
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
      }
    }
  },
  watch: {
    'ruleForm.countryId'(oldval, newval) {
      if (oldval !== newval) {
        this.ruleForm.city = ''
        this.ruleForm.postalCode = ''
      }
    }
  },
  created() {
    if (this.windowWidth < 400) {
      this.fullscreen = true
    }
  },
  mounted() {
    var that = this
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        that.windowWidth = window.fullWidth // 宽
        that.fullscreen = false
        if (that.windowWidth < 400) {
          that.fullscreen = true
        }
      })()
    }
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
        SearchRemotebook(this.ruleForm).then(resp => {
          if (this.showDialog) {
            this.centerDialogVisible = true
            this.$nextTick(() => {
              this.$refs['remoteTableRef'].setData(resp.data)
            })
          } else {
            this.setTableData(resp.data)
          }
        }).finally(() => {
          loading.close()
        })
      })
    },
    closeDialogClick(formName) {
      this.centerDialogVisible = false
    },
    resetForm() {
      if (this.$refs.ruleForm !== undefined) this.$refs['ruleForm'].resetFields()
    },
    setSearchAddressbook(querytype, val) {
      this.ruleForm.city = val.city
      this.ruleForm.postalCode = val.postalCode
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
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
</style>
