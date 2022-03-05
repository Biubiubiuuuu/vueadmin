import store from '../store'

export default async function getPageTitle(pageTitle) {
  let title = '国际物流系统'
  if (!store.getters.companyName) {
    await store.dispatch('user/getSysInfoByDomainPrefixAsync').then(() => {
      title = store.getters.companyName || '国际物流系统'
    })
  }
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
