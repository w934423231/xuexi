<template>
  <div>
   <el-table :data="tableData" style="width: 100%">
      <el-table-column label="头像预览" width="300">
        <template slot-scope="scope">
          <img :src="scope.row.lpics" alt class="img">
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="400">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.lyonghu }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="登录账号" width="400">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.luser }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单个数" width="400">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.num }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { user, usernum } from '@/utils/api'
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    let that = this
    user().then(function (res) {
      for (const key in res) {
        usernum({lid: res[key].lid}).then(function (data) {
          console.log(res)
          that.tableData.push({
            lid: res[key].lid,
            lpics: res[key].lpics,
            lyonghu: res[key].lyonghu,
            luser: res[key].luser,
            num: data.length
          })
        })
      }
    })
  }
}
</script>
<style scoped>
.img {
  width: 40px;
  height: 40px;
}
.shuju .el-input {
  margin: 10px 0px;
}
.list {
  width: 100%;
  height: 80px;
  background-color: red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.list img {
  width: 70px;
  height: 70px;
}
.list > div {
  width: 500px;
  height: 100%;
}
.product-wrapper {
  margin-top: 15px;
}
.search-item {
  width: 300px;
  float: left;
  margin-bottom: 10px;
}
.add-product {
  padding-right: 20px;
  text-align: right;
}
.tinymce {
  width: 100%;
  height: 500px;
  border: 1px solid #333;
}
.fenye {
  position: absolute;
  bottom: 20px;
  left: 40%;
}
</style>
