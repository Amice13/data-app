<template>
  <v-pagination
    v-model="model"
    class="d-pagination"
    prev-icon="mdi-arrow-left"
    next-icon="mdi-arrow-right"
    density="compact"
    :length="length"
  />
</template>

<style>

.d-pagination .v-pagination__item button {
  height: 24px;
  padding: 0px 18px !important;
  border-radius: 20px !important;
  border: 2px solid rgba(0, 0, 0, 0);
  font-family: eUkraine;
  font-size: 13px;
}

.d-pagination .v-pagination__item.v-pagination__item--is-active button {
  border-radius: 20px !important;
  border: 2px solid #000;
  background: none;
}

.d-pagination .v-pagination__item .v-btn__overlay ,
.d-pagination .v-pagination__item .v-btn__underlay {
  display: none;
}

.hero-unit {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
    length: {
      type: Number
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
