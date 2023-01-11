<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small" label-width="auto">
      <el-row class="row-bg" type="flex" justify="center">
        <el-col :sm="sm" :md="md" :lg="lg" :xl="xl" :xs="24">
          <el-form-item label="单号查询" prop="codes">
            <el-input ref="codetextarea" v-model="ruleForm.codes" type="textarea" rows="8" clearable resize="none" placeholder="每行输入一个单号，允许最多提交30个单号" style="width:100%" />
          </el-form-item>
          <div style="text-align: center;margin-bottom: 20px;margin-top: 20px;">
            <el-button type="primary" size="medium" icon="el-icon-search" @click="onQuery('ruleForm')">轨迹查询</el-button>
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
      <TrackTable ref="trackTable" />
    </el-dialog>
  </div>
</template>

<script>
import TrackTable from '@/components/Table/Track'

export default {
  name: 'TrackForm',
  components: {
    TrackTable
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
    return {
      windowWidth: document.documentElement.clientWidth,
      centerDialogVisible: false,
      fullscreen: false,
      ruleForm: {
        codes: ''
      },
      rulesForm: {
        codes: [{
          required: true,
          message: '请输入单号查询，多个单号请换行输入',
          trigger: ['blur', 'change']
        }]
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
        if (this.showDialog) {
          this.centerDialogVisible = true
        }
        this.setTableData()
      })
    },
    resetForm() {
      if (this.$refs.ruleForm !== undefined) this.$refs['ruleForm'].resetFields()
    },
    closeDialogClick(formName) {
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.clearValidate()
      this.centerDialogVisible = false
    }
  }
}
</script>
