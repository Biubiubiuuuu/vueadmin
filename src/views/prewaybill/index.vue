<template>
  <div class="dashboard-container">
    <!--筛选条件-->
    <el-row :gutter="20">
      <el-form ref="formQuery" :model="formQuery" class="demo-ruleForm" size="mini">
        <el-col :span="4">
          <el-form-item label="单号查询" prop="codeType">
            <el-select v-model="formQuery.codeType">
              <el-option label="订单号" :value="1" />
              <el-option label="服务商单号" :value="2" />
              <el-option label="转单号" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item prop="code" class="custransform">
            <el-input
              ref="codetextarea"
              v-model="formQuery.code"
              type="textarea"
              rows="8"
              clearable
              resize="none"
              placeholder="请输入单号查询（精准匹配）"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="运输方式" prop="carrierRouteId">
            <CarrierRoute v-model="formQuery.carrierRouteId" @setValue="(val) => formQuery.carrierRouteId = val" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="目的地" prop="countryId">
            <Country v-model="formQuery.countryId" @setValue="(val) => formQuery.countryId = val" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="用户" prop="clientId">
            <Client v-model="formQuery.clientId" @setValue="(val) => formQuery.clientId = val" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否已打印" prop="isPrint">
            <el-select v-model="formQuery.isPrint" placeholder="是否已打印">
              <el-option label="未打印" value="true" />
              <el-option label="已打印" value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="收件人" prop="consigneeName">
            <el-input v-model="formQuery.consigneeName" placeholder="收件人" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="开始时间" prop="creationTimeStart">
            <el-date-picker v-model="formQuery.creationTimeStart" type="date" placeholder="选择开始时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="截止时间" prop="creationTimeEnd">
            <el-date-picker v-model="formQuery.creationTimeEnd" type="date" placeholder="选择截止时间" style="width: 100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item style="margin-top: 27px;">
            <el-button type="primary" size="medium" icon="el-icon-search" @click="onQuery">查询</el-button>
            <el-button plain size="medium" icon="el-icon-refresh" @click="resetForm('formQuery')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <!--订单状态查询-->
      <el-col :span="20">
        <el-button v-for="(item,index) in stateBtns" :key="index" plain @click="onStateClick(item.value)">{{ item.label }}</el-button>
      </el-col>
    </el-row>
    <!--操作按钮-->
    <el-row class="custransform">
      <el-button type="primary" size="medium" @click="onSubmit">创建订单</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">导入订单</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">获取服务商单号</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">提交扣件</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">提交退件</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">取消扣退件</el-button>
      <el-button type="danger" size="medium" @click="onSubmit">删除</el-button>
      <el-button type="danger" size="medium" @click="onSubmit">彻底删除</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">打印标签</el-button>
      <el-button type="primary" size="medium" @click="onSubmit">打印商业发票</el-button>
    </el-row>
    <!--订单table-->
    <el-table
      ref="prewaybillTable"
      v-loading="loading"
      stripe
      border
      :row-class-name="rowClassName"
      :data="tableData"
      :header-cell-style="{
        'color': '#135561',
        'font-weight': '500'
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-for="(item,index) in column"
        :key="index"
        :type="item.type"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        sortable
        :show-overflow-tooltip="item.tooltip"
      />
      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleClick(scope.row)">复制</el-button>
          <el-button type="danger" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import CarrierRoute from '@/components/Select/CarrierRoute'
import Country from '@/components/Select/Country'
import Client from '@/components/Select/Client'

const column = [
  {
    label: '',
    key: '',
    width: 40,
    align: 'center',
    tooltip: true,
    type: 'selection'
  }, {
    label: '序号',
    key: 'index',
    width: 55,
    align: 'center',
    type: 'index'
  }, {
    label: '订单号',
    key: 'preBillCode',
    width: 190,
    align: 'center',
    tooltip: true
  }, {
    label: '服务商单号',
    key: 'preTranCode',
    width: 190,
    align: 'center',
    tooltip: true
  },
  {
    label: '运输方式',
    key: 'carrierRouteName',
    width: 190,
    align: 'center',
    tooltip: true
  }, {
    label: '目的国家',
    key: 'carrierRouteName',
    width: 150,
    align: 'center',
    tooltip: true
  },
  {
    label: '收件人',
    key: 'consignee.name',
    width: 150,
    align: 'center',
    tooltip: true
  }, {
    label: '状态',
    key: 'recState',
    width: 90,
    align: 'center',
    tooltip: true
  },
  {
    label: '是否打印',
    key: 'isPrint',
    width: 120,
    align: 'center',
    tooltip: true
  },
  {
    label: '创建时间',
    key: 'creationTime',
    width: 150,
    align: 'center'
  },
  {
    label: '创建人',
    key: 'clientName',
    width: 150,
    align: 'center'
  }
]

export default {
  name: 'Prewaybill',
  components: {
    Pagination,
    CarrierRoute,
    Country,
    Client
  },
  data() {
    return {
      tableData: [{ 'preBillCode': '12123121231231232131233123' }, { 'preBillCode': '123123213' }], // 订单数据list
      column: column, // 表格列
      formQuery: {
        codeType: 1,
        code: '',
        carrierRouteId: '',
        countryId: '',
        clientId: '',
        isPrint: '',
        consigneeName: '',
        creationTimeStart: '',
        creationTimeEnd: ''
      }, // 查询条件form
      total: 0, // 总记录数
      stateBtns: [{
        'value': 0,
        'label': '全部'
      }, {
        'value': 1,
        'label': '已预录'
      }, {
        'value': 2,
        'label': '草稿'
      }, {
        'value': 3,
        'label': '已收货'
      }, {
        'value': 4,
        'label': '已出仓'
      }, {
        'value': 10,
        'label': '已删除'
      }]
    }
  },
  mounted() {

  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onQuery() {
      console.info(this.formQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-form-item{
  width: 250px;
}

.el-select  {
  width: 100%;
}

.el-input {
  width: 100%;
}

.custransform{
  transform:translateY(-20px);
  -webkit-transform:translateY(-20px);
  -o-transform:translateY(-20px);
  -moz-transform:translateY(-20px);
}
</style>
