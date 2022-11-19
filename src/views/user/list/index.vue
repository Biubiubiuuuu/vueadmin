<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="UserTabs">
          <el-tab-pane label="用户列表" name="userTab">
            <el-row :gutter="20" style="margin-bottom:15px;">
              <el-form ref="queryForm" :model="queryData" size="small">
                <el-col :sm="5" :xs="24"> <el-form-item style="margin-top: 6px"> <el-input v-model="queryData.name" placeholder="请输入姓名" clearable size="medium" /></el-form-item></el-col>
                <el-col :sm="6" :xs="24">
                  <el-form-item style="margin-top: 5px">
                    <el-button type="primary" size="medium" icon="el-icon-search" @click="onQuery">查询</el-button>
                    <el-button plain size="medium" icon="el-icon-refresh" @click="resetQueryForm('queryForm')">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-form>
            </el-row>
            <el-table
              v-loading="loading"
              :data="tableData"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              style="width: 100%; margin-bottom: 10px;"
              size="small"
              highlight-current-row
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
              <el-table-column label="姓名" prop="name" align="center" />
              <el-table-column label="账号" prop="clientCode" align="center" />
              <el-table-column label="类型" prop="clientType" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.clientType == 1 ? '主账号':'子账号' }} </span>
                </template>
              </el-table-column>
              <el-table-column label="状态" prop="status" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.status" :inactive-value="statusInactive" :active-value="statusActive" @change="statusChange(scope.row)" />
                </template>
              </el-table-column>
              <el-table-column label="创建人" prop="Creator" align="center" />
              <el-table-column label="创建时间" prop="CreationTime" align="center" />
              <el-table-column label="操作" fixed="right" width="142" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleDataEdit(scope.row.id)"
                  >修改</el-button>
                  <el-popconfirm
                    v-if="scope.row.clientType===2"
                    title="确定删除此条数据吗？"
                    style="display: revert;margin-left: 10px;"
                    @confirm="handleDataDelete(scope.row)"
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
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" size="small" style="position: absolute;right:25px;top:13px;" @click="clientClick">添加用户</el-button>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      width="35%"
      :fullscreen="fullscreen"
      :close-on-click-modal="false"
      @close="closeDialogClick()"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small">
        <el-row :gutter="20">
          <el-col :lg="24" :xs="24">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入姓名" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xs="24">
            <el-form-item label="账号" prop="clientCode">
              <el-input v-model="ruleForm.clientCode" placeholder="请输入账号" clearable size="small" />
            </el-form-item>
          </el-col>
          <el-col :lg="12" :xs="24">
            <el-form-item label="密码（默认：123456）" prop="clientPwd">
              <el-input v-model="ruleForm.clientPwd" placeholder="请输入密码（默认：123456）" clearable size="small" show-password />
            </el-form-item>
          </el-col>
          <el-col :lg="24" :xs="24">
            <el-table
              :data="ruleForm.contactInfo"
              size="small"
              style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
            >
              <el-table-column label="联系方式类型" min-width="125px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form-item :prop="'contactInfo.'+scope.$index +'.contactType'">
                    <el-select v-model="scope.row.contactType">
                      <el-option label="QQ" :value="1" />
                      <el-option label="微信" :value="2" />
                      <el-option label="手机号码" :value="3" />
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="显示名称" min-width="180px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form-item :prop="'contactInfo.'+scope.$index +'.key'">
                    <el-input v-model="scope.row.key" :placeholder="(language==='zh'? '请输入' :'Please enter' )" clearable size="small" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="联系号码" min-width="180px" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-form-item :prop="'contactInfo.'+scope.$index +'.value'">
                    <el-input v-model="scope.row.value" :placeholder="(language==='zh'? '请输入' :'Please enter' )" clearable size="small" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" min-width="150px">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleContentDataAdd()"
                  >添加</el-button>
                  <el-button
                    v-if="ruleForm.contactInfo.length >1"
                    size="mini"
                    type="danger"
                    @click="handleContentDataDelete( scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :lg="24" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="ruleForm.remark" placeholder="请输入备注" clearable size="small" type="textarea" />
            </el-form-item>
          </el-col>
          <el-col v-if="ruleForm.clientType!=1" :lg="24" :xs="24">
            <el-form-item label="屏蔽承运路线" prop="shieldRoutes">
              <el-transfer
                v-model="ruleForm.shieldRoutes"
                style="margin-top: 40px;"
                :data="carrierroutes"
                :titles="['可用', '已屏蔽']"
                :button-texts="['取消', '屏蔽']"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="ruleForm.clientType!=1" :lg="24" :xs="24">
            <el-form-item label="菜单权限" prop="menuIds">
              <el-tree
                ref="elMenuTree"
                style="margin-top: 35px;"
                :data="menus"
                show-checkbox
                :default-checked-keys="ruleForm.menuIds"
                node-key="id"
                :props="defaultProps"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="24" :xs="24">
            <el-form-item label="状态" prop="status">
              <el-tooltip :content="ruleForm.status == 1?'激活':'禁用'" placement="top">
                <el-switch v-model="ruleForm.status" :inactive-value="statusInactive" :active-value="statusActive" />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogClick()">取 消</el-button>
        <el-button type="primary" @click="addClick('ruleForm',false)">确 定</el-button>
        <el-button v-if="title==='添加用户'" type="warning" @click="addClick('ruleForm',true)">确认并继续</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getListAsync, changeStatusAsync, getAsync, postRemoveAsync, getTreeByCusWebAsync, getPrimaryClientCarrierRouteSelectAsync, postModifyAsync, postCreateAsync } from '@/api/client'
import Pagination from '@/components/Pagination'
import { jsonToTree } from '@/utils/tree'

