<template>
  <div class="main">
    <el-row :gutter="20">
      <div class="panel-group">
        <el-col :xs="24" :md="6" style="padding: 10px 20px 10px 20px;">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text" style="margin-bottom: 15px;text-align: end;">账户余额</div>
              <div style="text-align: end;">
                <count-to :start-val="0" :end-val="90" :duration="5" class="card-panel-num" />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="6" style="padding: 10px 20px 10px 20px;">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text" style="margin-bottom: 15px;text-align: end;">账户余额</div>
              <div style="text-align: end;">
                <count-to :start-val="0" :end-val="90" :duration="5" class="card-panel-num" />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="6" style="padding: 10px 20px 10px 20px;">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text" style="margin-bottom: 15px;text-align: end;">账户余额</div>
              <div style="text-align: end;">
                <count-to :start-val="0" :end-val="90" :duration="5" class="card-panel-num" />
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="6" style="padding: 10px 20px 10px 20px;">
          <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
            <div class="card-panel-icon-wrapper icon-money">
              <svg-icon icon-class="money" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text" style="margin-bottom: 15px;text-align: end;">账户余额</div>
              <div style="text-align: end;">
                <count-to :start-val="0" :end-val="90" :duration="5" class="card-panel-num" />
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <div class="dashboard-container">
      <el-row :gutter="20">
        <el-col
          :xs="24"
          style="background-color: #FFFFFF;"
          class="otherCol"
        >
          <el-tabs v-model="freighttrialTabs">
            <el-tab-pane label="操作流程" name="freighttrialTab" style="margin-bottom: 15px;">
              <el-steps :active="6" simple>
                <el-step title="录入订单" icon="icon iconfont el-icon-dy-chuangjianv" />
                <el-step title="打印标签" icon="icon iconfont el-icon-dy-dayinji" />
                <el-step title="发货到仓" icon="icon iconfont el-icon-dy-cangku_daozhan" />
                <el-step title="支付运费" icon="icon iconfont el-icon-dy-kuaijiezhifu" />
                <el-step title="货件出仓" icon="icon iconfont el-icon-dy-shangpin" />
                <el-step title="客户签收" icon="icon iconfont el-icon-dy-yishouhuo" />
              </el-steps>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div class="dashboard-container">
      <el-row :gutter="20">
        <div :class="[windowWidth < 900 ? '' :'wrap']">
          <el-col
            v-if="isShowfreighttrial"
            :md="8"
            :xs="24"
            style="background-color: #FFFFFF;min-height:300px;"
            class="otherCol"
          >
            <el-tabs v-model="freighttrialTabs">
              <el-tab-pane label="运费试算" name="freighttrialTab">
                <Freight ref="formFreight" :sm="24" :md="24" :lg="24" :xl="24" :show-dialog="true" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col
            v-if="isShowtrack"
            :md="8"
            :xs="24"
            style="background-color: #FFFFFF;min-height:300px;"
            class="otherCol"
          >
            <el-tabs v-model="freighttrialTabs">
              <el-tab-pane label="轨迹查询" name="freighttrialTab">
                <Track style="margin-bottom: 10px;" :sm="24" :md="24" :lg="24" :xl="24" :show-dialog="true" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
          <el-col
            v-if="isShowremote"
            :md="8"
            :xs="24"
            style="background-color: #FFFFFF;min-height:300px;"
            class="otherCol"
          >
            <el-tabs v-model="freighttrialTabs">
              <el-tab-pane label="偏远查询" name="freighttrialTab">
                <Remote style="margin-bottom: 10px;" :sm="24" :md="24" :lg="24" :xl="24" :show-dialog="true" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="dashboard-container" />
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import Freight from '@/components/Form/Freight'
import Track from '@/components/Form/Track'
import Remote from '@/components/Form/Remote'

export default {
  name: 'Dashboard',
  components: {
    CountTo,
    Freight,
    Track,
    Remote
  },
  data() {
    return {
      freighttrialTabs: 'freighttrialTab',
      windowWidth: document.documentElement.clientWidth,
      menus: this.$store.getters.menus,
      isShowfreighttrial: false,
      isShowtrack: false,
      isShowremote: false
    }
  },
  created() {
    var datas = this.menus.map(x => x.children.map(x => x.name + '/' + x.path))
    datas.forEach(item => {
      item.forEach(element => {
        if (element === 'freighttrial/index') {
          this.isShowfreighttrial = true
        } else if (element === 'track/track') {
          this.isShowtrack = true
        } else if (element === 'remote/remote') {
          this.isShowremote = true
        }
      })
    })
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        this.windowWidth = window.fullWidth // 宽
      })()
    }
  },
  methods: {
    handleSetLineChartData(type) {
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #eaedf1 !important;
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
@media only screen and (min-width: 1014px) {
  .firstCol {
    margin-right: 3px;
  }
  .otherCol {
    margin-right: 3px;
  }
}
@media only screen and (max-width: 1013px) {
  .el-col-md-8 {
    margin-top: 10px;
  }
  .firstCol {
    margin-top: auto;
  }
}
.dashboard {
  &-container {
    margin: 0px 20px 10px 20px;
  }
  &-text {
    font-size: 25px;
    line-height: 46px;
  }
}

.panel-group {

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:250px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto!important;
      float: none!important;
    }
  }
}

.wrap {
  display: -webkit-box;
  padding-right: 5px;
  background-color: #eaedf1 !important;
}

.wrap2{
  margin-top: 10px;
}
</style>
