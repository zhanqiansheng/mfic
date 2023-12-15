<script setup>
import { User, MessageBox, Operation, More, Setting, Promotion, UserFilled, Histogram } from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useUserStore } from '/src/stores'
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})
</script>
<template>
  <el-container>
    <el-header class="header">
      <div style="flex: 2; text-indent: 1em; margin: auto">Mutal Fund Investment Center</div>
      <div class="userHead">
        <div style="width: 100%; text-align: right; margin: auto">
          欢迎您，
          <span v-if="!userStore.user.userPermission" style="color: red">管理员</span>
          <span v-else>用户</span>
          ‘{{ userStore.user.userName }}’
        </div>
        <el-icon size="60" style="border: solid; margin: auto 20px; border-radius: 50%"><User /></el-icon>
      </div>
    </el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu default-active="/main/fund" :router="true" active-text-color="deepskyblue" background-color="white" class="el-menu-vertical-demo" text-color="black">
          <el-menu-item index="/main/fund">
            <el-icon><Promotion /></el-icon>
            <span>全部基金</span>
          </el-menu-item>
          <el-menu-item index="/main/setting">
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </el-menu-item>
          <el-sub-menu>
            <template #title>
              <div class="templateTitle">
                <el-icon><User /></el-icon>
                <span>我的</span>
              </div>
            </template>
            <el-menu-item index="/main/plan">
              <el-icon><Operation /></el-icon>
              <span>我的基金计划</span>
            </el-menu-item>
            <el-menu-item index="/main/transaction">
              <el-icon><MessageBox /></el-icon>
              <span>我的交易记录</span>
            </el-menu-item>
            <el-menu-item index="/main/user">
              <el-icon><More /></el-icon>
              <span>我的个人信息</span>
            </el-menu-item>
          </el-sub-menu>
          <!--        管理员板块-->
          <div class="title">管理员板块</div>
          <el-menu-item index="/main/allUser">
            <el-icon><UserFilled /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/main/allPlan">
            <el-icon><Histogram /></el-icon>
            <span>基金计划管理</span>
          </el-menu-item>
          <el-menu-item index="/main/allTransaction">
            <el-icon><MessageBox /></el-icon>
            <span>交易记录查询</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.header {
  width: 100vw;
  min-width: 1300px;
  max-width: 2000px;
  height: 10vh;
  padding: 0;
  font-size: 40px;
  line-height: 100px;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
}
.userHead {
  flex: 2;
  height: 100px;
  font-size: 20px;
  display: flex;
  margin-right: 20px;
}
.aside {
  width: 250px;
  height: 91vh;
  padding: 0;
  margin-top: 20px;
}
.main {
  width: 100%;
  max-width: 2000px;
  min-width: 1000px;
  height: 91vh;
  background-color: rgba(175, 238, 238, 0);
  padding: 30px;
}
.el-menu-item span,
.el-sub-menu span {
  font-size: 20px;
  margin-left: 30px;
}
.el-sub-menu .el-menu-item span {
  font-size: 17px;
  margin-left: 10px;
}
.el-menu-item,
.el-sub-menu {
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}
.title {
  font-size: 20px;
  text-indent: 1em;
  height: 50px;
  line-height: 50px;
  margin: 100px auto auto;
  border-top: solid 1px rgba(0, 0, 0, 0.1);
}
</style>
