<template>
  <PageContainer title="全部基金">
    <el-table :data="fundList" stripe border style="height: 60vh" :cell-style="cellStyle">
      <el-table-column width="90" prop="fundCode" label="基金代码" />
      <el-table-column prop="fundName" label="基金名称" />
      <el-table-column width="120" prop="fundType" label="基金类型" />
      <el-table-column width="120" prop="fundManager" label="基金经理" />
      <el-table-column width="100" prop="oneMonth" label="近1月" />
      <el-table-column width="100" prop="threeMonth" label="近3月" />
      <el-table-column width="100" prop="sinceBirth" label="成立来" />
      <el-table-column width="100" prop="fundStatus" label="状态">
        <template v-slot="scope">
          <span :style="{ color: scope.row.fundStatus === 1 ? 'green' : 'red' }">
            {{ scope.row.fundStatus === 0 ? '未开放' : '开放中' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <div class="showDetails" @click="showDetails(row)">查看详情</div>
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
import { getFundList } from '/src/api/fund'
import router from '../../router'
const fundList = ref([])
const pagenum = ref(1)
const pageSize = ref(20)
const total = ref(0)
onMounted(async () => {
  const res = await getFundList(pagenum.value, pageSize.value)
  fundList.value = res.data.data.fundList
  total.value = res.data.data.total
})
const showDetails = (row) => {
  router.push('/main/fundDetail/' + row.fundCode)
}
const onCurrentChange = async (page) => {
  pagenum.value = page
  const res = await getFundList(pagenum.value, pageSize.value)
  fundList.value = res.data.data.fundList
}
const cellStyle = ({ row, column }) => {
  let style = {}
  let one = row.oneMonth[0]
  let three = row.threeMonth[0]
  let birth = row.sinceBirth[0]

  const regex = /^[1-9]$/

  regex.test(one) ? (style.color = 'red') : (style.color = 'green')
  if( row.oneMonth === '/' || row.oneMonth === '--' ) style.color = 'black'
  if (column.label === '近1月') return style
  regex.test(three) ? (style.color = 'red') : (style.color = 'green')
  if( row.threeMonth === '/' || row.threeMonth === '--' ) style.color = 'black'
  if (column.label === '近3月') return style
  regex.test(birth) ? (style.color = 'red') : (style.color = 'green')
  if( row.sinceBirth === '/' || row.sinceBirth === '--' ) style.color = 'black'
  if (column.label === '成立来') return style
}
</script>

<style scoped>
.showDetails {
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
}
.showDetails:hover {
  color: paleturquoise;
}
::v-deep .el-table th,
::v-deep .el-table td {
  text-align: center !important;
}
</style>
