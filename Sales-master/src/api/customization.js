import Axios from 'axios'

const API = {
  getDepartmentTree: '/api/customize/departmentTree',
  saveDepartmentTree: '/api/customize/departmentConfig',
  getChannelSnapshot: '/api/customize/channelSnapshot',
  getDepartmentSnapshot: '/api/customize/departmentSnapshot',

  // 人员维度历史快照查询接口
  getDepartmentSnapshotQuery: '/api/customize/departmentSnapshotQuery',
  // 渠道维度历史查询快照接口
  getChannelSnapshotQuery: '/api/customize/channelSnapshotQuery',
  // 获取选中部门接口
  getDepartmentChoosedQuery: '/api/customize/departmentChoosedQuery',
  // 根据部门id获取月维度接单丢单数据接口
  getDepartmentSnapshotDataMonth: '/api/customize/getDepartmentSnapshotDataMonth',
  saveDepartmentSnapshotUpdate: '/api/customize/departmentSnapshotUpdate'
}

// 人员维度历史快照查询
function getDepartmentSnapshotQuery (datas = {}) {
  let _formData = {}
  _formData.dataType = datas.dataType
  _formData.year = datas.year
  if (datas.dataType === 1) {
    _formData.week = datas.value
    // _formData.month = 0
  } else {
    _formData.month = datas.value
    _formData.week = 0
  }
  // console.log("人员历史维度查询")
  // console.log("_formData",_formData)
  return Axios({
    url: API.getDepartmentSnapshotQuery,
    data: _formData,
    method: 'POST'
  })
}

// 渠道维度历史快照查询
function getChannelSnapshotQuery (datas = {}) {
  let formData = {}
  formData.dataType = datas.dataType
  formData.year = datas.year
  if (datas.dataType === 1) {
    formData.week = datas.value
    // formData.month = 0
  } else {
    formData.week = 0
    formData.month = datas.value
  }
  return Axios({
    url: API.getChannelSnapshotQuery,
    data: formData,
    method: 'POST'
  })
}

// 获取已选择的部门
function getDepartmentChoosedQuery (datas = {}) {
  return Axios.get(API.getDepartmentChoosedQuery, datas)
}

// 根据部门id获取月维度接单丢单数据接口
function getDepartmentSnapshotDataMonth (datas = {}) {
  let _formData = {}
  _formData.departmentIds = datas.departmentIds
  return Axios({
    url: API.getDepartmentSnapshotDataMonth,
    data: _formData,
    method: 'POST'
  })
}

// 人员维度周快照接单数丢单数更新接口
function saveDepartmentSnapshotUpdate (datas = {}) {
  let _formData = {}
  _formData.datas = datas.datas
  return Axios({
    url: API.saveDepartmentSnapshotUpdate,
    data: _formData,
    method: 'POST'
  })
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
  getDepartmentSnapshot,

  getDepartmentSnapshotQuery,
  getChannelSnapshotQuery,
  getDepartmentChoosedQuery,
  getDepartmentSnapshotDataMonth,
  saveDepartmentSnapshotUpdate
}
