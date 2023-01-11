<template>
  <el-select ref="CountryIdSelect" v-model="selectVal" placeholder="国家/地区列表" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.code +'-'+ item.cnName +'('+item.enName+')'"
      :value="item.id"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
import { getCountryListCache } from '@/api/cache'

export default {
  name: 'CountryIdSelect',
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
    this.getCountrySelect()
  },
  methods: {
    getCountrySelect() {
      this.options = getCountryListCache()
    }
  }
}
</script>
