<template>
  <el-dialog
      v-model="visible"
      :title="props.widget.name"
      :width="props.width"
      top="30vh"
      :before-close="handleClose"
      append-to-body
  >
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {CountdownOption, WidgetOption} from "@/vite-env";
const visible = defineModel('visible')
const handleClose = () => {
  visible.value = false
}

const props = withDefaults(defineProps<{
  widget?: WidgetOption<CountdownOption>
  width?: string
}>(),{
  width : '500px'
})

const emit = defineEmits(['confirm'])

const handleConfirm = () => {
  visible.value = false
  emit('confirm')
}


</script>
<style scoped lang="scss">
::v-deep(.el-dialog__header){
  padding-bottom: 10px;
}
</style>