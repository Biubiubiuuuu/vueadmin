const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  language: state => state.app.language,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  logo: state => state.user.logo,
  companyName: state => state.user.companyName,
  menus: state => state.user.menus,
  permissions: state => state.user.permissions,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
