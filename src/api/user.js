import request from '/src/utils/request'

// 用户登录
export const userLogin = ({ userName, userPassword }) => {
  return request.post(
    '/user/login',
    {
      userName: userName,
      userPassword: userPassword
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 用户注册
export const userRegister = (data) => {
  return request.post('/user/addUser', data)
}

// 获取用户信息
export const getUserInfo = (id) => {
  return request.get(
    '/user/userInfo',
    {
      params: {
        userId: id
      }
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request.post('/user/updateUser', data)
}

// 获取用户列表
export const getUserList = (pageNum, pageSize) => {
  return request.get(
    '/user/userList',
    {
      params: {
        pageNum: pageNum,
        pageSize: pageSize
      }
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}

// 删除用户delUserById还没完善
export const delUserById = (delId) => {
  return request.get(
    '/user/userList',
    {
      params: {
        delId: delId
      }
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
}
