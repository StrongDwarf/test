<template>
 <div class = 'box'>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class= 'bold'>定制报表</el-breadcrumb-item>
      <el-breadcrumb-item>定制分析表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class = 'main'>
      <el-row class = 'radio'>
        <el-col :span = '4'>
          <el-radio-group v-model="channel"
            @change = 'radioChange'
          >
            <el-radio-button label="按周"></el-radio-button>
            <el-radio-button label="按月"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span = '6'>
          <Cascader v-model="dateValue" :data="timeSelectData" filterable ></Cascader>
        </el-col>
        <el-col :span = '10' class = 'date-box'>
          
          <div  class = 'date-box-content' style="display:inline-block;">
            <p><span>当前显示数据范围：{{date}}</span></p>
            <p><i style="line-height:0px;" class='el-icon-warning' />
            <span>每周日24:00进行数据快照可查询上周及本月数据</span></p>
          </div>

        </el-col>
      </el-row>

      <Tables
        :index = 'checkedDateType'
      />
      <EchartsChannel
        :index = 'checkedDateType'
        :dataSelectType = 'dataSelectType'
        :dataValue = 'dateValue'
      />
      <EchartsPersonal />
    </div>
 </div>
</template>
<script>
import EchartsChannel from '@/components/customization/EchartsChannel'
import EchartsPersonal from '@/components/customization/EchartsPersonal'
import Tables from '@/components/customization/Tables.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'formEcharts',
  data () {
    return {
      channel: '按周',
      dataSelectType : 1,   //选择类型,1:按周 2:按月
      dateValue:[],         //时间选择框的值
      timeSelectData:[],    //时间选择器数据
      weekTimeSelectData:[],    //星期选择器数据
      monthTimeSelectData:[],   //月份选择器 
    }
  },
  components: {
    EchartsChannel,
    EchartsPersonal,
    Tables
  },
  created () {
    this.init()
  },
  computed: {
    ...mapState({
      date: state => state.customization.date
    }),
    checkedDateType () {
      let radioIndex = 0
      if (this.channel === '按月') {
        radioIndex = 1
      }
      return radioIndex
    }
  },
  methods: {
    ...mapActions({
      getWeekProductDatePrice: 'customization/getWeekProductDatePrice',
      getMonthProductDatePrice: 'customization/getMonthProductDatePrice',
      getWeekProductDatePriceA: 'customization/getWeekProductDatePriceA',
      getMonthProductDatePriceA: 'customization/getMonthProductDatePriceA'
    }),
    init () {
      this.timeSelectData = this.getWeekSelectData();

      this.getWeekProductDatePrice();
    },
    radioChange (value) {
      if (value === '按月') {
        this.dataSelectType = 2;
        this.getMonthProductDatePrice()
      } else {
        this.dataSelectType = 1;
        this.getWeekProductDatePrice()
      }
    },
    getWeekSelectData(){
      let dataTmp = [];
        let newDate = new Date();
        let startYear = 2018;
        let startDay = new Date(2018, 10, 12)
        let endYear = newDate.getFullYear();
        let length = endYear - startYear;
        for(let i =0;i<=length;i++){
            let year = startYear + i;
            let yearTmp = {
                value: year,
                label: year+"年",
                children: []
            }
            let lastDay; // 一年的最后一天
            let day;
            if(year!=endYear){
                lastDay = new Date(year + 1, 0, 0);
            }else{
                lastDay = new Date();
            }

            day = new Date(year, 0, 1);
            
            let week = 1;
            while(day<lastDay){
                if(day.getDay() == 1){
                    let weekTmp = {
                        value:week,
                        label:"第"+week+"周",
                        date:day.getFullYear()+"."+day.getMonth()+"."+day.getDate()+"-"+day.getFullYear()+"."+day.getMonth()+"."+(day.getDate()+6),
                    }
                    if(day >= startDay){
                      yearTmp.children.push(weekTmp);
                    }
                    week ++;
                }
                day.setDate(day.getDate() + 1);
            }
            if(yearTmp.children.length != 0){
              dataTmp.push(yearTmp);
            }
            
        }
        
       return dataTmp;
    },
    getMonthSelectData(){
      const startYear = 2018;
      const startMonth = 11;
      let dataTmp = [];
      //获取今天的月份
      let nowMonth = new Date().getMonth() + 1;
      let nowYear = new Date().getFullYear();
      let nowYearTemp = nowYear;
      for (; nowYearTemp >= startYear; nowYearTemp--) {
        let yearTemp = {
          value: nowYearTemp,
          label: String(nowYearTemp),
          children: []
        };
        for (let i = 12; i > 0; i--) {
          //如果这一年是开始的那年,则判断这一月是否大于开始的月份,
          if (
            nowYearTemp < startYear ||
            (nowYearTemp == startYear && i < startMonth)
          ) {
            break;
          }
          //如果这一年是今年,判断这一月是否大于现在的月份,
          if (nowYearTemp == nowYear && i > nowMonth ) {
            continue;
          }
          
          let monthTemp = {
            value: i,
            label: String(i),
            date: nowYearTemp + "年"+i+"月",
          };
          yearTemp.children.push(monthTemp);
        }
        if(yearTemp.children.length != 0){
          dataTmp.push(yearTemp);
        }
      }
      return dataTmp;
    },
  },
  watch:{
    dataSelectType(curData){
      //监听时间选择器的值
      if(curData == 1){
        this.timeSelectData = this.getWeekSelectData();
      }else{
        this.timeSelectData = this.getMonthSelectData();
      }
      this.dateValue = [];
    },
    dateValue(curVal,oldVal){
      if(curVal != oldVal){
        if(curVal.length && curVal.length != 0){
          let dataVal = [];
          dataVal[0] = curVal[0];
          dataVal[1] = curVal[1];
          if(this.dataSelectType == 1){
            this.getWeekProductDatePriceA({
              dataSelectType:this.dataSelectType,
              dataVal:dataVal
            });
          }else{
            this.getMonthProductDatePriceA({
              dataSelectType:this.dataSelectType,
              dataVal:dataVal
            });
          }
        }
      }
    }
  }
}
</script>
<style>
.ivu-input{
  height: 40px;
}
</style>

<style lang='stylus' scoped>
.main
  margin 20px 0 0 0
.radio
  margin-bottom 20px
.bold
  font-weight 600
.date-box
  color #606266
  display flex
.date-box-content
  display flex
  margin-left 40px
.el-icon-warning
  line-height 40px
  margin-right 5px
.ivu-cascader-rel
  height 40px
.ivu-input
  min-height 40px
.ivu-input-wrapper
  min-height 40px
</style>
