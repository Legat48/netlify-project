<template>
  <table v-if="!preload" class="table">
    <thead>
      <tr class="table__row table__row_header">
        <template v-if="content && switchTable === 0">
          <th
            v-for="(header, index) of headersBatches"
            :key="`header${header.key}${index}`"
            v-ripple
            class="table__item table__item_header"
            @mousedown="moveStart(header.key)"
            @mouseup="moveStop(header.key)"
          >
            {{ header.name }}
          </th>
        </template>
        <template v-if="content && switchTable === 1">
          <th
            v-for="(header, index) of headersMaterials"
            :key="`header${header.key}${index}`"
            v-ripple
            class="table__item table__item_header"
            @mousedown="moveStart(header.key)"
            @mouseup="moveStop(header.key)"
          >
            {{ header.name }}
          </th>
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-if="content && switchTable === 0">
        <tr v-for="(row, indexRow) of content" :key="`row${indexRow}`" v-ripple class="table__row" @click="!$event.target.classList.contains('table__item-btn_copy') && openBatchesModal(row)">
          <td v-for="(item, indexItem) of headersBatches" :key="`item${indexItem}`" class="table__item">
            <div class="table__item-content">
              <svg
                v-if="$store.getters.userEditor && indexItem === 0"
                v-ripple
                class="table__item-btn table__item-btn_copy btn"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="copiBatchesModal(row)"
              >
                <path d="M19 4H7C5.9 4 5 4.9 5 6V20H7V6H19V4ZM22 8H11C9.9 8 9 8.9 9 10V24C9 25.1 9.9 26 11 26H22C23.1 26 24 25.1 24 24V10C24 8.9 23.1 8 22 8ZM22 24H11V10H22V24Z" fill="white" />
              </svg>
              <div v-if="item.key === 'fill_factor'" class="table__text">
                {{ row[`${item.key}`] * 100 }}%
              </div>
              <div
                v-if="item.key === 'status'"
                class="table__status"
                :class="{
                  'table__status_1': row[`${item.key}`] === 'I',
                  'table__status_2': row[`${item.key}`] === 'C',
                  'table__status_3': row[`${item.key}`] === 'F' || row[`${item.key}`] === null,
                }"
              >
                {{ row[`${item.key}`] === 'I' ? 'Исп.' : row[`${item.key}`] === 'C' ? 'Изр.' : 'Отм.' }}
              </div>
              <div v-if="item.key === 'date_create' || item.key === 'date_edit'" class="table__text">
                {{ createdDate(row[`${item.key}`]) }}
              </div>
              <div v-if="item.key !== 'fill_factor' && item.key !== 'status' && item.key !== 'date_create' && item.key !== 'date_edit'" class="table__text">
                {{ row[`${item.key}`] }}
              </div>
              <svg
                v-if="$store.getters.userEditor && indexItem === headersBatches.length - 1"
                v-ripple
                class="table__item-btn btn"
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.27905 20.25V24H10.0291L21.0891 12.94L17.3391 9.19L6.27905 20.25ZM23.989 10.04C24.3791 9.65 24.3791 9.02 23.989 8.63L21.6491 6.29C21.2591 5.9 20.6291 5.9 20.2391 6.29L18.4091 8.12L22.1591 11.87L23.989 10.04Z" fill="white" />
              </svg>
            </div>
          </td>
        </tr>
      </template>

      <template v-if="content && switchTable === 1">
        <tr
          v-for="(row, indexRow) of content"
          :key="`row${indexRow}`"
          v-ripple
          class="table__row"
          :class="{'table__row_disabled': !$store.getters.userEditor}"
          @click="!$event.target.classList.contains('table__item-btn_copy') && openMaterialModal(row)"
        >
          <td v-for="(item, indexItem) of headersMaterials" :key="`item${indexItem}`" class="table__item">
            <div class="table__item-content">
              <svg
                v-if="$store.getters.userEditor && indexItem === 0"
                v-ripple
                class="table__item-btn table__item-btn_copy btn"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="copiMaterialModal(row)"
              >
                <path d="M19 4H7C5.9 4 5 4.9 5 6V20H7V6H19V4ZM22 8H11C9.9 8 9 8.9 9 10V24C9 25.1 9.9 26 11 26H22C23.1 26 24 25.1 24 24V10C24 8.9 23.1 8 22 8ZM22 24H11V10H22V24Z" fill="white" />
              </svg>
              <div v-if="item.key === 'fill_factor'" class="table__text">
                {{ row[`${item.key}`] * 100 }}%
              </div>
              <div v-if="item.key === 'date_create' || item.key === 'date_edit'" class="table__text">
                {{ createdDate(row[`${item.key}`]) }}
              </div>
              <div
                v-if="item.key === 'usage_tag'"
                class="table__status "
                :class="{
                  'table__status_1': row[`${item.key}`] === 1,
                  'table__status_2': row[`${item.key}`] !== 1
                }"
              >
                {{ row[`${item.key}`] === 1 ? 'Исп.' : 'Отм.' }}
              </div>
              <div v-if="item.key !== 'fill_factor' && item.key !== 'date_create' && item.key !== 'usage_tag' && item.key !== 'date_edit'" class="table__text">
                {{ row[`${item.key}`] }}
              </div>
              <svg
                v-if="$store.getters.userEditor && indexItem === headersMaterials.length - 1"
                v-ripple
                class="table__item-btn btn"
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.27905 20.25V24H10.0291L21.0891 12.94L17.3391 9.19L6.27905 20.25ZM23.989 10.04C24.3791 9.65 24.3791 9.02 23.989 8.63L21.6491 6.29C21.2591 5.9 20.6291 5.9 20.2391 6.29L18.4091 8.12L22.1591 11.87L23.989 10.04Z" fill="white" />
              </svg>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
