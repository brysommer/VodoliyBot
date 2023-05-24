import { bot } from "./app.js";
import { phrases, keyboards } from './language_ua.js';
import { logger } from './logger/index.js';
import { DateTime } from "luxon";

let customerInfo = {};
const phoneRegex = /^\d{10,12}$/;
let userAuth = false;
let customerPhone;


export const anketaListiner = async() => {
    bot.setMyCommands([
      {command: '/start', description: 'До головного меню'},
      {command: '/login', description: 'Авторизуватись, для постійних клієнтів "Водолій"'},
      {command: '/logout', description: 'Вийти з акаунту'}
    ]);
    
    bot.on('message', async (msg) => {
      console.log(userAuth)
      console.log(customerPhone)
      const chatId = msg.chat.id;
      if (msg.contact) {
        customerPhone = msg.contact.phone_number;
        userAuth = true;
        bot.sendMessage(chatId, phrases.congratAuth, { 
          reply_markup: { keyboard: keyboards.mainMenu, resize_keyboard: true, one_time_keyboard: true }});
      } else if (phoneRegex.test(msg.text)) {
        customerPhone = msg.text;
        userAuth = true;
        bot.sendMessage(chatId, phrases.congratAuth);
      };

      switch (msg.text) {
        case '/start':
          if (userAuth) 
          bot.sendMessage(msg.chat.id, phrases.mainMenu, {
            reply_markup: { keyboard: keyboards.mainMenu, resize_keyboard: true, one_time_keyboard: true }
          });
          else 
          bot.sendMessage(msg.chat.id, phrases.greetings, {
            reply_markup: { keyboard: keyboards.login, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case 'До головного меню':
          if (userAuth) {
            bot.sendMessage(msg.chat.id, phrases.mainMenu, {
              reply_markup: { keyboard: keyboards.mainMenu, resize_keyboard: true, one_time_keyboard: true }
            });  
          }
          else
          bot.sendMessage(msg.chat.id, 'Ви не авторизовані', {
            reply_markup: { keyboard: keyboards.login, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case '/login':
          if (userAuth) {
            userAuth = false;
            bot.sendMessage(msg.chat.id, phrases.alreadyAuth, {
              reply_markup: { keyboard: keyboards.mainMenu, resize_keyboard: true, one_time_keyboard: true }
            });  
          }
          else
          bot.sendMessage(msg.chat.id,  {
            reply_markup: { keyboard: keyboards.login, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case '/logout':
        case 'Вийти з акаунту':
          userAuth = false;
          bot.sendMessage(chatId, phrases.logout, {
            reply_markup: { keyboard: keyboards.login, resize_keyboard: true },
          });
          break;
        case 'Авторизуватись':
        case 'Зареєструватись':
          bot.sendMessage(msg.chat.id, phrases.contactRequest, {
            reply_markup: { keyboard: keyboards.contactRequest, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case 'Ні, я введу номер вручну':
          bot.sendMessage(msg.chat.id, phrases.phoneRules);
          break;
        case '⛽️ Купівля товару': 
          bot.sendMessage(msg.chat.id, phrases.chooseVendor, {
            reply_markup: { keyboard: keyboards.chooseVendor, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case 'Ввести номер автомата': 
          bot.sendMessage(msg.chat.id, phrases.enterVendorNum);
          break;
        case '💳 Рахунок':
          bot.sendMessage(msg.chat.id, phrases.accountStatus, {
            reply_markup: { keyboard: keyboards.accountStatus, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case '💰 Баланс':
          let currentTime = DateTime.now().toFormat('yy-MM-dd HH:mm:ss');
          let userBalance = 0.00;
          let userSpend = 0.00;
          const balanceMessage = `
          ${currentTime}

          💰 Поточний баланс:
          ${userBalance} БОНУСНИХ грн.

          🔄 Оборот коштів:
          ${userSpend} БОНУСНИХ грн.
          `
          bot.sendMessage(msg.chat.id, balanceMessage, {
            reply_markup: { keyboard: keyboards.accountStatus, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case '💸 Поповнити баланс':
          bot.sendMessage(msg.chat.id, phrases.enterTopupAmount, {
            reply_markup: { keyboard: keyboards.returnToBalance, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case '⭐️ Бонуси': 
          let userBonusAcc = `
          💫 Ваші бонуси при обороті:

          ✅ 0 БОНУСНИХ грн
          20% від поповнення

          ↗️ 1000 БОНУСНИХ грн
          30% від поповнення

          ↗️ 2000 БОНУСНИХ грн
          30% від поповнення

          ↗️ 3000 БОНУСНИХ грн
          30% від поповнення

          ↗️ 4000 БОНУСНИХ грн
          30% від поповнення


          🌟 Додаткові бонуси:

          За поповнення онлайн:
          5% від поповнення

          За поповнення QR кодом:
          5% від поповнення
          `
          bot.sendMessage(msg.chat.id, userBonusAcc, {
            reply_markup: { keyboard: keyboards.accountStatus, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
        case '📊 Історія операцій':
          bot.sendMessage(msg.chat.id, phrases.userHistory, {
            reply_markup: { keyboard: keyboards.historyMenu, resize_keyboard: true, one_time_keyboard: true }
          });
          break;
      };
  });
};