<template>
  <el-select ref="goodsTypeSelect" v-model="value" placeholder="包装类型" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.cnName +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getGoodsTypeSelect } from '@/api/select'

export default {
  name: 'GoodsTypeSelect',
  props: {
    value: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('setValue', val)
      }
    }
  },
  created() {
    this.getGoodsTypeSelect()
  },
  methods: {
    getGoodsTypeSelect() {
      getGoodsTypeSelect().then(resp => {
        this.options = resp.data
        console.info(resp)
      })
    }
  }
}
</script>
