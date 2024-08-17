<template>
  <div class="date">
      <v-text-field
        v-model="date"
        placeholder="РРРР-ММ-ДД"
        :label="label"
        :hint="hint"
        :persistent-hint="persistentHint"
        variant="underlined"
        hide-details
        id="date-menu-activator"
      >
        <template v-slot:append>
          <v-menu
            v-model="showCalendar"
            :close-on-content-click="false"
            :min-width="400"
            :min-height="600"
          >
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-calendar" />
            </template>
            <v-locale-provider locale="uk-UA">
              <v-date-picker
                v-model="model"
                color="black"
                title="Оберіть дату"
                :max="maxDate"
                :min="minDate"
                header="Оберіть дату"
                locale="uk-UA"
                v-show="showCalendar"
                format="yyyy-mm-dd"
                input-text="yyyy-mm-dd"
              ></v-date-picker>
            </v-locale-provider>
          </v-menu>
        </template>
      </v-text-field>
  </div>
</template>


<script>

export default {
  name: 'Date',
  props: {
    modelValue: {
      type: [String, Date],
    },
    max: {
      type: Date
    },
    min: {
      type: Date
    },
    label: {
      type: String,
      default: 'Date'
    },
    hint: {
      type: String
    },
    persistentHint: {
      type: Boolean
    }
  },
  mounted () {
    if (this.model) this.date = new Date(this.model).toLocaleDateString('sv-SE')
    return ''
  },
  data () {
    return {
      options: {
        mask: 'Y###-M#-D#',
        tokens: {
          Y: { pattern: /[12]/ },
          M: { pattern: /[01]/ },
          D: { pattern: /[0123]/ },
        }
      },
      showCalendar: false
    }
  },
  computed: {
    model: {
      get () {
        if (this.modelValue) return new Date(this.modelValue)
      },
      set (value) {
        if (value instanceof Date) value = value.toLocaleDateString('sv-SE')
        this.$emit('update:modelValue', value)
      }
    },
    date: {
      get () {
        if (this.model) return new Date(this.model).toLocaleDateString('sv-SE')
      },
      set (value) {
        if (!value) return this.model = value
        if (value.match(/^\d{4}-\d{2}-\d{2}$/)) this.model = value
      }
    },
    maxDate () {
      if (this.max) return new Date(this.max).toLocaleDateString('sv-SE')
    },
    minDate () {
      if (this.min) return this.min.toLocaleDateString('sv-SE')
    }
  },
  watch: {
    model () { this.showCalendar = false }
  }
}
</script>
