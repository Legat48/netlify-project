<template>
  <div class="switch">
    <button v-ripple class="switch__btn btn" :class="{'switch__btn_active': $store.getters.getSwitch === 0}" @click="$store.commit('setSwitch', 0)">
      <svg
        class="switch__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
      >
        <path d="M25.8334 10.3334H21.9584V5.16669H3.87502C2.45419 5.16669 1.29169 6.32919 1.29169 7.75002V21.9584H3.87502C3.87502 24.1025 5.60585 25.8334 7.75002 25.8334C9.89419 25.8334 11.625 24.1025 11.625 21.9584H19.375C19.375 24.1025 21.1059 25.8334 23.25 25.8334C25.3942 25.8334 27.125 24.1025 27.125 21.9584H29.7084V15.5L25.8334 10.3334ZM7.75002 23.8959C6.67794 23.8959 5.81252 23.0304 5.81252 21.9584C5.81252 20.8863 6.67794 20.0209 7.75002 20.0209C8.8221 20.0209 9.68752 20.8863 9.68752 21.9584C9.68752 23.0304 8.8221 23.8959 7.75002 23.8959ZM25.1875 12.2709L27.7192 15.5H21.9584V12.2709H25.1875ZM23.25 23.8959C22.1779 23.8959 21.3125 23.0304 21.3125 21.9584C21.3125 20.8863 22.1779 20.0209 23.25 20.0209C24.3221 20.0209 25.1875 20.8863 25.1875 21.9584C25.1875 23.0304 24.3221 23.8959 23.25 23.8959Z" fill="#323232" />
      </svg>
      Партии
    </button>
    <button v-ripple class="switch__btn btn" :class="{'switch__btn_active': $store.getters.getSwitch === 1}" @click="$store.commit('setSwitch', 1)">
      <svg
        class="switch__icon"
        xmlns="http://www.w3.org/2000/svg"
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
      >
        <path d="M15.5 2.58337L8.39587 14.2084H22.6042L15.5 2.58337Z" fill="#323232" />
        <path d="M22.6041 28.4166C25.8143 28.4166 28.4166 25.8143 28.4166 22.6041C28.4166 19.394 25.8143 16.7916 22.6041 16.7916C19.394 16.7916 16.7916 19.394 16.7916 22.6041C16.7916 25.8143 19.394 28.4166 22.6041 28.4166Z" fill="#323232" />
        <path d="M3.875 17.4375H14.2083V27.7708H3.875V17.4375Z" fill="#323232" />
      </svg>
      Материалы
    </button>
  </div>
</template>

<script>
export default {
  name: 'TableSwitch'
}
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  align-items: center;
  gap: sizeIncr(10, 20);
  color: var(--color-text-1);
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    width: sizeIncr(160, 310);
    height: sizeIncr(90, 105);
    font-weight: 500;
    font-size: sizeIncr(18, 26);
    background-color: var(--color-btn-deactive-1);
    box-shadow: 2px 4px 4px 0px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    @include transition;
    &_active {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1);
      .switch__icon path {
        fill: var(--color-text-white-1)
      }
    }
  }
  &__icon {
    margin-right: sizeIncr(10, 15);
    width: sizeIncr(21, 31);
    height: sizeIncr(21, 31);
    pointer-events: none;
    path {
      @include transition;
    }
  }
}
</style>
