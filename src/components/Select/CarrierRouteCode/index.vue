<template>
  <el-select ref="CarrierRouteCodeSelect" v-model="selectVal" placeholder="运输方式" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.code"
      :label="item.name +'('+item.code+')'"
      :value="item.code"
      :disabled="item.disabled"
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
          var data = { disabled: true, code: '-', carrierId: 1, id: 0, name: '请选择承运路线' }
          var datas = []
          datas.push(data)
          this.options = datas.concat(resp.data)
          setCarrierRouteCache(this.options)
        })
      } else {
        this.options = list
      }
    }
  }
}
</script>
