<template>
  <div :style="{ marginTop: '15px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }">
    <panel :body="{ noVerticalPadding: true }">
      <h3 class="panel__title" slot="header">Оставьте отзыв или предложение о сегодняшнем дне и оцените нас!</h3>
    
      <form class="panel-form">
        <div class="panel-form__row">
          <label class="panel-form__label" for="comment">Комментарий</label>
          <textarea class="panel-form__input panel-form__input_textarea" id="comment" rows="5" />
        </div>
        <div class="panel-form__row">
          <label class="panel-form__label">Качество контента</label>
          <div class="panel-form__fake-input">
            <ratingBar />
          </div>
        </div>
        <div class="panel-form__row">
          <label class="panel-form__label">Эмоции</label>
          <div class="panel-form__fake-input">
            <ratingBar />
          </div>
        </div>
        <div class="panel-form__row">
          <label class="panel-form__label">Организация</label>
          <div class="panel-form__fake-input">
            <ratingBar />
          </div>
        </div>
        <div class="panel-form__row">
          <div class="panel-form__fake-input">
            <button class="myBtn" type="submit">Отправить</button>
          </div>
        </div>
      </form>

    </panel>
  </div>
</template>

<script>
  import ratingBar from '~components/rating/bar'
  import panel from '~components/panel'

  export default {
    components: { panel, ratingBar }
  }
</script>
