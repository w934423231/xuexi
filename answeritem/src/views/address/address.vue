<template>
<div>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;marginTop:30px">
    <el-table-column prop="addname" label="姓名" width="180"></el-table-column>
    <el-table-column prop="addiphone" label="电话" width="180"></el-table-column>
    <el-table-column prop="sex" label="性别" width="180"></el-table-column>
    <el-table-column prop="addre" label="地址"></el-table-column>
  </el-table>
  <el-pagination
    class="paging"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.length"
  ></el-pagination>
</div>
</template>
<script>
import { addressselect } from '../../ulit/methods.js'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 10
    }
  },
  created () {
    this.getorderdata()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },
    getorderdata () {
      let that = this
      addressselect().then(res => {
        if (res.status === 200) {
          that.tableData = res.data
        }
      })
    }
  }
}
</script>
<style scoped>
.paging{
  position: relative;;
  /* left:42%; */
  top:100px

}
</style>
