const LANG_LIST = ['en', 'pl', 'uk'];
const LANG_DICTIONARY = {
  'close-menu': {
    pl: 'Zamknij menu',
    uk: 'Закрити меню',
  },
  'open-menu': {
    pl: 'Otwórz menu',
    uk: 'Відкрити меню',
  },
  products: {
    pl: 'Produkty',
    uk: 'Товари',
  },
  who: {
    pl: 'Kim jesteśmy?',
    uk: 'Хто ми?',
  },
  store: {
    pl: 'Sklep',
    uk: 'Магазин',
  },
  recipes: {
    pl: 'Przepisy',
    uk: 'Рецепти',
  },
  login: {
    pl: 'Zaloguj się',
    uk: 'Увійти',
  },
  cart: {
    pl: 'Koszyk (0)',
    uk: 'Кошик (0)',
  },
  'change-lng': {
    pl: 'Zmień język',
    uk: 'Змінити мову',
  },
  span1: {
    pl: 'Spróbuj',
    uk: 'Cкуштуйте',
  },
  span2: {
    pl: '',
    uk: '',
  },
  span3: {
    pl: 'Dzikie.',
    uk: 'Дике.',
  },
  span4: {
    pl: 'Znajdź',
    uk: 'Знайдіть',
  },
  span5: {
    pl: 'Swoją',
    uk: 'Свою',
  },
  span6: {
    pl: 'Duszę.',
    uk: 'Душу.',
  },
  'use-cookies': {
    pl: 'Nasza strona używa plików cookie',
    uk: 'Наш веб-сайт використовує файли',
  },
  'products-title': {
    pl: 'Dziko ukochane',
    uk: 'Дико улюблене',
  },
  'products-text': {
    pl: 'Znajdziesz nasze dzikie produkty w ich najprostszej formie. Żadne dodatki ani nic innego nie mogą zepsuć ich natury.',
    uk: 'Ви знайдете наші дикі продукти в їхній найпростішій формі. Ніякі добавки або будь-що ще не можуть зіпсувати їх природу.',
  },
  product1: {
    pl: 'Masło z Dziki Arachidu',
    uk: 'Масло Дикого Арахісу',
  },
  product2: {
    pl: 'Tahini z Kakao i Miodem',
    uk: 'Тахіні з Какао та Медом',
  },
  product3: {
    pl: 'Masło z Dziki Orzech Leśny',
    uk: 'Масло з Дикого Лісового Горіха',
  },
  product4: {
    pl: 'Dziki Tahini',
    uk: 'Дикий Тахіні',
  },
  'wild-way': {
    pl: 'Nasza dzika droga',
    uk: 'Наш дикий шлях',
  },
  'photos-text': {
    pl: 'Nasza filozofia jest obecna na każdym etapie naszej produkcji. Staramy się przyczynić do stworzenia lepszego świata.',
    uk: 'Наша філософія є на кожному етапі нашого виробництва. Ми прагнемо зробити свій внесок у створення кращого світу.',
  },
  'photos-img1': {
    pl: 'Produkty Wild Souls',
    uk: 'Товари Wild Souls',
  },
  'photos-img2': {
    pl: 'Napoje Wild Souls',
    uk: 'Напої Wild Souls',
  },
  'photos-img3': {
    pl: 'Ręka otwierająca kran wodociągowy',
    uk: 'Рука відкриває водопровідний кран',
  },
  discover: {
    pl: 'Dowiedz się więcej',
    uk: 'ДІЗНАТИСЯ БІЛЬШЕ',
  },
  'nut-title': {
    pl: 'Dziki jak orzech??',
    uk: 'Дикий як горіх??',
  },
  'nut-card-title': {
    pl: 'Prażony migdał',
    uk: 'Смажений мигдаль',
  },
  'nut-text': {
    pl: 'Wszystkie skarby są ukryte w skrzyni. Odpowiednio, nasze skarby są zamknięte w swojej Dzikiej powłoce.',
    uk: 'Всі скарби заховані в скрині. Відповідно, наші скарби укладені у свою Дику оболонку.',
  },
  'nut-price': {
    pl: '250g | 20 <span class="nut-product__currency">zł</span>',
    uk: '250г | 220 <span class="nut-product__currency">₴</span>',
  },
  'nut-link': {
    pl: 'SPRÓBUJ!',
    uk: 'СКУШТУВАТИ!',
  },
  'discover-title': {
    pl: 'ODKRYJ NASZĄ PRODUKCJĘ PRZEZ 5 SKARBÓW NATURY!',
    uk: 'ВІДКРИЙТЕ ДЛЯ НАШІ ПРОДУКТИ ЧЕРЕЗ 5 СКАРБІВ ПРИРОДИ!',
  },
  sesame: {
    pl: 'Kozieradka',
    uk: 'Кунжут',
  },
  peanut: {
    pl: 'Orzech ziemny',
    uk: 'Арахіс',
  },
  almond: {
    pl: 'Migdał',
    uk: 'Мигдаль',
  },
  hazelnut: {
    pl: 'Orzech laskowy',
    uk: 'Фундук',
  },
  cashew: {
    pl: 'Orzech nerkowca',
    uk: "Кеш'ю",
  },
  'slider-title': {
    pl: 'Słowa od duszy!',
    uk: 'Слова від душі!',
  },
  'slider-title1': {
    pl: 'PROPAGANDA',
    uk: 'ПОПАГАНДА',
  },
  'slider-text1': {
    pl: 'Inny sklep w centrum Aten rozdrabnia owoce, oferuje masło przygotowane z zaledwie jednego składnika oraz smaki chałwy, które potwierdzają, że zdrowe może być smaczne.',
    uk: 'В іншому магазині в центрі Афін подрібнюють фрукти, пропонують масло, виготовлене лише з одного інгредієнта, і ароматизатори халви, які підтверджують, що здорове може бути смачним.',
  },
  'slider-title2': {
    pl: 'GŁOS Z ATEN',
    uk: 'АФІНСЬКИЙ ГОЛОС',
  },
  'slider-text2': {
    pl: 'Wild Souls pracuje głównie z produktami z sezamu i orzechów (pistacjami, orzechami laskowymi, migdałami, nerkowcami), tworząc piekielne pasty, które chce się połykać razem ze słoikiem.',
    uk: 'Wild Souls працює переважно з продуктами з кунжуту та горіхів (фісташками, фундуком, мигдалем, кеш’ю), створюючи пекельні спреди, які хочеться проковтнути разом із баночкою.',
  },
  'store-title': {
    pl: 'Sklep koncepcyjny',
    uk: 'Концептуальний магазин',
  },
  'store-text': {
    pl: 'Zapraszamy do odkrywania, życia i fotografowania. Ale uważaj, to bardzo wciąga!',
    uk: 'Ми запрошуємо вас дослідити його, прожити та сфотографувати. Але будьте обережні, це викликає сильну залежність!',
  },
  'halva-title': {
    pl: 'Dzika chałwa',
    uk: 'Дика Халва',
  },
  'halva-subtitle': {
    pl: 'Magiczne ziarenko..',
    uk: 'Чарівне зернятко..',
  },
  'halva-text': {
    pl: 'To nie deser, nie przekąska i nie pełnowartościowe jedzenie. Ale to wszystko naraz. To to, czym chcesz, żeby było.',
    uk: 'Це не десерт, не перекус і не повноцінна їжа. Але все це одночасно. Це те, що ви хочете бачити.',
  },
  'halva-price': {
    pl: '500g | OD 35 <span class="halva__currency">zł</span>',
    uk: '500г | ОТ 399<span class="halva__currency">₴</span>',
  },
  'discover-now': {
    pl: 'ODKRYJ TERAZ!',
    uk: 'ВІДКРИЙТЕ ЗАРАЗ!',
  },
  'gift-title': {
    pl: 'Podziel się swoją Miłością za pomocą Dzikiego Prezentu!',
    uk: 'Поширюйте свою Любов за допомогою Дикого Подарунка!',
  },
  'five-treasures': {
    pl: 'Pięć skarbów',
    uk: "П'ять скарбів",
  },
  'treasures-text': {
    pl: 'Jak powiedział Hipokrates, jesteśmy tym, co jemy.<br> Zobaczmy, co się stanie, jeśli zjemy te DZIKIE skarby.',
    uk: 'Як казав Гіппократ, ми — це те, що ми їмо.<br> Давайте подивимось, що станеться, якщо з’їсти ці ДИКІ скарби.',
  },
  'recipes-title': {
    pl: 'Dzikie Przepisy',
    uk: 'Дикі Рецепти',
  },
  'recipes-text': {
    pl: 'Zajrzyj przez dziurkę od klucza do naszej Dzikej kuchni! Zdobądź pomysły, jak przemienić swoją kuchnię w Dziką.',
    uk: 'Подивіться на замкову щілину нашої Дикої кухні! Отримайте ідеї про те, як перетворити власну кухню на Дику.',
  },
  sweet: {
    pl: 'Słodkie',
    uk: 'Солодке',
  },
  granola: {
    pl: 'Dzika Granola z 6 Składników',
    uk: 'Дика гранола з 6 інгредієнтів',
  },
  salty: {
    pl: 'Słone',
    uk: 'Солоне',
  },
  coleslaw: {
    pl: 'Sałatka z kapusty z tahini, bogata w błonnik',
    uk: 'Салат з капусти та тахіні з високим вмістом клітковини',
  },
  hummus: {
    pl: 'Dziki Hummus',
    uk: 'Дикий Хумус',
  },
  'footer-title': {
    pl: 'Pozostań Dziki',
    uk: 'Залишайся Диким',
  },
  input: {
    pl: 'Napisz swój email',
    uk: 'Напишіть свій email',
  },
  follow: {
    pl: 'Obserwuj nas',
    uk: 'Слідкуйте за Нами',
  },
  website: {
    pl: 'Strona stworzona',
    uk: 'Сайт створений',
  },
  butters: {
    pl: 'Masła orzechowe',
    uk: 'Горіхове масло',
  },
  honey: {
    pl: 'Miód',
    uk: 'Мед',
  },
  marmalades: {
    pl: 'Marmolady',
    uk: 'Мармелади',
  },
  halva: {
    pl: 'Chałwa',
    uk: 'Халва',
  },
  'dry-nuts': {
    pl: 'Suszone Orzechy',
    uk: 'Сухі Горіхи',
  },
  'open-sesame': {
    pl: 'Otwórz sezam',
    uk: 'Відкрий кунжут',
  },
  card: {
    pl: 'Karta podarunkowa',
    uk: 'Подарункова карта',
  },
  'footer-title2': {
    pl: 'Kontakt',
    uk: 'Контакти',
  },
  'footer-title3': {
    pl: 'Firma',
    uk: 'Компанія',
  },
  'concept-store': {
    pl: 'Sklep Koncepcyjny',
    uk: 'Концептуальний Магазин',
  },
  help: {
    pl: 'Pomoc',
    uk: 'Допомога',
  },
  terms: {
    pl: 'Warunki i Zasady',
    uk: 'Правила та Умови',
  },
  policy: {
    pl: 'Polityka Prywatności',
    uk: 'Політика Конфіденційності',
  },
  cookies: {
    pl: 'Pliki Cookie',
    uk: 'Файли Cookie',
  },
  methods: {
    pl: 'Metody Płatności',
    uk: 'Способи Оплати',
  },
  shipping: {
    pl: 'Dostawa i Zwroty',
    uk: 'Доставка та Повернення',
  },
};
