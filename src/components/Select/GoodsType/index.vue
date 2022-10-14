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
import { getGoodsTypeCache, setGoodsTypeCache } from '@/api/cache'
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
      var list = getGoodsTypeCache()
      if (list === null || list === undefined) {
        getGoodsTypeSelect().then(resp => {
          this.options = resp.data
          setGoodsTypeCache(this.options)
        })
      } else {
        this.options = list
      }
    },
    selectChange(val) {
      this.$emit('goodsTypeSelectChange', val)
    }
  }
}
</script>
