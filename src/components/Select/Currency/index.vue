<template>
  <el-select ref="currencySelect" v-model="selectVal" placeholder="币种类型" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getCurrencyCache } from '@/api/cache'

export default {
  name: 'CurrencySelect',
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
    this.getCurrencySelect()
  },
  methods: {
    getCurrencySelect() {
      this.options = getCurrencyCache()
    }
  }
}
</script>
