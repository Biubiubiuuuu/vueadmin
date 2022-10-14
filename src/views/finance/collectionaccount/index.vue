<template>
  <div class="main">
    <div class="dashboard-container">
      <div class="dashboard-container" style="background-color: #FFFFFF;padding: 0px 15px 10px 15px;">
        <el-tabs v-model="CollectionAccountTabs">
          <el-tab-pane label="收款账户" name="CollectionAccountTab">
            <el-table
              v-loading="loading"
              :data="tableData"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              style="width: 100%; margin-bottom: 10px;"
              size="small"
              highlight-current-row
            >
              <el-table-column
                label="序号"
                align="center"
                width="50"
              >
                <template slot-scope="scope">
                  <div>
                    {{ scope.$index+1 }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="开户行" prop="bankName" align="center" />
              <el-table-column label="户名" prop="realName" align="center" />
              <el-table-column label="银行账号" prop="account" align="center" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/bankaccounts'

export default {
  name: 'CollectionAccountPage',
  data() {
    return {
      loading: false,
      CollectionAccountTabs: 'CollectionAccountTab',
      tableData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const query = {
        userType: 3
      }
      getList(query).then(resp => {
        this.tableData = resp.data
      })
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
</style>
