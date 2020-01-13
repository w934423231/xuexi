<template>
<div>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%;marginTop:30px">
    <el-table-column prop="addname" label="姓名" width="180"></el-table-column>
    <el-table-column prop="addiphone" label="电话" width="180"></el-table-column>
    <el-table-column prop="sex" label="性别" width="180"></el-table-column>
    <el-table-column prop="orderprice" label="总价格" width="180"></el-table-column>
    <el-table-column prop="ordersize" label="总数量" width="180"></el-table-column>
    <el-table-column prop="stores" label="店名" width="180"></el-table-column>
    <el-table-column prop="addre" label="地址"></el-table-column>
      <el-table-column label="商品状态" width="150">
        <template slot-scope="scope">
           <el-select v-model="scope.row.status" placeholder="请选择" @change="zhuangtai(scope.row)">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.title"
                :value="item.value"
                :disabled="item.disabled"
                >
              </el-option>
            </el-select>
          <!-- <el-tag>{{ scope.row.ostatus }}</el-tag> -->
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
import { selectorderdata, updataorder } from '../../ulit/methods.js'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1, // 初始页
      pagesize: 10,
      value: '',
      status: [
        {
          value: 1,
          title: '以支付'
        },
        {
          value: 2,
          title: '未支付'
        },
        {
          value: 3,
          title: '以接收'
        },
        {
          value: 4,
          title: '未接收'
        },
        {
          value: 5,
          title: '已评价'
        },
        {
          value: 6,
          title: '未评价'
        }
      ]
    }
  },
  created () {
    this.getorderdata()
  },
  methods: {
    zhuangtai (item) {
      // console.log(item)
      let that = this
      updataorder(item).then(
        res => {
          if (res.status === 200) {
            that.$message({
              message: res.title,
              type: 'success'
            })
          } else {
            that.$message.error(res.title)
          }
        }
      )
    },
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
      selectorderdata().then(res => {
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
