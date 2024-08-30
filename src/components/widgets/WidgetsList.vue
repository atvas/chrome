<template>
  <component :is="widget" v-if="widget" :widget="props.widget" :clickEvent="props.eventValid"></component>
</template>
<script setup lang="ts">
  import {WidgetOption} from "@/vite-env";
  import Countdown from "@/components/widgets/Countdown.vue";
  import Trending from "@/components/widgets/Trending.vue";
  import Website from "@/components/widgets/Website.vue";
  import {computed} from "vue";

  const props = withDefaults(defineProps<{
    widget : WidgetOption<any>
    eventValid ?: boolean
  }>(),{
    eventValid: true
  })

  // 计算属性
  const widget = computed(() => {
    if (props.widget.component === 'Trending'){
      return Trending
    }

    if (props.widget.component === 'Countdown'){
      return Countdown
    }

    if (props.widget.component === 'Website'){
      return Website
    }
  })
</script>

<style scoped lang="scss">

</style>