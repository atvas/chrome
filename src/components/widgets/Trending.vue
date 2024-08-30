
<template>
  <Card :option="option">
    <div class="platform">
      <div class="item" v-for="item in platform" :class="item.key == platformKey && 'active' " :key="item.key" @click="platformKey = item.key">{{ item.name }}</div>
    </div>
    <div class="content" v-for="item in platform" :key="item.key">
      <a class="item" v-for="(data,index) in item.data" :key="index" v-if="item.key === platformKey" :href="data.link">
        <span> &nbsp;{{ data.title }}</span>
        <span>{{ data.hotValue }}</span>
      </a>
    </div>
  </Card>
</template>
<script setup lang="ts">
import Card from "@/components/widgets/Card.vue";
import {onMounted, ref} from "vue";
import axios from "axios";

const option = {
  layout: 'max',
  background : 'linear-gradient(135deg,#252934,#494f5b)',
  color: '#ffffff'
}

const platform = ref([
    {
      name : '百度',
      key : 'baidu',
      data: []
    },
    {
      name : '微博',
      key : 'weibo',
      data: []
    },
    {
      name : '知乎',
      key : 'zhihu',
      data: []
    }
])
const platformKey= ref('baidu')

/**
 * 获取平台热搜数据
 */
const getPlatformData = () => {
  Promise.all([axios.get('https://api.codelife.cc/api/top/list?lang=cn&id=Jb0vmloB1G'),axios.get('https://api.codelife.cc/api/top/list?lang=cn&id=mproPpoq6O'),axios.get('https://api.codelife.cc/api/top/list?lang=cn&id=KqndgxeLl9&size=20')]).then(([baidu,zhihu,weibo])=>{
    platform.value = platform.value.map(item=>{
      if(item.key == 'weibo'){
        item.data = weibo.data.data.slice(0,5)
      }else if(item.key == 'zhihu'){
        item.data = zhihu.data.data.slice(0,5)
      }else if(item.key == 'baidu'){
        item.data = baidu.data.data.slice(0,5)
      }
      return item
    })
  })
}


onMounted(()=>{
  getPlatformData()
})


</script>

<style scoped lang="scss">
.platform{
  display: flex;
  gap: 6px;

  .item{
    font-size: 12px;
    padding: 3px;
    border-radius: 4px;
    cursor: pointer;
  }

  .active{
    background: #545861;
  }
}

.content{
  display: flex;
  flex-direction: column;
  gap: 4px;

  .item{
    font-size: 13px;
    color: #ededed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;

    &:hover{
      color: #fff;
    }

    span{
       &:first-child{
         display: block;
         width: 70%;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
      }

      &:last-child{
        color: #B3B6BB;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
    }

    &:first-child{
      margin-top: 8px;
    }
  }
}
</style>