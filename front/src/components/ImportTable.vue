<template>
  <v-row>
    <v-col cols="12" ref="mainScreen">
      <v-data-table-virtual
        v-model="selected"
        class="import-table"
        :headers="shownHeaders"
        :search="search"
        :items="items"
        :sticky="true"
        :item-height="56"
        show-select
        fixed-header
        :height="height"
        item-value="Tax ID"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" class="hidden-sm-and-down">
            <v-toolbar-title class="text-h5" style="min-width: 130px;">Пошук</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="debouncedSearch"
              label="Пошук"
              class="mr-4 w-100 d-text"
              variant="underlined"
              density="compact"
              hide-details
              prepend-icon="mdi-magnify"
            >
              <template v-slot:append>
                <div v-if="errorsCount" class="font-weight-light">
                  <v-btn
                    @click="showErrors"
                    :color="showErrorsOnly ? 'red' : 'black'"
                    size="small"
                    icon="mdi-filter"
                  ></v-btn>
                  <v-tooltip
                    activator="parent"
                    location="start"
                  >Show errors only'</v-tooltip>
                </div>
              </template>
            </v-text-field>
            <v-spacer></v-spacer>
            <slot name="action-btn">
              <d-btn
                @click="headersDialog = true"
                variant="tonal"
              >
                <v-icon class="mr-4">mdi-table-edit</v-icon>
              </d-btn>
            </slot>
          </v-toolbar>
        </template>

        <template v-slot:bottom>
          <v-toolbar class="mt-2 pa-0 ml-0" flat density="compact" color="white">
            <v-btn
              v-show="errorsCount"
              @click="selectAllErrors"
              class="ml-0"
              color="error"
              variant="tonal"
              prepend-icon="mdi-checkbox-outline"
            >Select all errors
            </v-btn>
            <v-btn
              v-show="selectedCount"
              @click="exportData"
              class="ml-2"
              color="primary"
              variant="tonal"
              prepend-icon="mdi-download"
            >Download
            </v-btn>
            <v-btn
              v-show="selectedCount"
              @click="deleteSelected"
              class="ml-2"
              color="warning"
              variant="tonal"
              prepend-icon="mdi-delete"
            >Delete
            </v-btn>

            <v-spacer></v-spacer>
            <d-btn
              @click="addData"
              class="mr-0"
              color="success"
              variant="flat"
              prepend-icon="mdi-play"
            >Додати
            </d-btn>
          </v-toolbar>
        </template>

        <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td
                :style="{ 'text-align': column.align }"
                :class="{
                  'custom-check': column.key === 'data-table-select',
                  'bg-orange-darken-4': typeof column.error !== 'undefined' 
                }"
              >
                <div
                  class="d-flex text-no-wrap align-center"
                  :class="{
                    'justify-space-between': column.align !== 'center',
                    'justify-center': column.align === 'center'
                  }"
                >
                  <v-checkbox
                    v-if="column.key === 'data-table-select'"
                    @click="selectAll"
                    :indeterminate="selected.length > 0"
                    hide-details
                  />
                  <div
                    v-else
                    :class="{ 'cursor-pointer': column.sortable, 'mr-2': column.sortable }"
                    class="d-flex align-center"
                    @click="() => toggleSort(column)"
                  >
                    <div>
                      <div class="text-caption opacity-06"> {{ column.key }}</div>
                      <div>{{ column.title }}</div>
                    </div>
                    <div v-if="column.error" class="ml-4 font-weight-light">
                      <v-icon icon="mdi-information-outline" />
                      <v-tooltip
                        activator="parent"
                        location="start"
                      >{{ column.error }}</v-tooltip>
                    </div>
                  </div>
                  <template v-if="isSorted(column)">
                    <v-icon :icon="getSortIcon(column)" v-show="column.sortable"></v-icon>
                  </template>
                </div>
                <div @dragstart="initResizer" @drag="resize" draggable="true" class="resizer" />
              </td>
            </template>
          </tr>
        </template>
        <template v-slot:item="{ item, index }">
          <tr>
            <td>
              <v-checkbox
                v-model="selected"
                :value="item.id"
                hide-details
              />
            </td>
            <td
              v-for="({ key, align }) in shownHeaders"
              :class="{
                [`text-${align}`]: true,
                'bg-yellow-lighten-2': typeof item[key] === 'undefined',
                'bg-red-lighten-1': typeof item.errors?.[key] !== 'undefined'
              }"
            >
              <div class="d-flex w-100 justify-space-between">
                <div v-html="highlight(item[key])"></div>
                <div v-if="item.errors?.[key]" class="ml-4 font-weight-light">
                  <v-icon icon="mdi-information-outline" />
                  <v-tooltip
                    activator="parent"
                    max-width="300"
                    location="bottom"
                  >{{ item.errors?.[key] }}</v-tooltip>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table-virtual>
    </v-col>
    <entity-dialog v-model="selectedEntity" @save-data="items.push($event)"></entity-dialog>
    <import-manage-columns
      v-model="selectedHeaders"
      :dialog="headersDialog"
      @close="headersDialog = false"
    />
  </v-row>
