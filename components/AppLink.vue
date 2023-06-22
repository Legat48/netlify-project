<template>
  <div class="app-link">
    <div class="app-link__title">
      Перейти к приложению
    </div>
    <div class="app-link__wrap">
      <a
        href="https://play.google.com/store/apps/details?id=com.ranks.analitika"
        class="app-link__btn app-link__btn_google"
      />
      <a
        href="https://apps.apple.com/us/app/ranks-analytics-stock-market/id1638369295"
        class="app-link__btn app-link__btn_apple"
      />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.app-link {
  display: flex;
  flex-direction: column;
  &__title {
    margin-bottom: 16px;
    font-weight: 500;
    font-size: sizeIncr(16, 20);
    line-height: 120%;
    color: var(--color-text-1) !important;

  }
  &__wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &__btn {
    border-radius: 10px;
    overflow: hidden;
    width: 48%;
    height: sizeIncr(60, 80);
    background-repeat: no-repeat;
    background-size: contain;
    &_apple {
      background-image: url('@/assets/images/apple-link.svg');
    }
    &_google {
      background-image: url('@/assets/images/google-link.svg');
    }
  }
}
</style>
