<template>
  <div>
    <el-button type="primary" class="button" @click="dialogFormVisible = true">添加商品类型</el-button>
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      class="tree"
    >
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{data.typename}}</span>
        <div>
          <el-button type="text" size="medium" @click="dialogFormVisibles=true,nodes(node)">编辑</el-button>
          <el-button type="text" size="medium" @click="() => remove(node)">删除</el-button>
        </div>
      </div>
    </el-tree>

    <el-dialog title="添加商品类型" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false,append()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑商品类型" :visible.sync="dialogFormVisibles">
      <el-form :model="form">
        <el-form-item label="商品类型" :label-width="formLabelWidth">
          <el-input v-model="form.sname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibles = false,update()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  selectshoptype,
  addshoptype,
  updateshoptype,
  delshoptype
} from '../../ulit/methods.js'
export default {
  data () {
    return {
      data: [],
      form: {
        name: '',
        sname: '',
        node: ''
      },
      dialogFormVisibles: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    append (data) {
      addshoptype({
        name: this.form.name
      })
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    update () {
      let that = this
      updateshoptype({
        typeid: that.form.node,
        typename: that.form.sname
      })
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
        })
        .catch(err => {
          console.log(err)
        })
    },
    remove (node) {
      delshoptype({
        typeid: node.data.typeid
      })
        .then(res => {
          this.getshoptype()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getshoptype () {
      selectshoptype()
        .then(result => {
          this.data = result
        })
        .catch(err => {
          console.log(err)
        })
    },
    nodes (node) {
      this.form.node = node.data.typeid
    }
  },
  created () {
    this.getshoptype()
  }
}
</script>
<style lang="less" scoped>
.custom-tree-node {
  width: 70vw;
  //   height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  // border:1px solid gray;
}
.tree {
  margin-top: 20px;
}
.button {
  margin-top: 20px;
  margin-left: 60vw;
}
</style>
