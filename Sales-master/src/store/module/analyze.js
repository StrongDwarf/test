import API from '@/api/customization'
import { formatPersonalSnapshot } from '@/util/formatEchartsOptions'

function getData (commit, dataType) {
  commit('changeLoading')
  API.getDepartmentSnapshot({
    params: {
      dataType
    }
  })
    .then(data => {
      commit('changeLoading')
      if (!data) return null
      if (data.date) commit('setDate', data.date)
      // if (data.datalist.length === 0) return null
      commit('setPersonalData', data.datalist)
    })
}

function addAllColumn (data) {
  let all = {}
  Object.keys(data[0]).forEach(val => {
    let result = 0
    for (let key in data) {
      result += Number(data[key][val])
    }
    all.name = '汇总'
    if (val === 'customize_rate') {
      result = result.toFixed(2)
    }
    all[val] = result
  })
  let newData = JSON.parse(JSON.stringify(data))

  newData.push(all)
  return newData
}

function formaThousand (datas = []) {
  return datas.map(item => {
    for (let key in item) {
      if (typeof item[key] !== 'string') item[key] = item[key].toString()
      item[key] = item[key].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    }
    return item
  })
}

const state = {
  personalData: [],
  loading: false,
  date: ''
}

const getters = {
  personalEchartOptions () {
    if (state.personalData.length === 0) return
    let options = formatPersonalSnapshot(state.personalData)
    return options
  },
  // 插入一条汇总数据
  forTableShow () {
    if (state.personalData.length === 0) return
    let data = addAllColumn(state.personalData)
    data = formaThousand(data)
    return data
  }
}

const actions = {
  getWeekProductDatePrice ({ commit }) {
    getData(commit, 1)
  },
  getMonthProductDatePrice ({ commit }) {
    getData(commit, 2)
  }
}

const mutations = {
  setPersonalData (state, payload) {
    state.personalData = payload
  },
  changeLoading (state) {
    state.loading = !state.loading
  },
  setDate (state, payload) {
    state.date = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
