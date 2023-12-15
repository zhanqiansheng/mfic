//
import request from '/src/utils/request'

export const userRegister = (data) => {
  return request.post('/userbuy/addUserbuy', data)
}
