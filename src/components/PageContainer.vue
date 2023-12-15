<script setup>
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <div>
          <!--          具名插槽-->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!--    默认插槽-->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
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
