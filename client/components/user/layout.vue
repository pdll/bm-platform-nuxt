<template>
  <div class="user-page">
    <div class="user-page__header">
      
      <!--with background image-->
      <div class="up-header">
        <img class="up-header__image" src="" alt="" />

        <div class="up-header__buttons">
          <button class="up-header__button">Блокировать</button>
          <button class="up-header__button">Подписаться</button>
        </div>
      </div>

    </div>

    <div class="user-page__content">
      <div class="user-page__content-block user-page__content-block_side">
        <!--Блок информации о пользователе-->
        <panel :body="{ padding: 'small' }">
          <div class="user-badge">
            <h2 class="user-badge__name">Безгодова Наталья</h2>
            <div class="user-badge__info">23 года, Екатеринбург</div>
            <div class="user-badge__info">Машинная вышивка(нашивки, картины), дизайн-интерьеров, картины.</div>
            <div class="user-badge__info">Голосов: 5</div>
          </div>
        </panel>

        <!--Блок цели-->
        <div class="panel">
          <div class="panel__body panel__body_padding_small">

            <div class="user-side-panel">
              <div class="user-side-panel__title"> Цель</div>
            </div>

          </div>
          <div class="panel__body panel__body_no_padding">

            <div class="profile-goal">
              <div class="profile-goal__block profile-goal__block_a">100 000 ₽</div>
              <div class="profile-goal__block profile-goal__block_b">200 000 ₽</div>
            </div>

          </div>
        </div>

        <!--Блок социальной активности-->
        <div class="panel">
          <div class="panel__body panel__body_padding_small">
            
            <div class="user-side-panel">
              <div class="user-side-panel__title">Группы</div>

              <div class="user-side-panel__body">
                <div class="followers-tiles">
                  
                  <a class="followers-tiles__item" href="#">
                    <div class="followers-tiles__image" data-name="Степан Юринов" />
                  </a>
                  <a class="followers-tiles__item" href="#">
                    <div class="followers-tiles__image" data-name="Степан Юринов" />
                  </a>
                  <a class="followers-tiles__item" href="#">
                    <div class="followers-tiles__image" data-name="Степан Юринов" />
                  </a>
                  <a class="followers-tiles__item" href="#">
                    <div class="followers-tiles__image" data-name="Степан Юринов" />
                  </a>
                  <a class="followers-tiles__item" href="#">
                    <div class="followers-tiles__image" data-name="Степан Юринов" />
                  </a>
                  <a class="followers-tiles__item" href="#">
                    <div class="followers-tiles__image" data-name="Степан Юринов" />
                  </a>
                  
                </div>
              </div>

            </div>

          </div>
        </div>

        <!--Блок группы-->
        <div class="panel">
          <div class="panel__body panel__body_padding_small">
            <div class="user-side-panel">
              
              <h6 class="user-side-panel__title">Группы</h6>
              <div class="user-side-panel__body">
                <div class="user-groups">

                  <a class="user-groups__item" href="#" v-for="i in 4">
                    <img class="user-groups__image" src="#" alt="" />
                    <span class="user-groups__link" href="#">Десятка ололо</span>
                  </a>

                </div>
              </div>

            </div>
          </div>
        </div>

        <!--Блок могу/ищу-->
        <div class="panel">
          <div class="panel__body panel__body_padding_small" />
        </div>

      </div>
      <div class="user-page__content-block user-page__content-block_body">
        <slot />
      </div>
    </div>
    
  </div>
</template>

<script>
  import panel from '../panel'

  export default {
    components: { panel }
  }
</script>
