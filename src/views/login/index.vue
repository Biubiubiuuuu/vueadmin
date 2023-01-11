<template>
  <div class="login-container">
    <div class="elbacklanguage">
      <language style="width: 100%;" :is-background="true" />
    </div>
    <div class="login-background" />
    <el-dialog
      :visible="showDialog"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :width="dialogwidth"
      :top="dialogtop"
      center
    >
      <div class="title-container">
        <h3>{{ companyName }}</h3>
      </div>
      <el-tabs v-model="activeName" :stretch="true" @tab-click="handleTabsClick">
        <el-tab-pane :label="$t('login.password')" name="first">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="userCode">
              <el-input
                ref="userCode"
                v-model="loginForm.userCode"
                :placeholder="$t('login.usernameplaceholder')"
                name="userCode"
                type="text"
                tabindex="1"
                auto-complete="on"
                clearable
              />
            </el-form-item>

            <el-form-item prop="userPwd">
              <el-input
                :key="passwordType"
                ref="userPwd"
                v-model="loginForm.userPwd"
                :type="passwordType"
                :placeholder="$t('login.passwordplaceholder')"
                name="userPwd"
                tabindex="2"
                auto-complete="on"
                show-password
                clearable
                @keyup.enter.native="handleLogin"
              />
            </el-form-item>
            <div style="margin-bottom: 10px; margin-top: -10px;">
              <el-checkbox v-model="rempassChecked">{{ $t('login.rememberpassword') }}</el-checkbox>
              <el-link type="info" style="float: right; ">{{ $t('login.forgotpassword') }}?</el-link>
            </div>
            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%;"
              @click.native.prevent="handleLogin"
            >{{ $t('login.login') }}</el-button>
          </el-form>
          <div class="register">
            <span>{{ $t('login.noaccount') }} <el-link type="info">{{ $t('login.registernow') }}</el-link></span>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('login.QRCode')" name="success" style="text-align: center;">
          <el-image src="https://data-apibee.apispace.com/2cc4802b-f154-4ea2-b109-9716bba8f410/qrcode.png" />
          <div>{{ $t('login.openWeChat') }} <span style="font-weight: bold;">{{ $t('login.scan') }}</span>， {{ $t('login.justloginin') }}</div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" />
    </el-dialog>
  </div>
</template>

<script>
import { getCarrierRouteSelect, getCountrySelect, getClientSelect, getCurrencySelect, getGoodsTypeSelect, getPackTypeSelect, getUnitTypeSelect } from '@/api/select'
import { setCountryListCache, setCarrierRouteCache, setUnitTypeCache, setClientCache, setCurrencyCache, setGoodsTypeCache, setPackTypeCache } from '@/api/cache'
import Language from '@/components/Select/Language'
const Base64 = require('js-base64').Base64
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  components: {
    Language
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$i18n.t('login.usernameplaceholder')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$i18n.t('login.passwordplaceholder')))
      } else {
        callback()
      }
    }
    return {
      dialogwidth: '450px',
      dialogtop: '200px',
      windowWidth: document.documentElement.clientWidth,
      activeName: 'first',
      showDialog: true,
      rempassChecked: false,
      loginForm: {
        userCode: 'gaochao',
        userPwd: '123456',
        branchId: 0
      },
      loginRules: {
        userCode: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        userPwd: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      companyName: this.$i18n.t('login.company'),
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        var query = ''
        Object.keys(route.query).forEach(function (key) {
          if (key !== 'redirect') {
            query += `&${key}=${route.query[key]}`
          }
        })
        this.redirect = route.query.redirect + query
      },
      immediate: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.companyName = this.$store.getters.companyName
    }, 300)
    var that = this
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth
        that.windowWidth = window.fullWidth // 宽
        if (that.windowWidth < 400) {
          that.dialogwidth = '350px'
          that.dialogtop = '140px'
        } else {
          that.dialogwidth = '450px'
          that.dialogtop = '200px'
        }
      })()
    }
  },
  created() {
    const username = Cookies.get('username')
    const password = Base64.decode(Cookies.get('password'))
    if (username) {
      this.loginForm.userCode = username
      this.loginForm.userPwd = password
      this.rempassChecked = true
    }
    if (this.windowWidth < 400) {
      this.dialogwidth = '350px'
      this.dialogtop = '120px'
    } else {
      this.dialogwidth = '450px'
      this.dialogtop = '200px'
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.userPwd.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginForm.branchId = localStorage.getItem('Dy_BranchId')
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(async () => {
            // 加载缓存数据
            const loadinga = this.$loading({
              lock: true,
              text: '加载缓存数据...',
              spinner: 'el-inco-loading',
              background: 'rgba(0,0,0,0.7)'
            })

            await this.setCache()

            // 记住密码功能
            if (this.rempassChecked) {
              Cookies.set('username', this.loginForm.userCode)
              const passWord = Base64.encode(this.loginForm.userPwd)
              Cookies.set('password', passWord)
            } else {
              Cookies.set('username', '')
              Cookies.set('password', '')
            }
            this.loading = false
            loadinga.close()
            this.$router.push({ path: this.redirect || '/' })
          })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleTabsClick(tab, event) {

    },
    async setCache() {
      await getCarrierRouteSelect().then((resp) => {
        var datas = []
        var detail = { disabled: true, code: 'Please select', carrierId: 0, name: '请选择', id: 0 }
        datas.push(detail)
        setCarrierRouteCache(datas.concat(resp.data))
      })
      await getClientSelect().then((resp) => {
        var datas = []
        var detail = { disabled: true, clientCode: 'Please select', clientType: 0, id: 0, name: '请选择', pid: 0, saleId: 0, status: 0 }
        datas.push(detail)
        setClientCache(datas.concat(resp.data))
      })
      await getCountrySelect().then((resp) => {
        var datas = []
        var detail = { disabled: true, pid: 0, code: '-', code2: '-', enName: 'Please select a country/region', cnName: '请选择国家/地区', cnLikeName: '', dhlRemote: 1, fedexRemote: 1, upsRemote: 1, tntRemote: 1, postlen: 1, spellCode: '1', id: 0 }
        datas.push(detail)
        setCountryListCache(datas.concat(resp.data))
      })
      await getGoodsTypeSelect().then((resp) => {
        setGoodsTypeCache(resp.data)
      })
      await getPackTypeSelect().then((resp) => {
        setPackTypeCache(resp.data)
      })
      await getUnitTypeSelect().then((resp) => {
        setUnitTypeCache(resp.data)
      })
      await getCurrencySelect().then((resp) => {
        setCurrencyCache(resp.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .login-background{
    height: 100%;
    background: url(http://127.0.0.1:8284/api/v1/file/634138c6562177987df7c153) no-repeat;
    background-size: cover;
    background-position: center center;
    filter: blur(10px);
  }
}

  .title-container{
    text-align: center;
    font-size: 20px;
  }

  .register{
    text-align: center;
    margin-top: 15px;
  }

::v-deep .el-dialog__header{
  padding: initial;
  border-bottom: 0px;
}

::v-deep .el-dialog {
  border-radius: 15px;
}

::v-deep .el-checkbox__label{
  line-height: 0px;
}

::v-deep .el-dialog--center .el-dialog__body{
  padding: 10px 25px 0px 25px;
}
.elbacklanguage{
  right: 40px;
  top: 40px;
  z-index:10000;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
}
</style>
