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
      <template v-for="(item,index) in $store.getters.addRouter[0].children">
        <el-menu-item :index="$store.getters.addRouter[0].path+item.path" v-bind:key="index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="my-content">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>类型列表</el-breadcrumb-item>
      </el-breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.my-main {
  display: flex;
  min-height: calc(100vh - 100px);
}
.my-aside {
  width: 200px;
  border-right: 1px solid #666;
  min-height: calc(100vh - 100px);
}
.my-content {
  flex: 1;
  padding: 0 10px;
  min-height: calc(100vh - 100px);
}
</style>
