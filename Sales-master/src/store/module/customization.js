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
      // console.log("datatype",dataType);
      commit('changeLoading')
      if (!data) return null
      if (dataType == 1) {
        commit('setLastWeekDate', data.date)
      }
      if (data.date) commit('setDate', data.date)
      if (data.datalist.length === 0) return null
      commit('setPersonalData', data.datalist)
    })
}

function getDataA(commit,dataType,year,value){
  commit('changeLoading')
  dataType = dataType +"";
  API.getDepartmentSnapshotQuery(
   {
      dataType,
      year,
      value
    }
  )
    .then(data => {
      commit('changeLoading')
      if (!data) return null
      if (data.date) commit('setDate', data.date)
      //if (data.datalist.length === 0) return null
      if(data.datalist.length === 0){
        data.datalist = [];
      }
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
    all[val] = result
  })
  let newData = JSON.parse(JSON.stringify(data))
  newData.push(all)
  return newData
}

const state = {
  personalData: [],
  loading: false,
  date: '',
  lastWeekDate: ''
}

const getters = {
  personalEchartOptions () {
    if (state.personalData && state.personalData.length === 0) return
    console.log("state.personalData",state.personalData);
    let options = formatPersonalSnapshot(state.personalData)
    return options
  },
  // 插入一条汇总数据
  forTableShow () {
    let data;
    if (state.personalData.length === 0){
      data = [];
    }else{
      data = addAllColumn(state.personalData)
    }
    //console.log("dataa",data);
    return data
  }
}

const actions = {
  getWeekProductDatePriceA ({commit},a) {
    let type = a.dataSelectType;
    let year = a.dataVal[0];
    let week = a.dataVal[1];
    getDataA(commit, type,year,week)
  },
  getMonthProductDatePriceA({commit},a){
    let type = a.dataSelectType;
    let year = a.dataVal[0];
    let month = a.dataVal[1];
    getDataA(commit,type,year,month)
  },
  getWeekProductDatePrice ({commit}) {
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
  },
  setLastWeekDate(state,payload){
    state.lastWeekDate = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
