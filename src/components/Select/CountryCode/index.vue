<template>
  <el-select ref="CountryCodeSelect" v-model="selectVal" placeholder="国家/地区列表" filterable clearable @change="$forceUpdate()">
    <el-option
      v-for="item in options"
      :key="item.code"
      :label="item.code +'-'+ item.cnName +'('+item.enName+')'"
      :value="item.code"
    />
  </el-select>
</template>

<script>
import { getCountryListCache, setCountryListCache } from '@/api/cache'
import { getCountrySelect } from '@/api/select'

export default {
  name: 'CountryCodeSelect',
  props: {
    value: {
      type: String,
      default: ''
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
        this.value = val
        this.$emit('setValue', val)
      }
    }
  },
  created() {
    this.getCountrySelect()
  },
  methods: {
    getCountrySelect() {
      var list = getCountryListCache()
      if (list === null || list === undefined) {
        getCountrySelect().then(resp => {
          this.options = resp.data
          setCountryListCache(this.options)
        })
      } else {
        this.options = list
      }
    }
  }
}
</script>
