<template>
  <div class="reply-form">
    <div class="panel panel_margin_small" v-if="focused">
      <input class="reply-form__input reply-form__input_text_big" type="text" placeholder="Заголовок отчета" />
    </div>
    <div class="panel panel_margin_small">
      <textarea :class="{ 'reply-form__textarea': true, 'reply-form__textarea_short': !focused }"  placeholder="Написать отчет за сегодня" :rows="focused ? 8 : 1" @focus="focused = true" />
      <input class="reply-form__input  reply-form__input_text_small reply-form__input_bordered" placeholder="Заработано за день, руб." type="text" v-if="focused" />
    </div>
    
    <div class="reply-form__submit-block" v-if="focused">
      <button type="submit" class="myBtn" tabindex="4"><span title="Запостить как “bm-paperdoll”">Пост</span></button>
      <button type="submit" class="myBtn" tabindex="4"><span title="Запостить как “bm-paperdoll”">Пост</span></button>
      <button type="submit" class="myBtn" tabindex="4"><span title="Запостить как “bm-paperdoll”">Пост</span></button>
      <!--<div class="ReplyEditorShort__buttons-add "><ul><li><label tabindex="0" class="rc-upload ReplyEditorShort__buttons-add-image" role="button"><input type="file" accept="image/*" style="display: none;"></label></li><li><a href="#" class="ReplyEditorShort__buttons-add-video"></a></li><li><label tabindex="0" class="rc-upload ReplyEditorShort__buttons-add-file" role="button"><input type="file" style="display: none;"></label></li></ul></div>-->
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      focused: false
    })
  }
</script>
