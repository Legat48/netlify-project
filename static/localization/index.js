import user from './user'
import faq from './faq'

export default {
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  strategy: 'prefix',
  fallbackLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: {
        headers: {
          email: 'Enter email',
          tariff: 'Choose your tariff plan',
          tariffEmail: 'Your Email:',
          awaiting: 'Expect',
          successfully: 'Payment completed successfully'
        },
        promo: {
          enterPromo: 'Enter the promo code',
          dialogDescription: 'Get a subscription discount or get a free period',
          promo: 'Promo code',
          activatePromo: 'Activate a promo code',
          activated: 'Activated',
          discount: 'discount from the promo code'
        },
        texts: {
          awaitingTextOne: 'Your operation is in progress.',
          awaitingTextTwo: 'This may take up to several minutes.',
          successText: 'Thanks for choosing us. Purchase information has been sent to your email and personal account.',
          agreement: 'I agree to the processing of personal data, accept the terms of the public offer and regular debits.',
          info: 'At the end of the trial period, you will be charged the cost of the selected plan, unless you cancel your subscription before the end of the trial period.',
          infoTariffBtnAction: 'then',
          additionalFreeDuration: 'free days',
          extraDays: 'extra days',
          tariffYearlyTooltip: 'To link the card, you need to write off 1 ruble',
          goToApp: 'Go to the app'
        },
        tariffs: {
          tariff: {
            name: 'All inclusive',
            companiesAmount: '50 000+ companies'
          },
          time: {
            month: '1 month',
            year: '12 months'
          },
          currency: {
            dollars: 'Payment in $',
            rubles: 'Payment in ₽'
          }
        },
        buttons: {
          back: 'Back',
          continue: 'Continue',
          update: 'Update',
          goToProfile: 'Go to profile',
          cancel: 'Cancel',
          submit: 'Submit',
          profile: 'Profile',
          logOut: 'Log out',
          login: 'Login',
          payment: 'Payment',
          faq: 'FAQ',
          forgotPassword: 'Forgot password?',
          selectAll: 'Select All',
          apply: 'Apply',
          downloadSelected: 'Download selected',
          change: 'Change',
          purchase: 'Purchase',
          reset: 'Reset',
          cardError: 'Reload',
          robokassa: 'Robokassa',
          stripe: 'Stripe',
          backRates: 'Back to rates',
          backWaiting: 'Back to waiting',
          linkPay: 'To pay'

        },
        info: {
          contacts: 'Contacts',
          socMedia: 'Social media',
          emailNotExist: 'Account doesn\'t exist',
          incorrectEmail: 'Incorrect email',
          cardErrorMessage: 'Fare Retrieval Error',
          unknownErrorMessage: 'Unknown error'

        },
        docs: {
          offer: 'Offer',
          privacyPolicy: 'Privacy Policy',
          personalData: 'Personal Data',
          limitationOfLiability: 'Limitation Of Liability'
        },
        faq: faq.en,
        user: user.en
      },
      ru: {
        headers: {
          email: 'Укажите почту',
          tariff: 'Выберите подходящий тариф',
          tariffEmail: 'Ваш Email:',
          awaiting: 'Ожидайте',
          successfully: 'Оплата проведена успешно'
        },
        texts: {
          awaitingTextOne: 'Ваша операция выполняется.',
          awaitingTextTwo: 'Это может занять до нескольких минут.',
          successText: 'Спасибо, что выбрали нас. Информация о покупке отправлена на ваш email и личный кабинет.',
          agreement: 'Я даю согласие на обработку персональных данных, принимаю условия публичной оферты и на регулярные списания.',
          info: 'По истечении пробного периода с Вас будет снята стоимость выбранного тарифа, если Вы не отмените подписку до конца пробного периода.',
          infoTariffBtnAction: 'потом',
          additionalFreeDuration: 'бесплатных дней',
          extraDays: 'доп. дней',
          tariffYearlyTooltip: 'Для привязки карты нужно списать 1 рубль',
          goToApp: 'Перейти к приложению'
        },
        promo: {
          enterPromo: 'Введите промокод',
          dialogDescription: 'Получите скидку на подписку или получите бесплатный период',
          promo: 'Промокод',
          activatePromo: 'Активировать промокод',
          activated: 'Активирован',
          discount: 'Cкидка от промокода'
        },
        tariffs: {
          tariff: {
            name: 'Все включено',
            companiesAmount: '50 000+ компаний'
          },
          time: {
            month: '1 месяц',
            year: '12 месяцев'
          },
          currency: {
            dollars: 'Оплата в $',
            rubles: 'Оплата в ₽'
          }
        },
        buttons: {
          back: 'Назад',
          continue: 'Продолжить',
          update: 'Обновить',
          goToProfile: 'Перейти в личный кабинет',
          cancel: 'Отмена',
          submit: 'Подтвердить',
          profile: 'Профиль',
          logOut: 'Выход',
          login: 'Профиль',
          payment: 'Оплата',
          faq: 'FAQ',
          forgotPassword: 'Забыли пароль?',
          downloadSelected: 'Загрузить выбранное',
          selectAll: 'Выбрать все',
          apply: 'Применить',
          change: 'Изменить',
          purchase: 'Купить',
          reset: 'Сбросить',
          cardError: 'Перезагрузить',
          robokassa: 'Robokassa',
          stripe: 'Stripe',
          backRates: 'Вернуться к тарифам',
          backWaiting: 'Вернуться к ожиданию',
          linkPay: 'Перейти к оплате'
        },
        info: {
          contacts: 'Контакты',
          socMedia: 'Соцсети',
          emailNotExist: 'Аккаунт не существует',
          incorrectEmail: 'Неправильная почта',
          cardErrorMessage: 'Ошибка получения тарифов',
          unknownErrorMessage: 'Неизвестная ошибка'
        },
        docs: {
          offer: 'Оферта',
          privacyPolicy: 'Политика конфиденциальности',
          personalData: 'Условия пользования',
          limitationOfLiability: 'Ограничение ответсвенности'
        },
        faq: faq.ru,
        user: user.ru
      }
    }
  }
}
