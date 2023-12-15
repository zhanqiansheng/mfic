<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ fund.fundName }}</span>
      </div>
    </template>
    <div>基金类型：{{ fund.fundType }}</div>
    <div>基金代码：{{ fund.fundCode }}</div>
    <div>基金状态：{{ fund.fundStatus === 0 ? '未开放' : '开放中' }}</div>
    <div>近一月：{{ fund.oneMonth }}</div>
    <div>近三月：{{ fund.threeMonth }}</div>
    <div>近半年：{{ fund.sixMonth }}</div>
    <div>近一年：{{ fund.oneYear }}</div>
    <div>近三年：{{ fund.threeYear }}</div>
    <div>成立来：{{ fund.sinceBirth }}</div>
    <hr />
    <div>基金规模：{{ fund.fundSize }}</div>
    <div>基金经理：{{ fund.fundManager }}</div>
    <div>基金成立日：{{ fund.fundBirth }}</div>
    <div>基金管理员：{{ fund.fundAdministrator }}</div>
    <div>停止日期：{{ fund.deadDate }}</div>
    <hr />
    <div>持有份额：{{}}</div>
    <hr />
    <el-input placeholder="输入购买/卖出份额" v-model="formadd.money"></el-input>
    <el-button type="danger">立即购买</el-button>
    <el-button type="primary" disabled>卖出</el-button>
  </el-card>
</template>

<script setup>
import { getFund } from '/src/api/fund'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '/src/stores'

const userStore = useUserStore()
const route = useRouter()
const fund = ref({})
onMounted(async () => {
  // 获取基金信息
  const {
    data: { data }
  } = await getFund(route.currentRoute._value.params.fundCode)
  fund.value = data
  console.log(fund.value)
})
const formadd = ref({
  fundCode: fund.value.fundCode,
  fundName: fund.value.fundName,
  userId: userStore.user.userId,
  money: 0
})
</script>

<style scoped lang="scss">
.page-container {
  height: 100%;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    height: 18px;
    line-height: 18px;
    font-size: 25px;
    font-weight: bold;
  }
}
</style>
