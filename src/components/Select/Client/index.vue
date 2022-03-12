<template>
  <el-select ref="clientSelect" v-model="selectVal" placeholder="用户" filterable clearable>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.clientCode+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getClientSelect } from '@/api/select'

export default {
  name: 'ClientSelect',
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
    this.getClientSelect()
  },
  methods: {
    getClientSelect() {
      getClientSelect().then(resp => {
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
