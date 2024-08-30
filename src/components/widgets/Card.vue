<template>
  <el-card :layout="option.layout">
    <slot></slot>
  </el-card>
</template>

<script setup lang="ts">
import {CardOption} from "@/vite-env";
const { option } = withDefaults(defineProps<{
  option?: CardOption
}>(),{
  option() {
      return {
        background: '#fff',
        layout: 'min',
        color: '#000'
      }
  },
})
</script>

<style scoped lang="scss">
.el-card{
  border-radius: 16px;
  color: v-bind('option.color');
  background: v-bind('option.background');
  border: transparent;
  --el-card-padding:12px;
}

.el-card[layout="max"]{
  width: 320px;
  height: 150px;
  grid-column: span 4;
  grid-row: span 2;
}

.el-card[layout="min"]{
  width: 150px;
  height: 150px;
  grid-column: span 2;
  grid-row: span 2;
}
.el-card[layout="small"]{
  width: 65px;
  height: 65px;
}
</style>