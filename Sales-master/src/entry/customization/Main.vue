<template>
 <div class = 'box'>
   <el-row>
    <el-col :span = '3' class = 'left-nav'>
      <el-menu
        default-active = '2'
         class = 'menu'
      >
        <el-menu-item
          index = '0'>
          <i class = 'el-icon-document'></i>
          <router-link to='/analyze'>定制分析表</router-link>
        </el-menu-item>
        <el-menu-item
          index = '1'>
          <i class = 'el-icon-document'></i>
          <router-link to='/entering'>接单率录入</router-link>
        </el-menu-item>
        <el-menu-item
          index = '2'>
          <i class = 'el-icon-setting'></i>
          <router-link to='/customizaion'>配置</router-link>
        </el-menu-item>
    </el-menu>
    </el-col>
    <el-col :span = '21' class = 'main'>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
   </el-row>
 </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang='stylus' scoped>
.main
  padding 20px
  margin-left 220px
.box
  min-height 400px
  overflow hidden
.menu
  min-height 400px
  padding-bottom 10000px
  margin-bottom -10000px
.is-active
  a
    color #409EFF
a
  color #333
.left-nav
  position fixed
  top 0
  left 0
</style>
