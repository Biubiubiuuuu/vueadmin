<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="importOrderTabs">
          <el-tab-pane label="导入订单" name="importOrderTab">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rulesForm"
              size="small"
              label-width="100px"
            >
              <el-row type="flex" class="row-bg" justify="center">
                <el-col :sm="13" :md="11" :lg="9" :xl="6" :xs="24">
                  <el-form-item label="默认运输方式" prop="carrierRouteId">
                    <CarrierRouteId
                      v-model="ruleForm.carrierRouteId"
                      style="width: 100%"
                      @setValue="(val) => (ruleForm.carrierRouteId = val)"
                    />
                  </el-form-item>
                  <el-form-item label="单号前缀" prop="numberPrefix">
                    <el-input
                      v-model="ruleForm.numberPrefix"
                      placeholder="请输入单号前缀"
                      clearable
                      size="small"
                    />
                  </el-form-item>
                  <el-form-item
                    label="Excel文件"
                    prop="files"
                    :rules="{
                      required: true,
                      message: '请选择Excel文件',
                      trigger: 'change',
                    }"
                  >
                    <el-upload
                      class="upload-demo"
                      :file-list="filelist"
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      :on-remove="handleRemove"
                      action="upload-demo"
                      :limit="1"
                      :on-exceed="handleExceed"
                      :auto-upload="false"
                      :on-change="handleChange"
                    >
                      <el-button size="small" type="primary">选择文件</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传.xlsx文件，且最多允许上传500行数据</div>
                    </el-upload>
                  </el-form-item>
                  <div style="text-align: center;margin-top:20px;">
                    <el-button type="primary" size="medium" @click="importWaybill('ruleForm')">批量导入</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
            <el-tabs v-model="activeName" type="border-card" style="margin-top:10px">
              <el-tab-pane
                label="注意事项"
                name="first"
                style="line-height: 25px;font-size: 14px;"
              >
                1.请正确选择运输方式<br>
                2.目的国家/地区支持二字码，系统会尽量识别，如碰到无法识别，请手工修改，请参考：基础数据：国家/地区列表<br>
                3.申报价值里填数字，不要包含USD,$等币种信息<br>
                4.件数信息请填数字，不要包含件,pcs,piece等单位信息<br>
                5.EUB必须填写正确的邮编，城市，州信息<br>
                6.英文品名必填。<br>
              </el-tab-pane>
              <el-tab-pane
                label="模板管理"
                name="second"
              >
                <el-row :gutter="20">
                  <el-col :span="3" :xs="12">
                    <div style="text-align:center;width:80px;">
                      <el-link :underline="false" @click="downloadFile"><el-image :src="tempSrc" fit="contain" /><div>标准简版</div></el-link>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane
                label="国家/地区列表"
                name="third"
              >
                <CountryTable />
              </el-tab-pane>
              <el-tab-pane
                label="运输方式列表"
                name="fourth"
              >
                <CarrierRouteTable />
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import CarrierRouteId from '@/components/Select/CarrierRouteId'
import CountryTable from '@/components/Table/Country'
import CarrierRouteTable from '@/components/Table/CarrierRoute'
import { batchImportAsync } from '@/api/prewaybill'

export default {
  name: 'ImportWaybill',
  components: {
    CarrierRouteId,
    CountryTable,
    CarrierRouteTable
  },
  data() {
    return {
      importOrderTabs: 'importOrderTab',
      activeName: 'first',
      filelist: [],
      tempSrc: process.env.VUE_APP_BASE_API.replace('/api', '') + '\\Images\\order_template_excel.png',
      ruleForm: {
        carrierRouteId: 0,
        numberPrefix: '',
        files: undefined
      },
      rulesForm: {
        numberPrefix: [
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^(?!_)(?!.*?_$)(?!.*?-$)[a-zA-Z0-9_-]+$/,
            message: '格式错误，只能包含数字、字母、下划线(_)、连接号(-)',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    importWaybill(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        const forms = new FormData()
        forms.append('files', this.ruleForm.files)
        forms.append('numberPrefix', this.ruleForm.numberPrefix)
        forms.append('carrierRouteId', this.ruleForm.carrierRouteId)
        const loading = this.$loading({
          lock: true,
          text: '提交中，请勿刷新页面.....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        batchImportAsync(forms).then(resp => {
          this.$notify({ title: '成功', message: '批量预录订单成功', type: 'success', 'duration': 1500 })
          this.ruleForm = {
            carrierRouteCode: '',
            numberPrefix: '',
            files: undefined
          }
          this.$refs[formName].resetFields()
          this.$router.push('/prewaybill/index')
        }).finally(() => {
          loading.close()
        })
      })
    },
    handleRemove(file, fileList) {
      this.ruleForm.files = undefined
      this.$notify({ title: '成功', message: '删除成功', type: 'success', 'duration': 1500 })
    },
    handleChange(file, fileList) {
      if (!/\.(xlsx|xls|XLSX|XLS)$/.test(file.name)) {
        this.$notify.error({
          title: '错误',
          message: '上传文件只能为excel文件，且为xlsx,xls格式'
        })
        this.filelist = []
        this.ruleForm.files = undefined
        return false
      }
      this.ruleForm.files = file.raw
      this.$refs['ruleForm'].validate((valid) => {
        if (!valid) {
          return false
        }
      })
    },
    handleExceed(files, fileList) {
      this.$message.error('只能上传一个文件!')
    },
    downloadFile() {
      window.open(process.env.VUE_APP_BASE_API.replace('/api', '') + '/ExcelFiles/订单导入标准模版.xlsx')
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
    overflow: hidden;
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
.el-dialog__body{
  padding: 0px 20px !important;
}
.el-divider--horizontal{
  margin: 10px 0px !important;
}
.el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 46px;
}
.el-form-item--small .el-form-item__error{
  padding: 0px !important;
  position: initial;
}
.el-upload__tip{
  margin-top: auto !important;
  line-height: 16px;
}
</style>
