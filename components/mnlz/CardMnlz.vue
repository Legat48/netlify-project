<template>
  <div class="card-mnlz" :class="{'card-mnlz_active': edit}">
    <div class="card-mnlz__title-wrap">
      <div class="card-mnlz__title">
        {{ card.name }}
      </div>
      <div class="card-mnlz__dimension">
        {{ card.dimension }}
        <button
          class="card-mnlz__item-btn card-mnlz__item-btn_submit card-mnlz__item-btn_mla btn"
          :class="{
            'card-mnlz__item-btn_hidden': copyObg !== null,
            'card-mnlz__item-btn_ok': !!edit
          }"
          @click="submit"
        >
          <svg v-if="!edit" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.27905 20.25V24H10.0291L21.0891 12.94L17.3391 9.19L6.27905 20.25ZM23.989 10.04C24.3791 9.65 24.3791 9.02 23.989 8.63L21.6491 6.29C21.2591 5.9 20.6291 5.9 20.2391 6.29L18.4091 8.12L22.1591 11.87L23.989 10.04Z" fill="white" />
          </svg>
          <svg
            v-if="edit"
            class="card-mnlz__submit-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="17.599998"
            height="13.400024"
            viewBox="0 0 17.6 13.4"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path id="Vector" d="M5.6 10.6L1.4 6.4L0 7.79L5.6 13.4L17.6 1.4L16.2 0L5.6 10.6Z" fill="#fff" fill-opacity="1.000000" fill-rule="nonzero" />
          </svg>
        </button>
      </div>
    </div>
    <div class="card-mnlz__wrap">
      <div v-for="(item, index) in card.unitArr" :key="index" class="card-mnlz__wrap-label" :class="{'card-mnlz__wrap-label_ok' : copyObg}">
        <button :class="{'card-mnlz__item-btn_ok' : copyObg, 'card-mnlz__item-btn_hidden': !!edit}" class="card-mnlz__item-btn card-mnlz__item-btn_copy" @click="copyObg === null ? startCopyCardInfo(item) : applyCopyCard(item.id)">
          <svg
            v-if="!copyObg"
            class="card-mnlz__icon-copy"
            width="24.000000"
            height="24.000000"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <clipPath id="clip17_1173">
              <rect id="content_copy" width="24.000000" height="24.000000" fill="white" fill-opacity="0" />
            </clipPath>
            <g clip-path="url(#clip17_1173)">
              <path id="Vector" d="M16 1L4 1C2.9 1 2 1.89 2 3L2 17L4 17L4 3L16 3L16 1ZM19 5L8 5C6.9 5 6 5.89 6 7L6 21C6 22.1 6.9 23 8 23L19 23C20.1 23 21 22.1 21 21L21 7C21 5.89 20.1 5 19 5ZM19 21L8 21L8 7L19 7L19 21Z" fill="white" fill-opacity="1.000000" fill-rule="nonzero" />
            </g>
          </svg>
          <svg
            v-if="copyObg"
            class="card-mnlz__submit-svg"
            width="20.000000"
            height="18.000000"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path id="Icon (Stroke)" d="M8.25 2.07C7.3 2 6.09 2 4.39 2L1 2C0.44 2 0 1.55 0 1C0 0.44 0.44 0 1 0L4.44 0C6.08 0 7.38 0 8.42 0.08C9.48 0.17 10.37 0.35 11.17 0.76C12.49 1.43 13.56 2.5 14.23 3.82C14.64 4.62 14.82 5.51 14.91 6.57C15 7.61 15 8.91 15 10.55L15 14.58L18.29 11.29C18.68 10.9 19.31 10.9 19.7 11.29C20.09 11.68 20.09 12.31 19.7 12.7L14.7 17.7C14.51 17.89 14.26 18 14 18C13.73 18 13.48 17.89 13.29 17.7L8.29 12.7C7.9 12.31 7.9 11.68 8.29 11.29C8.68 10.9 9.31 10.9 9.7 11.29L13 14.58L13 10.6C13 8.9 12.99 7.69 12.92 6.74C12.84 5.8 12.69 5.2 12.45 4.72C11.97 3.78 11.21 3.02 10.27 2.54C9.79 2.3 9.19 2.15 8.25 2.07Z" fill="#fff" fill-opacity="1.000000" fill-rule="evenodd" />
          </svg>
        </button>
        <div class="card-mnlz__sub-title">
          {{ item.title }}
        </div>
        <label v-for="(value, key) in item.units" :key="key" class="card-mnlz__label" :class="{ 'card-mnlz__label_big': checkBig(key), 'card-mnlz__label_switch': value.boolean === 1}">
          <div class="card-mnlz__label-title">
            {{ value.title }}
            <template v-if="value.unit">
              ({{ value.unit }})
            </template>
          </div>
          <input v-if="edit && value.boolean === 0" v-model="value.value" type="number" class="card-mnlz__label-input">
          <CardSwitch v-else-if="value.boolean === 1" v-model="value.value" :disabled="!edit" />
          <div v-else class="card-mnlz__ext">
            {{ value.value }} {{ value.unit }}
          </div>
        </label>
      </div>
    </div>
    <div class="card-mnlz__footer">
      <div class="card-mnlz__footer-text">
        {{ card.abr }}
      </div>
      <div class="card-mnlz__date">
        <span>
          {{ timeHMS(card.date_edit) }}
        </span>
        <span>
          {{ createdDate(card.date_edit) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { createdDate } from '~/helpers/createdDate'
import { timeHMS } from '~/helpers/timeHMS'

export default {
  props: {
    cardConst: {
      type: Object,
      required: true
    },
    idRow: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      card: {},
      edit: false
    }
  },
  computed: {
    copyObg: {
      get () {
        return this.$store.getters['mnlz/getObgCopy']
      }
    }
  },
  mounted () {
    this.updateCard(this.cardConst)
  },
  beforeDestroy () {
  },
  methods: {
    applyCopyCard (id) {
      const index = this.card.unitArr.findIndex(e => e.id === id)
      if (index !== -1) {
        this.card.unitArr[index].units.currentСoil1.value = this.copyObg.units.currentСoil1.value
        this.card.unitArr[index].units.currentСoil2.value = this.copyObg.units.currentСoil2.value
        this.card.unitArr[index].units.frequencyСoil1.value = this.copyObg.units.frequencyСoil1.value
        this.card.unitArr[index].units.frequencyСoil2.value = this.copyObg.units.frequencyСoil2.value
        this.card.unitArr[index].units.directionСoil1.value = this.copyObg.units.directionСoil1.value
        this.card.unitArr[index].units.directionСoil2.value = this.copyObg.units.directionСoil2.value
        this.card.unitArr[index].units.runTime.value = this.copyObg.units.runTime.value
        this.card.unitArr[index].units.stopTime.value = this.copyObg.units.stopTime.value
        this.$store.commit('mnlz/setObgCopy', null)
      }
    },
    startCopyCardInfo (value) {
      this.$store.commit('mnlz/setObgCopy', value)
    },
    updateCard (card) {
      this.card = JSON.parse(JSON.stringify(card))
    },
    submit () {
      if (this.edit) {
        this.$store.commit('mnlz/editCard', { card: this.card, idRow: this.idRow })
        this.edit = false
      } else {
        this.edit = true
      }
    },
    checkBig (key) {
      const keyArr = ['currentСoil', 'frequencyСoil', 'directionСoil']
      return keyArr.includes(key)
    },
    createdDate (date) {
      return createdDate(date)
    },
    timeHMS (date) {
      return timeHMS(date)
    }
  }
}
</script>
