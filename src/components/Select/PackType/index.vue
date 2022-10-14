<template>
  <el-select ref="packTypeSelect" v-model="selectVal" placeholder="包装方式" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.code+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getPackTypeCache, setPackTypeCache } from '@/api/cache'
import { getPackTypeSelect } from '@/api/select'

export default {
  name: 'PackTypeSelect',
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
    this.getPackTypeSelect()
  },
  methods: {
    getPackTypeSelect() {
      var list = getPackTypeCache()
      if (list === null || list === undefined) {
        getPackTypeSelect().then(resp => {
          this.options = resp.data
          setPackTypeCache(this.options)
        })
      } else {
        this.options = list
      }
    }
  }
}
</script>
