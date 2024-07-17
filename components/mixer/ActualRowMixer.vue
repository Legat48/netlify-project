<template>
  <div class="table">
    <thead>
      <tr class="table__row table__row_header">
        <th class="card-mixer__label">
          <div class="card-mixer__label-title">
            {{ "Темп. налива" }}
          </div>
          <input v-if="edit" :value="arr.valueTemp" class="card-mixer__label-input">
          <div v-else class="card-mixer__ext">
            {{ arr.valueTemp }}
          </div>
        </th>
        <th class="card-mixer__label">
          <div class="card-mixer__label-title">
            {{ "Номер налива" }}
          </div>
          <input v-if="edit" :value="arr.lotNumberCurrent" class="card-mixer__label-input">
          <div v-else class="card-mixer__ext">
            {{ arr.lotNumberCurrent }}
          </div>
        </th>
        <th class="card-mixer__label">
          <div class="card-mixer__label-title">
            {{ "Номер ковша" }}
          </div>
          <input v-if="edit" :value="arr.ladleNumberCurrent" class="card-mixer__label-input">
          <div v-else class="card-mixer__ext">
            {{ arr.ladleNumberCurrent }}
          </div>
        </th>
      </tr>
      <th class="card-mixer__label card-mixer__label_time">
        <div class="card-mixer__label-title">
          {{ "Время замера" }}
        </div>
        <input v-if="edit" :value="arr.lotTempTimeCurrent" class="card-mixer__label-input">
        <div v-else class="card-mixer__ext">
          {{ timeHMS(arr.lotTempTimeCurrent) }}
        </div>
      </th>
    </thead>
  </div>
</template>
<script>

import { createdDate } from '~/helpers/createdDate'
import { timeHMS } from '~/helpers/timeHMS'

export default {
  data () {
    return {
      editableRow: null,
      edits: {}
    }
  },
  computed: {
    arr () {
      return this.$store.getters['mixer/getArr']
    }
  },
  methods: {
    timeHMS (value) {
      return timeHMS(value, true)
    },
    toggleEdit (indexRow, row) {
      if (this.editableRow === indexRow) {
        this.saveAllEdits(indexRow)
        this.editableRow = null
      } else {
        this.edits = {}
        // Обходим только те типы, которые существуют в строке данных
        ;['type1', 'type2', 'type3', 'type4'].forEach((type) => {
          if (row[type]) {
            Object.keys(row[type]).forEach((subKey) => {
              this.edits[`${indexRow}-${type}-${subKey}`] = row[type][subKey]
            })
          }
        })
        this.editableRow = indexRow
      }
    },
    saveEdits (indexRow, key, subKey) {
      this.$store.commit('mixer/setArrValue', {
        index: indexRow,
        key: `${key}.${subKey}`,
        value: this.edits[`${indexRow}-${key}-${subKey}`]
      })
    },
    saveAllEdits (indexRow) {
      ['type1', 'type2', 'type3', 'type4'].forEach((key) => {
        if (this.arr[indexRow][key]) {
          Object.keys(this.arr[indexRow][key]).forEach((subKey) => {
            this.saveEdits(indexRow, key, subKey)
          })
        }
      })
    },
    createdDate (date) {
      return createdDate(date)
    },
    getUnit (subIndex) {
      const units = {
        lotNumber: {
          dimension: '',
          title: 'Номер налива'
        }
      }
      return units[subIndex] || ''
    },
    copyData (sourceIndex, targetIndex, key) {
      const source = this.arr[sourceIndex][key]
      this.$store.commit('mixer/setArrValue', { index: targetIndex, key, value: { ...source } })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  border-collapse: collapse;
  font-size: 18px;
  width: 380px;
  padding-top: 10px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  margin: 10px auto auto auto;
  align-items: center;
  &__row {
    display: flex;
    min-height: 35px;
    border-bottom: 5px solid var(--color-border-1);
    cursor: pointer;
    @include transition;

    // &:hover {
    //   background-color: var(--color-bg-2);
    //   .table__label-title {
    //     background-color: var(--color-bg-2);
    //   }
    // }

    &:active {
      background-color: var(--color-bg-white-1);
      .table__label-title {
        background-color: var(--color-bg-white-1);
      }
    }

    &_disabled {
      pointer-events: none;
    }

    &_header {
      position: sticky;
      inset: -1px 0 auto 0;
      z-index: 3;
      border-bottom: 0px solid var(--color-border-1);
      font-weight: 500;
      gap: 10px;
      background-color: #fff;
      cursor: auto;
    }

    &_update {
      background-color: var(--color-update);
    }
  }
  &__item {
    position: relative;
    min-height: 60px;
    padding: 10px 5px;
    &::before {
      content: '';
      position: absolute;
      inset: auto 0 0 0;
      height: 2px;
      background-color: var(--color-border-1);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0 0 0 auto;
      width: 1px;
      background-color: var(--color-border-1);
      opacity: 0.3;
    }
    &_header {
      user-select: none;
      text-align: left;
      pointer-events: none;
      @include transition;

      &:hover {
        background-color: var(--color-bg-1);
      }

      &:active {
        background-color: var(--color-border-1);
      }
    }
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    border-radius: 4px;
    height: 40px;
    white-space: nowrap;
    font-weight: 500;
    font-size: 18px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    box-shadow: 2px 3px 4px 0px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    @include transition;
    path {
      fill: var(--color-text-white-1) !important;
    }
  }

  &__btn.error {
    border-color: #ff0000 !important;
    color: #ff0000 !important;
    background-color: transparent !important;
    box-shadow: 0 0 0 4px #ff0000 !important;
    animation: shake 0.5s infinite;
  }

  &__item-content {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;

  &_group {
      min-width: 145px;
    }
  &__wrap-btn {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 6px 12px 12px 12px;
    border-top: 3px solid var(--color-border-1);
    gap: 12px;
  }
  }

  &__text {
    max-width: 170px;
    font-size: 18px;
    font-weight: 500;
    overflow: auto;
  }

  &__status {
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 7px;
    font-weight: 500;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);

    &_1 {
      background-color: var(--color-no-error);
    }

    &_2 {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-2);
    }

    &_3 {
      color: var(--color-text-white-1);

      background-color: var(--color-error);
    }
  }
  &__wrap-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 5px;
    width: 100%;
  }
  &__label {
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
      .table__label-title  {
        color: var(--color-border-3);
      }

      path {
        fill: var(--color-border-3);
      }
    }
  }

  &__label-title {
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

  &__search-svg {
    position: relative;
    z-index: 3;
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
  }

  &__label-input {
    text-align: left;
    font-size: 16px;
    color: var(--color-text-1);
    cursor: text;
  }
}
</style>
