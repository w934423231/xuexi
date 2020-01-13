<template>
  <div>
    <div class="search">
      <el-input v-model="shopsearcname" placeholder="输入需要筛选的商品名称" />
      <el-select v-model="shopseartype" placeholder="请选择要筛选的类型">
        <el-option
          v-for="item in shoptypelist"
          :key="item.typeid"
          :value="item.typeid"
        >{{item.typename}}</el-option>
      </el-select>
      <el-button type="primary" @click="addendshop">添加商品</el-button>
    </div>
    <el-table
      :data="tableData.filter((data)=>((shopsearcname === '' || data.shopname.toLowerCase().includes(shopsearcname.toLowerCase())) && (shopseartype === '' || data.typeid === shopseartype))).slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column label="商品预览" width="120">
        <template slot-scope="scope">
          <img :src="requrl.path+'/updatapics/pics/'+scope.row.shoppics" alt class="img" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="120">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.shopname }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="120">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.shopprice }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品库存" width="120">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.shoptory }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品父类型" width="120">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.typename }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加数据 -->
    <el-dialog title="商品添加" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="商品名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" :label-width="formLabelWidth">
          <el-input v-model="form.price" :change="check_price()" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="stock" :label-width="formLabelWidth">
          <el-input v-model.number="form.stock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="region" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择商品类型">
            <el-option
              :label="item.typename"
              :value="item.typeid"
              :key="item.typeid"
              v-for="item in shoptypelist"
            >{{item.typename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="pics" :label-width="formLabelWidth">
          <el-upload
            action="http://localhost:8000/updatapics/upload"
            list-type="picture-card"
            accept="image/*"
            ref="my-upload"
            :limit="1"
            :on-success="callback"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="colss">取 消</el-button>
        <el-button type="primary" @click=" submitForm ('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改数据 -->
    <el-dialog title="商品添加" :visible.sync="updateVisible" >
      <el-form :model="updatashuju" :rules="ruless" ref="ruleForms">
        <el-form-item label="商品名称" prop="shopname" :label-width="formLabelWidth">
          <el-input v-model="updatashuju.shopname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="shopprice" :label-width="formLabelWidth">
          <el-input v-model="updatashuju.shopprice" :change="check_price()" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="shoptory" :label-width="formLabelWidth">
          <el-input v-model.number="updatashuju.shoptory" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="typename" :label-width="formLabelWidth">
          <el-select v-model="updatashuju.typename" placeholder="请选择商品类型">
            <el-option
              :label="item.typename"
              :value="item.typeid"
              :key="item.typeid"
              v-for="item in shoptypelist"
            >{{item.typename}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片" prop="shoppics" :label-width="formLabelWidth">
          <div class="up-updata">
            <img v-if="updatashuju" :src="requrl.path+'/updatapics/pics/'+updatashuju.shoppics"
              class="el-image"/>
            <el-upload
              action="http://localhost:8000/updatapics/upload"
              list-type="picture-card"
              accept="image/*"
              ref="my-upload"
              :limit="1"
              :show-file-list="false"
              :on-success="callback1"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="colsss">取 消</el-button>
        <el-button type="primary" @click=" updataForm ('ruleForms')">确 定</el-button>
      </div>
    </el-dialog>

     <el-pagination
     class="paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size='pagesize'
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>
<script>
import {
  shopdataselect,
  selectshoptype,
  shopdatainert,
  shopdataupdata,
  shopdatadelete
} from '../../ulit/methods'
import url from '../../ulit/requsturl.js'
export default {
  data () {
    return {
      tableData: [],
      shoptypelist: [],
      updatashuju: [],
      form: {
        price: ''
      },
      currentPage: 1, // 初始页
      pagesize: 10,
      shopsearcname: '',
      shopseartype: '',
      value: '',
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dialogImageUrl: '',
      dialogVisible: false,
      updateVisible: false,
      requrl: url,
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        stock: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        pics: [{ required: true, message: '请选择图片', trigger: 'blur' }]
      },
      ruless: {
        shopname: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        shopprice: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        shoptory: [
          { required: true, message: '请输入商品库存', trigger: 'blur' },
          { type: 'number', message: '请输入数字', trigger: 'blur' }
        ],
        typename: [
          { required: true, message: '请选择活动区域', trigger: 'blur' }
        ],
        shoppics: [{ required: true, message: '请选择图片', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.shopslect()
    this.getshoptype()
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
    addendshop () {
      this.dialogFormVisible = true
    },
    handleEdit (index, row) {
      console.log(index, row)

      this.updatashuju = row
      // console.log(this.updatashuju.shoppics)
      this.updateVisible = true
    },
    handleDelete (index) {
      let that = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shopdatadelete(index).then(res => {
          if (res.status === 200) {
            that.$message({
              message: res.title,
              type: 'success'
            })
            that.getshoptype()
          } else {
            that.$message({
              message: res.title,
              type: 'warning'
            })
          }
          that.shopslect()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      })
    },
    shopadd () {

    },
    shopslect () {
      shopdataselect().then(result => {
        this.tableData = result
      })
        .catch(err => {
          console.log(err)
        })
    },
    check_price: function () {
      var price = '' + this.form.price
      price = price
        .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(/^(\\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (price.indexOf('.') < 0 && price !== '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        price = parseFloat(price)
      }
      this.form.price = price
    },
    cons () {
      // (shopsearcname === '' || data.shopname.toLowerCase().includes(shopsearcname.toLowerCase())) && (shopseartype === '' || data.typeid === shopseartype))
      console.log(
        (this.shopsearcname === '' ||
          this.tableData[0].shopname
            .toLowerCase()
            .includes(this.shopsearcname.toLowerCase())) &&
          (this.shopseartype === '' ||
            this.tableData[0].typeid === this.shopseartype)
      )
    },
    getshoptype () {
      selectshoptype()
        .then(result => {
          this.shoptypelist = result
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    callback (res) {
      if (res.status === 200) {
        console.log(res.path)
        this.form.pics = res.path
      }
    },
    callback1 (res) {
      if (res.status === 200) {
        console.log(res.path)
        this.updatashuju.shoppics = res.path
      }
    },
    colss () {
      this.dialogFormVisible = false
      this.$refs['my-upload'].clearFiles()
      this.$refs['ruleForm'].resetFields()
      this.shopslect()
      this.form = {
        price: ''
      }
    },
    colsss () {
      this.shopslect()
      this.updateVisible = false
      this.$refs['my-upload'].clearFiles()
      this.$refs['ruleForms'].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          shopdatainert(this.form)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: res.title,
                  type: 'success'
                })
                this.getshoptype()
              } else {
                this.$message({
                  message: res.title,
                  type: 'warning'
                })
              }
              this.form = {
                price: ''
              }
              this.$refs[formName].resetFields()
              this.shopslect()
            })
            .catch(err => {
              console.log(err)
            })
          this.dialogFormVisible = false
          this.$refs['my-upload'].clearFiles()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updataForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateVisible = false
          this.$refs['my-upload'].clearFiles()
          shopdataupdata(this.updatashuju).then((res) => {
            if (res.status === 200) {
              this.$message({
                message: res.title,
                type: 'success'
              })
              this.getshoptype()
            } else {
              this.$message({
                message: res.title,
                type: 'warning'
              })
            }
            this.shopslect()
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.search {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
}
.paging{
  position: relative;;
  /* left:42%; */
  top:100px

}
.search .el-input {
  width: 250px;
}
.el-form .el-input {
  width: 300px;
}
.el-form .el-select {
  width: 300px;
}
.el-image {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  margin-right: 10px;
}
.up-updata {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.img {
  width: 40px;
  height: 40px;
}
</style>
