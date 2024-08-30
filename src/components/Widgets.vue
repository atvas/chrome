<template>
  <VueDraggable ref="el" v-model="widgetsData" class="widgets">
    <TransitionGroup
        type="transition"
        name="fade"
    >
      <template v-for="widget in widgetsData" :key="widget.id">
        <WidgetsList :widget="widget" v-if="widget.component != 'Add'"></WidgetsList>
        <Add v-if="widget.component == 'Add'" :widget="widget" />
      </template>
    </TransitionGroup>
  </VueDraggable>
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {VueDraggable} from "vue-draggable-plus";
import {WidgetOption} from "@/vite-env";
import browser from "webextension-polyfill";
import Add from "@/components/widgets/Add.vue";
import WidgetsList from "@/components/widgets/WidgetsList.vue";
import {widgets} from "@/data/widgets";

const widgetsData = ref<Array<WidgetOption<any>>>([])

onMounted(()=>{

  // browser.storage.session.set({widgets : [
  //     ...widgets,
  //     {
  //       name : 'Add',
  //       component: 'Add',
  //       id: '1725004695081'
  //     }
  //   ]}).then(dd => {
  //   // console.log('初始化默认数据')
  // })


  browser.storage.session.get('widgets').then(res => {
    if (!Object.keys(res).length){

      browser.storage.session.set({widgets : [
          ...widgets,
          {
            name : '添加',
            component: 'Add',
            id: '1725004695081'
          }
        ]}).then(dd => {
        // console.log('初始化默认数据')
      })

    }else {
      widgetsData.value = res.widgets
    }
  })

  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'session'){
      // console.log('监听到数据变化')
      widgetsData.value = changes.widgets.newValue
    }
  })
})

watch(widgetsData, (value)=>{
  browser.storage.session.set({widgets: Array.from(value)}).then(dd => {
    // console.log('更新成功')
  })
})

</script>

<style scoped lang="scss">
.widgets{
  //display: flex;
  //flex-wrap: wrap;
  //gap: 20px;

  display: grid;
  user-select:none;
  grid-template-columns: repeat(auto-fill,65px);
  grid-template-rows: repeat(auto-fill,65px);
  grid-auto-flow: dense;
  grid-gap: 20px;
  box-sizing:border-box;
}
</style>