<template>
  <div class="wrap">
    <div class="wrap__top-wrap">
      <div class="wrap__title">
        <svg
          class="wrap__title-icon"
          width="20.000000"
          height="20.000000"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs />
          <path
            id="Vector"
            d="M9 0L9 20C3.92 19.5 0 15.21 0 10C0 4.78 3.92 0.5 9 0ZM11.03 0L11.03 8.98L20 8.98C19.53 4.25 15.76 0.46 11.03 0ZM11.03 11.01L11.03 20C15.77 19.53 19.53 15.75 20 11.01L11.03 11.01Z"
            fill="#323232"
            fill-opacity="1.000000"
            fill-rule="nonzero"
          />
        </svg>
        Статистика за последние сутки
      </div>
    </div>
    <div class="wrap__sub-title">
      Общая статистика
    </div>
    <div v-if="$store.getters['userStat/getStat'].length > 0" class="wrap__bot-wrap">
      <BaseStatLabelInfo :label-arr="$store.getters['userStat/getStat']" />
    </div>
    <div class="wrap__sub-title">
      Статистика по пользователям
    </div>
    <UserStatRows />
    <!-- <UserStat /> -->
    <!-- <div class="wrap__bot-wrap">
      <BaseBarChart :options="userArr" />
    </div> -->
    <!-- <div v-else class="wrap__bot-wrap">
      <PreLoaded />
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: false,
      selectedUser: 0,
      stat: [],
      userArr: [
        {
          name: 'GETCURRENTSTAT',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: 'GETBOFDATA',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      loading: false
    }
  },
  computed: {
    optionsUser () {
      const arr = []
      let id = 0
      if (this.$store.getters['userStat/getInfo']) {
        for (const [key, value] of Object.entries(this.$store.getters['userStat/getInfo'])) {
          arr.push({
            id: id++,
            name: key,
            valueUser: value
          })
        }
      }
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  // gap: 15px;
  min-width: calc(100vw - 125px);
  min-height: 782px;

  &__top-wrap {
    position: sticky;
    inset: 0 0 auto 0;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 30px;
    border-bottom: 3px solid var(--color-border-1);
    padding: 0 15px;
    height: 80px;
    min-height: 80px;
    background-color: var(--color-bg-white-1);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 12px;
    min-height: 52px;
    font-size: 28px;
    font-weight: 700;
    color: var(--color-text-1);
  }

  &__sub-title {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-left: 10px;
    min-height: 52px;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text-1);
  }

  &__title-icon {
    width: 28px;
    height: 28px;
  }

  &__bot-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@keyframes shake {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(-5px, 0);
  }

  50% {
    transform: translate(5px, 0);
  }

  75% {
    transform: translate(-5px, 0);
  }

  100% {
    transform: translate(5px, 0);
  }
}

.base-select {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border-radius: 4px;
  border: 2px solid var(--color-border-1);
  width: 180px;
  padding: 0px 12px;
  height: 40px;
  font-weight: 500;
  background-color: var(--color-btn-white-1);
  @include transition;
  cursor: text;

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  path {
    fill: var(--color-border-1);
  }

  &:focus-within {
    border: 2px solid var(--color-border-3);

    .table__label-input,
    .table__label-title {
      color: var(--color-border-3);
    }

    path {
      fill: var(--color-border-3);
    }
  }

  &__title {
    position: absolute;
    inset: -10px auto auto 6px;
    z-index: 2;
    padding: 0 4px;
    font-size: 12px;
    font-weight: 500;
    background-color: var(--color-text-white-1);
    color: var(--color-border-1);
    @include transition;
  }

  &__select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    border-radius: 5px;
    background-color: var(--color-bg-white-1);
  }
}
</style>

<style lang="scss">
.wrap {
  .v-treeview-node__root {
    min-height: 25px !important;
  }
}
</style>