</template>

<style>
@use 'vuetify/settings' as v;

.import-table td {
  position: relative;
}

.custom-check {
  width: 70px;
  min-width: 70px;
}

.import-table .resizer {
  top: 0;
  right: 0;
  width: 5px;
  position: absolute;
  cursor: col-resize;
  user-select: none;
  height: 100%;
  pointer-events: auto;
}

.import-table .resizer:hover {
  border-right: 2px solid #999;
}

.import-table tbody tr:hover td {
  background: rgba(0, 0, 0, 0.07);
}

.import-dialog thead tr {
  background: rgb(var(--v-theme-primary));
  color: white;
  font-weight: 600;
}

.import-dialog tr:nth-child(even) td {
  background: rgb(var(--v-theme-primary-lighten-4)); 
}

.import-dialog td {
  border-right: 1px solid #ccc;
}
.opacity-06 {
  opacity: 0.6;
}
</style>

<script>
// Debouncer for the search
import debounce from '@/utils/debouncer'

let x, w, col

export default {
  name: 'ImportTable',
  props: {
    modelValue: {
      type: Array,
      default: () => ([])
    },
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      items: [],
      selectedEntity: undefined,
      headers: [
        { title: 'Ідентифікатор об\'єкта', align: 'start', value: 'identifier', key: 'identifier', sortable: true },
        { title: 'Назва об\'єкта', align: 'start', value: 'name', key: 'name', sortable: true },
        { title: 'Назва суб\'єкта господарювання', align: 'start', value: 'companyName', key: 'companyName', sortable: true },
        { title: 'Ідентифікатор суб\'єкта господарювання', align: 'start', value: 'companyIdentifier', key: 'companyIdentifier', sortable: true },
        { title: 'Вид діяльності', align: 'start', value: 'activityType', key: 'activityType', sortable: true },
        { title: 'Тип об\'єкта', align: 'start', value: 'type', key: 'type', sortable: true },
        { title: 'Графік роботи', align: 'start', value: 'openingHours', key: 'openingHours', sortable: true },
        { title: 'Уточнення графіку роботи', align: 'start', value: 'openingHoursDescription', key: 'openingHoursDescription', sortable: true },
        { title: 'Поштовий індекс', align: 'start', value: 'addressPostCode', key: 'addressPostCode', sortable: true },
        { title: 'Назва країни', align: 'start', value: 'addressAdminUnitL1', key: 'addressAdminUnitL1', sortable: true },
        { title: 'Назва регіону', align: 'start', value: 'addressAdminUnitL2', key: 'addressAdminUnitL2', sortable: true },
        { title: 'Назва району', align: 'start', value: 'addressAdminUnitL3', key: 'addressAdminUnitL3', sortable: true },
        { title: 'Назва населеного пункту', align: 'start', value: 'addressPostName', key: 'addressPostName', sortable: true },
        { title: 'Вулиця або аналог', align: 'start', value: 'addressThoroughfare', key: 'addressThoroughfare', sortable: true },
        { title: 'Номер будівлі', align: 'start', value: 'addressLocatorDesignator', key: 'addressLocatorDesignator', sortable: true },
        { title: 'Номер корпусу', align: 'start', value: 'addressLocatorBuilding', key: 'addressLocatorBuilding', sortable: true },
        { title: 'Опис розміщення', align: 'start', value: 'addressDescription', key: 'addressDescription', sortable: true },
        { title: 'Назва органу', align: 'start', value: 'authorityName', key: 'authorityName', sortable: true },
        { title: 'Ідентифікатор органу', align: 'start', value: 'authoritytIdentifier', key: 'authoritytIdentifier', sortable: true },
        { title: 'Номер', align: 'start', value: 'permissionNumber', key: 'permissionNumber', sortable: true },
        { title: 'Дата прийняття', align: 'start', value: 'permissionIssued', key: 'permissionIssued', sortable: true },
        { title: 'Статус', align: 'start', value: 'permissionStatus', key: 'permissionStatus', sortable: true },
        { title: 'Дійсний з', align: 'start', value: 'permissionValidFrom', key: 'permissionValidFrom', sortable: true },
        { title: 'Дійсний до', align: 'start', value: 'permissionValidThrough', key: 'permissionValidThrough', sortable: true },
      ],
      selected: [],
      selectedHeaders: [],
      headersDialog: false,
      selectedAll: false,
      height: 400,
      search: undefined,
      showErrorsOnly: false
    }
  },
  mounted () {
    this.selectedHeaders = this.headers.map(header => {
      return { show: true, header }
    })
  },
  computed: {
    model: {
      get () { return this.modelValue },
      set (value) { this.$emit('update:modelValue', value) }
    },
    availableHeaders () {
      return this.headers.map(el => el.key)
    },
    shownHeaders () {
      return this.selectedHeaders.filter(({ show }) => show).map(({ header }) => header)
    },
    errorsCount () {
      return this.model.filter(el => el.errors).length
    },
    blanksCount () {
      return this.model.filter(el => {
        for (let { key } of this.headers) {
          if (['errors', 'headOfHousehold.taxId', 'headOfHousehold.passport'].includes(key)) continue
          if (typeof el[key] === 'undefined' || el[key] === '') return true
        }
      }).length
    },
    selectedCount () {
      return this.selected.length
    },
    alertType () {
      if (this.errorsCount) return 'error'
      if (this.blanksCount) return 'warning'
      return 'success'
    },
    debouncedSearch: {
      get () { return this.search },
      set: debounce(function (val) { this.search = val }, 500)
    },
    recordsToShow () {
      if (this.showErrorsOnly) return this.model.filter(el => el.errors)
      return this.model
    }
  },
  methods: {
    exportData () {

    },
    // Methods for resizing the table
    initResizer (e) {
      x = e.clientX
      col = e.target.parentElement
      const styles = window.getComputedStyle(col)
      w = parseInt(styles.width, 10)
    },
    resize (e) {
      const diff = e.clientX - x
      let width = w + diff
      if (width < 0) return false
      width = Math.abs(width) < 70 ? 70 : width
      col.style.width = `${width}px`
      col.style.minWidth = `${width}px`
      col.style.maxWidth = `${width}px`
    },
    // Data presentation methods
    highlight (str) {
      if (str instanceof Date) str = str.toLocaleDateString(this.$i18n.locale)
      if (typeof str !== 'string') return str
      if (!str) return str
      str = String(str)
      if (this.search) {
        let search = this.search.replace(/[^a-zа-яєіїґ\d ]/g, '')
        let regex = new RegExp(`(${search})`, 'gi')
        str = str.replace(regex, `<strong>$1</strong>`)
      }
      return str
    },
    showErrors () {
      this.showErrorsOnly = !this.showErrorsOnly
      if (this.showErrorsOnly) {
        let taxIdsShown = this.recordsToShow.map(el => el.id)
        this.selected = this.selected.filter(el => taxIdsShown.includes(el))
      }
    },
    selectAllErrors () {
      this.selected = this.model.filter(el => typeof el.errors !== 'undefined').map(el => el.id)
    },
    selectAll () {
      if (this.selected.length !== this.recordsToShow.length) {
        this.selected = this.recordsToShow.map(el => el.id)
      } else {
        this.selected = []
      }
    },
    deleteSelected () {
      const selected = [...this.selected]
      this.model = this.model.filter(el => !selected.includes(el.id))
      this.selected = []
    },
    async deduplicateData () {
      this.$emit('setLoading', true)
      // Get unique tax ID
      const taxId = [...new Set(this.model.map(el => el['headOfHousehold.taxId']).filter(Boolean))]
      // Get unique passports
      const passport = [...new Set(this.model.map(el => el['headOfHousehold.passport']).filter(Boolean))]

      // Get duplications
      let taxIdChecks, passportChecks
      if (taxId.length) taxIdChecks = await this.$api.data.checkTaxId({ bundleName: this.bundleName, taxId }, true)
      if (passport.length) passportChecks = await this.$api.data.checkPassport({ bundleName: this.bundleName, passport }, true)

      // If tax ID check is successfull, add the data
      if (taxIdChecks?.status === 'success') {
        // Add the array of taxIds
        taxIdChecks.data = taxIdChecks.data.map(el => {
          el.taxIds = [el.headOfHousehold.taxId]
          if (el.familyMembers) el.taxIds = [...el.taxIds, ...el.familyMembers.map(fm => fm.taxId)]
          return el
        })
        // Find records with duplicates
        for (let d of this.model) {
          let duplicate = taxIdChecks.data.filter(el => el.taxIds.includes(d['headOfHousehold.taxId']))
          d.duplicate = duplicate
          if (duplicate.length) d.householdId = duplicate[0].householdId
        }
      }

      // If passport check is successfull, add the data
      if (passportChecks?.status === 'success') {
        // Find records with duplicates
        for (let d of this.model) {
          if (d.duplicate.length) continue
          if (!d['headOfHousehold.passport']) continue
          let duplicate = passportChecks.data.filter(el => {
            return d['headOfHousehold.passport'] === el.headOfHousehold?.passport
          })
          d.duplicate = duplicate
          if (duplicate.length) d.householdId = duplicate[0].householdId
        }
      }
      this.$emit('setLoading', false)
      this.$emit('setStep', 3)
    },
    addData () {
      this.selectedEntity = {
        identifier: Math.floor(Math.random() * 1000000) + 1
      }
    }
  },
  watch: {
    dialogHeight (val) {
      const height = window.screen.availHeight - 240
      this.height = height
    }
  }
}
</script>