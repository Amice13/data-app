<template>
  <v-checkbox class="d-checkbox" v-model="model" :label="label" />
</template>

<style>

.d-checkbox .v-selection-control__input i {
  display: none !important;
}

.d-checkbox .v-selection-control__input input {
  z-index: 10;
}

.d-checkbox .v-selection-control__input::after{
  content:'';
  position:relative;
  z-index: 0;
  width: 20px;
  height: 20px;
  background-size: 20px !important;
  background: url('/icons/checkbox-uncheck.svg');
}

.d-checkbox .v-selection-control--dirty .v-selection-control__input::after {
  width: 20px;
  height: 20px;
  background-size: 20px;
  background: url('/icons/checkbox-check.svg');
}

.d-checkbox label.v-label.v-label--clickable {
  opacity: 1;
}

</style>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean
    },
    label: {
      type: String
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
