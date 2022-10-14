<template>
  <el-select ref="CountryIdSelect" v-model="selectVal" placeholder="国家/地区列表" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.code +'-'+ item.cnName +'('+item.enName+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getCountryListCache, setCountryListCache } from '@/api/cache'
import { getCountrySelect } from '@/api/select'

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
