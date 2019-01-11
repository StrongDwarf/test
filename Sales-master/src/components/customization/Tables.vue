<template>
 <div class = 'table-box'>
    <h3>人员纬度数据汇总表</h3>
   <el-table
    :data = 'forTableShow'
    border
    class = 'table'
    v-loading="loading"
   >
    <el-table-column
      prop="name"
      label="定制组"
    >
    </el-table-column>
    <el-table-column
      prop="receive_count"
      label="接单数"
    >
    </el-table-column>
    <el-table-column
      prop="lost_count"
      label="丢单数"
    >
    </el-table-column>
    <el-table-column
      prop="standard_quantity"
      label="标品成单数"
    >
    </el-table-column>
    <el-table-column
      prop="standard_headcount"
      label="标品成单人头数"
    >
    </el-table-column>
    <el-table-column
      prop="standard_sales"
      label="标品销售额"
    >
    </el-table-column>
    <el-table-column
      prop="customize_quantity"
      label="定制成单数"
    >
    </el-table-column>
    <el-table-column
      prop="customize_sales"
      label="定制单销售额"
    >
    </el-table-column>
    <el-table-column
      prop="customize_profit"
      label="定制单预估毛利"
    >
    </el-table-column>
    <el-table-column
      prop="customize_rate"
      label="定制单利润率(%)"
    >
    </el-table-column>
    <el-table-column
      prop="receive_rate"
      label="成单率(%)"
    >
    </el-table-column>
    <el-table-column
      prop="total_sales"
      label="总销售额"
    >
    </el-table-column>
    <!-- 
    <el-table-column
      prop="total_quantity"
      label="总成单数"
    >
    </el-table-column>
    -->
    <el-table-column
      prop="average_profit"
      label="人均预估毛利"
      v-if = 'index === 1'
    >
    </el-table-column>
   </el-table>
 </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    index: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      loading: state => state.customization.loading
    }),
    ...mapGetters({
      forTableShow: 'customization/forTableShow'
    })
  },
  methods: {
  }
}
</script>
<style lang='stylus' scoped>
.table
  width 100%
.table-box
  margin-bottom 20px
  padding 20px
  background #fff
  border 1px solid #ddd
h3
  margin 0 0 20px 0
</style>
