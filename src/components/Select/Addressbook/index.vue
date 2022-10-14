<template>
  <el-autocomplete
    v-model="selectVal"
    style="width:100%;"
    size="small"
    :fetch-suggestions="querySearchAsync"
    :placeholder="placeholder"
    :is-dhl="isDhl"
    :querytype="querytype"
    clearable
    @select="handleQuerySearchSelect"
  />
</template>

<script>
import { searchAddressbook, SearchAddressbookDHL } from '@/api/tool'

export default {
  name: 'AddressbookSelect',
  props: {
    querytype: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    queryData: {
      type: Object,
      default: undefined
    },
    isDhl: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    setSearchAddressbook: {
      type: Function,
      default: () => () => {}
    }
  },
  data() {
    return {
      addressbook: []
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

  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (this.querytype === 'city') {
        this.queryData.postalCode = ''
      }
      if (this.querytype === 'postalCode') {
        this.queryData.city = ''
      }
      if (this.isDhl) {
        if (queryString === '' || this.queryData.countryCode === '' || (this.queryData.postalCode === '' && this.queryData.city === '')) {
          this.setAddressbook(this.queryData)
          cb(this.addressbook.map(x => ({ ...x, value: queryString })))
        } else {
          SearchAddressbookDHL(this.queryData).then(resp => {
            if (resp.data) {
              this.addressbook = resp.data
              cb(this.addressbook.map(x => ({ ...x, value: x.postalCode === '' ? x.city : x.province + '-' + x.city + '-' + x.postalCode })))
            } else {
              this.setAddressbook(this.queryData)
              cb(this.addressbook.map(x => ({ ...x, value: queryString })))
            }
          })
        }
      } else {
        if (queryString === '' || this.queryData.countryCode === '' || (this.queryData.postalCode === '' && this.queryData.city === '')) {
          this.setAddressbook(this.queryData)
          cb(this.addressbook.map(x => ({ ...x, value: queryString })))
        } else {
          searchAddressbook(this.queryData).then(resp => {
            if (resp.data) {
              this.addressbook = resp.data
              cb(this.addressbook.map(x => ({ ...x, value: x.postalCode === '' ? x.city : x.province + '-' + x.city + '-' + x.postalCode })))
            } else {
              this.setAddressbook(this.queryData)
              cb(this.addressbook.map(x => ({ ...x, value: queryString })))
            }
          })
        }
      }
    },
    handleQuerySearchSelect(val) {
      this.setSearchAddressbook(this.querytype, val)
    },
    setAddressbook(val) {
      this.addressbook = []
      if (this.querytype === 'city') {
        this.addressbook.push({ postalCode: val.postalCode, city: val.city })
        return
      }
      if (this.querytype === 'postalCode') {
        this.addressbook.push({ postalCode: val.postalCode, city: val.city })
        return
      }
    }
  }
}
</script>
