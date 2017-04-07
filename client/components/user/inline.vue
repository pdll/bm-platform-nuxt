<template>
  <div class="user-inline">
    <nuxt-link class="user-inline__image-link" :to="'/'">
      <div class="user-inline__image" src="" alt="" />
    </nuxt-link>

    <div :class="{ 'user-inline__body': true, 'user-inline__body_width_thin': subscribeButtons }">
      <div class="user-inline__title-block">
        <nuxt-link class="user-inline__title" :to="'/'">Юринов Степан</nuxt-link>
        <span class="user-inline__when" v-if="time"> {{ time }}</span>
      </div>
      <div class="user-inline__info">Машинная вышивка (нашивки, картины), дизайн-интерьеров, картины.</div>
    </div>
    <div class="user-inline__buttons" v-if="subscribeButtons">
      <button class="myBtn myBtn_small">Подписаться</button>
      <button class="myBtn myBtn_small">Заблокировать</button>
    </div>
    <div class="user-inline__money" v-if="money">{{ formattedMoney }} ₽</div>
  </div>
</template>

<script>
  import numeral from 'numeral'

  export default {
    computed: {
      formattedMoney: function () {
        if (this.money) return numeral(this.money).format('0,0')
        return null
      }
    },
    props: {
      money: { type: Number, default: null },
      time: { type: String, default: 'позавчера' },
      subscribeButtons: { type: Boolean, default: false }
    }
  }
</script>
