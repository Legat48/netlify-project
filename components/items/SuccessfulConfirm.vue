<template>
  <div class="result">
    <svg
      class="result__icon"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.05 29.1L31.2 14.95L28.9 12.7L17.05 24.55L11.05 18.55L8.8 20.8L17.05 29.1ZM20 40C17.2667 40 14.6833 39.475 12.25 38.425C9.81667 37.375 7.69167 35.9417 5.875 34.125C4.05833 32.3083 2.625 30.1833 1.575 27.75C0.525 25.3167 0 22.7333 0 20C0 17.2333 0.525 14.6333 1.575 12.2C2.625 9.76667 4.05833 7.65 5.875 5.85C7.69167 4.05 9.81667 2.625 12.25 1.575C14.6833 0.525 17.2667 0 20 0C22.7667 0 25.3667 0.525 27.8 1.575C30.2333 2.625 32.35 4.05 34.15 5.85C35.95 7.65 37.375 9.76667 38.425 12.2C39.475 14.6333 40 17.2333 40 20C40 22.7333 39.475 25.3167 38.425 27.75C37.375 30.1833 35.95 32.3083 34.15 34.125C32.35 35.9417 30.2333 37.375 27.8 38.425C25.3667 39.475 22.7667 40 20 40ZM20 37C24.7333 37 28.75 35.3417 32.05 32.025C35.35 28.7083 37 24.7 37 20C37 15.2667 35.35 11.25 32.05 7.95C28.75 4.65 24.7333 3 20 3C15.3 3 11.2917 4.65 7.975 7.95C4.65833 11.25 3 15.2667 3 20C3 24.7 4.65833 28.7083 7.975 32.025C11.2917 35.3417 15.3 37 20 37Z" fill="#07B021" />
    </svg>
    <div class="result__title">
      Успешно добавлено
    </div>
  </div>
</template>

<script>
export default {
  computed: {
  }
}
</script>

<style lang='scss' scoped>
.result {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    gap: 10px;
    background-color: #fff;
    &__title {
      display: flex;
      flex-direction: column;
      font-weight: 600;
      font-size: sizeIncr(20, 28);
      line-height: 160%;
      color: var(--color-text-1);
    }
    &__icon {
      width:sizeIncr(40, 60);
      height:sizeIncr(40, 60);
    }
    &__text {
      display: flex;
      flex-direction: column;
      margin-bottom: sizeIncr(32, 40);
      font-size: sizeIncr(14, 18);
      line-height: 120%;
      color: var(--color-text-1);

    }

}
</style>
