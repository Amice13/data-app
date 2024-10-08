const legalPosition = `
<p style="margin-bottom: 25px">Інформація про організаційну структуру фіксується в установчих документах розпорядників, наприклад, положеннях, статутах тощо (стаття 64 <a href="https://zakon.rada.gov.ua/laws/show/436-15">Господарського кодексу України</a>). <a href="https://zakon.rada.gov.ua/rada/show/v1024217-98">Державний класифікатор управлінської документації</a> визначає форму документа для затвердження структури і штатної чисельності (коди 0202016, 0202017, 0202018, 0202019). Форма містить таблицю з трьох колонок:</p>
<ol style="margin-left: 30px">

<li style="margin-bottom: 10px;">№ з/п;

</li><li style="margin-bottom: 10px;">Найменування структурного підрозділу та посад (професій);

</li><li style="margin-bottom: 10px;">кількість штатних одиниць.
</li>
</ol>
<p style="margin-bottom: 25px">Відповідальним за підготовку документа є підрозділ або посадова особа, на які покладені обов’язки кадрового забезпечення. Структура і штатна чисельність затверджується керівником. Для наочного зображення організаційної структури розпорядники створюють органіграми (графічні моделі організаційної структури), наприклад, <a href="http://www.me.gov.ua/Documents/Detail?lang=uk-UA&amp;id=c3dfd8a9-92d0-44b1-835e-e4c0bb005a23&amp;title=OrganigramaMinekonomrozvitku">органіграма Мінекономрозвитку</a>.</p>
`

const structure = [
  {
    "name": "identifier",
    "titles": "№ з/п",
    "dc:description": "Номер загального порядку або будь-який інший унікальний ідентифікатор.",
    "datatype": "string",
    "required": true
  },
  {
    "name": "prefLabel",
    "titles": "Назва посади",
    "dc:description": "Найменування посади (професії) в організаційній структурі розпорядника. Наприклад: Головний спеціаліст.",
    "datatype": "string",
    "required": true
  },
  {
    "name": "postIn",
    "titles": "Назва структурного підрозділу",
    "dc:description": "Повна назва структурного підрозділу, до якого належить посада (професія). Наприклад: Департамент стратегічного розвитку та інтеграції.",
    "datatype": "string",
    "required": true
  },
  {
    "name": "value",
    "titles": "Кількість штатних одиниць",
    "dc:description": "Загальна кількість штатних одиниць. Наприклад: 4.",
    "datatype": "integer",
    "required": true
  }
]

const info = {
  id: 'orgStructure',
  parent: 'org-structure',
  description: 'Інформація про організаційну структуру',
  legislation: '<a href="https://zakon.rada.gov.ua/laws/show/55-2018-%D0%BF">Постанова КМУ “Деякі питання документування управлінської діяльності” від 17 січня 2018 р. № 55</a>, <a href="https://zakon.rada.gov.ua/laws/show/z0736-15">Наказ Міністерства юстиції України “Про затвердження Правил організації діловодства та архівного зберігання документів у державних органах, органах місцевого самоврядування, на підприємствах, в установах і організаціях” від 18.06.2015 № 1000/5</a>, <a href="https://zakon.rada.gov.ua/rada/show/v0055609-03">ДСТУ 4163-2003. Уніфікована система організаційно-розпорядчої документації. Вимоги до оформлювання документів</a>, <a href="https://zakon.rada.gov.ua/rada/show/v1024217-98">ДК 010-98. Державний класифікатор управлінської документації</a>',
  dataManagers: 'Всі розпорядники публічної інформації відповідно до частини 1 статті 13 Закону України “Про доступ до публічної інформації”',
  content: 'Організаційна структура затверджується управлінським документом, що відповідає уніфікованій формі “Структура і штатна чисельність” <a href="https://zakon.rada.gov.ua/rada/show/v1024217-98">Державного класифікатора управлінської документації (ДК 010-98)</a>',
  updatedOn: 'Зміни організаційної структури (створення нових підрозділів, скорочення, реорганізація), штатного розпису',
  frequency: 'Позапланово (протягом трьох робочих днів з моменту внесення змін)',
  type: 'Структуровані дані',
  formats: ['XLSX', 'ODS', 'CSV', 'Other structured'],
  legalPosition,
  structure
}