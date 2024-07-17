<template>
  <div class="wrap">
    <div v-for="(item, index) of stat" :key="index" class="wrap__row">
      <BaseStatLabelInfo :label-arr="item" />
    </div>
  </div>
</template>

<script>
import { timeHMS } from '~/helpers/timeHMS'
import numberFormat from '~/helpers/numberFormat'
export default {
  data () {
    return {
      error: false,
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.getters['userStat/getUser']
    },
    optionsUser () {
      return this.$store.getters['userStat/getOptionsUser']
    },
    stat () {
      const arr = []
      this.optionsUser.forEach((e) => {
        let totalCalls = 0
        let totalMethod = 0
        const methodArr = []
        e.valueUser.called_methods.forEach((j) => {
          for (const [itemKeys, itemValue] of Object.entries(j)) {
            if (itemKeys.includes('call') && itemValue) {
              totalCalls = totalCalls + itemValue
            } else if (itemKeys === 'method_name' && !methodArr.find(i => i === itemValue)) {
              totalMethod++
              methodArr.push(itemValue)
            }
          }
        })
        let methodString = ''
        methodArr.forEach((e) => {
          methodString = `${methodString} ${e}`
        })
        const timeHMS = e.valueUser.last_ts ? `в ${this.timeHMS(e.valueUser.last_ts)}` : ''
        arr.push([
          {
            title: 'Имя пользователя',
            maxWight: 210,
            value: e.userName
          },
          {
            title: 'IP пользователя',
            maxWight: 160,
            value: e.name
          },
          {
            title: 'Описание пользователя',
            maxWight: 330,
            value: e.userDescr
          },
          {
            title: 'Всего вызовов',
            maxWight: 120,
            value: this.numberFormat(totalCalls)
          },
          {
            title: 'Всего уникальных методов',
            maxWight: 170,
            value: totalMethod
          },
          {
            title: 'Методы',
            maxWight: 200,
            value: methodString
          },
          {
            title: 'Ошибок вызова',
            maxWight: 120,
            value: e.valueUser.total_invalid_calls
          },
          {
            title: 'Последний вызов',
            maxWight: 190,
            value: timeHMS
          }]
        )
      })
      return arr
    }
  },
  watch: {
  },
  mounted () {
    if (this.optionsUser.find(e => e.id === this.selectedUser)) {
      this.updateInfo(this.optionsUser.find(e => e.id === this.selectedUser).valueUser)
    }
  },
  methods: {
    numberFormat (value) {
      return numberFormat(value)
    },
    timeHMS (value) {
      return timeHMS(value, true)
    },
    updateInfo (user) {
      this.stat = []
      let totalCalls = 0
      let totalMethod = 0
      const methodArr = []
      user.called_methods.forEach((e) => {
        for (const [itemKeys, itemValue] of Object.entries(e)) {
          if (itemKeys.includes('call') && itemValue) {
            totalCalls = totalCalls + itemValue
          } else if (itemKeys === 'method_name' && !methodArr.find(e => e === itemValue)) {
            totalMethod++
            methodArr.push(itemValue)
          }
        }
      })
      this.stat = [
        {
          title: 'Имя пользователя',
          value: user.userName
        },
        {
          title: 'Описание пользователя',
          value: user.userDescr
        },
        {
          title: 'Всего вызовов',
          value: totalCalls
        },
        {
          title: 'Всего уникальных методов',
          value: totalMethod
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: calc(100vw - 150px);
  min-height: 782px;

  &__top-wrap {
    position: sticky;
    inset: 0 0 auto 0;
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
