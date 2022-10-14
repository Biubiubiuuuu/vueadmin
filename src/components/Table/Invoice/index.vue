<template>
  <div>
    <el-row :gutter="20" style="margin-bottom:15px;">
      <el-form ref="queryForm" :model="queryData" size="small">
        <el-col :lg="5" :xs="24"> <el-form-item style="margin-top: 6px"> <el-input v-model="queryData.enName" placeholder="请输入英文品名" clearable size="medium" /></el-form-item></el-col>
        <el-col :lg="5" :xs="24"> <el-form-item style="margin-top: 6px"> <el-input v-model="queryData.cnName" placeholder="请输入中文品名" clearable size="medium" /></el-form-item></el-col>
        <el-col :lg="5" :xs="24"> <el-form-item style="margin-top: 6px"> <el-input v-model="queryData.sku" placeholder="请输入Sku" clearable size="medium" /></el-form-item></el-col>
        <el-col :lg="8" :xs="24">
          <el-form-item style="margin-top: 5px">
            <el-button type="primary" size="medium" icon="el-icon-search" @click="onQuery">查询</el-button>
            <el-button plain size="medium" icon="el-icon-refresh" @click="resetQueryForm('queryForm')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div
      v-if="!isShowOperation"
      slot="tip"
      class="el-upload__tip"
    >*单击选择需要的申报信息</div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%; margin-bottom: 10px;"
      size="small"
      highlight-current-row
      @row-click="dblClick"
    >
      <el-table-column
        label="序号"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          <div>
            {{ scope.$index+1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Sku" width="140" prop="sku" align="center" />
      <el-table-column label="英文品名" width="140" prop="enName" align="center" />
      <el-table-column label="中文品名" width="140" prop="cnName" align="center" />
      <el-table-column label="数量" width="100" prop="quantity" align="center" />
      <el-table-column label="单价" width="100" prop="unitcharge" align="center" />
      <el-table-column label="计量单位" width="120" prop="unitCode" align="center">
        <template slot-scope="scope">
          <UnitType v-model="scope.row.unitCode" style="width:100%;" :disabled="true" @setValue="(val) => scope.row.unitCode = val" />
        </template>
      </el-table-column>
      <el-table-column label="海关编码" width="140" prop="hsCode" align="center" />
      <el-table-column label="配货信息" width="140" prop="note" align="center" />
      <el-table-column label="销售地址" width="170" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            <el-link :href="scope.row.saleUrl" target="_blank">{{ scope.row.saleUrl }}</el-link>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="商品图片地址" width="200" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.pictureUrl"
            :preview-src-list="[scope.row.pictureUrl]"
          />
        </template>
      </el-table-column>
      <el-table-column label="材质" width="150" prop="material" align="center" />
      <el-table-column label="用途" width="150" prop="use" align="center" />
      <el-table-column label="品牌" width="150" prop="brand" align="center" />
      <el-table-column label="原产国" width="150" prop="countryOrigin" align="center" />
      <el-table-column label="商品单重" width="160" prop="netWeight" align="center" />
      <el-table-column label="行邮税号" width="160" prop="posttaxNum" align="center" />
      <el-table-column
        label="是否带电"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isElectrified ? "是":"否" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否带磁"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isLiquid ? "是":"否" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否液体"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isMagnetic ? "是":"否" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否粉末"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isPowder ? "是":"否" }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="isShowOperation" label="操作" fixed="right" width="142" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleDataEdit(scope.row.id)"
          >修改</el-button>
          <el-popconfirm
            title="确定删除此条数据吗？"
            style="display: revert;margin-left: 10px;"
            @confirm="handleDataDelete(scope.row.id)"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
            >删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :change-pape="changePape" :page-size="queryData.maxResultCount" />

    <el-dialog
      title="修改申报信息"
      :visible.sync="centerDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :fullscreen="fullscreen"
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
            <el-form-item label="是否带电" prop="posttaxNum">
              <el-select v-model="ruleForm.isElectrified" placeholder="请选择是否带电" style="width:100%;">
                <el-option label="否" :value="false" />
                <el-option label="是" :value="true" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否带磁" prop="posttaxNum">
              <el-select v-model="ruleForm.isMagnetic" placeholder="请选择是否带磁" style="width:100%;">
                <el-option label="否" :value="false" />
                <el-option label="是" :value="true" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否液体" prop="posttaxNum">
              <el-select v-model="ruleForm.isLiquid" placeholder="请选择是否液体" style="width:100%;">
                <el-option label="否" :value="false" />
                <el-option label="是" :value="true" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xs="24">
            <el-form-item label="是否粉末" prop="posttaxNum">
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
        <el-button type="primary" @click="editClick('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UnitType from '@/components/Select/UnitType'
import { editCommonInvoiceAsync, getCommonInvoiceAsync, getCommonInvoiceListAsync, deleteCommonInvoiceAsync } from '@/api/client'
import Pagination from '@/components/Pagination'

export default {
  name: 'SenderTable',
  components: {
    Pagination,
    UnitType
  },
  props: {
    isShowOperation: {
      type: Boolean,
      default: true
    },
    choseData: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      centerDialogVisible: false,
      fullscreen: false,
      windowWidth: document.documentElement.clientWidth,
      queryData: {
        skipCount: 0,
        maxResultCount: 30,
        enName: '',
        cnName: '',
        sku: ''
      },
      ruleForm: {
        sku: '',
        enName: '',
        cnName: '',
        quantity: '',
        unitCode: '',
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
  created() {
    this.getCommonInvoiceListAsync()
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
    getCommonInvoiceListAsync() {
      this.loading = true
      getCommonInvoiceListAsync(this.queryData).then(resp => {
        this.tableData = resp.data
        this.total = resp.total
      })
      this.loading = false
    },
    handleDataEdit(id) {
      this.centerDialogVisible = true
      getCommonInvoiceAsync(id).then((resp) => {
        this.ruleForm = resp.data
      })
    },
    handleDataDelete(id) {
      deleteCommonInvoiceAsync(id).then(() => {
        this.$notify({ title: '成功', message: '删除成功', type: 'success', 'duration': 1500 })
        this.getCommonInvoiceListAsync()
      })
    },
    changePape(currentPage, pageSize) {
      this.queryData.skipCount = (currentPage - 1) * pageSize
      this.queryData.maxResultCount = pageSize
      this.getCommonInvoiceListAsync()
    },
    editClick(formName) {
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
        editCommonInvoiceAsync(this.ruleForm).then(() => {
          this.$notify({ title: '成功', message: '修改申报信息成功', type: 'success', 'duration': 1500 })
          this.getCommonInvoiceListAsync()
          this.centerDialogVisible = false
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
        unitCode: '',
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
    dblClick(row, column, event) {
      this.choseData(row)
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
    },
    resetQueryForm(formName) {
      this.queryData = {
        skipCount: 0,
        maxResultCount: 30,
        name: ''
      }
      this.$refs[formName].resetFields()
      this.getCommonInvoiceListAsync()
    },
    onQuery() {
      this.getCommonInvoiceListAsync()
    }
  }
}
</script>

<style scoped>
.el-table td span {
  display: block;
  width: 250;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
