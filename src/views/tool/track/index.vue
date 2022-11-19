<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="trackTabs">
          <el-tab-pane label="轨迹跟踪" name="trackTab">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rulesForm" size="small" label-width="auto">
              <el-row class="row-bg" type="flex" justify="center">
                <el-col :sm="15" :md="13" :lg="11" :xl="7" :xs="24">
                  <el-form-item label="单号查询" prop="codes">
                    <el-input ref="codetextarea" v-model="ruleForm.codes" type="textarea" rows="8" clearable resize="none" placeholder="每行输入一个单号，允许最多提交30个单号" style="width:100%" />
                  </el-form-item>
                  <el-form-item style="margin-top: 15px;text-align: center;">
                    <el-button
                      type="primary"
                      size="medium"
                      icon="el-icon-search"
                      @click="onQuery('ruleForm')"
                    >查询</el-button>
                    <el-button
                      plain
                      size="medium"
                      icon="el-icon-refresh"
                      @click="resetForm('ruleForm')"
                    >重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="dashboard-container">
        <el-radio-group
          v-model="status"
          @change="statusChange"
        >
          <el-radio-button
            v-for="(item, index) in stateBtns"
            :key="index"
            :label="item.recState"
          >
            <i :class="item.class" />
            {{ item.recStateName }}({{ item.count }})</el-radio-button>
        </el-radio-group>
      </div>
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px;min-height: 100px;">
        <el-tabs v-model="trackTabs">
          <el-tab-pane label="查询结果" name="trackTab">
            <div class="remoteTips">*单击查看轨迹详情</div>
            <el-collapse v-for="(item,index) in tableData" :key="index" style="margin-bottom: 10px;">
              <el-collapse-item style="border-left: 1px solid #EBEEF5;border-right: 1px solid #EBEEF5;">
                <el-row slot="title" class="collapse-title">
                  <el-col :md="8" :xs="24">
                    <el-button
                      type="primary"
                      size="medium"
                      style="float: left;width: 58px;height: 40px;"
                    >
                      <i :class="index===0?'icon iconfont el-icon-dy-quanbugengduo' : 'icon iconfont el-icon-dy-yishouhuo'" />
                    </el-button>
                    <div class="el-col-item-leftconent">{{ item.preBillCode }}</div>
                    <div class="el-col-item-leftconent">{{ item.preBillCode }}</div>
                  </el-col>
                  <el-col :md="8" :xs="24">
                    <div class="el-col-item-middle">{{ item.preBillCode }}</div>
                  </el-col>
                  <el-col :md="8" :xs="24">
                    <div class="el-col-item-middle">{{ item.details[0].description }}</div>
                  </el-col>
                </el-row>
                <div class="el-timeline">
                  <el-timeline :reverse="reverse">
                    <el-timeline-item
                      v-for="(item2, index2) in item.details"
                      :key="index2"
                      :timestamp="item2.acceptTime"
                      :type=" index2===0 ? 'primary': 'success'"
                    >
                      {{ item2.location }}    {{ item2.description }}
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-backtop target=".main">
        <div width="100%" title="返回顶部">
          <i class="el-icon-top" />
        </div>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { getCountryListCache } from '@/api/cache'

let that

