<template>
  <el-select ref="carrierRouteSelect" v-model="selectVal" placeholder="运输方式" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getCarrierRouteSelect } from '@/api/select'

export default {
  name: 'CarrierRouteSelect',
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
    this.getCarrierRouteSelect()
  },
  methods: {
    getCarrierRouteSelect() {
      getCarrierRouteSelect().then(resp => {
        this.options = resp.data
        console.info(resp)
      })
    }
  }
}
</script>
