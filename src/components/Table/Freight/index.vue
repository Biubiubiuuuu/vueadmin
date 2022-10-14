<template>
  <div>
    <el-table
      ref="table"
      size="medium"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      style="width: 100%; margin-bottom: 10px;"
      highlight-current-row
      :data="tableData"
      :stripe="true"
    >
      <el-table-column label="序号" align="center" width="50">
        <template slot-scope="scope">
          <div>
            {{ scope.$index+1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总费用" align="center" width="150" :sortable="true" :sort-method="sortByAllPrice">
        <template slot-scope="props">
          <el-tag type="danger">{{ props.row.AllPrice }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="运输线路（代码）" align="center" width="240">
        <template slot-scope="props">
          {{ props.row.routeName +'（' +props.row.routeCode+'）' }}
        </template>
      </el-table-column>
      <el-table-column label="计费重" align="center" width="150" prop="chargeWeight" />
      <el-table-column label="单价" align="center" width="150" prop="unitPrice" />
      <el-table-column label="时效" align="center" width="180" prop="effectiveness" />
      <el-table-column label="标签" align="center" width="280" prop="tags" show-overflow-tooltip />
      <el-table-column label="备注" align="center" width="380" prop="subnode" show-overflow-tooltip />
      <el-table-column label="展开" type="expand" fixed="right">
        <template slot-scope="props">
          <span v-html="props.row.subnode" />
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleAddOrder(scope.row.id)"
          >下单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'SenderTable',
  props: {
    isShowOperation: {
      type: Boolean,
      default: true
    },
    postData: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      fullscreen: false,
      windowWidth: document.documentElement.clientWidth
    }
  },
  created() {
    this.getCommonInvoiceListAsync(this.queryData)
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
    getData() {
      var than = this
      for (let i = 0; i < 110; i++) {
        (function(i) {
          setTimeout(function() {
            var obj1 = {}
            obj1.AllPrice = (Math.random() * 1000).toFixed(2)
            obj1.rou = i
            obj1.subnode = `1、以上价格未含当月燃油附加费，燃油附加费以网上公布为准；材积/5000，取单票实重或材积大者；<br/>
2、交接清单请备注：香港联邦IP-特惠/5000。单独报关加收250元/票，过港费人民币1元/KG最低50元，如有续页，加收续页费50元/页；请在交接清单上备注单独报关件；<br/>
3、发票上的申报价值超过一定金额时将额外产生香港出口报关费用，收费标准为：申报价值超过USD120需加收25元报关费；<br/>`
            than.tableData.push(obj1)
            than.tableData.sort(than.sortByAllPrice)
          }, 100)
        })(i)
      }
    },
    sortByAllPrice(obj1, obj2) {
      const val1 = obj1.AllPrice
      const val2 = obj2.AllPrice
      return val1 - val2
    }
  }
}
</script>

<style>
.el-tooltip__popper {
  max-width: 350px;
}
</style>

<style scoped>
.el-table td span {
  display: block;
  width: 250;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
