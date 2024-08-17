<template>
  <div class="bg-black">
    <v-container fluid class="pl-16 pr-16">
      <v-row class="mt-10 mb-10">
        <v-col cols="6">
          <div class="d-flex align-center">
            <v-img class="flex-grow-0 mr-4" src="/logo-white.svg" height="56" width="56" contain />
            <div>TrueData</div>
          </div>
        </v-col>
        <v-col cols="6" style="font-size: 12px; font-weight: 200;">
          The website is created by TrueData team. All rights are protected. Have fun!
        </v-col>
      </v-row>
      <hr style="opacity: 0.3" />
      <v-row class="mt-10 mb-10">
        <v-col cols="6" style="font-size: 12px; font-weight: 200;">
          <div class="d-flex align-center mb-2">
            <v-icon class="mr-4" size="32">mdi-email-outline</v-icon>
            Якщо ви маєте зауваження або пропозиції, будь ласка, напишіть нам:
            <a class="ml-2" style="color: #FFF; text-decoration: none;" href="#">truedata@gmail.com</a>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-4" size="32">mdi-closed-caption-outline</v-icon>
            Весь контент доступний за ліцензією Creative Commons Attribution 4.0 International license, якщо не зазначено інше
          </div>
        </v-col>
        <v-col cols="6">
          <div class="footer-menu menu d-flex justify-space-between">
            <a href="">Набори даних</a>
            <a href="">Допомога</a>
            <a href="">Налаштування</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
