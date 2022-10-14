<template>
  <el-select ref="clientSelect" v-model="selectVal" placeholder="用户" filterable clearable :multiple="multiple">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name +'('+item.clientCode+')'"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { getClientCache, setClientCache } from '@/api/cache'
import { getClientSelect } from '@/api/select'

export default {
  name: 'ClientSelect',
  props: {
    value: {
      type: Array,
      default: undefined
    },
    multiple: {
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
    this.getClientSelect()
  },
  methods: {
    getClientSelect() {
      var list = getClientCache()
      if (list === null || list === undefined) {
        getClientSelect().then(resp => {
          this.options = resp.data
          setClientCache(this.options)
        })
      } else {
        this.options = list
      }
    }
  }
}
</script>
