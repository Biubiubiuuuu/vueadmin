<template>
  <el-select ref="countrySelect" v-model="selectVal" placeholder="国家列表" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.cnName +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getCountrySelect } from '@/api/select'

export default {
  name: 'CountrySelect',
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
      getCountrySelect().then(resp => {
        this.options = resp.data
        console.info(resp)
      })
    },
    change($event) {
      this.$emit('change', $event)
    }
  }
}
</script>
