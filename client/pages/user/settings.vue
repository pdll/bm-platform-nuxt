<template>
  <userLayout>
    <div class="user-settings">
      
      <div class="panel">
        <div class="panel__menu">

          <div class="panel-menu">
            <div class="panel-menu__item">
              <a :class="{ 'panel-menu__link': true, 'panel-menu__link_active': tab === 'first' }" href="#">Пункт меню 1</a>
            </div>
            <div class="panel-menu__item">
              <a class="panel-menu__link" href="#">Пункт меню 2</a>
            </div>
            <div class="panel-menu__item">
              <a class="panel-menu__link" href="#">Пункт меню 3</a>
            </div>
          </div>

        </div>
        <div class="panel__body panel__body_no_vertical-padding">

          <form class="panel-form">
            <div class="panel-form__row">
              <label class="panel-form__label">Label</label>
              <input class="panel-form__input" type="text" />
            </div>
            <div class="panel-form__row">
              <label class="panel-form__label">Label</label>
              <input class="panel-form__input" type="text" />
            </div>
            <div class="panel-form__row">
              <label class="panel-form__label">Label</label>
              <input class="panel-form__input" type="text" />
            </div>
          </form>

        </div>

        <div class="panel__footer">
          <button class="btn">Сохранить</button>
        </div>
      </div>

    </div>
  </userLayout>
</template>

<script>
  import userLayout from '../../components/user/layout.vue'

  export default {
    data: () => ({ tab: 'first' }),
    components: { userLayout }
  }
</script>
