<template>
  <div class="main">
    <div class="dashboard-container">
      <!--筛选条件-->
      <el-row style="background-color: #ffffff; padding: 5px 20px 15px 20px">
        <el-form ref="formQuery" :model="formQuery" size="small">
          <el-col :lg="4" :xs="24" style="height: 130px">
            <el-form-item
              label="单号查询"
              prop="codeType"
            >
              <el-checkbox
                v-model="formQuery.isLike"
                prop="isLike"
                label="true"
                style="float: right"
                @change="isLikeChange"
              >模糊匹配</el-checkbox>
              <el-select v-model="formQuery.codeType">
                <el-option
                  label="订单号"
                  :value="1"
                />
                <el-option
                  label="运单号"
                  :value="2"
                />
                <el-option
                  label="转单号"
                  :value="3"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="code"
              class="custransform"
            >
              <el-input
                ref="codetextarea"
                v-model="formQuery.code"
                :type="inputCodeType"
                rows="3"
                clearable
                resize="none"
                :placeholder="
                  inputCodeType === 'text'
                    ? '请输入单号查询(模糊匹配)'
                    : '请输入单号查询，多个单号请回车换行输入'
                "
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="用户"
              prop="clientId"
            >
              <Client
                v-model="formQuery.clientId"
                :multiple="true"
                @setValue="(val) => (formQuery.clientId = val)"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="客户账单类型"
              prop="clientType"
            >
              <el-select v-model="formQuery.clientType" clearable>
                <el-option
                  label="主账号"
                  :value="1"
                />
                <el-option
                  label="子账号"
                  :value="2"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="账单状态"
              prop="clientType"
            >
              <el-select v-model="formQuery.status" clearable>
                <el-option
                  label="未审核"
                  :value="1"
                />
                <el-option
                  label="未核销"
                  :value="2"
                />
                <el-option
                  label="已核销"
                  :value="3"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="是否财务暂扣"
              prop="isFeeHold"
            >
              <el-select v-model="formQuery.isFeeHold" clearable>
                <el-option
                  label="否"
                  value="false"
                />
                <el-option
                  label="是"
                  value="true"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            :lg="5"
            :xl="4"
            :xs="24"
          >
            <el-form-item
              label="选择时间"
              prop="beginTime"
            >
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
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="5"
            :xs="24"
          >
            <el-form-item style="margin-top: 27px">
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
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <div
      class="dashboard-container"
      style="background-color: #ffffff; padding: 20px 20px 15px 20px"
    >
      <el-table
        ref="billTab"
        v-loading="loading"
        :default-expand-all="true"
        :data="tableData"
        :header-cell-style="{ background: '#eef1f6', color: '#606266'}"
        show-summary
        :summary-method="getAllSummaries"
        element-loading-text="拼命加载中"
        class="tabl1"
        height="580"
      >
        <el-table-column
          type="expand"
        >
          <template slot-scope="props">
            <div class="conWrap" style="text-align: left;line-height: 16px;font-size: 14px;position: relative;">
              <el-row style="height: 70px;">
                <el-col span="3">
                  <el-row>
                    <el-col style="margin-top: 5px;">运单号：<el-link :underline="false" type="primary">{{ props.row.wayBillCode }}</el-link></el-col>
                    <el-col style="margin-top: 5px;">转单号：{{ props.row.tranBillCode }}</el-col>
                    <el-col style="margin-top: 5px;">订单号：{{ props.row.preBillCode }}</el-col>
                  </el-row>
                </el-col>
                <el-col span="3">
                  <el-row>
                    <el-col style="margin-top: 5px;">承运路线：<el-tooltip content="123123123123123123" placement="top">123123123123123123</el-tooltip> </el-col>
                    <el-col style="margin-top: 5px;">目的地：{{ props.row.countryName }}</el-col>
                    <el-col style="margin-top: 5px;">包裹类型：{{ props.row.goodsType | goodsTypeFilter }}</el-col>
                  </el-row>
                </el-col>
                <el-col span="3">
                  <el-row>
                    <el-col style="margin-top: 5px;">总实重：{{ props.row.realWeight }} KG</el-col>
                    <el-col style="margin-top: 5px;">入仓计费重：{{ props.row.chargeWeight }} KG</el-col>
                    <el-col style="margin-top: 5px;">总材积重：{{ props.row.volumeWeight }} KG</el-col>
                  </el-row>
                </el-col>
                <el-col span="3">
                  <el-row>
                    <el-col style="margin-top: 5px;">账单类型：{{ props.row.billType ===1 ?'运单':'客户' }}</el-col>
                    <el-col v-if="props.row.status === 1" style="margin-top: 5px;">状态： 有效</el-col>
                    <el-col v-if="props.row.status === 2" style="margin-top: 5px;">状态：无效</el-col>
                    <el-col style="margin-top: 5px;">创建时间：{{ props.row.buildTime }}</el-col>
                  </el-row>
                </el-col>
                <el-col span="4">
                  <el-row>
                    <el-col style="margin-top: 5px;">摘要：{{ props.row.remark }}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <el-table
              stripe
              :show-header="false"
              :data="props.row.clientExpendBillItemsInfo"
              show-summary
              :summary-method="getSummaries"
              class="chiTable"
            >
              <el-table-column width="48" />
              <el-table-column label="项目名称" align="center" width="230" prop="projectName">
                <template slot-scope="scope">
                  {{ scope.row.projectName }}
                </template>
              </el-table-column>
              <el-table-column label="项目费用" align="center" width="190" prop="projectCost">
                <template slot-scope="scope">
                  {{ scope.row.projectCost }}
                </template>
              </el-table-column>
              <el-table-column label="项目类型" align="center" width="190" prop="projectType">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.projectType ===1">运费</el-tag>
                  <el-tag v-if="scope.row.projectType ===2" type="info">附加费</el-tag>
                  <el-tag v-if="scope.row.projectType ===3" type="warning">差额账单</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="子账单状态" align="center" width="180" prop="status">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.status ===1" effect="dark" type="warning">未审核</el-tag>
                  <el-tag v-if="scope.row.status ===2" effect="dark" type="danger">未核销</el-tag>
                  <el-tag v-if="scope.row.status ===3" effect="dark" type="success">已核销</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="备注" align="center" width="230" prop="remark" show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.remark }}
                </template>
              </el-table-column>
              <el-table-column label="是否差额账单" align="center" width="180" prop="isDifference">
                <template slot-scope="scope">
                  {{ scope.row.isDifference?'是':'否' }}
                </template>
              </el-table-column>
              <el-table-column label="创建时间" align="center" width="180" prop="buildTime">
                <template slot-scope="scope">
                  {{ scope.row.buildTime }}
                </template>
              </el-table-column>
              <el-table-column label="审核时间" align="center" width="180" prop="checkedTime">
                <template slot-scope="scope">
                  {{ scope.row.checkedTime }}
                </template>
              </el-table-column>
              <el-table-column label="核销时间" align="center" width="180" prop="writtenOffTime">
                <template slot-scope="scope">
                  {{ scope.row.writtenOffTime }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" align="center" width="230" />
        <el-table-column label="项目费用(元)" align="center" width="190" />
        <el-table-column label="项目类型" align="center" width="190" />
        <el-table-column label="状态" align="center" width="180" />
        <el-table-column label="备注" align="center" width="230" />
        <el-table-column label="是否差额账单" align="center" width="180" />
        <el-table-column label="创建时间" align="center" width="180" />
        <el-table-column label="审核时间" align="center" width="180" />
        <el-table-column label="核销时间" align="center" width="180" />
      </el-table>
      <el-divider />
      <Pagination
        :total="total"
        style="padding-top: 15px"
        :change-pape="changePape"
        :page-size="formQuery.maxResultCount"
      />
    </div>

    <el-backtop>
      <div width="100%" title="返回顶部">
        <i class="el-icon-top" />
      </div>
    </el-backtop>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Client from '@/components/Select/Client'
import { getList } from '@/api/finance'
import { getGoodsTypeCache } from '@/api/cache'
let that

export default {
  name: 'FinaceBill',
  components: {
    Client,
    Pagination
  },
  filters: {
    goodsTypeFilter(val) {
      const item = that.goodsList.find((f) => f.id === val)
      return item ? item.name : '--'
    }
  },
  data() {
    return {
      goodsList: getGoodsTypeCache(),
      loading: false,
      total: 0,
      expands: [],
      formQuery: {
        codeType: 1,
        maxResultCount: 30
      },
      tableData: [],
      inputCodeType: 'textarea',
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
    if (this.windowWidth < 400) {
      this.drawerSize = '100%'
    }
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.billTab.doLayout()
    })
  },
  beforeCreate() {
    that = this
  },
  methods: {
    isLikeChange(value) {
      this.formQuery.code = ''
      this.inputCodeType = value ? 'text' : 'textarea'
    },
    onQuery() {
      this.getList()
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.formQuery.isLike = false
      this.isLikeChange(this.formQuery.isLike)
      this.getList()
    },
    changePape(currentPage, pageSize) {
      this.formQuery.skipCount = (currentPage - 1) * pageSize
      this.formQuery.maxResultCount = pageSize
      this.getList()
    },
    getList() {
      var than = this
      const data = JSON.parse(JSON.stringify(than.formQuery))
      if (data.code) {
        data.code = data.code.replace(/[\r\n]/g, ',').split(',')
      }
      if (!data.clientId) {
        data.clientId = undefined
      }
      if (!data.clientType) {
        data.clientType = undefined
      }
      if (data.status === []) {
        delete data.status
      }
      if (data.isFeeHold !== '') {
        if (data.isFeeHold === 'false') {
          data.isFeeHold = false
        }
      }
      if (data.creationTime && data.creationTime[0] !== '') {
        data.beginTime = data.creationTime[0].substring(0, 10)
        data.endTime = data.creationTime[1].substring(0, 10)
      } else {
        data.beginTime = ''
        data.endTime = ''
      }
      getList(data).then(resp => {
        this.tableData = resp.data
        this.total = resp.total
      })
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 2) {
          sums[index] = '合计：' + this.isum(data.map(item => Number(item['projectCost'])))
          return
        }
        if (index === 3) {
          sums[index] = '未审核：' + this.isum(data.filter(x => x.status === 1).map(item => Number(item['projectCost'])))
        }
        if (index === 4) {
          sums[index] = '未核销：' + this.isum(data.filter(x => x.status === 2).map(item => Number(item['projectCost'])))
        }
        if (index === 5) {
          sums[index] = '已核销：' + this.isum(data.filter(x => x.status === 3).map(item => Number(item['projectCost'])))
        }
      })
      return sums
    },
    getAllSummaries(param) {
      const { columns, data } = param
      const itemData = data.map(x => x.clientExpendBillItemsInfo.map(y => ({ projectCost: y.projectCost, status: y.status })))
      const arr = Array.from(itemData)
      const sums = []
      columns.forEach((column, index) => {
        if (index === 2) {
          sums[index] = '合计：' + this.asum(arr)
          return
        }
        if (index === 3) {
          sums[index] = '未审核：' + this.asum(arr.map(x => x.filter(y => y.status === 1)))
        }
        if (index === 4) {
          sums[index] = '未核销：' + this.asum(arr.map(x => x.filter(y => y.status === 2)))
        }
        if (index === 5) {
          sums[index] = '已核销：' + this.asum(arr.map(x => x.filter(y => y.status === 3)))
        }
      })
      return sums
    },
    isum(arr) {
      return arr.reduce(function (total, value) {
        return total + value
      }, 0)
    },
    asum(arr) {
      var sum = 0
      arr.forEach(function(val, idx, arr) {
        val.forEach(function(val2, idx2, val) {
          sum += val2.projectCost
        }, 0)
      }, 0)
      return sum
    },
    clickRowHandle(row) {
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id)
      } else {
        this.expands.push(row.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #eaedf1 !important;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.custransform {
  transform: translateY(-7px);
}

.custransbtn {
  transform: translateY(-20px);
  -webkit-transform: translateY(5px);
  -o-transform: translateY(-20px);
  -moz-transform: translateY(-20px);
}

.custransbtn button {
  margin-top: 10px;
}

.el-col {
  margin-right: 50px;
}

.el-form-item {
  margin-right: 0 !important;
}
.el-form-item__label {
  position: absolute;
}
.el-form-item__content {
  width: 100%;
}
.el-select,
.el-input_inner .el-textarea_inner {
  width: 100%;
}

::v-deep :focus {
  outline: 0;
}

.el-table::before{
  background-color: white;
}

.conWrap {
            height: 70px;
            background: #E5E5E5;
            line-height: 44px;
            padding-left: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            line-height: 19px;
            color: #333333;
        }

            .conWrap > span {
                line-height: 44px;
            }

  ::v-deep  .expanded {
    display: none;
  }

.chiTable {
  border: 1px solid #EBEEF5;
}

  ::v-deep .chiTable .el-table__body-wrapper{
    overflow: hidden;
  }

  ::v-deep .tabl1 .el-table__row{
    overflow: hidden;
  }
</style>
