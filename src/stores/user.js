import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo, updateUserInfo, getUserList, delUserById } from '../api/user.js'

// 用户模块
export const useUserStore = defineStore(
  'mfic-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const user = ref({})
    const userId = ref(0)
    const getUserId = () => {
      userId.value = localStorage.getItem('userId')
    }
    const getUser = async () => {
      getUserId()
      const res = await getUserInfo(userId.value)
      user.value = res.data.data
    }
    const delUser = async (delId) => {
      await delUserById(delId)
    }
    const getList = async (pageNum, pageSize) => {
      const res = await getUserList(pageNum, pageSize)
      const list = []
      console.log(res)
      list.value = res.data.data
      return list.value
    }
    const setUser = async (obj) => {
      user.value = obj
      await updateUserInfo(obj)
    }
    return {
      token,
      setToken,
      user,
      getUser,
      getList,
      setUser,
      delUser,
      getUserId
    }
  },
  {
    persist: true
  }
)
