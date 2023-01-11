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
import { getPackTypeCache } from '@/api/cache'

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
      this.options = getPackTypeCache()
    }
  }
}
</script>
