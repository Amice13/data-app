<template>
  <v-dialog
    :model-value="dialog"
    class="assistance-dialog"
    content-class="poc-dialog"
    scrollable persistent :overlay="false"
    max-width="500px" transition="slide-x-reverse-transition"
  >
    <v-card tile class="fill-height">
      <v-card-title primary-title>Додати</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="text-h6">
              Загальна інформація
            </div>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.identifier"
              class="d-text"
              label="Ідентифікатор об'єкта"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.name"
              class="d-text"
              label="Назва об'єкта"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.companyIdentifier"
              class="d-text"
              label="Ідентифікатор суб'єкта господарювання"
              placeholder="12345678"
              hint="Внесіть код ЄДРПОУ організації"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.companyName"
              class="d-text"
              label="Назва суб'єкта господарювання"
              placeholder="ТОВ &quot;Гарна компанія&quot;"
              hint="Внесіть дані відповідно до Єдиного державного реєстру юридичних осіб та фізичних осіб-підриємців"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="model.activityType"
              :items="kveds"
              class="d-text"
              label="Вид діяльності"
              variant="underlined"
              clearable
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="model.type"
              :items="types"
              class="d-text"
              label="Тип об'єкта"
              variant="underlined"
              clearable
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.openingHours"
              class="d-text"
              label="Графік роботи"
              placeholder="Пн 10:00 - 18:00"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.openingHoursDescription"
              class="d-text"
              label="Уточнення графіку роботи"
              placeholder="Обід з 13:00 до 14:00"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <div class="text-h6 mt-9">
              Адреса
            </div>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.addressPostCode"
              class="d-text"
              label="Поштовий індекс"
              placeholder="12345"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.addressAdminUnitL1"
              class="d-text"
              label="Назва країни"
              placeholder="Україна"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.addressAdminUnitL2"
              class="d-text"
              label="Назва регіону"
              placeholder="Київ"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.addressAdminUnitL3"
              class="d-text"
              label="Назва району"
              placeholder="Київ"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.addressPostName"
              class="d-text"
              label="Назва населеного пункту"
              placeholder="Київ"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.addressThoroughfare"
              class="d-text"
              label="Вулиця або аналог"
              placeholder="площа Шевченка"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="model.addressLocatorDesignator"
              class="d-text"
              label="Номер будівлі"
              placeholder="12Б"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="model.addressLocatorBuilding"
              class="d-text"
              label="Номер корпусу"
              placeholder="2"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="model.addressDescription"
              class="d-text"
              label="Опис розміщення"
              placeholder="Опис будівлі"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <div class="text-h6 mt-9">
              Інформація про рішення ОМС
            </div>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.authoritytIdentifier"
              class="d-text"
              label="Ідентифікатор органу"
              placeholder="12345678"
              hint="Внесіть код ЄДРПОУ організації"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.authorityName"
              class="d-text"
              label="Назва органу"
              placeholder="Накраща сільська рада"
              hint="Внесіть дані відповідно до Єдиного державного реєстру юридичних осіб та фізичних осіб-підриємців"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="model.permissionNumber"
              class="d-text"
              label="Номер"
              placeholder="23/451р"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <custom-date
              v-model="model.permissionIssued"
              class="d-text"
              label="Дата прийняття"
              placeholder="РРРР-ММ-ДД"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <v-combobox
              v-model="model.permissionStatus"
              :items="statuses"
              class="d-text"
              label="Чинний"
              placeholder="23/451р"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <custom-date
              v-model="model.permissionValidFrom"
              class="d-text"
              label="Дійсний з"
              placeholder="РРРР-ММ-ДД"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12">
            <custom-date
              v-model="model.permissionValidThrough"
              class="d-text"
              label="Дійсний до"
              placeholder="РРРР-ММ-ДД"
              variant="underlined"
              hide-details="auto"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="model.id" @click="removeData" color="red" variant="tonal" class="ml-4">Видалити</v-btn>
        <v-spacer></v-spacer>
        <d-btn @click="this.model = {}" secondary color="orange darken-2" text>Скасувати</d-btn>
        <d-btn @click="saveData" class="ml-4 mr-4">Зберегти</d-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
.v-dialog__content {
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
}

.poc-dialog {
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
  max-height: 100% !important; 
  position: fixed;
  right: 0px;
  top: 0px;
} 

.overflow-hidden {
  overflow: hidden;
}

.poc-dialog {
  width: 100% !important;
  height: 100% !important;
}
</style>

<script>

