<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="订单id" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.oid }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品预览" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.pics" alt class="img">
        </template>
      </el-table-column>
      <el-table-column label="产品id" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.pid }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.pname }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sprice }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品总价" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.oprice }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.lyonghu }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.onum  }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sprice }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品状态" width="150">
        <template slot-scope="scope">
           <el-select v-model="scope.row.ostatus" placeholder="请选择" @change="zhuangtai(scope.row)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
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
      class="fenye"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="shopnum"
    ></el-pagination>
  </div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import {shangpin, zhuangtai} from '@/utils/api'
export default {
  data () {
    return {
      options: [{
        value: 1,
        label: '未付款'
      }, {
        value: 2,
        label: '已付款'
      }, {
        value: 3,
        label: '已发货'
      },
      {
        value: 4,
        label: '已收货'
      },
      {
        value: 5,
        label: '订单完成'
      }
      ],
      tableData: [],
      currentPage4: 1,
      pagesizes: [1, 2, 3, 4],
      pagesize: 1,
      shopnum: 0,
      value: ''
    }
  },
  created: function () {
    this.getdingdanshuju()
  },
  methods: {
    getdingdanshuju () {
      var that = this
      shangpin({
        curPage: this.currentPage4,
        pagesize: this.pagesize
      }).then(
        function (res) {
          that.shopnum = res.length
          that.tableData = res.data
        }
      )
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      let that = this
      that.pagesize = val
      that.getdingdanshuju()
    },
    handleCurrentChange (val) {
      let that = this
      console.log(`当前页: ${val}`)
      that.currentPage4 = val
      that.getdingdanshuju()
    },
    zhuangtai (item) {
      console.log(item)
      zhuangtai({
        oid: item.oid,
        ostatus: item.ostatus
      }).then(function (res) {
        console.log(res)
      })
    }
  }
}
</script>
<style scoped>
img {
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
