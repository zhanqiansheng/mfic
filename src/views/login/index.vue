<script setup>
import { ref } from 'vue'
import { userLogin, userRegister } from '/src/api/user'
import { User, Lock, View, Discount } from '@element-plus/icons-vue'
import { useUserStore } from '/src/stores'
import { useRouter } from 'vue-router'
const router = useRouter()
const useStore = useUserStore()
const form = ref(null)
const isLogin = ref(true)

// 登录用表单
const loginForm = ref({
  userName: 'zheshenmeguia',
  userPassword: 'Aa18938802195'
})

// 注册用表单（默认）
const defaultRegisterForm = ref({
  userName: '',
  userPassword: '',
  userCardId: '',
  userPermission: 1,
  userType: '个人'
})

// 注册用表单
const registerForm = ref({
  ...defaultRegisterForm.value
})

// 校验规则
const rules = {
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 20, message: '请输入1~20位的用户名', trigger: 'blur' },
    {
      pattern: /^\S{1,20}$/,
      message: '用户名必须是1-20位的非空字符',
      trigger: 'blur'
    }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码限制在6~18位', trigger: 'blur' },
    {
      pattern: /^\S{1,18}$/,
      message: '密码必须是6-18位的非空字符',
      trigger: 'blur'
    }
  ],
  rePassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.userPassword) {
          callback(new Error('两次密码输入不一致!'))
        } else {
          callback() // 校验成功也需要callback
        }
      },
      trigger: 'blur'
    }
  ],
  userCardId: [
    { required: true, message: '请输入身份证号码', trigger: 'blur' },
    { min: 18, max: 18, message: '号码长度限制为18位!', trigger: 'blur' },
    {
      pattern: /^\S{1,18}$/,
      message: '号码必须是18位的非空字符!',
      trigger: 'blur'
    }
  ]
}

// 注册请求
const registerAccount = async () => {
  await form.value.validate()
  const res = await userRegister(registerForm.value)
  ElMessage.success('注册成功')
  isLogin.value = true
  registerForm.value = { ...defaultRegisterForm.value }
}

// 用户登录
const login = async () => {
  await form.value.validate()
  const res = await userLogin(loginForm.value)
  localStorage.setItem('userId', res.data.data.user.userId)
  useStore.setToken(res.data.data)
  ElMessage.success('登录成功')
  await router.push('/')
}
</script>

<template>
  <div class="bg">
    <el-row>
      <el-col :span="12">
        <img class="leftimg" />
      </el-col>
      <el-col v-if="isLogin" :span="6" :offset="3" class="form">
        <div class="title">登录</div>
        <!--        登录表单-->
        <el-form ref="form" :model="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.userName" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" v-model="loginForm.userPassword" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="turn" @click="isLogin = false">注册→</div>
        <div style="margin-top: 40px">该系统仅用作个人学习使用！禁止转载与商用！</div>
      </el-col>
      <el-col v-else :span="6" :offset="3" class="form">
        <div class="title">注册</div>
        <el-form ref="form" :model="registerForm" :rules="rules">
          <el-form-item prop="userName">
            <el-input :prefix-icon="User" v-model="registerForm.userName" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input :prefix-icon="Lock" v-model="registerForm.userPassword" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="rePassword">
            <el-input v-model="registerForm.rePassword" :prefix-icon="View" placeholder="请再次输入密码" />
          </el-form-item>
          <el-form-item prop="userCardId">
            <el-input v-model="registerForm.userCardId" :prefix-icon="Discount" placeholder="请输入银行卡号" />
          </el-form-item>
          <el-form-item style="margin-top: 40px">
            <div style="line-height: 20px">用户权限：</div>
            <label style="display:flex"><input type="radio" v-model="registerForm.userPermission" value="0" name="userPermission" class="theRadio"><div>管理员</div></label>
            <label style="display:flex"><input type="radio" v-model="registerForm.userPermission" value="1" name="userPermission" class="theRadio" checked><div>普通用户</div></label>
          </el-form-item>
          <el-form-item>
            <div style="line-height: 20px">用户类型：</div>
            <label style="display:flex"><input type="radio" name="userType" value="企业" v-model="registerForm.userType" class="theRadio"><div>企业</div></label>
            <label style="display:flex"><input type="radio" name="userType" value="个人" v-model="registerForm.userType" class="theRadio" checked><div>个人</div></label>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login" @click="registerAccount">注册</el-button>
          </el-form-item>
        </el-form>
        <div class="turn" @click="isLogin = true">←登录</div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
  background-color: rgba(175, 238, 238, 0.2);
}
.theRadio{
  width: 15px;
  height: 15px;
  margin: auto 5px auto 15px;
}
.el-col {
  border-radius: 20px;
}
.el-input {
  margin: 15px auto;
  height: 40px;
}
.title {
  font-size: 30px;
  color: black;
  margin-bottom: 10px;
}
.leftimg {
  background-image: url('src/assets/left.jpg');
  background-size: cover;
  background-position: top left;
  background-repeat: no-repeat;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  height: 100vh;
  width: 100%;
}
.login {
  width: 100%;
  height: 40px;
  margin: 10px auto;
}
.turn {
  font-size: 20px;
  color: grey;
  cursor: pointer;
}
.turn:hover {
  color: #dddddd;
}
.form {
  margin: auto;
}
</style>
