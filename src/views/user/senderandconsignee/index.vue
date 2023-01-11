<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="SenderAndReceiver">
          <el-tab-pane label="收件人地址库" name="Receiver"><Consignee ref="consignee" /> </el-tab-pane>
          <el-tab-pane label="发件人地址库" name="Sender"><Sender ref="sender" /> </el-tab-pane>
        </el-tabs>
        <el-button v-if="SenderAndReceiver == 'Receiver'" type="primary" size="small" style="position: absolute;right:25px;top:13px;" @click="receiverClick">添加收件人</el-button>
        <el-button v-else type="primary" size="small" style="position: absolute;right:25px;top:13px;" @click="senderClick">添加发件人</el-button>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="50%"
      :fullscreen="fullscreen"
      :close-on-click-modal="false"
      @close="closeDialogClick('ruleForm')"
    >
      <el-form v-if="title ==='添加收件人'" ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small">
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入收件人姓名" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人公司" prop="company">
              <el-input v-model="ruleForm.company" placeholder="请输入收件人公司" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人税号" prop="taxID">
              <el-input v-model="ruleForm.taxID" placeholder="请输入收件人税号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人国家/地区" prop="countryId">
              <CountryId v-model="ruleForm.countryId" style="width:100%" @setValue="(val) => ruleForm.countryId = val" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人州/省" prop="province">
              <el-input v-model="ruleForm.province" placeholder="请输入收件人州/省" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人城市" prop="city">
              <el-input v-model="ruleForm.city" placeholder="请输入收件人城市" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人邮编" prop="postCode">
              <el-input v-model="ruleForm.postCode" placeholder="请输入收件人邮编" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人门牌号" prop="doorplate">
              <el-input v-model="ruleForm.doorplate" placeholder="请输入收件人门牌号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人邮箱" prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入收件人邮箱" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人电话" prop="telephone">
              <el-input v-model="ruleForm.telephone" placeholder="请输入收件人电话" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="收件人手机" prop="mobile">
              <el-input v-model="ruleForm.mobile" placeholder="请输入收件人手机" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="24" :xs="24">
            <el-form-item label="收件人地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入收件人地址" clearable size="small" type="textarea" :rows="3" maxlength="300" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form v-else ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small">
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入发件人姓名" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人公司" prop="company">
              <el-input v-model="ruleForm.company" placeholder="请输入发件人公司" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人税号" prop="taxID">
              <el-input v-model="ruleForm.taxID" placeholder="请输入发件人税号" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人国家/地区" prop="countryId">
              <CountryId v-model="ruleForm.countryId" style="width:100%" @setValue="(val) => ruleForm.countryId = val" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人州/省" prop="province">
              <el-input v-model="ruleForm.province" placeholder="请输入发件人州/省" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人城市" prop="city">
              <el-input v-model="ruleForm.city" placeholder="请输入发件人城市" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人邮编" prop="postCode">
              <el-input v-model="ruleForm.postCode" placeholder="请输入发件人邮编" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人邮箱" prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入发件人邮箱" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人电话" prop="telephone">
              <el-input v-model="ruleForm.telephone" placeholder="请输入发件人电话" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="发件人手机" prop="mobile">
              <el-input v-model="ruleForm.mobile" placeholder="请输入发件人手机" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="24" :xs="24">
            <el-form-item label="发件人地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入发件人地址" clearable size="small" type="textarea" :rows="3" maxlength="300" show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否设为默认" prop="isDefault">
              <el-switch
                v-model="ruleForm.isDefault"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogClick('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="addClick('ruleForm',false)">确 定</el-button>
        <el-button type="warning" @click="addClick('ruleForm',true)">确认并继续</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Consignee from '@/components/Table/Consignee'
import Sender from '@/components/Table/Sender'
import CountryId from '@/components/Select/CountryId'
import { setCommonSenderAsync, setCommonConsigneeAsync } from '@/api/client'

export default {
  name: 'SenderAndConsignee',
  components: {
    Consignee,
    Sender,
    CountryId
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value === '' && this.ruleForm.telephone === '') {
        callback(new Error('手机号码或电话至少输入一项！'))
      } else {
        callback()
      }
    }
    var validateTelephone = (rule, value, callback) => {
      if (value === '' && this.ruleForm.mobile === '') {
        callback(new Error('手机号码或电话至少输入一项！'))
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
      SenderAndReceiver: 'Receiver',
      title: '添加收件人',
      centerDialogVisible: false,
      fullscreen: false,
      windowWidth: document.documentElement.clientWidth,
      ruleForm: {
        name: '',
        company: '',
        countryId: 0,
        province: '',
        city: '',
        address: '',
        doorplate: '',
        postCode: '',
        email: '',
        telephone: '',
        mobile: '',
        taxID: '',
        isDefault: false
      },
      rulesForm: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
        ],
        countryId: [{ validator: validateCountryId, trigger: ['blur', 'change'] }],
        province: [
          { required: true, message: '请输入州/省', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ],
        postCode: [
          { required: true, message: '请输入邮编', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        telephone: [
          { validator: validateTelephone, trigger: 'blur' }
        ],
        mobile: [
          { validator: validateMobile, trigger: 'blur' }
        ],
        email: [
          { pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '请输入正确的邮箱', trigger: 'blur' }
        ]
      }
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
  created() {
    if (this.windowWidth < 400) {
      this.fullscreen = true
    }
  },
  methods: {
    receiverClick() {
      var than = this
      than.centerDialogVisible = true
      than.title = '添加收件人'
      than.resetForm()
    },
    senderClick() {
      var than = this
      than.centerDialogVisible = true
      than.title = '添加发件人'
      than.resetForm()
    },
    addClick(formName, bool) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.title === '添加收件人') {
          setCommonConsigneeAsync(this.ruleForm).then(() => {
            this.$notify({ title: '成功', message: '添加收件人成功', type: 'success', 'duration': 1500 })
            this.$refs.consignee.getCommonConsigneeListAsync(undefined)
            this.centerDialogVisible = bool
            this.resetForm()
          })
        } else if (this.title === '添加发件人') {
          setCommonSenderAsync(this.ruleForm).then(() => {
            this.$notify({ title: '成功', message: '添加发件人成功', type: 'success', 'duration': 1500 })
            this.$refs.sender.getCommonSenderListAsync(undefined)
            this.centerDialogVisible = bool
            this.resetForm()
          })
        }
      })
    },
    closeDialogClick() {
      this.resetForm()
      this.centerDialogVisible = false
    },
    resetForm() {
      this.ruleForm = {
        name: '',
        company: '',
        countryId: 0,
        province: '',
        city: '',
        address: '',
        doorplate: '',
        postCode: '',
        email: '',
        telephone: '',
        mobile: '',
        taxID: '',
        isDefault: false
      }
      if (this.$refs.ruleForm !== undefined) this.$refs.ruleForm.resetFields()
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
</style>
