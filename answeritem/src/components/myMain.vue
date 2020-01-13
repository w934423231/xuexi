/* eslint-disable vue/valid-v-for */
<template>
  <div class="my-main">
   <el-menu
      :default-active="this.$route.path"
      router
      class="el-menu-vertical-demo my-aside"
      @open="handleOpen"
      @close="handleClose"
    >
    <template v-for="(item,index) in $store.getters.addRouter[0].children" >
      <el-menu-item  :index="$store.getters.addRouter[0].path+item.path" v-bind:key="index">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
    </el-menu>
    <div class="my-content">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.$route.name }}</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      url: [
        {
          path: '/',
          name: '目录'
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    click () {
      console.log(this.$router)
    }
  }
}
</script>
<style scoped>
.my-main {
  display: flex;
  min-height: calc(100vh - 15vh);
  /* height: 100vh; */
}
.my-aside {
  width: 200px;
  border-right: 1px solid #666;
  min-height: calc(100vh - 15vh);
  /* height: 100vh; */
}
.el-menu-vertical-demo{
  width: 200px;
}
.my-content {
  flex: 1;
  padding: 20px 10px;
  /* height: 100vh; */
  min-height: calc(100vh - 15vh);
  box-sizing: border-box;
}
</style>
