
<template>
  <Card :option="option" @click="handleClick" class="website_wrapper">
    <div class="name">{{ props.widget.options?.name }}</div>
    <div class="website">
      <img :src="props.widget.options?.imgSrc" alt="">
    </div>
  </Card>
</template>
<script setup lang="ts">
import {CountdownOption, WebsiteOption, WidgetOption} from "@/vite-env";

const props = withDefaults(defineProps<{
  widget: WidgetOption<WebsiteOption>
}>(),{
})


const option = {
  layout: 'small',
  background : props.widget.options?.backgroundColor ? props.widget.options?.backgroundColor : '#ffffff',
  color: '#ffffff'
}

/**
 * 点击跳转网站
 */
const handleClick = () => {
  window.location.href = props.widget.options?.url
}

import Card from "@/components/widgets/Card.vue";
</script>

<style scoped lang="scss">
.website_wrapper{
  position: relative;
  overflow: hidden;

  .name{
    position: absolute;
    bottom:  0;
    left: 0;
    font-size: 10px;
    background: #0055cc;
    color: #ffffff;
    font-weight: 300;
    width: 100%;
    text-align: center  ;
    padding-bottom: 4px;
    padding-top: 4px;
    border-radius: 50% 50% 4px 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.website{
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-top: -8px;


  img{
    width: 100%;
  }
}
</style>