export default {
  name: 'Track',
  filters: {
    countryIdFilter(val) {
      const item = that.countryCacheList.find((f) => f.id === val)
      return item ? `${item.cnName}(${item.code})` : '--'
    }
  },
  data() {
    return {
      trackTabs: 'trackTab',
      countryCacheList: [],
      expands: [],
      ruleForm: {
        codes: ''
      },
      rulesForm: {
        codes: [{
          required: true,
          message: '请输入单号查询，多个单号请换行输入',
          trigger: ['blur', 'change']
        }]
      },
      tableData: [],
      stateBtns: [],
      status: -1
    }
  },
  created() {
    this.countryCacheList = JSON.parse(JSON.stringify(getCountryListCache()))
    this.stateBtns = [{
      recState: -1,
      recStateName: '全部',
      class: 'icon iconfont el-icon-dy-quanbugengduo',
      count: 1
    }, {
      recState: 0,
      recStateName: '查询不到',
      class: 'icon iconfont el-icon-dy-loudou',
      count: 1
    },
    {
      recState: 1,
      recStateName: '待揽收',
      class: 'icon iconfont el-icon-dy-baoguo_lanshou_o',
      count: 10
    }, {
      recState: 2,
      recStateName: '已揽收',
      class: 'icon iconfont el-icon-dy-yishouhuo1',
      count: 10
    }, {
      recState: 3,
      recStateName: '运送途中',
      class: 'icon iconfont el-icon-dy-feijichang',
      count: 10
    }, {
      recState: 4,
      recStateName: '到达待取',
      class: 'icon iconfont el-icon-dy-flagqizi',
      count: 10
    }, {
      recState: 4,
      recStateName: '投递失败',
      class: 'icon iconfont el-icon-dy-shibaixiaolian',
      count: 10
    }, {
      recState: 4,
      recStateName: '成功签收',
      class: 'icon iconfont el-icon-dy-yishouhuo',
      count: 10
    }, {
      recState: 4,
      recStateName: '可能异常',
      class: 'icon iconfont el-icon-dy-gantanhao',
      count: 10
    }, {
      recState: 4,
      recStateName: '运输过久',
      class: 'icon iconfont el-icon-dy-yunshuguojiu',
      count: 10
    }]
    this.tableData = [{
      status: 0,
      preBillCode: '123123',
      countryId: 1,
      details: [{
        acceptTime: '2020-06-30 18:19:10',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:14:00',
        location: '北京',
        description: 'description'
      }, {
        acceptTime: '2020-06-30 18:12:00',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:10:00',
        location: '北京',
        description: 'description'
      }]
    }, {
      status: 1,
      preBillCode: '123123',
      countryId: 1,
      details: [{
        acceptTime: '2020-06-30 18:19:10',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:14:00',
        location: '北京',
        description: 'description'
      }, {
        acceptTime: '2020-06-30 18:12:00',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:10:00',
        location: '北京',
        description: 'description'
      }]
    },
    {
      status: 2,
      preBillCode: '1223123',
      preTranCode: '123123',
      TranBillCode: '123213',
      countryId: 1,
      buildDate: '11',
      details: [{
        acceptTime: '2020-06-30 18:19:10',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:14:00',
        location: '北京',
        description: 'description'
      }, {
        acceptTime: '2020-06-30 18:12:00',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:10:00',
        location: '北京',
        description: 'description'
      }]
    },
    {
      status: 3,
      preBillCode: '1223123',
      preTranCode: '123123',
      TranBillCode: '123213',
      countryId: 1,
      buildDate: '11',
      details: [{
        acceptTime: '2020-06-30 18:19:10',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:14:00',
        location: '北京',
        description: 'description'
      }, {
        acceptTime: '2020-06-30 18:12:00',
        location: '北京',
        description: 'description'
      },
      {
        acceptTime: '2020-06-30 18:10:00',
        location: '北京',
        description: 'description'
      }]
    }]
  },
  methods: {
    clickRowHandle(row, column, event) {
      if (this.expands.includes(row.preBillCode)) {
        this.expands = this.expands.filter(val => val !== row.preBillCode)
      } else {
        this.expands.push(row.preBillCode)
      }
    },
    onQuery(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.error('请填写必填项后重新提交')
          return false
        }
      })
    },
    resetForm(formName) {
      this.ruleForm = {
        codes: ''
      }
      this.$refs[formName].resetFields()
    },
    textareaKeydown() {
      const e = window.event || arguments[0]
      // console.log(e,e.keyCode)
      if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
        e.returnValue = false
        return false
      }
    },
    statusChange(val) {
      this.status = val
    }
  }
}
</script>

<style>
.el-collapse-item__header{
  min-height: 48px !important;
  height: auto;
  padding: 10px;
  line-height: initial;
}

.el-collapse-item__content{
  padding-bottom: 0px;
}

.el-collapse-item__header.is-active {
  border-bottom-color:#EBEEF5;
}
</style>

<style lang="scss" scoped>
  .main  {
   background-color: #EAEDF1 !important;
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    height: 100%;
    overflow-x: hidden;
  }

.dashboard {
  &-container {
    margin: 10px 5px 10px 5px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

::v-deep .collapse-title {
  flex: 1 0 90%;
  order: 1;
  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
  }
}

.el-col-item-leftconent{
     font-size: 15px;
    height: 20px;
    float: none;
    width: 100%;
    margin-left: 70px;
}

.el-col-item-middle{
  height: 38px;
  line-height: 38px;
  text-align: center;
}

.el-form-item--small.el-form-item {
     margin-bottom: 5px;
}

.remoteTips{
  color: red;
  font-size: 10px;
  margin-bottom: 10px;
}

.codeInp{
    border: 1px solid #DCDFE6;
    height: 200px;
    border-radius: 4px;
}

.el-timeline{
  margin-top: 15px;
}
</style>
