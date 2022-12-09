<template>
  <div>
    <div v-for="(item,index) in preWayBillExcelColumn" :key="index" style="padding: 0px 0px 15px 0px; ">
      <label style="margin-right: 10px;">{{ item.key }}</label>
      <label class="el-checkbox">
        <span :class="item.mycheckbox">
          <span class="el-checkbox__inner" />
          <input type="checkbox" aria-hidden="false" class="el-checkbox__original" :value="item.isCheck" @change="checkboxAll(item)">
        </span>
        <span class="el-checkbox__label">全选</span>
      </label>
      <el-checkbox-group v-model="selectedPreWayBillExcelColumn">
        <el-checkbox v-for="(data,i) in item.data" :key="i" v-dragging="{ item: data, list: item.data, group:item.key}" :label="data.label" @change="childCheckbox(item.key ,data)" />
      </el-checkbox-group>
      <el-divider />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Export',
  data() {
    return {
      selectAllChecked: false,
      isCheck: false,

      ruleForm: {
        selectsed: []
      },
      // 订单导出已勾选列
      selectedPreWayBillExcelColumn: [],
      // 订单导出自定义列
      preWayBillExcelColumn: [
        { 'key': '基础信息', 'isCheck': false, 'mycheckbox': 'el-checkbox__input', 'data': [{ 'label': '订单号', 'id': 0 }, { 'label': '运单号', 'id': 1 }, { 'label': '转单号', 'id': 2 }, { 'label': '订单状态', 'id': 3 }, { 'label': '货物类型', 'id': 4 }, { 'label': '包装类型', 'id': 5 }, { 'label': '预录重量', 'id': 6 }, { 'label': '件数', 'id': 7 }, { 'label': '承运路线代码', 'id': 8 }, { 'label': '承运路线名称', 'id': 9 }, { 'label': '目的地国家/地区', 'id': 10 }, { 'label': '备注', 'id': 11 }, { 'label': '申报币种', 'id': 12 }, { 'label': '扣退件', 'id': 13 }] },
        { 'key': '发件人信息', 'isCheck': false, 'mycheckbox': 'el-checkbox__input', 'data': [{ 'label': '发件人', 'id': 14 }, { 'label': '发件人公司', 'id': 15 }, { 'label': '发件人国家/地区', 'id': 16 }, { 'label': '发件人州/省', 'id': 17 }, { 'label': '发件人城市', 'id': 18 }, { 'label': '发件人邮编', 'id': 19 }, { 'label': '发件人电话', 'id': 20 }, { 'label': '发件人手机', 'id': 21 }, { 'label': '发件人邮箱', 'id': 22 }, { 'label': '发件人地址', 'id': 23 }, { 'label': '发件人税号', 'id': 24 }] },
        { 'key': '收件人信息', 'isCheck': false, 'mycheckbox': 'el-checkbox__input', 'data': [{ 'label': '收件人', 'id': 25 }, { 'label': '收件人公司名', 'id': 26 }, { 'label': '收件人州/省', 'id': 27 }, { 'label': '收件人城市', 'id': 28 }, { 'label': '收件人地址', 'id': 29 }, { 'label': '收件人门牌号', 'id': 30 }, { 'label': '收件人电话', 'id': 31 }, { 'label': '收件人手机', 'id': 32 }, { 'label': '收件人税号', 'id': 33 }, { 'label': '收件人邮箱', 'id': 34 }, { 'label': '收件人证件类型代码', 'id': 35 }, { 'label': '收件人证件号码', 'id': 36 }, { 'label': '收件人证件有效期', 'id': 37 }] },
        { 'key': '申报信息', 'isCheck': false, 'mycheckbox': 'el-checkbox__input', 'data': [{ 'label': 'sku', 'id': 38 }, { 'label': '英文品名', 'id': 39 }, { 'label': '中文品名', 'id': 40 }, { 'label': '数量', 'id': 41 }, { 'label': '计量单位', 'id': 42 }, { 'label': '单价', 'id': 43 }, { 'label': '商品单重', 'id': 44 }, { 'label': '海关编码', 'id': 45 }, { 'label': '配货信息', 'id': 46 }, { 'label': '销售地址', 'id': 47 }, { 'label': '商品图片地址', 'id': 48 }, { 'label': '材质', 'id': 49 }, { 'label': '用途', 'id': 50 }, { 'label': '品牌', 'id': 51 }, { 'label': '原产国', 'id': 52 }, { 'label': '行邮税号', 'id': 53 }, { 'label': '箱号', 'id': 54 }, { 'label': '是否带电', 'id': 55 }, { 'label': '是否带磁', 'id': 56 }, { 'label': '是否液体', 'id': 57 }, { 'label': '是否粉末', 'id': 58 }] },
        { 'key': '材积信息', 'isCheck': false, 'mycheckbox': 'el-checkbox__input', 'data': [{ 'label': '内部子单号(箱号)', 'id': 59 }, { 'label': '子单跟踪单号', 'id': 60 }, { 'label': '长', 'id': 61 }, { 'label': '宽', 'id': 62 }, { 'label': '高', 'id': 63 }, { 'label': '毛重', 'id': 64 }] },
        { 'key': '附件', 'isCheck': false, 'mycheckbox': 'el-checkbox__input', 'data': [{ 'label': '文件地址', 'id': 65 }] }]
    }
  },
  watch: {
    selectedPreWayBillExcelColumn: function(newVal, oldVal) {
      localStorage.setItem('selectedPreWayBillExcelColumn', JSON.stringify(newVal))
    },
    preWayBillExcelColumn: function(newVal, oldVal) {
      localStorage.setItem('preWayBillExcelColumn', JSON.stringify(newVal))
    }
  },
  created() {
    this.setCookies()
  },
  mounted() {
    this.$dragging.$on('dragged', () => {
    })
  },
  methods: {
    getColumns() {
      var results = []
      this.preWayBillExcelColumn.forEach(item => {
        item.data.forEach(item => {
          this.selectedPreWayBillExcelColumn.forEach(data => {
            if (item.label === data) {
              results.push(data)
            }
          })
        })
      })
      return results
    },
    selectAllChange(v) {
      this.selectAllChecked = v
      this.preWayBillExcelColumn.forEach(x => {
        x.data.forEach(data => {
          this.selectedPreWayBillExcelColumn.push(data)
        })
      })
    },
    setCookies() {
      var data = JSON.parse(localStorage.getItem('selectedPreWayBillExcelColumn'))
      this.$nextTick(() => {
        this.selectedPreWayBillExcelColumn = Array.isArray(data) ? data : []
      })

      var data2 = JSON.parse(localStorage.getItem('preWayBillExcelColumn'))
      this.$nextTick(() => {
        this.preWayBillExcelColumn = Array.isArray(data2) ? data2 : this.preWayBillExcelColumn
      })
    },
    checkboxAll(v) {
      const list = []
      for (const val of this.preWayBillExcelColumn) {
        if (v.key === val.key) {
          val['isCheck'] = !val.isCheck
          if (val['isCheck']) {
            val['mycheckbox'] = 'el-checkbox__input is-checked'
            var datas = this.selectedPreWayBillExcelColumn.concat(v.data.map(x => { return x.label }))
            this.selectedPreWayBillExcelColumn = datas.filter(function(item, index) {
              return datas.indexOf(item) === index
            })
          } else {
            val['mycheckbox'] = 'el-checkbox__input'
            const selects = []
            this.selectedPreWayBillExcelColumn.forEach(item => {
              var data = val['data']
              if (data.filter(x => x.label === item).length === 0) {
                selects.push(item)
              }
            })
            this.selectedPreWayBillExcelColumn = selects
          }
        }
        list.push(val)
      }
      this.preWayBillExcelColumn = list
    },
    childCheckbox(k, v) {
      var datas = this.selectedPreWayBillExcelColumn
      const list = []
      for (const val of this.preWayBillExcelColumn) {
        if (k === val.key) {
          var data = val['data']
          if (val['isCheck']) {
            // 全选按钮取消勾选
            val['isCheck'] = !val['isCheck']
            var selects = []
            data.forEach(x => {
              datas.forEach(a => {
                if (a === x.label) {
                  selects.push(a)
                }
              })
            })
            // 1.全部勾选
            // 2.部分勾选
            // 3.未勾选
            if (selects.length === data.length) {
              val['mycheckbox'] = 'el-checkbox__input is-checked'
              val['isCheck'] = !val['isCheck']
            } else if (selects.length > 0) {
              val['mycheckbox'] = 'el-checkbox__input is-indeterminate'
            } else {
              val['mycheckbox'] = 'el-checkbox__input'
            }
          } else {
            var selects2 = []
            data.forEach(x => {
              datas.forEach(a => {
                if (a === x.label) {
                  selects2.push(a)
                }
              })
            })
            // 1.全部勾选
            // 2.部分勾选
            // 3.未勾选
            if (selects2.length === data.length) {
              val['mycheckbox'] = 'el-checkbox__input is-checked'
              val['isCheck'] = !val['isCheck']
            } else if (selects2.length > 0) {
              val['mycheckbox'] = 'el-checkbox__input is-indeterminate'
            } else {
              val['mycheckbox'] = 'el-checkbox__input'
            }
          }
        }
        list.push(val)
      }
      this.preWayBillExcelColumn = list
    }
  }
}
</script>
