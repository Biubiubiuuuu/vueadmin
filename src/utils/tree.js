export function treeData(source, id, parentId, children) {
  const cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father[id] === child[parentId])
    branchArr.length > 0 ? father[children] = branchArr : ''
    return father[parentId] === 0 // 如果第一层不是parentId=0，请自行修改
  })
}

