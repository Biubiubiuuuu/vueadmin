<template>
  <el-row>
    <el-form
      ref="extraServiceKindForm"
      :model="ruleForm"
      size="small"
    >
      <el-table :data="ruleForm.data" :show-header="false">
        <el-table-column>
          <template slot-scope="scope">
            <el-divider content-position="left">
              <span style="color: #409EFF;">
                {{ language==="zh"?scope.row.cnName:scope.row.enName }}
              </span>
            </el-divider>
            <!--单选按钮组 type = 1 -->
            <template v-if="scope.row.type === 1">
              <template v-if="scope.row.domains">
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-radio-group v-model="scope.row.extraServiceKindId">
                    <el-radio v-for="(itemRadio) in scope.row.domains" :key="itemRadio.id" style="padding-top: 6px;" :label="itemRadio.id" @click.native.prevent="radioClick(scope.$index,itemRadio.id)">{{ language==="zh"?itemRadio.cnName:itemRadio.enName }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-radio v-model="scope.row.extraServiceKindId" :label="scope.row.id" @click.native.prevent="radioClick(scope.$index,scope.row.id)">{{ language==="zh"?scope.row.cnName:scope.row.enName }}</el-radio>
                </el-form-item>
              </template>
            </template>
            <!--多选按钮 type = 2 -->
            <template v-else-if="scope.row.type === 2">
              <template v-if="scope.row.domains">
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-checkbox-group v-model="scope.row.extraServiceKindId">
                    <el-checkbox v-for="itemcheckbox in scope.row.domains" :key="itemcheckbox.id" :label="itemcheckbox.id">{{ language==="zh"?itemcheckbox.cnName:itemcheckbox.enName }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </template>
              <template v-else>
                <el-checkbox v-model="scope.row.extraServiceKindId" :label="scope.row.id" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">{{ language==="zh"?scope.row.cnName:scope.row.enName }}</el-checkbox>
              </template>
            </template>
            <!--单选下拉 type = 3 -->
            <!--多选下拉 type = 4 -->
            <template v-else-if="(scope.row.type === 3 || scope.row.type === 4)">
              <template v-if="scope.row.domains">
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-select v-model="scope.row.extraServiceKindId" clearable :placeholder="(language==='zh'?'请选择'+scope.row.cnName:'Please select '+scope.row.enName)" :multiple="scope.row.type===4" style="margin: 5px 0px 5px 0px;">
                    <el-option
                      v-for="itemchildren in scope.row.domains"
                      :key="itemchildren.id"
                      :label="language==='zh'?itemchildren.cnName:itemchildren.enName"
                      :value="itemchildren.id"
                    />
                  </el-select>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-select v-model="scope.row.extraServiceKindId" clearable :placeholder="(language==='zh'?'请选择'+scope.row.cnName:'Please select '+scope.row.enName)" :multiple="scope.row.type===4">
                    <el-option
                      v-for="itemchildren in [scope.row]"
                      :key="itemchildren.id"
                      :label="language==='zh'?itemchildren.cnName:itemchildren.enName"
                      :value="itemchildren.id"
                    />
                  </el-select>
                </el-form-item></template>
            </template>
            <!--单选输入框 type = 5 -->
            <template v-else-if="scope.row.type === 5">
              <template v-if="scope.row.domains">
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-radio-group v-model="scope.row.extraServiceKindId">
                    <div v-for="(itemRadio,indexRadio) in scope.row.domains" :key="itemRadio.id" style="float: left;">
                      <el-radio :key="itemRadio.id" :label="itemRadio.id" style="line-height: 44px;float: left;" class="elradio" @click.native.prevent="radioClick(scope.$index,itemRadio.id)">
                        <label>
                          {{ language==='zh'?itemRadio.cnName:itemRadio.enName }}
                        </label>
                      </el-radio>
                      <template v-if="scope.row.extraServiceKindId===itemRadio.id">
                        <el-tooltip v-for="(inputChild,inputIndex) in itemRadio.domains" :key="inputChild.id" :content="inputChild.value" placement="bottom-start">
                          <el-form-item :prop="'data.' + scope.$index+'.domains.'+indexRadio+'.domains.'+inputIndex+'.value'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName +'-'+inputChild.cnName:scope.row.enName +'-'+inputChild.enName)+'必填', trigger: ['blur', 'change'] }" style="float: left;">
                            <el-input v-model="scope.row.domains[indexRadio].domains[inputIndex].value" :placeholder="(language==='zh'?'请输入'+inputChild.cnName:'Please enter '+inputChild.enName)" style="width: 225px;margin-right: 5px;" clearable>
                              <Currency
                                v-if="inputChild.currency >0"
                                slot="append"
                                v-model="inputChild.currency"
                                style="width:108px"
                                @setValue="(val) => inputChild.currency = val"
                              />
                            </el-input>
                          </el-form-item>
                        </el-tooltip>
                      </template>
                    </div>
                  </el-radio-group>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-radio v-model="item.extraServiceKindId" :label="item.id">
                    {{ language==="zh"?item.cnName:item.enName }}
                    <el-input v-model="item.alue" :placeholder="(language==='zh'?'请输入'+scope.row.cnName:'Please enter '+scope.row.enName)">
                      <Currency
                        slot="append"
                        v-model="item.currency"
                        style="width:110px"
                        @setValue="(val) => item.currency = val"
                      />
                    </el-input>
                  </el-radio>
                </el-form-item>
              </template>
            </template>
            <!--多选输入框 type = 6 -->
            <template v-else-if="scope.row.type === 6">
              <template v-if="scope.row.domains">
                <el-form-item :prop="'data.' + scope.$index + '.extraServiceKindId'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName+'必选' :scope.row.enName+' required' ), trigger: ['blur', 'change'] }">
                  <el-checkbox-group v-model="scope.row.extraServiceKindId">
                    <div v-for="(itemRadio,indexRadio) in scope.row.domains" :key="itemRadio.id" style="float: left;">
                      <el-checkbox :key="itemRadio.id" :label="itemRadio.id" style="line-height: 20px;float: left;" class="elradio">
                        <label>
                          {{ language==='zh'?itemRadio.cnName:itemRadio.enName }}
                        </label>
                      </el-checkbox>
                      <template v-if="doIncludes(scope.row.extraServiceKindId,itemRadio.id)">
                        <el-tooltip v-for="(inputChild,inputIndex) in itemRadio.domains" :key="inputChild.id" :content="inputChild.value" :disabled="isToolTip" placement="bottom-start">
                          <el-form-item :prop="'data.' + scope.$index+'.domains.'+indexRadio+'.domains.'+inputIndex+'.value'" :rules="{ required: (scope.row.isRequired ? true:false), message: (language==='zh'? scope.row.cnName +'-'+inputChild.cnName:scope.row.enName +'-'+inputChild.enName)+'必填', trigger: ['blur', 'change'] }" style="float: left;">
                            <el-input v-model="inputChild.value" :placeholder="(language==='zh'?'请输入'+inputChild.cnName:'Please enter '+inputChild.enName)" style="width: 225px;margin-right: 5px;" clearable>
                              <Currency
                                v-if="inputChild.currency >0"
                                slot="append"
                                v-model="inputChild.currency"
                                style="width:108px"
                                @setValue="(val) => inputChild.currency = val"
                              />
                            </el-input>
                          </el-form-item>
                        </el-tooltip>
                      </template>
                    </div>
                  </el-checkbox-group>
                </el-form-item>
              </template>
              <template v-else>
                <el-row>
                  <el-checkbox v-model="scope.row.extraServiceKindId" :label="scope.row.id">
                    {{ language==="zh"?scope.row.cnName:scope.row.enName }}
                    <el-input v-model="scope.row.value" :placeholder="(language==='zh'?'请输入'+scope.row.cnName:'Please enter '+scope.row.enName)">
                      <Currency
                        slot="append"
                        v-model="scope.row.currency"
                        style="width:110px"
                        @setValue="(val) => scope.row.currency = val"
                      />
                    </el-input>
                  </el-checkbox>
                </el-row>
              </template>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </el-row>
</template>

<script>
import { getExtraServiceKindAsync } from '@/api/prewaybill'
import Currency from '@/components/Select/Currency'
import { jsonToTree } from '@/utils/tree'

export default {
  name: 'ExtraServiceKind',
  components: {
    Currency
  },
  data() {
    return {
      id: 0,
      options: [],
      isToolTip: true,
      language: this.$store.getters.language,
      ruleForm: {
        data: []
      },
      extraServiceKinds: []
    }
  },
  methods: {
    setExtraServiceKinds(data) {
      this.extraServiceKinds = data
      this.getExtraServiceKinds(this.id)
    },
    getExtraServiceKinds(id) {
      this.id = id
      if (id > 0) {
        getExtraServiceKindAsync(id).then(resp => {
          if (resp.data !== undefined) {
            var data = jsonToTree(resp.data)
            // 数据格式转换
            const formData = []
            data.forEach(item => {
              const ruleFormItem = {}
              ruleFormItem.type = item.type
              ruleFormItem.enName = item.enName
              ruleFormItem.id = item.id
              ruleFormItem.isRequired = item.isRequired
              ruleFormItem.cnName = item.cnName
              ruleFormItem.code = item.code
              ruleFormItem.extraServiceKindId = (item.type === 2 || item.type === 6 || item.type === 4) ? [] : ''
              ruleFormItem.domains = []
              if (item.children) {
                item.children.forEach(itemChild => {
                  const domain = {}
                  domain.code = itemChild.code
                  domain.type = itemChild.type
                  domain.value = ''
                  domain.id = itemChild.id
                  if (this.extraServiceKinds) {
                    var filter = this.extraServiceKinds.filter(x => x.extraServiceKindId === itemChild.id)
                    if (filter && filter.length > 0) {
                      if ((item.type === 2 || item.type === 6 || item.type === 4)) {
                        ruleFormItem.extraServiceKindId.push(itemChild.id)
                      } else {
                        ruleFormItem.extraServiceKindId = itemChild.id
                      }
                    }
                  }
                  domain.enName = itemChild.enName
                  domain.cnName = itemChild.cnName
                  domain.isRequired = itemChild.isRequired
                  domain.currency = itemChild.currency
                  domain.domains = []
                  if (itemChild.children) {
                    itemChild.children.forEach(itemChild2 => {
                      const domain2 = {}
                      domain2.id = itemChild2.id
                      if (this.extraServiceKinds) {
                        var filter = this.extraServiceKinds.filter(x => x.extraServiceKindId === itemChild2.id)
                        if (filter && filter.length > 0) {
                          domain2.value = filter[0].value
                        } else {
                          domain2.value = ''
                        }
                      }
                      domain2.type = itemChild2.type
                      domain2.code = itemChild2.code
                      domain2.isRequired = itemChild2.isRequired
                      domain2.enName = itemChild2.enName
                      domain2.cnName = itemChild2.cnName
                      domain2.currency = itemChild2.currency
                      domain.domains.push(domain2)
                    })
                  }
                  ruleFormItem.domains.push(domain)
                })
                formData.push(ruleFormItem)
              }
            })

            this.ruleForm.data = formData
          } else {
            this.ruleForm.data = []
          }
        })
      }
    },
    radioClick(i, v) {
      var formData = JSON.parse(JSON.stringify(this.ruleForm.data))
      v === formData[i].extraServiceKindId ? (formData[i].extraServiceKindId = '') : (formData[i].extraServiceKindId = v)
      this.ruleForm = {}
      this.ruleForm.data = []
      this.ruleForm.data = formData
    },
    validateHandle(callback) {
      this.$refs['extraServiceKindForm'].validate((valid) => {
        callback(valid)
      })
    },
    doIncludes(arr, v) {
      if (Array.isArray(arr)) {
        return arr.includes(v)
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-radio {
  margin-right: 5px;
  padding-top: 0px;
}

::v-deep .el-form-item {
  padding-right: 5px;
}

::v-deep .el-checkbox {
  padding-top: 6px;
  margin-right: 5px;
}

::v-deep .el-checkbox__label {
  padding-left: 5px;
  font-size: 14px;
  color: #606266;
  font-weight: bold;
}

::v-deep .el-radio__label {
 padding-left: 5px;
 font-size: 14px;
 color: #606266;
 font-weight: bold;
}

::v-deep .el-table .el-table__cell{
  padding: 10px 0px 0px 0px;
}

::v-deep .el-table .cell{
  padding: 0px 2px 0px 2px;
}

::v-deep .elradio .el-radio__label {
 padding-left: 0px;
}

::v-deep  .el-divider{
  margin-top: 10px;
}

::v-deep .el-form-item__error{
  position: inherit;
}

.badge{
  position: absolute;
}

.wrap {
  display: -webkit-box;
  padding: 0px 10px;
  border-top: indianred;
  padding: 4px 3px 4px 3px;
}

::v-deep .el-table tbody tr:hover>td{
  background-color:transparent!important;
}
</style>
