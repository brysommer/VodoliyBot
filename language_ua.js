const phrases = {
    greetings: 'Привіт, я бот Водолій. Авторизуйтеся для доступу до функціоналу',
    contactRequest: 'Нам потрібен ваш номер телефону. Отримати з контактних даних телеграм?',
    dataConfirmation: (customerName, customerPhone) => {
        return `Ваш номер телефону: ${customerPhone}. Ваше імя ${customerName}. Дані вірні?`;
    },
    thanksForOrder: (customerName) => {
        return `Замовлення успішно оформлено. Дякую ${customerName}`;
    },
    congratAuth: '🎉 Ви успішно авторизувались.', 
    congratRegister: '🎉 Ви успішно зареєструвались та авторизувались.',
    mainMenu: '📋 Головне меню',
    alreadyAuth: 'Ви вже авторизовані',
    logout: '🔑 Ви вийшли з акаунту.',
    wrongPhone: 'Невірний номер телефону. Будь ласка, введіть номер телефону ще раз:',
    phoneRules: 'Введіть ваш номер телефону без +. Лише цифри. І відправте повідомлення',
    nameRequest: 'Введіть своє ім\'я:',
    chooseVendor: 'Тепер зручним для Вас способом, виберіть, будь ласка, Автомат на якому бажаєте отримати товар.',
    enterVendorNum: 'Будь ласка, введіть номер автомата.',
    accountStatus: '💳 Рахунок',
    enterTopupAmount: 'Введіть сумму БОНУСНИХ грн на яку бажаете поповнити баланс.',
    userHistory: '📊 Історія операцій',
    chooseVolume: '👉 Виберіть потрібну кількість літрів продукту. /n ✏️ Або напишіть об/єм продукту у літрах цілим числом чи з дробною частиною.',
    chooseAmount: '👉 Виберіть потрібну сумму у грн на яку бажаєте придбати продукт./n ✏️ Або напишіть суму покупки у гривнях цілим числом чи з дробною частиною.'
  };
  
const keyboards = {
    startingKeyboard: [['Зробити замовлення']],
    contactRequest: [
      [ { text: 'Так', request_contact: true, } ],
      ['Ні, я введу номер вручну'],
      ['/start'],
    ],
    dataConfirmation: [
      ['Так, Оформити замовлення'],
      ['Ні, повторити введення'],
      ['/start'],
    ],
    mainMenu: [ ['⛽️ Купівля товару'], ['💳 Рахунок'], ['Вийти з акаунту'] ],
    login: [['Авторизуватись'],['Зареєструватись']],
    chooseVendor: [[{ text: 'Найближчі автомати', request_location: true, }], ['Ввести номер автомата'], ['Відсканувати QR-код'],  ['До головного меню']],
    accountStatus: [['💰 Баланс'], ['💸 Поповнити баланс'], ['⭐️ Бонуси'], ['📊 Історія операцій'], ['До головного меню']], 
    returnToBalance: [['💳 Рахунок']],
    historyMenu: [['Остання операція за рахунком'], ['💳 Рахунок']],
    volumeKeyboard: { 
      inline_keyboard: [
      [{ text: '1', callback_data: 'volume-1' }],
      [{ text: '5', callback_data: 'volume-5' }],
      [{ text: '6', callback_data: 'volume-6' }],
      [{ text: '10', callback_data: 'volume-10' }],
      [{ text: '12', callback_data: 'volume-12' }],
      [{ text: '19', callback_data: 'volume-19' }]
    ]},
    amountKeyboard: { 
      inline_keyboard: [
      [{ text: '2', callback_data: 'volume-2' }],
      [{ text: '5', callback_data: 'volume-5' }],
      [{ text: '10', callback_data: 'volume-10' }],
      [{ text: '15', callback_data: 'volume-15' }],
      [{ text: '20', callback_data: 'volume-20' }],
      [{ text: '30', callback_data: 'volume-30' }]
    ]},
};

export { phrases, keyboards }

