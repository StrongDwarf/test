import Axios from 'axios'

const API = {
  getDepartmentTree: '/api/customize/departmentTree',
  saveDepartmentTree: '/api/customize/departmentConfig',
  getChannelSnapshot: '/api/customize/channelSnapshot',
  getDepartmentSnapshot: '/api/customize/departmentSnapshot'
}

function getDepartmentTree (datas = {}) {
  return Axios.get(API.getDepartmentTree, datas)
}

function saveDepartmentTree (datas = {}) {
  let _formData = new FormData()
  _formData.append('departmentIds', datas.departmentIds)
  return Axios({
    url: API.saveDepartmentTree,
    data: _formData,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function getChannelSnapshot (datas = {}) {
  return Axios.get(API.getChannelSnapshot, datas)
    .then(datas => {
      if (!datas) return
      return datas.datalist
    })
}

function getDepartmentSnapshot (datas = {}) {
  return Axios.get(API.getDepartmentSnapshot, datas)
}

export default {
  getDepartmentTree,
  saveDepartmentTree,
  getChannelSnapshot,
  getDepartmentSnapshot
}
