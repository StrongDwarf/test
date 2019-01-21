<template>
  <div class = 'box'>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class= 'bold'>定制报表</el-breadcrumb-item>
      <el-breadcrumb-item>配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class = 'content'>
      <h3>选择部门</h3>
      <el-tree
        :props="departmentDefaultProps"
        :data="departmentData"
        show-checkbox
        node-key="id"
        ref = 'tree'
        :default-expanded-keys = '[1]'
        :default-checked-keys = 'choosed_department_ids'
        @check-change = 'handleCheckChange'
      >
      </el-tree>

      <el-row class = 'checkedNames'>
        <el-col :span = '3'>
          已选中的部门：
        </el-col>
        <el-col :span = '21'>
          <div v-html = 'choosed_department_names'></div>
        </el-col>
      </el-row>

      <div class = 'btn-box'>
        <el-button type="primary"
          @click = 'save'
        >保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import API from '@/api/customization'

export default {
  name: 'Configuation',
  data () {
    return {
      departmentData: [],
      departmentDefaultProps: {
        children: 'children',
        label: 'name'
      },
      choosed_department_ids: [],
      choosed_department_names: ''
    }
  },
  mounted () {
    API.getDepartmentTree()
      .then(data => {
        if (!data) return
        this.departmentData = [].concat(data.datalist)
        this.choosed_department_ids = [].concat(data.choosed_department_ids)
        this.initCheckedNames(data)
      })
  },
  methods: {
    handleCheckChange (value) {
      let names = this.gatherCheckedNames()
      this.choosed_department_names = names
    },
    save () {
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
      // TODO getCheckedNodes 原生方法有bug
      $tree.getCheckedNodes(false, false).forEach(item => {
        checkedNames += item.name + '、'
      })
      console.log(checkedNames)
      // 深度递归
      // function nextChildren (datas, number) {
      //   for (let i = 0; i <= datas.length - 1; i++) {
      //     let target = datas[i]
      //     if (target.children.length > 0) {
      //       checkedNames += target.name + '：'
      //       nextChildren(target.children)
      //       // 跳出最外层的循环
      //       if (number) {
      //         break
      //       }
      //     } else {
      //       if (i === datas.length - 1) {
      //         checkedNames += target.name + '<br/>'
      //         console.log(checkedNames, datas)
      //       } else checkedNames += target.name + '，'
      //     }
      //   }
      // }
      // nextChildren($checkedNodes, 1)
      // console.log(checkedNames)
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
<style lang='stylus' scoped>
.btn-box
  text-align center
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
</style>
