<template>
  <div class="search">
    <el-autocomplete
        v-model="searchContainer"
        fit-input-width
        :fetch-suggestions="[]"
        clearable
        :prefix-icon="Search"
        class="inline-input w-50"
        placeholder="Google Search"
        @select="handleSelect"
        value-key="title"
        style="--el-input-width:460px;"
        @keyup.enter="handleSearch"
    />
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import { Search } from '@element-plus/icons-vue'
import browser from "webextension-polyfill";
import Browser from "webextension-polyfill";

// 历史记录
const searchHistory = ref<Browser.History.HistoryItem[]>([])
const handleSearch = () => {
  window.location.href = `https://www.google.com/search?q=${searchContainer.value}`
}

onMounted(()=>{
  browser.history.search({text: '', maxResults: 10}).then(res=>{
    if (res.length){
      searchHistory.value = res
    }
  })
})


// 自动补全
const searchContainer = ref('')
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
      ? searchHistory.value.filter(createFilter(queryString))
      : searchHistory.value

  // call callback function to return suggestions
  cb(results.map((item)=>{
    return {
      ...item,
      title: item.title?.split('-')[0]
    }
  }))

}

const createFilter = (queryString: string) => {
  return (restaurant: Browser.History.HistoryItem) => {
    return (
        restaurant.title?.includes(queryString)
    )
  }
}

const handleSelect = (item: Browser.History.HistoryItem) => {
  window.location.href = item.url
}

</script>

<style lang="scss" scoped>
.search{
  --el-input-width:460px;
  --el-input-border-radius : 12px;
  --el-input-height: 48px;
}

//穿透
::v-deep(.el-input__wrapper){
  height: 48px;
  border-radius: 12px;
}
</style>