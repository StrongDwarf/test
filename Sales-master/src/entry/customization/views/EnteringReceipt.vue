/* eslint-disable */
<template>
  <div class = 'box'>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class= 'bold'>定制报表</el-breadcrumb-item>
      <el-breadcrumb-item>接单率录入</el-breadcrumb-item>
    </el-breadcrumb>
    <div class = 'content'>
      <p>
        <i class='el-icon-warning' />
        <span>目前录入接单数为：{{lastWeekDate}}</span>
      </p>
      <el-row class = 'radio'>
        <el-col :span= '2.5'>
          <span style="line-height:40px;font-size:20px">选择部门:</span>
        </el-col>
        <el-col :span = '6'>
            <Select v-model="selectedData" filterable multiple style="width:260px">
                <Option v-for="item in selectDepartmentDataList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
        </el-col>
        <el-col :span= '3'>
          <el-button type="primary"
          style="margin-left:20px"
          @click = 'search'
          >搜索</el-button>
        </el-col>
      </el-row>
      <el-row class = 'checkedNames' style="margin-bottom:20px">
        <el-col :span = '3'>
          已选中部分:
        </el-col>
        <el-col :span = '21'>
          <div v-html = 'select_department_names'></div>
        </el-col>
      </el-row>
      <Table :columns="columns" border :data="OrderRateTableData"></Table>
      <div class = 'btn-box'>
        <el-button type="primary"
          @click = 'save' 
        >保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import API from '@/api/customization'
import { mapActions, mapState } from 'vuex'
import ElementUI from 'element-ui'

