<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="InvoiceTabs">
          <el-tab-pane label="申报信息库" name="invoiceTab"><Invoice ref="invoice" /> </el-tab-pane>
        </el-tabs>
        <el-button type="primary" size="small" style="position: absolute;right:25px;top:13px;" @click="invoiceClick">添加申报信息</el-button>
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
      <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small">
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="Sku" prop="sku">
              <el-input v-model="ruleForm.sku" placeholder="请输入Sku" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="英文品名" prop="enName">
              <el-input v-model="ruleForm.enName" placeholder="请输入英文品名" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="中文品名" prop="cnName">
              <el-input v-model="ruleForm.cnName" placeholder="请输入中文品名" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="ruleForm.quantity" placeholder="请输入数量" clearable size="small" onkeyup="this.value=this.value.replace(/\D|^0/g,'')" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="单价" prop="unitcharge">
              <el-input v-model="ruleForm.unitcharge" placeholder="请输入单价" clearable size="small" @keyup.native="ruleForm.unitcharge = oninput(ruleForm.unitcharge,2)" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="计量单位" prop="unitCode">
              <UnitType v-model="ruleForm.unitCode" style="width:100%;" @setValue="(val) => ruleForm.unitCode = val" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="海关编码" prop="hsCode">
              <el-input v-model="ruleForm.hsCode" placeholder="请输入海关编码" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="配货信息" prop="note">
              <el-input v-model="ruleForm.note" placeholder="请输入配货信息" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="销售地址" prop="saleUrl">
              <el-input v-model="ruleForm.saleUrl" placeholder="请输入销售地址" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="商品图片地址" prop="pictureUrl">
              <el-input v-model="ruleForm.pictureUrl" placeholder="请输入商品图片地址" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="材质" prop="material">
              <el-input v-model="ruleForm.material" placeholder="请输入材质" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="用途" prop="use">
              <el-input v-model="ruleForm.use" placeholder="请输入用途" clearable size="small" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="ruleForm.brand" placeholder="请输入品牌" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="原产国" prop="countryOrigin">
              <el-input v-model="ruleForm.countryOrigin" placeholder="请输入原产国" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="商品单重" prop="netWeight">
              <el-input v-model="ruleForm.netWeight" placeholder="请输入商品单重" clearable size="small" @keyup.native="ruleForm.netWeight = oninput(ruleForm.netWeight,3)" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="行邮税号" prop="posttaxNum">
              <el-input v-model="ruleForm.posttaxNum" placeholder="请输入行邮税号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否带电" prop="isElectrified">
              <el-select v-model="ruleForm.isElectrified" placeholder="请选择是否带电" style="width:100%;">
                <el-option label="否" :value="false" />
                <el-option label="是" :value="true" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否带磁" prop="isMagnetic">
              <el-select v-model="ruleForm.isMagnetic" placeholder="请选择是否带磁" style="width:100%;">
                <el-option label="否" :value="false" />
                <el-option label="是" :value="true" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否液体" prop="isLiquid">
              <el-select v-model="ruleForm.isLiquid" placeholder="请选择是否液体" style="width:100%;">
                <el-option label="否" :value="false" />
                <el-option label="是" :value="true" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否粉末" prop="isPowder">
              <el-select v-model="ruleForm.isPowder" placeholder="请选择是否粉末" style="width:100%;">
                <el-option label="否" :value="false" />
                <el-option label="是" :value="true" />
              </el-select>
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
import Invoice from '@/components/Table/Invoice'
import UnitType from '@/components/Select/UnitType'
import { setCommonInvoiceAsync } from '@/api/client'

export default {
  name: 'InvoicePage',
  components: {
    Invoice,
    UnitType
  },
  data() {
    return {
      title: '添加申报信息',
      centerDialogVisible: false,
      fullscreen: false,
      windowWidth: document.documentElement.clientWidth,
      InvoiceTabs: 'invoiceTab',
      ruleForm: {
        sku: '',
        enName: '',
        cnName: '',
        quantity: '',
        unitCode: 1,
        unitcharge: '',
        netWeight: '',
        hsCode: '',
        note: '',
        saleUrl: '',
        pictureUrl: '',
        material: '',
        use: '',
        brand: '',
        countryOrigin: '',
        posttaxNum: '',
        isElectrified: false,
        isMagnetic: false,
        isLiquid: false,
        isPowder: false
      },
      rulesForm: {
        sku: [
          { required: true, message: '请输入sku', trigger: 'blur' }
        ],
        enName: [
          { required: true, message: '请输入英文品名', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '请输入单价', trigger: 'blur' }
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
    invoiceClick() {
      var than = this
      than.centerDialogVisible = true
      than.resetForm('ruleForm')
    },
    addClick(formName, bool) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        if (this.ruleForm.quantity === '') {
          this.ruleForm.quantity = 0
        }
        if (this.ruleForm.unitcharge === '') {
          this.ruleForm.unitcharge = 0
        }
        if (this.ruleForm.netWeight === '') {
          this.ruleForm.netWeight = 0
        }
        setCommonInvoiceAsync(this.ruleForm).then(() => {
          this.$notify({ title: '成功', message: '添加申报信息成功', type: 'success', 'duration': 1500 })
          this.$refs.invoice.getCommonInvoiceListAsync(undefined)
          this.centerDialogVisible = bool
          this.resetForm(formName)
        })
      })
    },
    closeDialogClick(formName) {
      this.resetForm(formName)
      this.centerDialogVisible = false
    },
    resetForm(formName) {
      this.ruleForm = {
        sku: '',
        enName: '',
        cnName: '',
        quantity: '',
        unitCode: 1,
        unitcharge: '',
        netWeight: '',
        hsCode: '',
        note: '',
        saleUrl: '',
        pictureUrl: '',
        material: '',
        use: '',
        brand: '',
        countryOrigin: '',
        posttaxNum: '',
        isElectrified: false,
        isMagnetic: false,
        isLiquid: false,
        isPowder: false
      }
      this.$refs[formName].resetFields()
    },
    oninput(val, limit = 0) {
      val = val.replace(/[^\d.]/g, '')
      val = val.replace(/^00/, '0.')
      val = val.replace(/^\./g, '0.')
      val = val.replace(/\.{2,}/g, '.')
      val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      /^0\d+/.test(val) ? val = val.slice(1) : ''
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