export default {
  name: 'DistributionPocDialow',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    model: {
      get () { return this.modelValue },
      set (value) { this.$emit('update:modelValue', value) }
    },
    dialog () {
      const element = document.querySelector('html')
      const isOpened = Object.keys(this.model).length > 0
      element.classList[isOpened ? 'add' : 'remove']('overflow-hidden')
      return isOpened
    }
  },
  data () {
    return {
      kveds: [
        'Дошкільна освіта',
        'Початкова освіта',
        'Середня освіта',
        'Вища освіта',
        'Інші види освіти',
        'Допоміжна діяльність у сфері освіти'
      ],
      types: [
  'Пункт обміну іноземної валюти',
  'Кіоск',
  'Лоток',
  'Автовокзал',
  'Автогаззаправка',
  'Автогосподарство',
  'Автозаправочна станція (азс)',
  'Автозупинка',
  'Автолавка',
  'Автолоток',
  'Автомагазин+b113',
  'Автомайстерня',
  'Автомати',
  'Автомобіль',
  'Автомийка',
  'Автопарк',
  'Автопричеп',
  'Авторинок',
  'Автосалон',
  'Автостоянка',
  'Автотранспорт',
  'Трейлер',
  'Автофургон',
  'Автоцистерна',
  'Агенство',
  'Адміністрація',
  'Адміністрація ринку',
  'Ангар',
  'Аптека',
  'Аптечний відділ',
  'Аптечний кіоск',
  'Аптечний пункт',
  'Архів',
  'Ательє',
  'Ательє мод',
  'Ательє пошиву',
  'Атракціон',
  'Атс',
  'Багажне відділення',
  'Багажні каси',
  'База',
  'База відпочинку',
  'База оптова',
  'База орпк',
  'Бакалія',
  'Банк',
  'Банкетний зал',
  'Банний комплекс',
  'Банно-пральний комбінат',
  'Баня',
  'Баня-сауна',
  'Бар',
  'Бар-магазин',
  'Бар-ресторан',
  'Басейн',
  'Батіскаф',
  'Автобусний маршрут',
  'Бензоколонка',
  'Бочка',
  'Брокерська контора',
  'Будинок зв\'язку',
  'Будинок культури',
  'Будинок моделей',
  'Будинок обрядів',
  'Будинок одягу',
  'Будинок побуту',
  'Будинок торгівлі',
  'Будматеріали',
  'Будівельна організація',
  'Букмекерська контора',
  'Булочна',
  'Бутік',
  'Буфет',
  'Бухгалтерія',
  'Бюро послуг',
  'Бюро ритуальних послуг',
  'Бібліотека',
  'Бібліотечний колектор',
  'Білетна каса',
  'Білетний кіоск',
  'Більярдна',
  'Біржа',
  'Вагова',
  'Вагон-ресторан',
  'Вагончик',
  'Валютна каса',
  'Варенична',
  'Вбиральня',
  'Ветеринарна аптека',
  'Ветеринарна клініка',
  'Ветеринарна лабораторія',
  'Ветеринарна лікарня',
  'Взуттєвий цех',
  'Видавництво',
  'Цех',
  'Виставка',
  'Виставка-продаж',
  'Виставочний зал',
  'Засіб пересувної мережі',
  'Вугільний склад',
  'Вузол зв\'язку',
  'Відділ',
  'Відділ магазину',
  'Відділ передплати',
  'Відділення',
  'Відділення о/б',
  'Відеоклуб',
  'Відеостудія',
  'Відеотека',
  'Газова азс',
  'Галантерея',
  'Гастроном',
  'Годинникова майстерня',
  'Готель',
  'Гральний зал',
  'Гриль-бар',
  'Дегустаційний зал',
  'Диско-клуб',
  'Диспансер',
  'Диспетчерський пункт',
  'Дитяча кухня',
  'Добродійний фонд',
  'Довідкове бюро',
  'Душова',
  'Діагностичний центр',
  'Дільниця',
  'Електровузол',
  'Жек',
  'Жіноча консультація',
  'Завод',
  'Заготконтора',
  'Загс',
  'Закусочна',
  'Зал обрядових послуг',
  'Зал святкування',
  'Зал чекання',
  'Залізничний вокзал',
  'Зона відпочинку',
  'Зубопротезний кабінет',
  'Кабельне телебачення',
  'Кабінет',
  'Казино',
  'Камера схову',
  'Кафе',
  'Кафе-кондитерська',
  'Кемпінг',
  'Кладовище',
  'Клуб',
  'Книгарня',
  'Ковбасний цех',
  'Колгосп',
  'Комбікормовий завод',
  'Комора',
  'Комп\'ютерний зал',
  'Комп\'ютерні ігри',
  'Комісійний магазин',
  'Кондитерський цех',
  'Консультативний пункт',
  'Контейнер',
  'Контора',
  'Копіювальний центр',
  'Косметична поліклініка',
  'Косметичний салон',
  'Котедж',
  'Крематорій',
  'Кулінарія',
  'Кухня',
  'Кімната відпочинку',
  'Кінотеатр',
  'Автобус',
  'Лабораторія',
  'Лавка',
  'Ларьок',
  'Ломбард',
  'Автобусна станція',
  'Луна-парк',
  'Лікарня',
  'Лісосклад',
  'М\'ясний розруб',
  'М\'ясо контроль',
  'Магазин',
  'Магазин-кафе',
  'Майданчик',
  'Майстерня',
  'Майстерня швейна',
  'Макаронний цех',
  'Манікюрний салон',
  'Маршрутне таксі',
  'Масажний кабінет',
  'Маслоцех',
  'Машбюро',
  'Медичний заклад',
  'Медичний кабінет',
  'Медичний центр',
  'Медпункт',
  'Медсанчасть',
  'Млин',
  'Модуль',
  'Мотель',
  'Музей',
  'Народний дім',
  'Нафтобаза',
  'Нотаріальна контора',
  'Нотаріус',
  'Обмінний фонд',
  'Овочі',
  'Оздоровчий комплекс',
  'Олійниця',
  'Операційна каса',
  'Операційний зал',
  'Оптика',
  'Оптовий склад',
  'Офіс',
  'Ощадбанк',
  'Павільйон',
  'Палатка',
  'Палац культури',
  'Паливний склад',
  'Палітурний цех',
  'Парк',
  'Паркування авто',
  'Пекарня',
  'Пельменна',
  'Переговорний пункт',
  'Переробка риби',
  'Переробка сільськогосподарської продукції',
  'Переробний цех',
  'Пересувна азс',
  'Перукарня',
  'Пивний бар',
  'Пляж',
  'Побутмайстерня',
  'Пологовий будинок',
  'Поліграфцентр',
  'Поліклініка',
  'Пост контролю',
  'Поштамт',
  'Пральня',
  'Представник во',
  'Приготування обідів',
  'Приймальний пункт',
  'Прилавок',
  'Прирізка скла',
  'Прокат аудіовідео касет',
  'Абонементний відділ',
  'Пункт послуг',
  'Пункт прийому комунальних платежів',
  'Пункт прийому платежів',
  'Пункт прокату',
  'Підмінний фонд',
  'Радіотрансляційний вузол',
  'Регістратура',
  'Редакція',
  'Ремонт взуття',
  'Ресторан',
  'Ринок',
  'Розкладка',
  'Розпиловка лісу',
  'Розрахунковий центр',
  'Розсадник',
  'Салон',
  'Сауна',
  'Сауна-лазня',
  'Секція',
  'Сервіс-центр',
  'Склад',
  'Склад-магазин',
  'Склад-термінал',
  'Стоматологічна поліклініка',
  'Стоматологічний кабінет',
  'Страхова дільниця',
  'Страховий відділ',
  'Стриптиз-бар',
  'Студія',
  'Студія звукозапису',
  'Стіл замовлень',
  'Супермаркет',
  'Таксі',
  'Танцмайданчик',
  'Театр',
  'Телеграф',
  'Телемайстерня',
  'Телерадіомайстерня',
  'Телестудія',
  'Теплиця',
  'Теплохід',
  'Технічний центр',
  'Типографія',
  'Тир',
  'Торговий комплекс',
  'Тоталізатор',
  'Туалет',
  'Туристичне бюро',
  'Туристичний відділ',
  'Універмаг',
  'Універсам',
  'Учбовий центр',
  'Фабрика',
  'Фермерське господарство',
  'Фотоательє',
  'Фотолабораторія',
  'Філармонія',
  'Хлібокомбінат',
  'Художня майстерня',
  'Художній салон',
  'Хімчистка',
  'Чищення димоходів',
  'Шиномонтаж',
  'Школа',
  'Шкільна їдальня',
  'Шоу-центр',
  'Штрафплощадка',
  'Ювелірна майстерня',
  'Юридична контора',
  'Інвестиційний пункт',
  'Індпошив',
  'Інститут',
  'Їдальня',
  'Будинок піонерів',
  'Дитячий оздоровчий табір',
  'Дитячий комбінат',
  'Житлово-комунальне управління',
  'Зал гральних автоматів',
  'Земельна ділянка',
  'Комбінат громадського харчування',
  'Культурно-спортивний комплекс',
  'Профілакторій',
  'Пункт побутового обслуговування',
  'Виробнича ділянка',
  'Торговий ряд',
  'Друкарня',
  'Галерея',
  'Відділення зв\'язку',
  'Гуртожиток',
  'Паспортний стіл',
  'Крамниця',
  'Ремонт',
  'Авіакаса',
  'Канатна дорога',
  'Катер',
  'Паром',
  'Планетарій',
  'Прокат відеокасет',
  'Солярій',
  'Склад дрібнооптовий',
  'Станція технічного обслуговування (сто)',
  'Судно',
  'Аеропорт',
  'База плодоовочева',
  'Цирк',
  'Бюро перекладів',
  'Зал актовий',
  'Спортивний зал',
  'Тренажерний зал',
  'Зоопарк',
  'Інтернет-кафе',
  'Кабінет довіри',
  'Колонія виправна',
  'Копальня',
  'Корт',
  'Круподерка',
  'Машино-тракторна станція',
  'Морський вокзал',
  'Очисні споруди',
  'Приймальник-розподільник',
  'Пункт прийому вторинної сировини',
  'Пункт прийому металобрухту',
  'Пункт прийому реклами',
  'Пункт прийому склопосуду',
  'Сад',
  'Санаторій',
  'Стадіон',
  'Станція метеорологічна',
  'Станція насосна',
  'Станція санітарна',
  'Станція човнова',
  'Студія радіомовлення',
  'Студія телебачення',
  'Технікум',
  'Центр кінологічний',
  'Церква',
  'Тролейбус',
  'Літня тераса',
  'Агент страховий',
  'Контролер',
  'Пивна кега',
  'Спиртосховище',
  'Каса підприємства',
  'Будинок відпочинку',
  'Виносна торгівля',
  'Виїзна торгівля',
  'Ветеринарний пункт',
  'Вулканізація',
  'Гараж',
  'Депо',
  'Каса',
  'Каса ж/д',
  'Каса автобусна',
  'Каса припісна',
  'Кафетерій',
  'Кар\'єр',
  'Клініка',
  'Комбінат',
  'Комплекс',
  'Лісництво',
  'Потяг',
  'Сховище',
  'Аеродром',
  'Адвокатська контора',
  'Кооператив',
  'Митниця',
  'Морозильна камера',
  'Турбаза',
  'Стіл',
  'Торгівельне місце',
  'Трамвай',
  'Квартира',
  'Озеро',
  'Ставок',
  'Житловий будинок',
  'Лікувально-діагностичний центр',
  'Пансіонат',
  'Торгівельний павільйон',
  'Літак',
  'Фільм',
  'Кафе-бар',
  'Відділ кафетерію в магазині',
  'Магазин-кафетерій',
  'Паливно - заправний комплекс',
  'Автозаправний комплекс',
  'Підприємство громадського харчування',
  'Пункт приймання та тимчасового зберігання зерна',
  'Банкомат',
  'Платіжний термінал',
  'Магазин-закусочна',
  'Котельня',
  'Стоматологічний центр',
  'Трактор колісний',
  'Прес гідравлічний монтажно-запресовочний',
  'Свердловина',
  'Кабельна леп',
  'Вимірювальний прилад',
  'Газопровід',
  'Гусенична техніка для всіх видів робіт',
  'Колісна техніка для всіх видів робіт',
  'Ділянка надр',
  'Електростанція',
  'Дитячий садок',
  'Агнкс',
  'Пткс',
  'Вагон',
      ],
      statuses: [
        'Не набув чинності',
        'Чинний',
        'Скасований',
        'Втратив чинність'
      ]
    }
  },
  methods: {
    removeData () {
    },
    async saveData () {
      this.$emit('saveData', this.model)
      this.model = undefined
      // let confirm = await this.$confirm({
      //   title: `Save assistance`,
      //   description: `Would you like to save data about the assistance?`
      // })
      // if (!confirm) return false
      // this.countFamilyStats()
      // this.model.familyMembersIds = this.createFamilyMembersIds()
      // this.model.taxIds = [
      //   this.model.headOfHousehold?.taxId,
      //   ...(this.model.familyMembers || []).map(el => el.taxId).filter(Boolean)
      // ].filter(Boolean)

      // if (this.model?.headOfHousehold) this.model.headOfHousehold = preparePersonData(this.model.headOfHousehold)

      // const result = await this.$api.data.upsertOne('assistances', this.model)
      
      // this.$loading(false)
      // if (result.errors) {
      //   await this.$error(result)
      //   return false
      // }
      // await this.$showResult()
      // this.model = {}
      // this.$emit('loadItems')
    }
  }
}
</script>