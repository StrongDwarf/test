<template>
  <div class="echart-box">
    <div id = 'echartsChannel' class="echarts"
    v-loading="loading"
    >
      <div class = 'no-data' v-if = 'noData'>暂无数据</div>
    </div>
  </div>
</template>
<script>
import API from '@/api/customization'
import { formatChannelSnapshot } from '@/util/formatEchartsOptions'

export default {
  dataType: 1,
  props: {
    index: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      loading: false,
      noData: true
    }
  },
  mounted () {
    this.getData(1)
  },
  watch: {
    index (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getData()
      }
    }
  },
  methods: {
    initEcharts (options) {
      let myEcharts = echarts.init(document.getElementById('echartsChannel'))
      myEcharts.setOption(options)
    },
    getData () {
      this.dataType = this.index + 1
      this.loading = true
      // 渠道
      API.getChannelSnapshot({
        params: {
          dataType: this.dataType
        }
      })
        .then(data => {
          this.loading = false
          if (!data) return null
          this.noData = false
          let options = formatChannelSnapshot(data)
          this.initEcharts(options)
        })
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
.no-data
  text-align center
  line-height 600px
  color #909399
</style>
