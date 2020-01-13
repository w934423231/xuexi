<template>
  <div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%;marginTop:30px"
    >
      <el-table-column label="商品预览" width="300">
        <template slot-scope="scope">
          <img :src="requrl.path+'/updatapics/pics/'+scope.row.userimage" alt class="img" />
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" width="330">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户电话" width="300">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.useriphone }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户性别" width="300">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sex }}</el-tag>
        </template>
      </el-table-column>
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
import { userselect } from '../../ulit/methods.js'
import url from '../../ulit/requsturl.js'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 10,
      requrl: url
    }
  },
  created () {
    this.getuserdata()
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
    getuserdata () {
      let that = this
      userselect().then(res => {
        if (res.status === 200) {
          that.tableData = res.data
        }
      })
    }
  }
}
</script>
<style scoped>
.paging {
  position: relative;
  /* left:42%; */
  top: 100px;
}
.img {
  width: 40px;
  height: 40px;
}
</style>
