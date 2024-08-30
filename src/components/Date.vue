
<template>
<div class="date">
  <div>{{ hour_minute }}</div>
 <div> {{ dateText }}</div>
</div>
</template>
<script setup lang="ts">

import {onMounted, onUnmounted, ref} from "vue";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/zh-cn'
import { Lunar } from 'lunar-typescript'
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.locale('zh-cn')

const hour_minute = ref('')
const dateText = ref('')
const timer = ref<NodeJS.Timeout>(null)

/**
 * 获取时间
 * 实例化时间格式
 */
const getDate = () => {
  const dateAndWeekday = dayjs().format('M月D日 dddd');
  const lunar = Lunar.fromDate(new Date());
  const lunarDate = lunar.getMonthInChinese() + '月' + lunar.getDayInChinese();
  dateText.value = dateAndWeekday + ' ' + lunarDate
  hour_minute.value = dayjs().format('HH:mm')
}

onMounted(()=>{
  getDate()
  timer.value = setInterval(()=>{
    getDate()
  },1000)
})


onUnmounted(()=>{
  if (timer.value){
    clearInterval(timer.value)
  }
})

</script>

<style scoped lang="scss">
.date{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  div{
    color: white;
    &:first-child{
      font-size: 48px;
    }

    &:last-child{
      font-size: 13px;
    }
  }
}
</style>