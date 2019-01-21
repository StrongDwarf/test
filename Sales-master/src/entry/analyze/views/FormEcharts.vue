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
        <el-col :span = '20' class = 'date-box'>
          <span>当前显示数据范围：{{date}}</span>
          <div class = 'date-box-content'>
            <i class='el-icon-warning' />
            <span>每周一18:00进行数据快照可查询上周及本月数据</span>
          </div>

        </el-col>
      </el-row>

      <Tables
        :index = 'checkedDateType'
      />
      <EchartsChannel
        :index = 'checkedDateType'
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
      channel: '按周'
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
      getMonthProductDatePrice: 'customization/getMonthProductDatePrice'
    }),
    init () {
      this.getWeekProductDatePrice()
    },
    radioChange (value) {
      if (value === '按月') {
        this.getMonthProductDatePrice()
      } else {
        this.getWeekProductDatePrice()
      }
    }
  }
}
</script>
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
  line-height 40px
.date-box-content
  display flex
  margin-left 40px
.el-icon-warning
  line-height 40px
  margin-right 5px
</style>
