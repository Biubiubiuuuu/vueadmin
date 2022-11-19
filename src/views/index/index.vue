<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="financeTab">
          <el-tab-pane label="财务统计" name="financeTab">
            <el-row :gutter="20">
              <el-col :sm="24" :md="12" :xs="24">
                <el-row :gutter="20">
                  <el-col :sm="24" :md="12" :xs="24" style="margin-bottom: 10px;">
                    <el-card shadow="hover" class="box-card" style="height: 100px; margin: auto;">
                      <div style="float: left;">
                        <i class="el-icon-edit" style="font-size:60px;" />
                      </div>
                      <div style="float: right;width: 215px;">
                        <div style="margin-bottom: 13px;text-align: end;">账户余额</div>
                        <div style="font-weight: 700;font-size: 20px;text-align: end;">1231222223</div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :sm="24" :md="12" :xs="24" style="margin-bottom: 10px;">
                    <el-card shadow="hover" class="box-card" style="height: 100px; margin: auto;">
                      <div style="float: left;">
                        <i class="el-icon-edit" style="font-size:60px;" />
                      </div>
                      <div style="float: right;width: 215px;">
                        <div style="margin-bottom: 13px;text-align: end;">账户余额</div>
                        <div style="font-weight: 700;font-size: 20px;text-align: end;">1231222223</div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :sm="12" :xs="24">
                <el-row :gutter="20">
                  <el-col :sm="24" :md="12" :xs="24" style="margin-bottom: 10px;">
                    <el-card shadow="hover" class="box-card" style="height: 100px; margin: auto;">
                      <div style="float: left;">
                        <i class="el-icon-edit" style="font-size:60px;" />
                      </div>
                      <div style="float: right;width: 215px;">
                        <div style="margin-bottom: 13px;text-align: end;">账户余额</div>
                        <div style="font-weight: 700;font-size: 20px;text-align: end;">1231222223</div>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :sm="24" :md="12" :xs="24" style="margin-bottom: 10px;">
                    <el-card shadow="hover" class="box-card" style="height: 100px; margin: auto;">
                      <div style="float: left;">
                        <i class="el-icon-edit" style="font-size:60px;" />
                      </div>
                      <div style="float: right;width: 215px;">
                        <div style="margin-bottom: 13px;text-align: end;">账户余额</div>
                        <div style="font-weight: 700;font-size: 20px;text-align: end;">1231222223</div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      financeTab: 'financeTab',
      windowWidth: document.documentElement.clientWidth
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        this.windowWidth = window.fullWidth // 宽
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
  .main  {
   background-color: #EAEDF1 !important;
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
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
.el-dialog__body{
  padding: 0px 20px !important;
}
.el-divider--horizontal{
  margin: 10px 0px !important;
}

.el-card{
  background-color: #EAEDF1 !important;
}
</style>
