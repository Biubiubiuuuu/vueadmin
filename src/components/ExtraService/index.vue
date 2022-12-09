<template>
  <div>
    <el-checkbox-group v-model="form" @change="change">
      <el-checkbox v-for="item in datas" :key="item.name" :label="item.id" :disabled="disabled">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
import { getSharedTranParametersListAsync } from '@/api/prewaybill'

export default {
  name: 'ExtraService',
  props: {
    setExtraService: {
      type: Function,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      datas: [],
      form: []
    }
  },
  created() {
    this.getSharedTranParametersList()
  },
  methods: {
    getSharedTranParametersList() {
      getSharedTranParametersListAsync().then(resp => {
        this.datas = Array.isArray(resp.data) ? resp.data.map(x => ({ id: x.id, name: x.name })) : []
      })
    },
    setExtraServices(v) {
      this.$nextTick(() => {
        this.form = Array.isArray(v) ? v : []
      })
    },
    change(v) {
      const data = []
      v.forEach(y => {
        data.push(this.datas.filter(x => x.id === y)[0])
      })
      this.setExtraService(data)
    }
  }
}
</script>
