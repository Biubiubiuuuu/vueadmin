<template>
  <div>
    <el-row :gutter="20" style="margin-bottom:15px;">
      <el-form ref="queryForm" :model="queryData" size="small">
        <el-col :sm="12" :md="10" :lg="8" :xl="5" :xs="24"> <el-form-item style="margin-top: 6px"> <el-input v-model="queryData.name" placeholder="请输入姓名" clearable size="medium" /></el-form-item></el-col>
        <el-col :sm="12" :md="10" :lg="8" :xl="5" :xs="24">
          <div style="margin-top: 5px">
            <el-button type="primary" size="medium" icon="el-icon-search" @click="onQuery">查询</el-button>
            <el-button plain size="medium" icon="el-icon-refresh" @click="resetQueryForm('queryForm')">重置</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <div
      v-if="!isShowOperation"
      slot="tip"
      class="el-upload__tip"
    >*单击选择需要的地址信息</div>
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
      <el-table-column
        prop="name"
        label="姓名"
        width="160"
        align="center"
      />
      <el-table-column
        prop="company"
        label="公司"
        width="160"
        align="center"
      />
      <el-table-column
        prop="countryId"
        label="国家/地区名称"
        width="185"
        align="center"
        :formatter="countryCnNameFormat"
      />
      <el-table-column
        prop="province"
        label="州/省"
        width="150"
        align="center"
      />
      <el-table-column
        prop="city"
        label="城市"
        width="150"
        align="center"
      />
      <el-table-column
        prop="postCode"
        label="邮编"
        width="150"
        align="center"
      />
      <el-table-column
        prop="address"
        label="地址"
        width="250"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.address" placement="top-start">
            <div slot="content">
              <span>{{ scope.row.address }}</span>
            </div>
            <span> {{ scope.row.address }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="电话"
        width="150"
        align="center"
      />
      <el-table-column
        prop="mobile"
        label="手机"
        width="150"
        align="center"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="150"
        align="center"
      />
      <el-table-column
        prop="taxID"
        label="税号"
        width="150"
        align="center"
      />
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
            @onConfirm="handleDataDelete(scope.row.id)"
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
      title="修改收件人"
      :visible.sync="centerDialogVisible"
      width="50%"
      :close-on-click-modal="false"
      :fullscreen="fullscreen"
      @close="closeDialogClick('ruleForm')"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogClick('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="editClick('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CountryId from '@/components/Select/CountryId'
import { getCommonConsigneeAsync, getCommonConsigneeListAsync, deleteCommonConsigneeAsync, editCommonConsigneeAsync } from '@/api/client'
import Pagination from '@/components/Pagination'
import { getCountryListCache } from '@/api/cache'

export default {
  name: 'SenderTable',
  components: {
    Pagination,
    CountryId
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
        name: ''
      },
      ruleForm: {
        name: '',
        company: '',
        countryId: '',
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
        countryId: [
          { required: true, message: '请选择国家/地区', trigger: 'blur' }
        ],
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
  created() {
    this.getCommonConsigneeListAsync()
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
    getCommonConsigneeListAsync() {
      this.loading = true
      getCommonConsigneeListAsync(this.queryData).then(resp => {
        this.tableData = resp.data
        this.total = resp.total
      })
      this.loading = false
    },
    handleDataEdit(id) {
      this.centerDialogVisible = true
      getCommonConsigneeAsync(id).then((resp) => {
        this.ruleForm = resp.data
      })
    },
    handleDataDelete(id) {
      deleteCommonConsigneeAsync(id).then(() => {
        this.$notify({ title: '成功', message: '删除成功', type: 'success', 'duration': 1500 })
        this.getCommonConsigneeListAsync()
      })
    },
    changePape(currentPage, pageSize) {
      this.queryData.skipCount = (currentPage - 1) * pageSize
      this.queryData.maxResultCount = pageSize
      this.getCommonConsigneeListAsync()
    },
    editClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        editCommonConsigneeAsync(this.ruleForm).then(() => {
          this.$notify({ title: '成功', message: '修改收件人成功', type: 'success', 'duration': 1500 })
          this.getCommonConsigneeListAsync()
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
        name: '',
        company: '',
        countryId: '',
        province: '',
        city: '',
        address: '',
        doorplate: '',
        postCode: '',
        email: '',
        telephone: '',
        mobile: '',
        taxID: ''
      }
      this.$refs[formName].resetFields()
    },
    dblClick(row, column, event) {
      this.choseData(row)
    },
    resetQueryForm(formName) {
      this.queryData = {
        skipCount: 0,
        maxResultCount: 30,
        name: ''
      }
      this.$refs[formName].resetFields()
      this.getCommonConsigneeListAsync()
    },
    onQuery() {
      this.getCommonConsigneeListAsync()
    },
    countryCnNameFormat(row, column) {
      var countrys = getCountryListCache()
      var country = countrys.filter((item) => item.id === row.countryId)[0]
      return country.cnName.toString() + '(' + country.enName.toString() + ')'
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
