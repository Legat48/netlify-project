<template>
  <div class="header">
    <div class="header__wrap">
      <div class="header__version">
        v.1.0.1
      </div>
      <div class="header__logo">
        <BaseLogo
          class="header__logo-icon"
        />
        {{ $store.getters['header/getHeaderTitle'] }}
      </div>
      <div class="header__options">
        <!-- <div class="header__btn btn deactive">
          <svg
            class="header__btn-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_3_845)">
              <path d="M12 5.9C13.16 5.9 14.1 6.84 14.1 8C14.1 9.16 13.16 10.1 12 10.1C10.84 10.1 9.9 9.16 9.9 8C9.9 6.84 10.84 5.9 12 5.9ZM12 14.9C14.97 14.9 18.1 16.36 18.1 17V18.1H5.9V17C5.9 16.36 9.03 14.9 12 14.9ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13Z" fill="#323232" />
            </g>
            <defs>
              <clipPath id="clip0_3_845">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {{ $store.getters.getUser && $store.getters.getUser.userName ? $store.getters.getUser.userName : $store.getters.getUser ? 'Авторизован' :'Не авторизован' }}
        </div> -->
        <button v-if="$store.getters.getUser" v-ripple class="header__btn btn" @click.prevent="unlog()">
          <svg
            class="header__btn-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="19"
            viewBox="0 0 17 19"
            fill="none"
          >
            <path d="M1.8 18.48C1.3 18.48 0.8752 18.2873 0.5256 17.9018C0.1752 17.5173 0 17.05 0 16.5V1.98C0 1.43 0.1752 0.96272 0.5256 0.57816C0.8752 0.19272 1.3 0 1.8 0H8.4V1.98H1.8V16.5H8.4V18.48H1.8ZM12.6 13.86L11.3256 12.4582L13.35 10.23H6V8.25H13.35L11.3256 6.02184L12.6 4.62L16.8 9.24L12.6 13.86Z" fill="#3FA6FA" />
          </svg>
          Выход
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    block: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    unlog () {
      this.$store.dispatch('fetchUnlogin')
      this.$store.commit('setUser', null)
      localStorage.removeItem('user')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--color-bg-white-1);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  &__wrap {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 45px;
    height: 100%;
    width: 100%;
    max-width: #{$maxvw}px;
  }
  &__version {
    position: absolute;
    inset: 4px auto auto 4px;
    z-index: 11;
    display: flex;
    align-items: center;
    padding: 1px 5px;
    border-radius: 5px;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
  }
  &__logo {
    display: flex;
    align-items: center;
    font-size: 36px;
    font-weight: 700;
    color: var(--color-text-1);
  }
  &__logo-icon {
    margin-right: 8px;
    width: 109px;
    height: 50px;
  }
  &__options {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &__btn {
    display: flex;
    align-items: center;
    margin-right: 10px;
    padding: 5px;
    height: 100%;
    border-radius: 7px;
    overflow: hidden;
    font-size: 18px;
    color: var(--color-text-1);
    @include transition;
    &:hover,
    &:focus,
    &:active {
      color: var(--color-active);
    }
  }
  &__btn-icon {
    margin-right: 5px;
    width: 24px;
    height: 24px;
  }
}
</style>
