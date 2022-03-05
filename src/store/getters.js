const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  logo: state => state.user.logo,
  companyName: state => state.user.companyName,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions
}
export default getters
