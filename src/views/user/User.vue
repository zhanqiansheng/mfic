<script setup>
// import { updateUserInfo, getUserList } from '/src/api/user'
import { ref, onMounted } from 'vue'
import { useUserStore } from '/src/stores'

const edit = ref(false)
const userStore = useUserStore()
const userForm = ref({ ...userStore.user })
const level = ref('')

// 确认修改
const uploadChange = () => {
  ElMessageBox.confirm('你确认要修改吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.setUser(userForm.value)
    incomelevel()
    edit.value = false
    ElMessage.success('修改成功')
  })
}

// 返回，取消修改
const unEdit = async () => {
  userForm.value = { ...userStore.user }
  edit.value = false
  // const res = await getUserList(1, 10)
  // console.log(res)
}

// 设置收入等级
const incomelevel = () => {
  if (userForm.value.income < 5000) {
    userForm.value.userLevel = 1
  } else if (userForm.value.income >= 5000 && userForm.value.income < 10000) {
    userForm.value.userLevel = 2
  } else if (userForm.value.income >= 10000 && userForm.value.income < 15000) {
    userForm.value.userLevel = 3
  } else if (userForm.value.income >= 15000 && userForm.value.income < 30000) {
    userForm.value.userLevel = 4
  } else if (userForm.value.income >= 30000) {
    userForm.value.userLevel = 5
  }
  switch (userForm.value.userLevel) {
    case 1:
      level.value = '较差'
      break
    case 2:
      level.value = '偏低'
      break
    case 3:
      level.value = '一般'
      break
    case 4:
      level.value = '良好'
      break
    case 5:
      level.value = '优秀'
      break
    default:
      level.value = '未知'
  }
}
onMounted(async () => {
  // userForm.value.updateTime = userForm.value.updateTime.replace('T', ', ')
  userForm.value.createTime = userForm.value.createTime.replace('T', ', ')
  // const res = await getUserInfo(1)
  // console.log(res)
  // userStore.setUser(res.data.data)
  incomelevel()
})
</script>

<template>
  <PageContainer title="我的个人信息">
    <div style="display: flex">
      <el-form :model="userForm" class="box" label-width="100px">
        <el-form-item label="用户账户">
          <div>{{ userForm.userId }}</div>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-if="edit" v-model="userForm.userName" />
          <div v-else>{{ userForm.userName }}</div>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-if="edit" v-model="userForm.address" />
          <div v-else>{{ userForm.address }}</div>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-if="edit" v-model="userForm.birthday" />
          <div v-else>{{ userForm.birthday }}</div>
        </el-form-item>
        <el-form-item label="平均月收入">
          <el-input type="number" v-if="edit" v-model="userForm.income" />
          <div v-else>{{ userForm.income }}</div>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-if="edit" v-model="userForm.userCardId" />
          <div v-else>{{ userForm.userCardId }}</div>
        </el-form-item>
        <el-form-item label="用户权限">
          <div>{{ userForm.userPermission === 0 ? '管理员' : '普通用户' }}</div>
        </el-form-item>
        <el-form-item label="用户类型">
          <div v-if="!edit">{{ userForm.userType }}</div>
          <label v-if="edit"><input type="radio" v-model="userForm.userType" value="企业" name="type" class="theRadio" />企业</label>
          <label v-if="edit"><input type="radio" v-model="userForm.userType" value="个人" name="type" class="theRadio" />个人</label>
        </el-form-item>
        <el-button v-if="!edit" type="primary" @click="edit = true">修改信息</el-button>
        <el-button v-if="edit" type="primary" @click="unEdit">返回</el-button>
        <el-button v-if="edit" type="danger" @click="uploadChange">确认修改</el-button>
      </el-form>
      <div class="otherMessage">
        <el-form :model="userForm">
          <!--          <el-form-item label="创建者">{{userForm.createBy}}</el-form-item>-->
          <!--          <el-form-item label="最近更新时间">{{userForm.updateTime}}</el-form-item>-->
          <!--          <el-form-item label="更新者">{{userForm.updateBy}}</el-form-item>-->
          <el-form-item label="用户抗风险等级">{{ level }}</el-form-item>
          <el-form-item label="用户创建时间">{{ userForm.createTime }}</el-form-item>
        </el-form>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.el-form-item {
  align-items: center;
  height: 40px;
}
.el-form-item div {
  text-indent: 1em;
}
.box {
  width: 30%;
  margin-left: 20px;
}
.otherMessage {
  padding-left: 20px;
  margin-left: 20px;
}
</style>
