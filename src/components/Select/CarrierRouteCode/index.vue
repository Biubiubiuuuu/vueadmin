<template>
  <el-select ref="CarrierRouteCodeSelect" v-model="selectVal" placeholder="运输方式" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.code"
      :label="item.name +'('+item.code+')'"
      :value="item.code"
    />
  </el-select>
</template>

<script>
import { getCarrierRouteCache, setCarrierRouteCache } from '@/api/cache'
import { getCarrierRouteSelect } from '@/api/select'

export default {
  name: 'CarrierRouteCodeSelect',
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
        this.$emit('setValue', val)
      }
    }
  },
  created() {
    this.getCarrierRouteSelect()
  },
  methods: {
    getCarrierRouteSelect() {
      var list = getCarrierRouteCache()
      if (list === null || list === undefined) {
        getCarrierRouteSelect().then(resp => {
          this.options = resp.data
          setCarrierRouteCache(this.options)
        })
      } else {
        this.options = list
      }
    }
  }
}
</script>
