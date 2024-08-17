<template>
  <div class="menu" style="position: absolute;">
    <v-img class="mr-8 flex-grow-0" src="/logo.svg" height="48" width="48" contain />
    <a href="">Набори даних</a>
    <a href="">Допомога</a>
    <a href="">Налаштування</a>
  </div>
  <div class="bg-light-grey" style="padding-top: 76px;">
    <v-container fluid class="pl-16 pr-16 pt-0 pb-0">
      <v-row class="mb-0 mt-0 pt-0 pb-0">
        <v-col cols="12" class="mt-0 mb-0 pt-0 pb-0">
          <ul class="diia-breadcrumbs pt-1">
            <li>Головна сторінка</li>
            <li>Дані про об'єкти та засоби торгівлі (пересувна, сезонна та інші)</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div style="min-height: 85vh;">
    <v-container fluid class="pl-16 pr-16 pt-8 pb-8">
      <v-row>
        <v-col class="pt-0 pb-0">
          <import-table />
        </v-col>
      </v-row>
    </v-container>
  </div>
  <global-footer />
</template>

<style>
</style>

<script>
export default {
  computed: {
    filteredList () {
      if (!this.search) return this.datasetList
      const regex = new RegExp(this.search, 'gi')
      return this.datasetList.filter(el => el.match(regex))
    }
  },
  computed: {
    selectedTab () {
      return this.tabs.indexOf(this.tab)
    }
  },
  data () {
    return {
      search: undefined,
      tab: 'Набір даних',
      tabs: [
        'Набір даних',
        'Довідка',
        'Законодавство',
        'Структура набору'
      ]
    }
  }
}
</script>
