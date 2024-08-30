<template>
  <div class="page" :style="`transition: background 0.35s linear;background:url(${pageBackgroundUrl}) no-repeat center; background-size: cover;`">
    <div class="container">
      <div class="page_header">
        <Date/>
        <Search />
      </div>
      <div class="page-body">
        <Widgets/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Search from "@/components/Search.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import bg from '@/images/bg.jpg'
import Date from "@/components/Date.vue";
import Widgets from "@/components/Widgets.vue";
import browser from "webextension-polyfill";

const pageBackgroundUrl = ref(bg)
onMounted(()=>{

  // browser.storage.session.get('newtab_bg').then(res => {
  //   if (res.newtab_bg){
  //     pageBackgroundUrl.value = res.newtab_bg
  //   }else {
  //     pageBackgroundUrl.value = bg
  //   }
  //
  //   // 获取背景图
  //   axios.get('https://api.chongss.com/api.php',{
  //     params: {
  //       category: 'bing',
  //       return : 'json'
  //     }
  //   }).then(res=>{
  //     pageBackgroundUrl.value = res.data.imgurl
  //     browser.storage.session.set({newtab_bg : res.data.imgurl})
  //   })
  // })

})
</script>

<style scoped lang="scss">
.page{
  display: flex;
  height: 100vh;
  width: 100vw;
  transition: background 0.35s linear;
  padding: 15vh 16px 0;

  .page_header{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
  }

}
</style>