export default {
  name: 'SenderTable',
  components: {
    Pagination
  },
  data() {
    return {
      language: this.$store.getters.language,
      title: '添加用户',
      UserTabs: 'userTab',
      tableData: [],
      total: 0,
      menus: [],
      carrierroutes: [],
      statusInactive: 2,
      statusActive: 1,
      centerDialogVisible: false,
      fullscreen: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      windowWidth: document.documentElement.clientWidth,
      queryData: {
        skipCount: 0,
        maxResultCount: 30,
        name: ''
      },
      ruleForm: {
        pid: 0,
        name: '',
        clientCode: '',
        clientPwd: '123456',
        contactInfo: [{
          key: 'QQ',
          value: '123456',
          contactType: 1,
          userType: 3
        }, {
          key: '私人手机',
          value: '13800138000',
          contactType: 3,
          userType: 3
        }],
        shieldRoutes: [],
        menuIds: [],
        mobile: '',
        QQ: '',
        remark: '',
        status: ''
      },
      rulesForm: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        clientCode: { required: true, message: '请输入账号', trigger: 'blur' },
        clientPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
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
    getList() {
      this.loading = true
      getListAsync(this.queryData).then(resp => {
        this.tableData = resp.data
        this.total = resp.total
      })
      this.loading = false
    },
    getTreeByCusWeb() {
      getTreeByCusWebAsync().then(resp => {
        this.menus = jsonToTree(resp.data, 0, 0, null)
      })
    },
    getClientCarrierRouteSelect() {
      getPrimaryClientCarrierRouteSelectAsync().then(resp => {
        this.carrierroutes = resp.data.map(x => {
          return { key: x.id, label: x.name }
        })
      })
    },
    changePape(currentPage, pageSize) {
      this.queryData.skipCount = (currentPage - 1) * pageSize
      this.queryData.maxResultCount = pageSize
      this.getList()
    },
    resetQueryForm(formName) {
      this.queryData = {
        skipCount: 0,
        maxResultCount: 30,
        name: ''
      }
      this.$refs.queryForm.resetFields()
      this.getList()
    },
    closeDialogClick() {
      this.centerDialogVisible = false
      this.$refs.ruleForm.resetFields()
    },
    onQuery() {
      this.getList()
    },
    clientClick() {
      this.centerDialogVisible = true
      this.getTreeByCusWeb()
      this.getClientCarrierRouteSelect()
      if (this.$refs.ruleForm !== undefined) {
        this.$refs.ruleForm.resetFields()
      }
    },
    statusChange(val) {
      var data = {
        'id': val.id,
        'status': val.status
      }
      changeStatusAsync(data).then(() => {
        this.$notify({ title: '成功', message: '操作成功', type: 'success', 'duration': 1500 })
        this.getList()
      })
    },
    addClick(formName, bool) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false
        }
        var arr = []
        this.ruleForm.menuIds = this.$refs.elMenuTree.getCheckedKeys()
        this.ruleForm.menuIds.forEach(x => {
          this.menus.filter(a => a.children).forEach(y => {
            y.children.forEach(b => {
              if (b.id === x) {
                if (arr.filter(c => c === y.id).length === 0) {
                  arr.push(y.id)
                }
              }
            })
          })
        })
        this.ruleForm.menuIds = this.ruleForm.menuIds.concat(arr)
        if (this.ruleForm.shieldRoutes) {
          this.ruleForm.shieldRoutes = this.ruleForm.shieldRoutes.join(',')
        }
        var client = this.tableData.filter(x => x.clientType === 1)
        if (client) {
          this.ruleForm.pid = client[0].id
          this.ruleForm.clientType = 2
        }
        if (this.ruleForm.id > 0) {
          postModifyAsync(this.ruleForm).then(() => {
            this.$notify({ title: '成功', message: '操作成功', type: 'success', 'duration': 1500 })
            this.getList()
            this.centerDialogVisible = bool
          })
        } else {
          postCreateAsync(this.ruleForm).then(() => {
            this.$notify({ title: '成功', message: '操作成功', type: 'success', 'duration': 1500 })
            this.getList()
            this.centerDialogVisible = bool
          })
        }
      })
    },
    handleDataEdit(id) {
      this.getTreeByCusWeb()
      this.getClientCarrierRouteSelect()
      getAsync(id).then(resp => {
        this.title = '修改用户'
        this.centerDialogVisible = true
        if (this.$refs.ruleForm !== undefined) {
          this.$refs.ruleForm.resetFields()
        }

        this.ruleForm = resp.data
        if (this.ruleForm.clientType === 2) {
          this.ruleForm.shieldRoutes = this.ruleForm.shieldRoutes ? this.ruleForm.shieldRoutes.split(',') : []
          var shieldRoutes = []
          this.ruleForm.shieldRoutes.forEach(item => {
            var data = this.carrierroutes.filter(x => parseInt(x.key) === parseInt(item.id))
            if (data) {
              shieldRoutes.push(parseInt(item))
            }
          })
          this.ruleForm.shieldRoutes = shieldRoutes
        }
      })
    },
    handleContentDataAdd() {
      this.ruleForm.contactInfo.push({
        key: '',
        value: '',
        contactType: 1
      })
    },
    handleContentDataDelete(data) {
      var index = this.ruleForm.contactInfo.indexOf(data)
      if (index !== -1) {
        this.ruleForm.contactInfo.splice(index, 1)
      }
    },
    handleDataDelete(data) {
      if (data.clientType === 1) {
        this.$message({ type: 'error', message: '禁止删除' })
        return
      }
      postRemoveAsync(data.id).then(() => {
        this.$notify({ title: '成功', message: '操作成功', type: 'success', 'duration': 1500 })
        this.getList()
      })
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
::v-deep .el-transfer-panel{
  width: 201px;
}
</style>

