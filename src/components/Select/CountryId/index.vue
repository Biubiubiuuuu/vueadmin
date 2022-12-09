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
          var country = { disabled: true, pid: 0, code: '-', code2: '-', enName: 'Please select a country/region', cnName: '请选择国家/地区', cnLikeName: '请选择国家/地区', dhlRemote: 1, fedexRemote: 1, upsRemote: 1, tntRemote: 1, postlen: 1, spellCode: '1', id: 0 }
          var countrys = []
          countrys.push(country)
          this.options = countrys.concat(resp.data)
          setCountryListCache(this.options)
        })
      } else {
        this.options = list
      }
    }
  }
}
</script>
