<template>
  <div>
    <div class="add-btn">
      <el-button type="primary" @click="open(data='')">添加一级类型</el-button>
    </div>
    <el-tree
      :data="cateList"
      :props="defaultProps"
      node-key="id"
      :expand-on-click-node="false"
      :render-content="renderContent"
    ></el-tree>
  </div>
</template>
<script>
import { getCategoryListApi, getcatetiaozheng } from '@/utils/api'
function inclusion (arr, m) {
  if (!arr.length) return false
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id && arr[i].id === m) {
      return true
    }
  }
  return false
}
export default {
  data () {
    return {
      cateList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  created () {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.cateList = []
      getCategoryListApi().then(res => {
        loading.close()
        let myarr = res
        let arr = []
        for (let i = 0; i < myarr.length; i++) {
          if (inclusion(arr, myarr[i].cateid)) {
            for (let m = 0; m < arr.length; m++) {
              if (arr[m].id && arr[m].id === myarr[i].cateid) {
                let jsondata = {
                  id: myarr[i].cateid + '' + myarr[i].subid,
                  name: myarr[i].subname,
                  cid: myarr[i].cid,
                  subid: myarr[i].subid
                }
                arr[m].children.push(jsondata)
              }
            }
          } else {
            var jsonData = {}
            if (myarr[i].subid !== null) {
              jsonData = {
                id: myarr[i].cateid,
                name: myarr[i].catename,
                children: [
                  {
                    id: myarr[i].cateid + '' + myarr[i].subid,
                    name: myarr[i].subname,
                    cid: myarr[i].cid,
                    subid: myarr[i].subid
                  }
                ]
              }
            } else {
              jsonData = {
                id: myarr[i].cateid,
                name: myarr[i].catename,
                children: []
              }
            }
            arr.push(jsonData)
          }
        }
        this.cateList = arr
      })
    },
    open (data) {
      const _this = this
      console.log(data)
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '数据不能为空'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '您添加的名称是: ' + value
          })
          if (data !== '') {
            getcatetiaozheng({
              tiaozheng: 'appendchild',
              name: value,
              id: data.id
            }).then(function (res) {
              if (res.status === 200) {
                _this.getCategoryList()
              }
            })
          } else {
            getcatetiaozheng({
              tiaozheng: 'append',
              name: value
            }).then(function (res) {
              if (res.status === 200) {
                _this.getCategoryList()
              }
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    rename (data) {
      console.log(data)
      const _this = this
      var cname = '提示  ' + '原值是：' + data.name
      this.$prompt('请输入名称', cname, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '您已经将原值:   ' + data.name + '     修改为新值:' + value
          })
          if (!data.subid) {
            getcatetiaozheng({
              tiaozheng: 'rename',
              catename: value,
              cateid: data.id
            }).then(function (res) {
              if (res.status === 200) {
                _this.getCategoryList()
              }
            })
          } else {
            getcatetiaozheng({
              tiaozheng: 'renamechild',
              subname: value,
              subid: data.subid
            }).then(function (res) {
              if (res.status === 200) {
                _this.getCategoryList()
              }
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
    },
    remove (data) {
      console.log(data)
      const _this = this
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
          if (!data.subid) {
            getcatetiaozheng({
              tiaozheng: 'remove',
              cateid: data.id
            }).then(function (res) {
              if (res.status === 200) {
                _this.getCategoryList()
              }
            })
          } else {
            getcatetiaozheng({
              tiaozheng: 'removechild',
              subid: data.subid
            }).then(function (res) {
              if (res.status === 200) {
                _this.getCategoryList()
              }
            })
          }
          this.getCategoryList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    renderContent (h, { node, data, store }) {
      if (!data.subid) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.rename(data)}
              >
                修改名称
              </el-button>
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.open(data)}
              >
                添加
              </el-button>
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.remove(data)}
              >
                删除
              </el-button>
            </span>
          </span>
        )
      } else {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{node.label}</span>
            </span>
            <span>
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.rename(node, data)}
              >
                修改名称
              </el-button>
              <el-button
                style="font-size: 12px;"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        )
      }
    }
  }
}
</script>
<style scoped>
.add-btn {
  padding: 15px 15px 8px 0;
  box-sizing: border-box;
  text-align: right;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>
