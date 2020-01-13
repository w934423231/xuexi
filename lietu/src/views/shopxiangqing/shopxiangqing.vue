<template>
  <div>
    <div class="product-wrapper">
      <div class="search-wrapper">
        <div class="search-item">
          按名称搜索:
          <el-input
            style="width:150px;"
            placeholder="请输入入内容"
            prefix-icon="el-icon-search"
            v-model="search.pname"
            @blur="select"
          ></el-input>
        </div>
        <div class="search-item">
          上架时间:
          <el-date-picker
            style="width:150px;"
            v-model="search.prodate"
            type="date"
            placeholder="选择日日期"
          ></el-date-picker>
        </div>
        <div class="search-item">
          按类型搜索:
          <el-cascader
            style="width:150px;"
            :options="options2"
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
        </div>
      </div>
    </div>
    <div class="add-product">
      <el-button type="primary" @click="open">添加商品</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="商品预览" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.pics" alt class="img">
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.showName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品价格" width="80">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.price }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品库存" width="80">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.store }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品父类型" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.cateid }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品子类型" width="100">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.subcateid }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editData(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible" close="clos">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
      </el-steps>
      <template>
        <div>
          <div v-show="active==0" class="shuju">
            <el-form :model="productAddItem" :rules="rulesabc" ref="ruleForm">
              <el-form-item label="商品名称" prop="showName" :label-width="formLabelWidth">
                <el-input v-model="productAddItem.showName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price" :labelwidth="formLabelWidth">
                <el-input v-model.number="productAddItem.price" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品库存" prop="store" :label-width="formLabelWidth">
                <el-input v-model.number="productAddItem.store" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品类型" prop="cateid" :label-width="formLabelWidth">
                <el-select
                  @change="selectFatCate"
                  v-model="productAddItem.cateid"
                  placeholder="请选择主类型"
                >
                  <el-option
                    :value="item.catename"
                    v-for="(item,index) in fatCateList"
                    :key="index"
                  >{{item.catename}}</el-option>
                </el-select>
                <el-select v-model="productAddItem.subcateid" placeholder="请选择副类型">
                  <el-option
                    :value="item.subname"
                    v-for="(item,index) in subCateList"
                    :key="index"
                  >{{item.subname}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item></el-form-item>
            </el-form>
          </div>
          <div v-show="active==1">
            <el-upload
              class="upload-demo"
              action="http://localhost:8000/category/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="callback"
              :on-change="setfile"
              list-type="picture"
              ref="uploader"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,只能上传一个文件</div>
            </el-upload>
          </div>
        </div>
      </template>
      <el-button style="margin-top: 12px;" @click="next" v-show="active<2">下一步</el-button>

      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="queding">确 定</el-button>
      </div>
    </el-dialog>
     <el-dialog
      title="修改用户信息"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="tableData[num]" v-if="tableData.length" :rules="rulesabc" ref="ruleForm">
        <el-form-item label="商品名称" prop="showName" :label-width="formLabelWidth">
          <el-input clearable v-model="tableData[num].showName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item clearable label="商品价格" prop="price" :labelwidth="formLabelWidth">
          <el-input v-model.number="tableData[num].price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="store" :label-width="formLabelWidth">
          <el-input clearable v-model.number="tableData[num].store" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="cateid" :label-width="formLabelWidth">
          <el-select @change="selectFatCate" v-model="tableData[num].cateid" placeholder="请选择主类型">
            <el-option
              :value="item.catename"
              v-for="(item,index) in fatCateList"
              :key="index"
            >{{item.catename}}</el-option>
          </el-select>
          <el-select v-model="tableData[num].subcateid" placeholder="请选择副类型">
            <el-option
              :value="item.subname"
              v-for="(item,index) in subCateList"
              :key="index"
            >{{item.subname}}</el-option>

          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <el-upload
        class="upload-demo"
        action="http://localhost:8000/category/upload"
        :on-success="callback1"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        list-type="picture"
      >
        <el-image style="width: 100px; height: 100px" :src="tableData[num].pics" v-if='tableData.length' fit="fit"></el-image>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div slot="footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="updateUser(checkedUser.id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getFatCategoryApi,
  getSubCategoryApi,
  getcatetiaozheng,
  getshopshuju,
  select,
  fenye
} from '@/utils/api'
export default {
  data () {
    return {
      props: {
        value: 'label',
        children: 'cities'
      },
      shopnum: 0,
      num: 0,
      options2: [
        {
          label: '江苏',
          cities: []
        },
        {
          label: '浙江',
          cities: []
        }
      ],
      search: {
        pname: '',
        prodate: ''
      },
      productAddItem: {},
      checkedUser: {
        id: '',
        name: '',
        address: ''
      },
      subCateList: [],
      fatCateList: [],
      formLabelWidth: '150',
      shuju: {},
      active: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      userAddress: '',
      userId: '',
      userName: '',
      currenIndex: 0,
      fileList: [],
      tableData: [],
      secherId: '',
      param: '',
      src: '',
      currentPage4: 1,
      pagesizes: [1, 2, 3, 4],
      pagesize: 1,
      // num: ''
      rulesabc: {
        showName: [
          { required: true, message: '请输入入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入入价格', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字', trigger: 'blur' }
        ],
        store: [
          { required: true, message: '请输入入库存', trigger: 'blur' },
          { type: 'number', message: '库存必须为数字', trigger: 'blur' }
        ],
        cateid: [{ required: true, message: '请选择主类型', trigger: 'change' }]
      }
    }
  },
  created () {
    this.getCateList()
    this.fenye()
  },
  methods: {
    // 分页数据调取
    fenye () {
      let that = this
      fenye({
        curPage: this.currentPage4,
        pagesize: this.pagesize
      }).then(function (res) {
        that.tableData = res.data
        that.shopnum = res.length
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      let that = this
      this.pagesize = val
      if (this.search.pname === '') {
        this.fenye()
      } else {
        select({
          pname: this.search.pname,
          curPage: this.currentPage4,
          pagesize: this.pagesize
        }).then(function (res) {
          that.tableData = res.data
          that.shopnum = res.length
          console.log(typeof res.data)
        })
      }
    },
    handleCurrentChange (val) {
      let that = this
      console.log(`当前页: ${val}`)
      this.currentPage4 = val
      if (this.search.pname === '') {
        this.fenye()
      } else {
        select({
          pname: this.search.pname,
          curPage: this.currentPage4,
          pagesize: this.pagesize
        }).then(function (res) {
          that.tableData = res.data
          that.shopnum = res.length
        })
      }
    },
    handleItemChange (val) {
      console.log('active item:', val)
    },
    // 数据查找事件
    select () {
      let that = this
      console.log(this.search.pname)
      if (this.search.pname !== '') {
        this.currentPage4 = 1
        select({
          pname: this.search.pname,
          curPage: this.currentPage4,
          pagesize: this.pagesize
        }).then(function (res) {
          that.tableData = res.data
          that.shopnum = res.length
        })
      } else {
        this.currentPage4 = 1
        this.fenye()
      }
    },
    // 数据删除按钮
    handleDelete (data) {
      let that = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          getcatetiaozheng({
            tiaozheng: 'removeshopdata',
            pid: data.pid
          }).then(function (res) {
            that.fenye()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取数据库总数据
    getshopdata () {
      let that = this
      getshopshuju().then(function (res) {
        console.log(res)
        that.shopdatalist = res
        that.shopnum = that.shopdatalist.length
      })
    },
    // 图片上传的回调函数
    callback (res) {
      console.log(res)
      if (res.status === 200) {
        this.productAddItem.path =
          'http://localhost:8000/category/upload/' + res.path
      }
    },
    // 图片上传的回调函数
    callback1 (res) {
      console.log(res)
      if (res.status === 200) {
        this.tableData[this.num].pics =
          'http://localhost:8000/category/upload/' + res.path
      }
    },
    deleteIndex (index) {
      this.$data.tableData.splice(index, 1)
    },
    // 添加数据对话框的打开按钮事件
    open () {
      let thit = this
      // eslint-disable-next-line no-unused-expressions
      thit.productAddItem = {}
      thit.dialogFormVisible = true
      thit.active = 0
      thit.fileList = []
    },
    // 添加数据对话框的关闭按钮事件
    clos () {
      let thit = this
      thit.productAddItem = {}
      thit.dialogFormVisible = true
      thit.active = 0
      thit.fileList = []
      thit.$refs.uploader.clearFiles()
      thit.$refs.ruleForm.clearValidate()
    },
    // 编辑用户信息
    editData (index, data) {
      console.log(index, data)
      // this.currenData.push(row)
      this.num = index
      this.dialogTableVisible = true
    },
    // 保存编辑后的用户信息
    updateUser (index) {
      let that = this
      this.tableData[this.num].tiaozheng = 'shopupdata'
      getcatetiaozheng(this.tableData[this.num]).then(function (res) {
        that.getshopdata()
      })
      this.$data.dialogTableVisible = false
    },
    // 添加数据的步骤条下一页按钮事件
    next () {
      if (this.active === 0) {
        this.submitForm('ruleForm')
      } else if (this.active === 1 && this.fileList[0] !== undefined) {
        this.active++
        this.$message('请点击确定按钮提交 或者 点击取消按钮取消本次操作')
        this.shuju = this.deepClone(this.productAddItem)
      }
    },
    handleRemove (file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview (file) {
      // console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },

    // 向filelist添加数据

    setfile (file) {
      this.fileList.push({ name: file.name, url: file.url })
    },
    // from表单正则验证
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          // alert(111)
          this.productVisible = false
          this.active++
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取添加按钮主属性
    getCateList () {
      getFatCategoryApi().then(res => {
        console.log(res)
        this.fatCateList = res
      })
    },
    // 选择主类型
    selectFatCate (catename) {
      console.log('catename', catename)
      for (let i = 0; i < this.fatCateList.length; i++) {
        if (this.fatCateList[i].catename === catename) {
          this.cateid = this.fatCateList[i].cateid
          this.getSubCateList(this.cateid)
          return
        }
      }

      // this.getSubCateList()  catename
    },
    // 获取子类型数据
    getSubCateList (id) {
      let reg = { id: id }
      getSubCategoryApi(reg).then(res => {
        console.log('sub', res)
        this.subCateList = res
      })
    },

    // 添加数据的取消按钮时间
    quxiao () {
      this.dialogFormVisible = false
      this.$message({
        message: '您已经取消了本次操作',
        type: 'warning'
      })
      this.$refs.uploader.clearFiles()
      this.$refs.ruleForm.clearValidate()
    },

    // 添加数据的确定按钮事件

    queding () {
      this.dialogFormVisible = false
      this.shuju.tiaozheng = 'shoptianjia'
      var that = this
      if (this.shuju.showName !== undefined) {
        this.$message({
          message: '你已经确认了本次提交，请稍等',
          type: 'success'
        })
        if (this.shuju.subcateid === undefined) {
          this.shuju.subcateid = null
          console.log(this.shuju)
          getcatetiaozheng(this.shuju).then(function (res) {
            that.fenye()
          })
        } else {
          getcatetiaozheng(this.shuju).then(function (res) {
            that.fenye()
          })
        }
      } else {
        this.$message('请认真填写数据')
      }
      this.$refs.uploader.clearFiles()
      this.$refs.ruleForm.clearValidate()
    }
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
