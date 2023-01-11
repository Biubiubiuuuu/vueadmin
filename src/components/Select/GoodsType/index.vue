<template>
  <el-select ref="goodsTypeSelect" v-model="selectVal" placeholder="货物类型" filterable clearable @change="selectChange">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getGoodsTypeCache } from '@/api/cache'

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
      this.options = getGoodsTypeCache()
    },
    selectChange(val) {
      this.$emit('goodsTypeSelectChange', val)
    }
  }
}
</script>
