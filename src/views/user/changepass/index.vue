<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="changePassTabs">
          <el-tab-pane label="修改密码" name="changePassTab">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small" label-width="auto">
              <el-row class="row-bg" type="flex" justify="center">
                <el-col :sm="15" :md="13" :lg="11" :xl="7" :xs="24">
                  <el-form-item label="旧密码" prop="oldPass">
                    <el-input v-model="ruleForm.oldPass" placeholder="请输入旧密码" clearable size="small" show-password />
                  </el-form-item>
                  <el-form-item label="新密码" prop="newPass">
                    <el-input v-model="ruleForm.newPass" placeholder="请输入新密码" clearable size="small" show-password />
                  </el-form-item>
                  <el-form-item label="确认新密码" prop="confirmNewPass">
                    <el-input v-model="ruleForm.confirmNewPass" placeholder="请输入新密码" clearable size="small" show-password />
                  </el-form-item>
                  <div style="text-align: center;margin-top:5px;">
                    <el-button
                      type="primary"
                      size="medium"
                      icon="el-icon-search"
                      @click="onSave('ruleForm')"
                    >保存</el-button>
                    <el-button
                      plain
                      size="medium"
                      icon="el-icon-refresh"
                      @click="resetForm('ruleForm')"
                    >重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassAsync } from '@/api/client'

export default {
  name: 'CollectionAccountPage',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.newPass) {
        callback(new Error('新密码两次输入不一致！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      changePassTabs: 'changePassTab',
      ruleForm: {
        oldPass: '',
        newPass: '',
        confirmNewPass: ''
      },
      rulesForm: {
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        confirmNewPass: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    onSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        changePassAsync(this.ruleForm).then(() => {
          this.$confirm('修改密码成功, 是否重新登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.logout()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
          this.resetForm(formName)
        })
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    resetForm(formName) {
      this.ruleForm = {
        oldPass: '',
        newPass: '',
        confirmNewPass: ''
      }
      this.$refs[formName].resetFields()
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
.el-form-item--small.el-form-item {
     margin-bottom: 15px;
}
</style>
