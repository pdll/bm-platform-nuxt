import Vue from 'vue'
import VueI18n from 'vue-i18n'

import ru from '../i18n/ru/index.json'
import en from '../i18n/en/index.json'

Vue.use(VueI18n)

Vue.config.lang = 'ru'
Vue.config.fallbackLang = 'en'

Vue.locale('ru', ru)
Vue.locale('en', en)
