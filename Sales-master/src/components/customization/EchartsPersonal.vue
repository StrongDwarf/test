<template>
  <div class = 'echart-box'>
    <div id = 'echartsPersonal' class="echarts">
      <div class = 'no-data' v-if = 'noData'>暂无数据</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      noData: true
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters({
      personalEchartOptions: 'customization/personalEchartOptions'
    })
  },
  watch: {
    personalEchartOptions (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.noData = false
        this.initEcharts()
      }
    }
  },
  methods: {
    initEcharts () {
      let myEcharts = echarts.init(document.getElementById('echartsPersonal'))
      console.log("this.personalEchartOptions",this.personalEchartOptions)
      if(this.personalEchartOptions){
        myEcharts.setOption(this.personalEchartOptions)
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
.echarts
  width 100%
  height 600px

.echart-box
  background #fff
  padding 20px
  border 1px solid #ddd
  margin-top 20px
.no-data
  text-align center
  line-height 600px
  color #909399
</style>
