<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 10px 0px 5px 0px;">
        <el-row>
          <el-form ref="formQuery" :model="formQuery" size="small" label-width="80px">
            <el-col :sm="12" :md="10" :lg="8" :xl="5" :xs="24">
              <el-form-item label="选择时间" prop="beginTime">
                <el-date-picker
                  v-model="formQuery.creationTime"
                  type="daterange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  style="width: 100%"
                  size="medium"
                />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="10" :lg="8" :xl="5" :xs="24">
              <div style="margin: 0px 0px 0px 10px">
                <el-button
                  type="primary"
                  size="medium"
                  icon="el-icon-search"
                  @click="onQuery"
                >查询</el-button>
                <el-button
                  plain
                  size="medium"
                  icon="el-icon-refresh"
                  @click="resetForm('formQuery')"
                >重置</el-button>
              </div>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="CollectionAccountTabs">
          <el-tab-pane label="充值记录" name="CollectionAccountTab">
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
              <el-table-column label="创建时间" prop="createTime" align="center" sortable />
              <el-table-column label="自定义收/付款时间" prop="cucustomTime" align="center" />
              <el-table-column label="金额" prop="amount" align="center" sortable />
              <el-table-column label="类型" prop="bankOperateType" align="center">
                <template slot-scope="scope">
                  {{ scope.row.bankOperateType ==="1"?'充值':scope.row.bankOperateType ==="1"?'提现':'-' }}
                </template>
              </el-table-column>
              <el-table-column label="支付方式" prop="realName" align="center">
                <template slot-scope="scope">
                  {{ scope.row.bankAccountType ==="1"?'银行账户':scope.row.bankAccountType ==="1"?'支付宝':'-' }}
                </template>
              </el-table-column>
              <el-table-column label="开户行" prop="recAccount.bankName" align="center" />
              <el-table-column label="收款人" prop="recAccount.realName" align="center" />
              <el-table-column label="账户余额" prop="overs" align="center" />
              <el-table-column label="备注" prop="account" align="center" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <Pagination :total="total" :change-pape="changePape" :page-size="formQuery.maxResultCount" />
      </div>
    </div>
  </div>
</template>

<script>
import { getWebClientRechargeListAsync } from '@/api/finance'
import Pagination from '@/components/Pagination'

export default {
  name: 'CollectionAccountPage',
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      loading: false,
      CollectionAccountTabs: 'CollectionAccountTab',
      tableData: [],
      formQuery: {
        maxResultCount: 30
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ],
        // 时间不能大于当前时间
        disabledDate: (time) => {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onQuery() {
      this.getList()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.getList()
    },
    getList() {
      var than = this
      const data = JSON.parse(JSON.stringify(than.formQuery))
      if (data.creationTime && data.creationTime[0] !== '') {
        data.beginTime = data.creationTime[0].substring(0, 10)
        data.endTime = data.creationTime[1].substring(0, 10)
      } else {
        data.beginTime = ''
        data.endTime = ''
      }
      getWebClientRechargeListAsync(data).then(resp => {
        this.tableData = resp.data
        this.total = resp.total
      })
    },
    changePape(currentPage, pageSize) {
      this.formQuery.skipCount = (currentPage - 1) * pageSize
      this.formQuery.maxResultCount = pageSize
      this.getList()
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
