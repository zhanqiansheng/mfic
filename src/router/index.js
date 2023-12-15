import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '/src/views/login/index.vue'
import LayoutContainer from '/src/views/layout/index.vue'
import Fund from '/src/views/fund/Fund.vue'
import FundDetail from '/src/views/fund/FundDetail.vue'
import Setting from '/src/views/layout/Setting.vue'
import AllPlan from '/src/views/manager/AllPlan.vue'
import AllTransaction from '/src/views/manager/AllTransaction.vue'
import AllUser from '/src/views/manager/AllUser.vue'
import Plan from '/src/views/user/Plan.vue'
import Transaction from '/src/views/user/Transaction.vue'
import User from '/src/views/user/User.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginPage },
    {
      path: '/',
      component: LayoutContainer,
      redirect: '/main/fund',
      children: [
        { path: '/main/fund', component: Fund },
        { path: '/main/setting', component: Setting },
        { path: '/main/plan', component: Plan },
        { path: '/main/transaction', component: Transaction },
        { path: '/main/user', component: User },
        { path: '/main/fundDetail/:fundCode', component: FundDetail },
        // 管理员页面
        { path: '/main/allPlan', component: AllPlan },
        { path: '/main/allTransaction', component: AllTransaction },
        { path: '/main/allUser', component: AllUser }
      ]
    }
  ]
})

export default router
