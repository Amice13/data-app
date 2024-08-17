<template>
  <div class="menu" style="position: absolute;">
    <v-img class="mr-8 flex-grow-0" src="/logo.svg" height="48" width="48" contain />
    <a href="">Набори даних</a>
    <a href="">Допомога</a>
    <a href="">Налаштування</a>
  </div>
  <div class="bg-light-grey" style="padding-top: 76px;">
    <v-container fluid class="pl-16 pr-16 pb-0">
      <v-row>
        <v-col cols="12">
          <ul class="diia-breadcrumbs">
            <li>Головна сторінка</li>
            <li>Дані про об'єкти та засоби торгівлі (пересувна, сезонна та інші)</li>
          </ul>
          <div class="text-h4 mb-8">Дані про об'єкти та засоби торгівлі (пересувна, сезонна та інші)</div>
        </v-col>
      </v-row>
      <d-tabs class="mt-4" :items="tabs" v-model="tab" />
    </v-container>
  </div>
  <div>
    <v-container fluid class="pl-16 pr-16 pt-16 pb-16">
      <v-window :model-value="selectedTab">
        <v-window-item :key="0">
          <v-row>
            <v-col cols="9" class="pr-16">

              <div class="border-color">
                <div class="d-flex w-100 justify-space-between">
                  <div>
                    <div class="d-flex">
                      <div><v-icon>mdi-file-document-outline</v-icon></div>
                      <div class="ml-2">
                        <div class="mb-4">Дані про об'єкти та засоби торгівлі</div>
                        <div style="font-size: 11px;">Кількість одиниць: 241</div>
                        <div class="text-red-darken-2" style="font-size: 11px;">Кількість помлок: 2</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <d-btn href="edit">Редагувати</d-btn>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="3">
              <h5 class="text-h5 mb-4">
                Статистика набору
              </h5>
              <hr style="border: 1.5px solid #000;" />
              <div class="mt-8">
                <div class="mb-4">
                  <div class="text-grey-darken-2 d-inline-block">Кількість таблиць:</div>
                  <div class="d-inline-block ml-2">1</div>
                </div>
                <div class="mb-4">
                  <div class="text-grey-darken-2 d-inline-block">Останнє оновлення:</div>
                  <div class="d-inline-block ml-2">08.16.2014</div>
                </div>
                <div class="mb-4">
                  <div class="text-grey-darken-2 d-inline-block">Кількість завантажень:</div>
                  <div class="d-inline-block ml-2">12,421</div>
                </div>
              </div>
            </v-col>
          </v-row>

        </v-window-item>
        <v-window-item :key="1">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h3 mb-8">Коротка довідка</h2>
              <table class="norefs">
                <tbody><tr>
                   <td><strong>Критерій</strong>
                   </td>
                   <td><strong>Характеристика</strong>
                   </td>
                  </tr>
                  <tr>
                   <td>Нормативно-правові акти, які визначають створення, збір, зберігання, використання й поширення даних
                   </td>
                   <td><a href="https://zakon.rada.gov.ua/laws/show/280/97-%D0%B2%D1%80">Закон України «Про місцеве самоврядування в Україні» від 21.05.1997 № 280/97-ВР</a>, <a href="https://zakon.rada.gov.ua/laws/show/1023-12">Закон України «Про захист прав споживачів» від 12.05.1991 № 1023-XII</a>, <a href="https://zakon.rada.gov.ua/laws/show/4004-12">Закон України  «Про забезпечення санітарного і епідеміологічного благополуччя населення» від 24.02.1994 № 4004-XII</a>, <a href="https://zakon.rada.gov.ua/laws/show/833-2006-%D0%BF?fbclid=IwAR2GOCbS4S4JIfVI8yRwXndPkF6ug5csub-utGdxWUx64q73d0pJEKNxN3E">Постанова КМУ «Про затвердження Порядку провадження торговельної діяльності та правил торговельного обслуговування на ринку споживчих товарів» від 15.06.2006 № 833</a>; <a href="https://zakon.rada.gov.ua/laws/show/313-94-%D0%BF">Постанова КМУ «Про затвердження правил побутового обслуговування населення» від 16.05.94  № 313</a>, нормативно-правові акти органів місцевого самоврядування
                   </td>
                  </tr>
                  <tr>
                   <td>Інформація, що створюється, збирається, зберігається й поширюється
                   </td>
                   <td>Органи місцевого самоврядування створюють власні переліки/реєстри об'єктів та засобів торгівлі відповідно до ухвалених нормативно-правових актів.
                   </td>
                  </tr>
                  <tr>
                   <td>Способи оновлення
                   </td>
                   <td>Інформація змінюється внаслідок включення, виключення об'єктів з переліку або актуалізації даних про них.
                   </td>
                  </tr>
                  <tr>
                   <td>Частота оновлення інформації
                   </td>
                   <td>Позапланово (протягом трьох робочих днів з моменту внесення змін) або не рідше, ніж щомісяця
                   </td>
                  </tr>
                  <tr>
                   <td>Тип даних
                   </td>
                   <td>Структуровані
                   </td>
                  </tr>
                  <tr>
                   <td>Формати файлів
                   </td>
                   <td>XLSX, ODS, CSV, можливі інші формати структурованих даних
                   </td>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item :key="3">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h3 mb-8">Огляд нормативно-правової бази</h2>
              <p style="margin-bottom: 25px" class="norefs">Відповідно до статті 30 <a href="https://zakon.rada.gov.ua/laws/show/280/97-%D0%B2%D1%80">Закону України «Про місцеве самоврядування в Україні»</a> органи місцевого самоврядування здійснюють контроль за розвитком торгівлі та якістю обслуговування; організовують місцеві ринки, ярмарки; встановлюють графіки роботи комунальних підприємств. Для реалізації цих повноважень упроваджується нормативна база на місцевому рівні, наприклад, <a href="http://www.kreschatic.kiev.ua/ua/3442/doc/1283280536.html">Розпорядження виконавчого органу Київської міської ради (Київської міської державної адміністрації) від 19.08.2010 № 629</a>, <a href="http://www.kr-rada.gov.ua/uploads/documents/17707-819-03-01-2017.pdf">Рішенням виконкому Кіровоградської міської ради від 29 листопада 2011 року № 1167 (зі змінами)</a>, <a href="http://www.novomoskovsk-rada.gov.ua/document/pro-zatverdzhennya-statutu-terytorialnoyi-gromady-mista-novomoskovska-v-noviy-redakciyi">Рішення Новомосковської міської ради №1339 від 28.08.2015</a>.</p>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item :key="4">
          <v-row>
            <v-col cols="12">
              <h2 class="text-h3 mb-8">Підготовка даних та структура набору</h2>
              <table class="norefs mt-16">
                <tbody><tr>
                   <td colspan="2"><strong class="text-h4">Інформація про ресурс</strong>
                   </td>
                  </tr>
                  <tr>
                   <td>Назва ресурсу
                   </td>
                   <td>CommercialObjects
                   </td>
                  </tr>
                  <tr>
                   <td>Що є одним записом в таблиці (рядком)
                   </td>
                   <td>Один торговельний об'єкт. Торговельний об’єкт — це майновий комплекс, що може займати капітальну, некапітальну споруду або окреме приміщення та має приміщення для провадження торговельної діяльності (ДСТУ 4303:2004).
                   </td>
                  </tr>
                  <tr>
                   <td>Спосіб оновлення
                   </td>
                   <td>Розміщення нової версії ресурсу
                   </td>
                  </tr>
                </tbody>
              </table>