export default {
  name: 'Configuation',
  data () {
    return {
      selectDepartmentDataList:[],      //选择框中的数据
      selectedData:[],                  //已选中的数据
      select_department_names: '',      //已选中的部门的名字
      columns:[
            {
                title:"组别",
                key:"name",
                align:"center",
            },
            {
                title:"周维度",
                align:"center",
                children:[
                    {
                        title:"接单数",
                        key:"weekGetOrderCount",
                        render:(h,params) => {
                          if(params.index != this.OrderRateTableData.length -1){
                            //console.log('params',params);
                            if(params.row.notWriteable){
                              return h('div',"不可编辑");
                            }
                            return h('Input', {
                                    props:{
                                        value:params.row.weekGetOrderCount,
                                        autosize: true
                                    },                       
                                    on: {
                                            'on-blur': (event) => {
                                                event.target.value=event.target.value.replace(/[^0-9-]+/,'');
                                                this.OrderRateTableData[params.index].weekGetOrderCount = event.target.value;
                                                //params.row.weekGetOrderCount = event.target.value;
                                                //console.log('params.row',params.row);
                                                this.updateDataTotal()
                                            }
                                        }
                                })
                          }else{
                            return h('div',params.row.weekGetOrderCount)
                          }
                        }
                    },
                    {
                        title:"丢单数",
                        key:"weekLostOrderCount",
                        render:(h,params) => {
                            if(params.index != this.OrderRateTableData.length - 1){
                              //console.log("params",params);
                              if(params.row.notWriteable){
                                return h('div',"不可编辑");
                              }
                              return h('Input', {
                                    props:{
                                        value:params.row.weekLostOrderCount,
                                        autosize: true
                                    },                       
                                    on: {
                                            'on-blur': (event) => {
                                              event.target.value=event.target.value.replace(/[^0-9-]+/,'');
                                                this.OrderRateTableData[params.index].weekLostOrderCount = event.target.value;
                                                this.updateDataTotal();
                                            }
                                        }
                                })
                            }else{
                              return h('div',params.row.weekLostOrderCount)
                            }
                            
                        }
                    }
                ]
            },
            {
                title:"月维度",
                align:"center",
                children:[
                    {
                        title:"接单数",
                        key:"receiveOrderCount",
                        align:"center",
                        render:(h,params) => {
                            return h('div', (parseInt(params.row.weekGetOrderCount)+parseInt(params.row.receiveOrderCount)))
                        }
                    },
                    {
                        title:"丢单数",
                        key:"lostOrderCount",
                        align:"center",
                        render:(h,params) => {
                            return h('div', (parseInt(params.row.weekLostOrderCount)+parseInt(params.row.lostOrderCount)))
                        }
                    }
                ]
            }
        ],
      OrderRateTableDataTotal:{},     //汇总
      OrderRateTableData:[],

      choosed_department_ids: [],
      choosed_department_names: ''
    }
  },
  computed:{
    ...mapState({
      lastWeekDate: state => state.customization.lastWeekDate
    }),
  },
  created () {
    API.getDepartmentChoosedQuery()
      .then(data => {
        if(!data) return
        this.selectDepartmentDataList = [].concat(data.datalist)
        //console.log("部门选择数据",this.selectDepartmentDataList);
      })
  },
  watch:{
    selectedData(curVal,oldVal){
      if(curVal == oldVal) return
      let str = ""
      for(let i =0;i<curVal.length;i++){
        for(let j=0;j<this.selectDepartmentDataList.length;j++){
          if(this.selectDepartmentDataList[j]["id"] == curVal[i]){
            str = str + this.selectDepartmentDataList[j]["name"]+",";
            break;
          }
        }
      }
      this.select_department_names = str;
    },
  },
  methods: {
    updateDataTotal(){
      let dataTotal = {
        name:'汇总',
            weekGetOrderCount:0,
            weekLostOrderCount:0,
            receiveOrderCount:0,
            lostOrderCount:0,
      }
      for(let i=0;i<this.OrderRateTableData.length -1;i++){
          dataTotal.weekGetOrderCount =parseInt(dataTotal.weekGetOrderCount) + parseInt(this.OrderRateTableData[i].weekGetOrderCount);
          dataTotal.weekLostOrderCount =parseInt(dataTotal.weekLostOrderCount)+ parseInt(this.OrderRateTableData[i].weekLostOrderCount);
          dataTotal.receiveOrderCount =parseInt(dataTotal.receiveOrderCount)+  parseInt(this.OrderRateTableData[i].receiveOrderCount);
          dataTotal.lostOrderCount =parseInt(dataTotal.lostOrderCount) + parseInt(this.OrderRateTableData[i].lostOrderCount);
        }
      this.OrderRateTableDataTotal = dataTotal;
     
      this.OrderRateTableData[this.OrderRateTableData.length-1] = dataTotal;
    },
    //深复制
    extends(obj,src){
      for(let i in src){
        if(typeof src[i] == 'object'){
          obj[i] = {};
          this.extends(obj[i],src[i]);
        }else{
          obj[i] = src[i];
        }
      }
    },
    search(){
      let selectedDepartmentIds = "";
      for(let i =0;i<this.selectedData.length;i++){
        selectedDepartmentIds = selectedDepartmentIds + this.selectedData[i]+",";
      }
      
      if(selectedDepartmentIds.length === 0){
        ElementUI.Notification.error({
          title: '选择的部门不能为空',
          message: ""
        })
        return;
      }
      //console.log("departmentIds",selectedDepartmentIds);
      API.getDepartmentSnapshotDataMonth({departmentIds:selectedDepartmentIds})
        .then(data=>{
          if(!data) return;
          
          let dataTmp = data.datalist;

          /**
           * 添加后端没有发送的数据
           */
          for(let i=0;i<this.selectedData.length;i++){
            let isExit = false;
            for(let j =0;j<data.datalist.length;j++){
              if(this.selectedData[i] == data.datalist[j].id){
                isExit = true;
              }
            }
            //console.log("selectedData",this.selectedData);
            if(!isExit){
              let name;
              for(let k=0;k<this.selectDepartmentDataList.length;k++){
                if(this.selectedData[i]==this.selectDepartmentDataList[k].id){
                  name = this.selectDepartmentDataList[k].name;
                }
              }
              let o = {
                id:this.selectedData[i],
                name:name,
                weekGetOrderCount:0,
                weekLostOrderCount:0,
                receiveOrderCount:0,
                lostOrderCount:0,
                notWriteable:true,
              }
              dataTmp.push(o);
            }
          }

          /**
           * 添加汇总数据
           */
          let dataTotal = {
            name:'汇总',
            weekGetOrderCount:0,
            weekLostOrderCount:0,
            receiveOrderCount:0,
            lostOrderCount:0,
          }
          for(let i =0;i<dataTmp.length;i++){
            dataTmp[i].weekGetOrderCount = 0;
            dataTmp[i].weekLostOrderCount = 0;
            dataTotal.weekGetOrderCount += parseInt(dataTmp[i].weekGetOrderCount);
            dataTotal.weekLostOrderCount += parseInt(dataTmp[i].weekLostOrderCount);
            dataTotal.receiveOrderCount += parseInt(dataTmp[i].receiveOrderCount);
            dataTotal.lostOrderCount += parseInt(dataTmp[i].lostOrderCount);
          }
          

          this.OrderRateTableDataTotal = dataTotal;
          dataTmp.push(this.OrderRateTableDataTotal);
          //console.log("this.OrderRateTableDataTotal",this.OrderRateTableDataTotal);
          this.OrderRateTableData = dataTmp;
          
        })
    },
    save(){
      //console.log("this.OrderRateTableData",this.OrderRateTableData);
      let datas = [];
      console.log("this.OrderRateTableData",this.OrderRateTableData);
      for(let i =0;i<this.OrderRateTableData.length - 1;i++){
        let obj = {
          departmentId:this.OrderRateTableData[i].id,
          departmentName:this.OrderRateTableData[i].name,
          receiveCount:this.OrderRateTableData[i].weekGetOrderCount,
          lostCount:this.OrderRateTableData[i].weekLostOrderCount,
        }
        if(!this.OrderRateTableData[i].notWriteable){
          datas.push(obj);
        }
      }
      //console.log("datas",datas);
      API.saveDepartmentSnapshotUpdate({
        //,
        a:'xiaobaicia'
      })
        .then(data => {
          //console.log("data",data);
          if (!data) return
          this.$notify({
            title: '保存成功',
            type: 'success'
          })
        })
    },


    handleCheckChange (value) {
      let names = this.gatherCheckedNames()
      this.choosed_department_names = names
    },
    saveA () {
      let checkedId = this.gatherId()
      if (checkedId.length === 0) return
      API.saveDepartmentTree({
        departmentIds: checkedId
      })
        .then(data => {
          if (!data) return
          this.$notify({
            title: '保存成功',
            type: 'success'
          })
        })
    },
    gatherId () {
      let $tree = this.$refs.tree
      let checkedId = ''
      $tree.getCheckedNodes().forEach(item => {
        checkedId += item.id + ','
      })
      if (checkedId.lastIndexOf(',') > -1) checkedId = checkedId.slice(0, -1)
      return checkedId
    },
    gatherCheckedNames () {
      let $tree = this.$refs.tree
      let checkedNames = ''
      let $checkedNodes = $tree.getCheckedNodes()
      // 深度递归
      function nextChildren (datas, number) {
        for (let i = 0; i < datas.length; i++) {
          let target = datas[i]
          if (target.children.length > 0) {
            checkedNames += target.name + '：'
            nextChildren(target.children)
            // 跳出最外层的循环
            if (number) break
          } else {
            if (i === datas.length - 1) {
              checkedNames += target.name + '<br/>'
            } else checkedNames += target.name + '，'
          }
        }
      }
      nextChildren($checkedNodes, 1)
      return checkedNames
    },
    initCheckedNames (data) {
      this.$nextTick(function () {
        let names = this.gatherCheckedNames()
        this.choosed_department_names = names
      }, 0)
    }
  }
}
</script>
<style>
.ivu-input{
  min-height: 40px;
}
.ivu-select-selection{
  min-height: 40px;
}
.ivu-tag{
  min-height:30px;
}
.ivu-select-multiple .ivu-select-input{
  line-height:36px;
  min-height:40px;
}
</style>
<style lang='stylus' scoped>
.btn-box
  text-align left
  margin-top 20px
.bold
  font-weight 600
.content
  margin-top 20px
  padding 20px
  background #fff
  border 1px solid #ddd
.checkedNames
  margin-top 20px
h3
  margin 0 0 20px 0
.el-icon-warning
  line-height 40px
  margin-right 5px
</style>
