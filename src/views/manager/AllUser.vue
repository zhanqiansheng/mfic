<template>
  <PageContainer title="用户管理">
    <el-table :data="userList" stripe border style="height: 60vh">
      <el-table-column width="200" prop="userId" label="用户ID" />
      <el-table-column width="300" prop="userName" label="用户名称" />
      <el-table-column width="200" prop="userPermission" label="用户权限">
        <template v-slot="scope">
          <span :style="{ color: scope.row.userPermission === 1 ? 'black' : 'red' }">
            {{ scope.row.userPermission === 0 ? '管理员' : '普通用户' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column width="100" prop="userType" label="用户类型" />
      <el-table-column width="300" label="操作">
        <template #default="{ row }">
          <div style="display: flex">
            <div class="showDetails" @click="showDetails(row)">查看详情</div>
            <div class="showDetails del" @click="del(row)">删除</div>
          </div>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据哦"></el-empty>
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="pagenum"
      :page-size="pageSize"
      :total="total"
      :background="true"
      layout="prev, pager, next, total, jumper"
      style="margin-top: 20px; justify-content: flex-end"
      @current-change="onCurrentChange"
    />
  </PageContainer>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '/src/stores'

const userStore = useUserStore()
const pageNum = ref(1)
const pageSize = ref(6)
const total = ref(100)
const userList = ref([])
onMounted(() => {
  updateUserList()
})
const updateUserList = () => {
  const res = userStore.getList(pageNum.value, pageSize.value)
  res.then((value) => {
    userList.value = value
    console.log(value)
  })
}
const onCurrentChange = async (page) => {
  pageNum.value = page
  updateUserList()
}
const showDetails = (row) => {
  console.log(row.userId)
}
const del = (row) => {
  console.log(row.userId)
  // 确认修改
  ElMessageBox.confirm('你确认要删除当前用户吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.delUser(row.userId)
    ElMessage.success('删除成功')
  })
}
</script>

<style scoped>
.showDetails {
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  margin: auto;
}
.showDetails:hover {
  color: paleturquoise;
}
.del:hover {
  color: red;
}
::v-deep .el-table th,
::v-deep .el-table td {
  text-align: center !important;
}
</style>