<table class="norefs mt-16">
  <tbody><tr>
   <td colspan="5"><strong class="text-h4">Структура набору</strong>
   </td>
  </tr>
    <tr>
   <td><strong>Назва колонки в таблиці (name)</strong>
   </td>
   <td><strong>Заголовок колонки (title)</strong>
   </td>
   <td><strong>Опис значень в колонці (description)</strong>
   </td>
   <td><strong>Тип даних (datatype)</strong>
   </td>
   <td><strong>Вимога заповнення (required)</strong>
   </td>
  </tr>
  <tr>
   <td>identifier
   </td>
   <td>Ідентифікатор об’єкта
   </td>
   <td>Ідентифікатором об’єкта може бути будь-яка унікальна комбінація літер та чисел. Наприклад: 01234567-01.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>Назва об’єкта
   </td>
   <td>Назва, що використовується для позначення об’єкта або розміщується на вивісці. Наприклад: Магазин «Продовольчі товари».
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>companyName
   </td>
   <td>Назва суб'єкта господарювання
   </td>
   <td>Повна назва суб'єкта господарювання відповідно до Єдиного державного реєстру юридичних осіб, фізичних осіб-підприємців і громадських формувань. Наприклад: ФОП Коваль Сергій Вікторович.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>companyIdentifier
   </td>
   <td>Ідентифікатор суб'єкта господарювання
   </td>
   <td>Код ЄДРПОУ суб'єкта господарювання. Наприклад: 01234567.
