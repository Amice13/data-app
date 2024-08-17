<template>
    <v-dialog :model-value="dialog" width="600">
      <v-card width="600" class="margin-auto custom-thumb">
        <v-card-title class="d-flex align-center justify-space-between mt-4">
          Керування колонками
          <v-btn @click="$emit('close')" icon="mdi-close" size="x-small" variant="text" />
        </v-card-title>
        <v-card-text>
          <v-list density="compact">
            <v-list-item
              v-for="({ show, header }, i) in model"
              :class="{
                shiftup: isDragged && i !== activeIndex && i < this.activeIndex && i >= this.draggedIndex,
                shiftdown: isDragged && i !== activeIndex && i > this.activeIndex && i <= this.draggedIndex
              }"
              :key="header.key"
              class="bg-grey-lighten-3 manage-column mb-1"
              style="width: 100%;"
              ref="drag"
            >
              <v-list-item-title class="ml-2">
                {{ header.title }}
              </v-list-item-title>
              <template v-slot:prepend>
                <v-checkbox hide-details v-model="model[i].show" />
              </template>
              <template v-slot:append>
                <v-icon
                  @dragstart="dragStart($event, i)"
                  @drag="dragMove"
                  @dragend="dragStop"
                  color="grey-darken-1"
                  draggable="true"
                  class="ml-3 mr-0"
                  style="cursor: grab;"
                >mdi-drag-horizontal-variant</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Закрити"
            @click="$emit('close')"
            color="primary"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style>
.shiftdown {
  transform: translateY(-68.8px);
}

.shiftup {
  transform: translateY(68.8px);
}

.drag-placeholder.hovered {
  height: 48px;
}

.manage-column {
  width: 100%;
  border: 1px solid #CCC;
  border-radius: 12px !important;
}
</style>

<script>
let draggedElement, y

export default {
  props: {
     modelValue: {
      type: Array,
      default: () => ([])
    },
    dialog: {
      type: Boolean
    }
  },
  computed: {
    model: {
      get () { return this.modelValue },
      set (value) { this.$emit('update:modelValue', value) }
    }
  },
  data () {
    return {
      isDragged: false,
      activeIndex: 0,
      draggedIndex: 0
    }
  },
  methods: {
    dragStart (event, i) {
      this.activeIndex = i
      draggedElement = event.target.parentElement.parentElement
      y = event.y
      setTimeout(() => {
        this.isDragged = true
      }, 0)
    },
    dragMove (event) {
      let position = Math.round((event.y - y) / 68.8) + this.activeIndex
      this.draggedIndex = position < 0 ? 0 : position > this.model.length ? this.model.length : position
      draggedElement.style.zIndex = 100
      let newPosition = event.y - y
      draggedElement.style.transform = `translateY(${newPosition}px)`
    },
    dragStop (event) {
      let position = Math.round((event.y - y) / 68.8) + this.activeIndex
      this.draggedIndex = position < 0 ? 0 : position > this.model.length ? this.model.length : position
      this.isDragged = false
      let index = this.draggedIndex
      const headers = [...this.model]
      const header = headers.splice(this.activeIndex, 1)[0]
      headers.splice(index, 0, header)
      this.model = headers
      setTimeout(() => {
        draggedElement.style.transform = null
        draggedElement.style.zIndex = null
      }, 100)
    }
  }
}
</script>