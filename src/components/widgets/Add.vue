
<template>
  <Card class="add_wrapper" :option="option" @click="visible = true">
    <div class="add">
      <el-icon><Plus /></el-icon>
    </div>
    <WidgetDialog v-model:visible="visible" :widget="props.widget" width="800px">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="menu">
            <div v-for="item in menu" :key="item.key" class="item" :class="item.key == currentMenuKey && 'active'" @click="currentMenuKey = item.key">{{ item.name }}</div>
          </div>
        </el-col>
        <el-col :span="18">
          <el-scrollbar height="400px">
            <div class="widget_list list" v-if="currentMenuKey == 'widget'">
              <div class="item" v-for="(item,index) in widgets.filter(widget => widget.id != '1725004695081')" :key="index">
                <div class="title">{{ item.name }}</div>
                <WidgetsList :widget="item" :eventValid="false"/>
                <div class="option">
                  <el-button type="success" size="small" disabled>暂不支持</el-button>
                </div>
              </div>
            </div>
            <div v-infinite-scroll="load" :infinite-scroll-distance="50" class="website_list list" v-else-if="currentMenuKey == 'website'">
              <div class="item" v-for="item in websites" :key="item._id">
                <div class="wrapper">
                  <div class="icon" :style="{'background' : item.backgroundColor }">
                    <img :src="item.imgSrc" alt="">
                  </div>
                  <div class="info">
                    <div class="title">{{ item.name}}</div>
                    <div class="desc">{{ item.description }}</div>
                  </div>
                </div>
                <div class="option">
                  <el-button type="success" size="small" @click="addWebsite(item)">添加</el-button>
                </div>
              </div>
              <div class="loading" v-if="websitesLoading">
                <el-icon v-if="!websitesLoadingMore"><Loading /></el-icon>
                <span v-if="websitesLoadingMore">没有更多了</span>
              </div>
            </div>
          </el-scrollbar>
        </el-col>
      </el-row>
    </WidgetDialog>
  </Card>
</template>
<script setup lang="ts">
import Card from "@/components/widgets/Card.vue";
import {Loading, Plus} from "@element-plus/icons-vue";
import WidgetDialog from "@/components/WidgetDialog.vue";
import {onMounted, ref} from "vue";
import {CountdownOption, WebsiteOption, WidgetOption} from "@/vite-env";
import Trending from "@/components/widgets/Trending.vue";
import {widgets} from "@/data/widgets";
import WidgetsList from "@/components/widgets/WidgetsList.vue";
import axios from "axios";
import browser from "webextension-polyfill";
import dayjs from "dayjs";

const option = {
  layout: 'small',
  background : '#ffffff',
  color: '#000000'
}

const props = withDefaults(defineProps<{
  widget: WidgetOption<null>
}>(),{})

const visible = ref(false)

// 菜单
const currentMenuKey = ref('widget')
const menu = [
  {
    name : '小部件',
    key: 'widget',
  },
  {
    name: '热门网站',
    key: 'website'
  }
  // {
  //   name: '自定义图标',
  //   key: 'icon'
  // }
]

/**
 * 获取热门网站
 */
const websites = ref([])
const websitesPage = ref(1)
const websitesLoading = ref(false)
const websitesLoadingMore = ref(false)
const getWebsites = (page : number) => {
  if (websitesLoadingMore.value) return
  websitesLoading.value = true
  axios.get('https://api.codelife.cc/website/list?lang=zh&type=app&name=&source=itab',{
    params:{
      page : page
    }
  }).then(res=>{
    if (res.data.data.length == 0){
      websitesLoadingMore.value = true
    }
    websites.value = [...websites.value,...res.data.data].filter(item => !['64af5b5b6c8ff64c80a1e076','61eae25cc99b56d25bb0c70d','61eae2a8c99b56d25bb0c795'].includes(item._id))
    websitesPage.value++
  }).finally(()=>{
    websitesLoading.value = false
  })
}
//
const load = () => {
  getWebsites(websitesPage.value)
}

/**
 * 添加网站
 * @param item
 */
const addWebsite = (item : WebsiteOption) => {
  browser.storage.session.get('widgets').then(res => {
    const widgets = [...res.widgets,{
      name : 'Website',
      component: 'Website',
      id: new Date().getTime().toString(),
      options: item
    }]

    browser.storage.session.set({widgets: widgets}).then(dd => {
      visible.value = false
    })
  })
}

onMounted(()=>{
  getWebsites(websitesPage.value)
})

</script>

<style scoped lang="scss">
.add_wrapper {
  cursor: pointer;
  ::v-deep(.el-card__body){
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.add{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #0055cc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 18px;
}

.menu{
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  gap: 4px;

  .item{
    padding: 8px 24px;
    cursor: pointer;
    border-radius: 8px;
    color: #000000;
    font-size: 14px;
    font-weight: 500;

    &:hover{
      background: #f6f6f7;
    }

    &.active{
      background: #f6f6f7;
    }
  }
}

.list{
  background: #f6f6f7;
  border-radius: 8px;
  padding: 8px;
  min-height: 400px;

  .option{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  &.widget_list{
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);

    ::v-deep(.el-card[layout="max"]){
      width: 150px;
    }

    .item{
      background: #f1f1f1;
      border-radius: 8px;
      padding: 16px;
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;

      .title{
        font-weight: 700;
        color: #000000;
      }
    }
  }

  &.website_list{
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);

    .loading{
      display: flex;
      justify-content: center;
      padding: 10px 0;
      grid-column: span 2;
    }


    .item{
      background: #f1f1f1;
      border-radius: 8px;
      padding: 16px;
      max-width: 278px;
      overflow: hidden;

      .wrapper{
        display: flex;
        gap: 14px;
        align-items: center;
        margin-bottom: 14px;
      }

      .info{
        flex: 1;
        .title{
          font-weight: 700;
          font-size: 14px;
          color: #000;
          margin-bottom: 4px;
        }
        .desc{
        //  显示两行
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 12px;
          color: #545861;
        }
      }

      .icon{
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        background: #ffffff;

        img{
          width: 70%;
        }
      }
    }
  }
}


</style>