<p style="margin-bottom: 25px">
У випадку ФОП, дані про РНОКПП знеособлюються.
   </p></td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>activityType
   </td>
   <td>Вид діяльності
   </td>
   <td>Вид діяльності відповідно до Постанови КМУ від 15.06.2006 р. № 833 та ДСТУ 4303:2004. Вид може мати одне зі значень: Роздрібна торгівля; Оптова торгівля; Оптова та роздрібна торгівля; Ресторанне господарство.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>type
   </td>
   <td>Тип об’єкта
   </td>
   <td>Тип об'єкта відповідно до Довідника типів об'єктів оподаткування ДФС (<a href="http://sfs.gov.ua/dovidniki--reestri--perelik/dovidniki-/127294.html">http://sfs.gov.ua/dovidniki--reestri--perelik/dovidniki-/127294.html</a>). Наприклад: Супермаркет.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>openingHours
   </td>
   <td>Графік роботи
   </td>
   <td>Дні тижня позначаються комбінаціями літер (Пн, Вт, Ср, Чт, Пт, Сб, Нд), години — цифрами у 24-годинному форматі (ГГ:ХХ). Для графіка з понеділка по п’ятницю, з 9:00 до 17:00 запис в таблиці матиме вигляд — Пн-Пт 09:00-17:00. Коли потрібно позначити інтервал днів (з понеділка по п’ятницю) використовується дефіс, коли окремі дні (понеділок та п’ятниця) — кома. Наприклад, графік роботи в понеділок і п’ятницю з 09:00-17:00 матиме такий вигляд: Пн,Пт 09:00-17:00. Якщо графік змінюється протягом тижня, різні режими роботи необхідно записати через кому. Наприклад: Пн-Чт 08:00-17:20, Пт 08:00-16:00.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>openingHoursDescription
   </td>
   <td>Уточнення графіку роботи
   </td>
   <td>Уточнення у довільній формі щодо обідньої перерви, днів, коли графік діє та ін. Наприклад: Перерва на обід: 12:00-13:00.
   </td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>addressPostCode
   </td>
   <td>Поштовий індекс
   </td>
   <td>Поштовий індекс адреси, за якою розміщений об’єкт. Наприклад: 01234.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>addressAdminUnitL1
   </td>
   <td>Назва країни
   </td>
   <td>Країна, в якій розміщений об’єкт. У цій колонці має бути зазначено Україна.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>addressAdminUnitL2
   </td>
   <td>Назва регіону
   </td>
   <td>Назва регіону, де розміщений об’єкт. Наприклад: Полтавська область.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>addressAdminUnitL3
   </td>
   <td>Назва району
   </td>
   <td>Назва району, де розміщений об’єкт. Наприклад: Броварський район. У разі відсутності вказати null.
   </td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>addressPostName
   </td>
   <td>Назва населеного пункту
   </td>
   <td>Назва населеного пункту або назва селищної чи сільської ради, де розміщений об’єкт. У колонці потрібно зазначати лише назву (без слова «місто», «селищна рада» та їх скорочень «м.» та «с. р.»). Наприклад: Балта.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>addressThoroughfare
   </td>
   <td>Вулиця або аналог
   </td>
   <td>Тип та назва площі, майдану, шосе, проспекту, бульвару, алеї, провулку, узвозу тощо. Наприклад: вул. Харківська.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>addressLocatorDesignator
   </td>
   <td>Номер будівлі
   </td>
   <td>Номер будівлі (об’єкта) може включати числа та букви. Наприклад: 15-А.
   </td>
   <td>Текст (string)
   </td>
   <td>Істина (true)
   </td>
  </tr>
  <tr>
   <td>addressLocatorBuilding
   </td>
   <td>Номер корпусу
   </td>
   <td>Номер корпусу зазнається числом для об’єктів, які складаються з декількох корпусів. Наприклад: 3. У разі відсутності, вказати null.
   </td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>addressDescription
   </td>
   <td>Опис розміщення
   </td>
   <td>Опис вказується за потреби, щоб чіткіше визначити розміщення. Зокрема, назва житлового комплексу, офісного або торгового центру; частина будівлі, наприклад, корпус, крило; приміщення в будівлі, наприклад, квартира, кабінет, офіс, зала; довільний текстовий опис, що дозволяє визначити розміщення.
   </td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>authorityName
   </td>
   <td>Назва органу
   </td>
   <td>Якщо орган місцевого самоврядування видає дозволи на розміщення об’єкта торгівлі, визначає графік роботи в нічний час тощо, у цій та наступних колонках вказуються інформація про дозволи. 
<p style="margin-bottom: 25px">
Назва уповноваженого органу. Наприклад: Департамент містобудування та архітектури Дніпровської міської ради.
   </p></td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>authoritytIdentifier
   </td>
   <td>Ідентифікатор органу
   </td>
   <td>Код ЄДРПОУ уповноваженого органу. Наприклад: 01234567.
   </td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>permissionNumber
   </td>
   <td>Номер
   </td>
   <td>Номер дозволу (без знаку №). Наприклад: 501.
   </td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>permissionIssued
   </td>
   <td>Дата прийняття
   </td>
   <td>Дата видачі дозволу у  форматі ISO 8601 (рррр-мм-дд). Наприклад: 2014-05-30.
   </td>
   <td>Дата (date)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>permissionStatus
   </td>
   <td>Статус
   </td>
   <td>Статус дозволу може мати одне зі значень: Не набув чинності, Чинний, Скасований, Втратив чинність. Наприклад: Чинний.
   </td>
   <td>Текст (string)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>permissionValidFrom
   </td>
   <td>Дійсний з
   </td>
   <td>Дата набуття чинності дозволу у форматі ISO 8601 (рррр-мм-дд). Наприклад: 2014-05-30.
   </td>
   <td>Дата (date)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
  <tr>
   <td>permissionValidThrough
   </td>
   <td>Дійсний до
   </td>
   <td>Дата втрати чинності дозволу у форматі ISO 8601 (рррр-мм-дд). Наприклад: 2014-05-30.
   </td>
   <td>Дата (date)
   </td>
   <td>Хибність (false)
   </td>
  </tr>
</tbody></table>

              <table class="norefs w-100 mt-16">
                <tbody>
                  <tr>
                   <td colspan="2"><strong class="text-h4">Прикріплені файли</strong>
                   </td>
                  </tr>
                  <tr>
                   <td>Шаблон таблиці
                   </td>
                   <td><a href="https://github.com/tapas-opendata/decreet-835-mun/raw/master/commerce/commercial-objects/CommercialObjects.xlsx">CommercialObjects.xlsx</a>
                   </td>
                  </tr>
                  <tr>
                   <td>Приклад таблиці
                   </td>
                   <td><a href="https://github.com/tapas-opendata/decreet-835-mun/raw/master/commerce/commercial-objects/Example.xlsx">Example.xlsx</a>
                   </td>
                  </tr>
                  <tr>
                   <td>Структура (XLSX, CSV, JSON)
                   </td>
                   <td><a href="https://github.com/tapas-opendata/decreet-835-mun/raw/master/commerce/commercial-objects/Structure.xlsx">Structure.xlsx</a>, <a href="https://raw.githubusercontent.com/tapas-opendata/decreet-835-mun/master/commerce/commercial-objects/Structure.csv">Structure.csv</a>, <a href="https://raw.githubusercontent.com/tapas-opendata/decreet-835-mun/master/commerce/commercial-objects/Structure.json">Structure.json</a>
                   </td>
                  </tr>
                </tbody>

              </table>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
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
