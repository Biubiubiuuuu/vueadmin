<template>
  <el-dropdown size="mini" :hide-on-click="false">
    <el-badge value="hot" :is-dot="isdot">
      <i class="el-icon-bell" style="font-size: 25px;" />
    </el-badge>
    <el-dropdown-menu slot="dropdown" style="width:300px;">
      <div class="el-tabs el-tabs--top el-tabs--border-card" style="margin-top: -3px;">
        <div class="el-tabs__header is-top">
          <div class="el-tabs__nav-wrap is-top">
            <div class="el-tabs__nav-scroll">
              <div role="tablist" class="el-tabs__nav is-top is-stretch" style="transform: translateX(0px);">
                <div
                  id="tab-first"
                  aria-controls="pane-first"
                  role="tab"
                  :aria-selected="ariaselected"
                  tabindex="0"
                  :class="ariaselected?'el-tabs__item is-top is-active':'el-tabs__item is-top'"
                  @click="tabClick(true)"
                >
                  <el-badge value="hot" :is-dot="isdot">
                    {{ $t('index.operationnotification') }}
                  </el-badge>
                </div>
                <div
                  id="tab-second"
                  aria-controls="pane-second"
                  role="tab"
                  :aria-selected="!ariaselected"
                  tabindex="-1"
                  :class="!ariaselected?'el-tabs__item is-top is-active':'el-tabs__item is-top'"
                  @click="tabClick(false)"
                >
                  <el-badge value="hot" :is-dot="isdot">
                    {{ $t('index.systemnotification') }}
                  </el-badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="el-tabs__content">
          <div
            id="pane-first"
            role="tabpanel"
            aria-labelledby="tab-first"
            class="el-tab-pane"
            :style="ariaselected ? 'line-height: 25px; font-size: 14px;':'line-height: 25px; font-size: 14px;display: none;'"
          >
            <el-empty :description="$t('index.nonotice')" />
          </div>
          <div
            id="pane-first"
            role="tabpanel"
            aria-labelledby="pane-second"
            class="el-tab-pane"
            :style="!ariaselected ? 'line-height: 25px; font-size: 14px;':'line-height: 25px; font-size: 14px;display: none;'"
          >
            <el-empty :description="$t('index.nonotice')" />
          </div>
        </div>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      ariaselected: true,
      isdot: true
    }
  },
  methods: {
    tabClick(v) {
      this.ariaselected = v
    }
  }
}
</script>

<style scoped>
::v-deep .el-badge__content{
    top: 10px;
}

</style>
