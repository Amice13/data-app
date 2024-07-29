<template>
  <div style="height: vh100;" class="d-flex align-center hero-unit">
    <div>
      <div class="d-tabs d-flex">
        <div
          v-for="tab in items"
          @click="model = tab"
          v-bind:class="{ active: model === tab }"
          class="tab"
        >
          {{ tab }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.d-tabs .tab {
  padding: 6px 0px;
  margin: 2px 16px;
  font-size: 18px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
}

.d-tabs .tab.active {
  color: #000;
  border-bottom: 2px solid #000;
}
</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    modelValue: {
      type: String,
    }
  },
  computed: {
    model: {
      get () { return this.modelValue },
      set (value) { this.$emit('update:modelValue', value) }
    }
  }
}
</script>
