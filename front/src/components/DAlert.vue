<template>
  <div
    class="diia-alert"
    :class="{
      'pt-10 pb-10 pl-8 pr-8': density === 'normal',
      'pt-6 pb-6 pl-4 pr-4': density === 'comfort',
    }"
  >
    <div v-show="showIcon" class="flex-shrink-0 flex-grow-0 mr-4">
      <img :src="`${assets}/emoji/${icon}`" />
    </div>
    <div class="main-text flex-grow-1">
      <slot></slot>
    </div>
  </div>
</template>

<style>

.diia-alert {
  background: #fff7e3;
  display: flex;
  padding: 16px 24px;
  color: #000;
  border-image-slice: 1;
  border-style: solid;
  border-width: 2px;
  border-image-source: linear-gradient(0deg, #2833d0 .01%, #7179ef 17.19%, #bf98c6 48.44%, #f1acac);
}

</style>

<script>
export default {
  props: {
    showIcon: {
      type: Boolean
    },
    density: {
      type: String,
      default: 'compact'
    },
    icon: {
      type: String,
      default: 'finger.png'
    }
  },
  computed: {
    assets () {
      return process.env.ROOT_URL || ''
    }
  }
}
</script>
