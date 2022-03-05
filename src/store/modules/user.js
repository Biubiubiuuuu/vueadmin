import { login, logout, getInfo, getSysInfoByDomainPrefixAsync } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    logo: '',
    companyName: '',
    menus: [],
    permissions: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_LOGO: (state, logo) => {
    state.logo = logo
  },
  SET_COMPANYNAME: (state, companyName) => {
    state.companyName = companyName
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userCode, userPwd, branchId } = userInfo
    return new Promise((resolve, reject) => {
      login({ userCode: userCode.trim(), userPwd: userPwd, branchId: branchId }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败，请重新登录。')
        }

        const { clientCode, menu, permissions } = data

        commit('SET_NAME', clientCode)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_MENUS', menu)
        commit('SET_PERMISSIONS', permissions)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 获取系统信息
  getSysInfoByDomainPrefixAsync({ commit }) {
    return new Promise(resolve => {
      getSysInfoByDomainPrefixAsync().then(response => {
        const { data } = response

        const { branchId, companyName, logoUrl } = data

        commit('SET_LOGO', logoUrl || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_COMPANYNAME', companyName)

        localStorage.setItem('Dy_BranchId', branchId)
        localStorage.setItem('Dy_CompanyName', companyName)
        resolve(data)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

