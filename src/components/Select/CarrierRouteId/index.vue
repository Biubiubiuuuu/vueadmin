<template>
  <el-select ref="CarrierRouteIdSelect" v-model="selectVal" placeholder="运输方式" filterable clearable @change="dataChange">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.code+')'"
      :value="item.id"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
import { getCarrierRouteCache } from '@/api/cache'

export default {
  name: 'CarrierRouteIdSelect',
  props: {
    value: {
      type: Number,
      default: undefined
    },
    getExtraServiceKindsHanld: {
      type: Function,
      default: null
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
    this.getCarrierRouteSelect()
  },
  methods: {
    getCarrierRouteSelect() {
      this.options = getCarrierRouteCache()
    },
    dataChange(v) {
      this.getExtraServiceKindsHanld(v)
    }
  }
}
</script>
