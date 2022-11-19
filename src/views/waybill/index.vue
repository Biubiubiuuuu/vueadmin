<template>
  <div class="main">
    <div class="dashboard-container">
      <!--筛选条件-->
      <el-row style="background-color: #ffffff; padding: 5px 20px;min-height: 50px;">
        <el-form
          ref="formQuery"
          :model="formQuery"
          size="small"
        >
          <el-col
            :lg="4"
            :xs="24"
          >
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
                  label="服务商单号"
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
                rows="8"
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
              label="运输方式"
              prop="carrierRouteId"
            >
              <CarrierRouteId
                v-model="formQuery.carrierRouteId"
                @setValue="(val) => (formQuery.carrierRouteId = val)"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="目的地"
              prop="countryId"
            >
              <CountryId
                v-model="formQuery.countryId"
                @setValue="(val) => (formQuery.countryId = val)"
              />
            </el-form-item>
          </el-col>
          <el-col
            :lg="4"
            :xs="24"
          >
            <el-form-item
              label="选择时间"
              prop="creationTime"
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
            :lg="4"
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
    <div class="dashboard-container" style="background-color: #ffffff; padding: 15px 20px 15px 20px;">
      <el-table
        ref="waybillTable"
        v-loading="loading"
        stripe
        border
        :row-class-name="rowClassName"
        :data="tableData"
        :header-cell-style="{
          color: '#135561',
          'font-weight': '500',
        }"
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
          label="订单号"
          align="center"
        >
          <template slot-scope="props">
            <el-link>{{ props.row.preBillCode }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="wayBillCode"
          label="运单号"
          align="center"
        />
        <el-table-column
          label="转单号"
          align="center"
        >
          <template slot-scope="props">
            <el-link>{{ props.row.TranBillCode }}</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="运输方式"
          align="center"
        />
        <el-table-column
          prop="code"
          label="目的地"
          align="center"
        />
        <el-table-column
          label="重量（KG）"
          min-width="100px"
          align="center"
        >
          <template slot-scope="props">
            <span>预录重量：{{ props.row.buildDate }}</span><br>
            <span>实重{{ props.row.rTotWeight }}</span>
            <span>计费重：{{ props.row.rNormWeight }}</span>
            <span>材积重：{{ props.row.rTotalVol }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="件数"
          align="center"
          sortable
        />
        <el-table-column
          prop="code"
          label="状态"
          align="center"
        >
          <template slot-scope="props">
            <el-tag>{{ props.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="物流信息"
          align="center"
        />
        <el-table-column
          prop="code"
          label="日期"
          align="center"
        >
          <template slot-scope="props">
            <span>到货日期：{{ props.row.buildDate }}</span><br>
            <span>预录日期：{{ props.row.buildDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-backtop>
      <div width="100%" title="返回顶部">
        <i class="el-icon-top" />
      </div>
    </el-backtop>
  </div>
</template>

<script>
import CarrierRouteId from '@/components/Select/CarrierRouteId'
import CountryId from '@/components/Select/CountryId'
import { getList } from '@/api/prewaybill'

export default {
  name: 'Prewaybill',
  components: {
    CarrierRouteId,
    CountryId
  },
  data() {
    return {
      inputCodeType: 'textarea',
      formQuery: {

      },
      tableData: []
    }
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      row.xh = rowIndex + 1
    },
    isLikeChange(value) {
      this.formQuery.code = ''
      this.inputCodeType = value ? 'text' : 'textarea'
    },
    getList() {

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
</style>
