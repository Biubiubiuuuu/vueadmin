<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small" label-width="80px">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :sm="sm" :md="md" :lg="lg" :xl="xl" :xs="24">
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
          <div style="text-align: center;margin-bottom: 20px;">
            <el-button type="primary" size="medium" icon="el-icon-search" @click="onQuery('ruleForm')">运费试算</el-button>
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
      <FreightTable />
    </el-dialog>
  </div>
</template>

<script>
import CountryId from '@/components/Select/CountryId'
import GoodsType from '@/components/Select/GoodsType'
import PackType from '@/components/Select/PackType'
import ExtraService from '@/components/ExtraService'
import FreightTable from '@/components/Table/Freight'

export default {
  name: 'FreightForm',
  components: {
    CountryId,
    GoodsType,
    ExtraService,
    PackType,
    FreightTable
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
        // TODO：调用查价接口
        if (this.showDialog) {
          this.centerDialogVisible = true
        }
        this.setTableData()
      })
    },
    resetForm() {
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.resetFields()
      this.$refs.extraServices.setExtraServices([])
    },
    closeDialogClick(formName) {
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.clearValidate()
      this.centerDialogVisible = false
    },
    setExtraService(v) {
      this.ruleForm.extraServices = Array.isArray(v) ? v : JSON.parse(v)
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
