<template>
  <el-select ref="unitTypeSelect" v-model="selectVal" placeholder="计量单位" :size="size" filterable clearable :disabled="disabled ">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getUnitTypeCache, setUnitTypeCache } from '@/api/cache'
import { getUnitTypeSelect } from '@/api/select'

export default {
  name: 'UnitTypeSelect',
  props: {
    value: {
      type: Number,
      default: undefined
    },
    size: {
      type: String,
      default: 'small'
    },
    disabled: {
      type: Boolean,
      default: false
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
    this.getUnitTypeSelect()
  },
  methods: {
    getUnitTypeSelect() {
      var list = getUnitTypeCache()
      if (list === null || list === undefined) {
        getUnitTypeSelect().then(resp => {
          this.options = resp.data
          setUnitTypeCache(this.options)
        })
      } else {
        this.options = list
      }
    }
  }
}
</script>
