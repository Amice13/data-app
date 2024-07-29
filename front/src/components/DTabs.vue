<template>
  <div style="height: vh100;" class="d-flex align-center hero-unit">
    <div>
      <div class="d-tabs d-flex align-center" :class="{ secondary }">
        <div
          v-for="(tab, i) in items"
          @click="model = tab"
          v-bind:class="{ active: model === tab }"
          class="tab"
        >
          {{ tab }}
          <span class="count" v-if="counts[i]">{{ counts[i] }}</span>
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

.d-tabs .tab .count {
  margin-left: 6px;
  color: #999;
  position: relative;
  display: inline-block;
}

.d-tabs.secondary .tab .count {
  border-radius: 20px;
  margin-left: 6px;
  position: relative;
  left: 6px;
  color: #000;
  background: #CCC;
  padding-top: 2px;
  text-align: center;
  width: 20px;
  height: 20px;
}

.d-tabs.secondary .tab {
  background: #F1F1F1;
  margin: 2px 8px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  color: #000;
  padding: 8px 18px;
  line-height: 15.59px;
}

.d-tabs.secondary .tab.active {
  background: none;
  border: 2px solid #000;
}

.d-tabs.secondary .tab.active .count {
  background: #000;
  color: #FFF;
}


</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
    counts: {
      type: Array,
      default: () => ([])
    },
    secondary: {
      type: Boolean
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