import { createdDate } from '~/helpers/createdDate'
export default {
  name: 'TableTable',
  props: {
    type: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data () {
    return {
      startId: '',
      preload: false,
      isDraggbleColumn: null,
      defaultHeadersBatches: [
        {
          key: 'batch_no',
          name: '№ партии'
        },
        // {
        //   key: 'unit_name',
        //   name: 'Агрегат'
        // },
        {
          key: 'mat_name',
          name: 'Материал'
        },
        {
          key: 'status',
          name: 'Статус'
        },
        {
          key: 'wght',
          name: 'Вес кг.'
        },
        // {
        //   key: 'wght_rem',
        //   name: 'Остат. вес кг.'
        // },
        {
          key: 'len',
          name: 'Длина м.'
        },
        // {
        //   key: 'len_rem',
        //   name: 'Остат. длина м.'
        // },
        {
          key: 'fill_factor',
          name: 'Коэффициент наполнения'
        },
        {
          key: 'run_meter_wght',
          name: 'Масса проволоки кг/м. '
        },
        {
          key: 'run_meter_wght_fill',
          name: 'Масса наполнителя кг/м.'
        },
        {
          key: 'type_name',
          name: 'Тип материала'
        },
        {
          key: 'comment',
          name: 'Примечание'
        },
        {
          key: 'date_create',
          name: 'Дата создания'
        },
        {
          key: 'date_edit',
          name: 'Дата изменения'
        },
        {
          key: 'edit_author',
          name: 'Автор'
        }
      ],
      defaultHeadersMaterials: [
        {
          key: 'abbr',
          name: 'Материал'
        },
        {
          key: 'name',
          name: 'Полное наименование'
        },
        {
          key: 'cost',
          name: 'Цена за единицу'
        },
        // {
        //   key: 'unit_group_name',
        //   name: 'Группа агрегатов'
        // },
        {
          key: 'run_meter_wght_min',
          name: 'Минимальная масса погонного метра проволоки кг/м '
        },
        {
          key: 'run_meter_wght_max',
          name: 'Максимальная масса погонного метра проволоки, кг/м.'
        },
        {
          key: 'usage_tag',
          name: 'Признак использования'
        },
        {
          key: 'type_name',
          name: 'Тип материала'
        },
        {
          key: 'edit_author',
          name: 'Автор'
        },
        {
          key: 'date_create',
          name: 'Дата создания'
        },
        {
          key: 'date_edit',
          name: 'Дата изменения'
        }
      ]

    }
  },
  computed: {
    switchTable () {
      return this.$store.getters.getSwitch
    },
    headersBatches () {
      if (typeof (localStorage) === 'object') {
        const storedHeaders = localStorage.getItem('headersBatchesTable')
        if (storedHeaders && storedHeaders.length === this.defaultHeadersBatches.length) {
          return JSON.parse(storedHeaders)
        }
        return this.defaultHeadersBatches
      } else {
        // Если заголовки отсутствуют в LocalStorage, используйте заголовки по умолчанию
        return this.defaultHeadersBatches
      }
    },
    headersMaterials () {
      if (typeof (localStorage) === 'object') {
        const storedHeaders = localStorage.getItem('headersMaterialsTable')
        if (storedHeaders && storedHeaders.length === this.defaultHeadersMaterials.length) {
          return JSON.parse(storedHeaders)
        }
        return this.defaultHeadersMaterials
      } else {
        // Если заголовки отсутствуют в LocalStorage, используйте заголовки по умолчанию
        return this.defaultHeadersMaterials
      }
    },
    content () {
      if (this.switchTable === 0) {
        return this.$store.getters.getFilterBatches
      } else if (this.switchTable === 1) {
        return this.$store.getters.getFilterMaterials
      } else { // на будущее
        return this.$store.getters.getFilterMaterials
      }
    }
  },
  mounted () {
  },
  methods: {
    createdDate (date) {
      return createdDate(date)
    },
    moveStop (key) {
      this.preload = true
      if (this.switchTable === 0) {
        if (key && this.startId && key !== this.startId) {
          const index1 = this.headersBatches.findIndex(e => e.key === this.startId)
          const index2 = this.headersBatches.findIndex(e => e.key === key)
          if (index1 !== -1 && index2 !== -1) {
            const temp = this.headersBatches[index1]
            this.headersBatches[index1] = this.headersBatches[index2]
            this.headersBatches[index2] = temp
          }
        }
      } else if (this.switchTable === 1) {
        if (key && this.startId && key !== this.startId) {
          const index1 = this.headersMaterials.findIndex(e => e.key === this.startId)
          const index2 = this.headersMaterials.findIndex(e => e.key === key)
          if (index1 !== -1 && index2 !== -1) {
            const temp = this.headersMaterials[index1]
            this.headersMaterials[index1] = this.headersMaterials[index2]
            this.headersMaterials[index2] = temp
          }
        }
      } else if (this.switchTable !== 1 && this.switchTable !== 0) { // на будущее
        if (key && this.startId && key !== this.startId) {
          const index1 = this.headersMaterials.findIndex(e => e.key === this.startId)
          const index2 = this.headersMaterials.findIndex(e => e.key === key)
          if (index1 !== -1 && index2 !== -1) {
            const temp = this.headersMaterials[index1]
            this.headersMaterials[index1] = this.headersMaterials[index2]
            this.headersMaterials[index2] = temp
          }
        }
      }
      localStorage.setItem('headersMaterialsTable', JSON.stringify(this.headersMaterials))
      localStorage.setItem('headersBatchesTable', JSON.stringify(this.headersBatches))

      this.preload = false
      this.startId = ''
    },
    moveStart (key) {
      this.startId = key
    },
    openMaterialModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: 'Редактировать материал',
        icon: 'edit',
        type: 'material',
        id: item.id,
        copyID: '',
        fix: true,
        obgUnit: {
          optionsMatType: true,
          inputMaterialName: true,
          inputMaterialFullName: true,
          inputWeightMeterMin: true,
          inputWeightMeterMax: true,
          inputСost: true,
          optionsUsageTag: true
        }
      }
      this.$store.commit('setDialog', data)
    },
    openBatchesModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: 'Редактировать партию',
        icon: 'edit',
        type: 'batch',
        id: item.id,
        fix: true,
        copyID: '',
        obgUnit: {
          optionsMaterial: true,
          optionsStatus: true,
          // optionsAggregate: true,
          inputPathNumber: true,
          inputPathWeight: true,
          inputBatchLength: true,
          inputWeightMeterWire: true,
          inputWeightMeterFiller: true,
          inputComment: true,
          inputFillingFactor: true
        }
      }
      this.$store.commit('setDialog', data)
    },
    copiMaterialModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: `Копировать материал ${item.name}`,
        icon: 'copy',
        type: 'material',
        id: item.id,
        copyID: '',
        obgUnit: {
          optionsMatType: true,
          inputMaterialName: true,
          inputMaterialFullName: true,
          inputWeightMeterMin: true,
          inputWeightMeterMax: true,
          inputСost: true,
          optionsUsageTag: true

        }
      }
      this.$store.commit('setDialog', data)
    },
    copiBatchesModal (item) {
      // настройки модального окна при открытии
      const data = {
        title: `Копировать партию ${item.unit_name}`,
        icon: 'copy',
        type: 'batch',
        id: item.id,
        copyID: '',
        obgUnit: {
          optionsMaterial: true,
          optionsStatus: true,
          // optionsAggregate: true,
          inputPathNumber: true,
          inputPathWeight: true,
          inputBatchLength: true,
          inputWeightMeterWire: true,
          inputWeightMeterFiller: true,
          inputComment: true,
          inputFillingFactor: true
        }
      }
      this.$store.commit('setDialog', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  max-height: calc(100vh - var(--height-header) - 110px);
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  border-collapse: collapse;
  font-size: sizeIncr(12, 14);
  &__row {
    height: 60px;
    border-bottom: 1px solid var(--color-border-1);
    cursor: pointer;
    &:hover {
      background-color: var(--color-bg-white-1);
    }
    &:active {
        background-color: var(--color-bg-white-1);
    }
    &_disabled {
      pointer-events: none;
    }
    &_header {
      position: sticky;
      inset: 0 0 auto 0;
      z-index: 3;
      font-weight: 500;
      border-bottom: 2px solid var(--color-border-1);
      background-color: #fff;
      &:hover {
        background-color: var(--color-bg-white-1);
      }
      &:active {
        background-color: var(--color-bg-white-1);
      }
    }
  }
  &__item {
    height: 60px;
    padding: 5px sizeIncr(5, 10) ;
    &_header {
      user-select: none;
      cursor: grab;
      text-align: left;
      @include transition;
      &:hover {
        background-color: var(--color-bg-1);
      }
      &:active {
        background-color: var(--color-border-1);
      }
    }
  }
  &__item-btn {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    background-color: var(--color-btn-1);
    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 3px var(--color-btn-1);
    }
    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
  }

  &__item-content {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
  }
  &__status {
    border-radius: 7px;
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
}
</style>
