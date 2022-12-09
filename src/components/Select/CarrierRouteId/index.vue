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
import { getCarrierRouteCache, setCarrierRouteCache } from '@/api/cache'
import { getCarrierRouteSelect } from '@/api/select'

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
    },
    dataChange(v) {
      this.getExtraServiceKindsHanld(v)
    }
  }
}
</script>
