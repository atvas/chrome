
<template>
  <Card @click="handleEditCard">
    <div class="countdown">
      <div class="title">
        <span v-if="wordStatus == 'onwork'">下班还有:</span>
        <span v-else>休息时间</span>
        <span v-if="wordStatus == 'onwork'">{{ timerText }}</span>
        <span v-else></span>
      </div>
      <div class="image">
        <img v-if="wordStatus == 'onwork'" :src="onwork" alt="">
        <img v-else :src="offwork" alt="">
      </div>
    </div>

    <WidgetDialog :widget="props.widget" v-model:visible="showDialog" @confirm="handleConfirm">
      <div class="widgets_option">
        <div class="item">
          <div class="name">组件名称:</div>
          <el-input v-model="props.widget.name"  style="width: 240px" placeholder="Please input" />
        </div>
        <div class="item">
          <div class="name">上班时间:</div>
          <el-time-picker v-model="startTime"  style="width: 240px"  placeholder="Arbitrary time" />
        </div>
        <div class="item">
          <div class="name">下班时间:</div>
          <el-time-picker v-model="endTime"  style="width: 240px"  placeholder="Arbitrary time" />
        </div>
      </div>
    </WidgetDialog>
  </Card>
</template>
<script setup lang="ts">
import Card from "@/components/widgets/Card.vue";
import onwork from '@/images/onwork.webp'
import offwork from '@/images/offwork.webp'
import {onMounted, ref} from "vue";
import WidgetDialog from "@/components/WidgetDialog.vue";
import {CountdownOption, WidgetOption} from "@/vite-env";
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration'
import dayjs from "dayjs";
dayjs.extend(relativeTime);
dayjs.extend(duration)

import browser from "webextension-polyfill";
const props = withDefaults(defineProps<{
  widget: WidgetOption<CountdownOption>,
  clickEvent ?: boolean
}>(),{
  clickEvent : true
})

const startTime = ref(new Date(dayjs().format('YYYY-MM-DD') + ' ' + props.widget.options?.startTime) )
const endTime = ref(new Date(dayjs().format('YYYY-MM-DD') + ' ' + props.widget.options?.endTime) )

const showDialog = ref(false)
const handleEditCard = (e : Event) => {
  e.preventDefault()
  if (!props.clickEvent) return
  showDialog.value = true
}

const wordStatus = ref<'onwork' | 'rest'>('rest')


// dayjs 下班倒计时
const timer = ref<NodeJS.Timeout>(null)
const timerText = ref('')

const countdownEvent = () => {
  const now = dayjs()

  if (now.isBefore(dayjs(startTime.value)) || now.isAfter(dayjs(endTime.value))){
    return wordStatus.value = 'rest'
  }


  if (now.isBefore(dayjs(endTime.value)) && now.isAfter(dayjs(startTime.value))){
    wordStatus.value = 'onwork'
    // 计算时间差
    const diff = dayjs(endTime.value).diff(now)
    const duration = dayjs.duration(diff);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours().toString().padStart(2, '0');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const seconds = duration.seconds().toString().padStart(2, '0');
    timerText.value = `${hours}:${minutes}:${seconds}`
  }

}

onMounted(() => {
  countdownEvent()
  setInterval(()=>{countdownEvent()}, 1000)
})

/**
 * 更新数据
 */
const handleConfirm = () => {
  browser.storage.session.get('widgets').then(res => {
    const widgets = res.widgets.map((item : WidgetOption<CountdownOption>) => {
      if (item.id === props.widget.id){
        item.name = props.widget.name
        item.options = {
          startTime: dayjs(startTime.value).format('HH:mm'),
          endTime: dayjs(endTime.value).format('HH:mm')
        }
      }
      return item
    })

    browser.storage.session.set({widgets: widgets}).then(dd => {
      console.log('更新成功')
    })
})
}



</script>
<style scoped lang="scss">
.countdown{
  .title{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    span{
      color: #666666;

      &:first-child{
        font-size: 13px;
      }

      &:last-child{
        font-size: 16px;
      }
    }
  }

  .image{
    display: flex;
    justify-content: center;

     img {
       width: 70%;
     }
  }

}


.widgets_option{
  padding: 10px;
  border-radius: 8px;
  //background: #f1f0f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    ::v-deep(.el-input__inner) {
      font-size: 13px;
    }

  }
}
</style>