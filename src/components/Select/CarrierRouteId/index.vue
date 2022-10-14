<template>
  <el-select ref="CarrierRouteIdSelect" v-model="selectVal" placeholder="运输方式" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getCarrierRouteCache, setCarrierRouteCache } from '@/api/cache'
import { getCarrierRouteSelect } from '@/api/select'

export default {
  name: 'CarrierRouteIdSelect',
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
