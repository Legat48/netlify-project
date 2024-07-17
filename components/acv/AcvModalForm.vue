<template>
  <transition name="transition-modal-form">
    <div v-if="dialogOpen" class="modal-form" @click="closed()">
      <div class="modal-form__wrap" @click.stop>
        <div class="modal-form__header">
          <div class="modal-form__title-wrap">
            <svg
              class="modal-form__title-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
            >
              <path d="M19.5 2V37" stroke="#3FA6FA" stroke-width="3.13333" stroke-linecap="round" />
              <path d="M2 19.5L37 19.5" stroke="#3FA6FA" stroke-width="3.13333" stroke-linecap="round" />
            </svg>
            <h2 class="modal-form__title">
              Добавление задачи
            </h2>
          </div>
          <button
            class="modal-form__close"
            @click.prevent="dialogOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M28 2L2.00004 28" stroke="#3FA6FA" stroke-width="3.29174" stroke-linecap="round" />
              <path d="M2 2L28 28" stroke="#3FA6FA" stroke-width="3.29174" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="modal-form__content">
          <div class="modal-form__text">
            Из бункера {{ dialogObg.idStart }}
            <template v-if="dialogObg.idEnd !== 61">
              В бункер {{ dialogObg.idEnd }}
            </template>
            <template v-if="dialogObg.idEnd === 61">
              В ковш
            </template>
          </div>
          <!--
          <div class="modal-form__wrap-buttons">
            <TableButtons
              v-model="selectedMaterial"
              title="Материал"
              :options="dialogObg.substanceArr"
              class="modal-form__buttons"
            />
          </div> -->
          <BaseLabel
            v-if="showWeight"
            v-model="weight"
            :title="'Вес*'"
            :help="'Введите вес который нужно перегрузить'"
          />
          <!-- <v-slider
            v-if="showWeight"

            v-model="weight"
            thumb-label="always"
            color="#3FA6FA"
            :max="dialogObg.weight"
            min="1"
          /> -->
        </div>
        <div class="modal-form__footer">
          <button ref="submitButton" class="modal-form__btn btn" :class="{'modal-form__btn_disabled': !valid }" @click="submit()">
            Создать
          </button>
          <button class="modal-form__btn modal-form__btn_cancel btn" @click.prevent="dialogOpen = false">
            Отмена
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { findMissingId } from '~/helpers/taskFindId'
export default {
  name: 'AcvModalForm',
  data () {
    return {
      selectedMaterial: 0,
      weight: '1'
    }
  },
  computed: {
    dialogObg () {
      return this.$store.getters['acvModal/getDialogAddTaskObg']
    },
    dialogOpen: {
      get () {
        return this.$store.getters['acvModal/getDialogAddTaskStatus']
        // return true
      },
      set () {
        this.$store.commit('acvModal/closeDialogAddTask')
      }
    },
    // optionsMatType () { return this.$store.getters.getOptionsMatType },
    // валидация кнопки применить, такие же условия в поле передаются
    valid () {
      // 1
      return true
    },
    showWeight () {
      /**
        * функция складывующая два числа31222
        * @param {Array} arr - массив бункеров из которых возможно дозировать вес
      */
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      return !!arr.find(e => e === Number(this.dialogObg?.idStart))
    }
  },
  watch: {
    dialogOpen (newVal) {
      if (newVal && this.dialogObg && this.dialogObg.substanceArr) {
        this.selectedMaterial = this.dialogObg.substanceArr[0].id
      }
    }
  },
  mounted () {
    if (this.dialogObg && this.dialogObg.substanceArr) {
      this.selectedMaterial = this.dialogObg.substanceArr[0].id
    }
  },
  methods: {
    closed () {
      // Ваш код закрытия модального окна
      this.$store.commit('acvModal/closeDialogAddTask')
    },
    submit () {
      const data = {
        id: findMissingId(this.$store.getters['acv/getTasks']),
        idStart: this.dialogObg.idStart,
        idEnd: this.dialogObg.idEnd,
        weight: this.showWeight ? Number(this.weight) : this.dialogObg.weight,
        substanceId: this.dialogObg.substanceArr.find(e => e.id === this.selectedMaterial).id,
        substanceName: this.dialogObg.substanceArr.find(e => e.id === this.selectedMaterial).name
      }
      this.$store.commit('acv/pushNewTasks', data)
      this.$store.commit('acvModal/closeDialogAddTask')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-form {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: sizeIncr(65, 94);
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  z-index: 202;
  &__wrap {
    position: relative;
    z-index: 204;
    padding: sizeIncr(108, 126) sizeIncr(18, 36)  sizeIncr(18, 36);
    overflow-y: auto;
    min-width: #{$minvw}px;
    max-height: 100%;
    border: 2px solid var(--color-border-1);
    border-radius: 7px;
    background-color: var(--color-bg-white-1);
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 0px 0px 0px rgb(0 0 0 / 12%);
  }
  &__header {
    position: absolute;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: sizeIncr(18, 36);
    border-bottom: 1px solid var(--color-border-1);
  }
  &__title-wrap {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }
  &__title-icon {
    margin-right: 13px;
    width: 40px;
    height: 40px;
    color: var(--color-text-1) !important;
  }
  &__title {
    font-weight: 600;
    font-size: sizeIncr(18, 24);
    line-height: 110%;
    font-size: 40px;
    font-weight: 500;
    color: var(--color-text-2);
  }
  &__close {
    svg {
      width: 30px;
      height: 30px;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 75vh;
    max-height: 100%;
    min-width: 30vw;
    max-width: 1230px;
    padding: 20px 40px;
  }
  &__wrap-select {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    height: 100%;
    gap: 12px;
  }
  &__wrap-buttons {
    display: flex;
    width: 100%;
    max-width: 70vw;
    padding-bottom: 12px;
    gap: 12px;
  }
  &__wrap-label {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px 0 0 0;
    gap: 12px;
  }
  &__text {
    font-size: sizeIncr(14, 18);
    font-weight: 500;
  }
  &__select-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 28px;
    border-radius: 5px;
    padding: 5px;
    background-color: var(--color-bg-white-1);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  }
  &__btn {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 7px;
    font-size: 20px;
    font-weight: 500;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    @include transition;
    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 4px var(--color-btn-1);
    }
    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    }
    &_disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &_cancel {
      color: var(--color-text-1);
      background-color: var(--color-bg-2);
      &:hover {
        color: var(--color-text-white-1);
        background-color: var(--color-btn-1);
        box-shadow: 0 0 0 4px var(--color-btn-1);
      }
      &:active {
        color: var(--color-text-white-1);
        background-color: var(--color-btn-1);
        box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
      }
    }
  }
  &__btn.error {
    border-color: #ff0000!important;
    color: #ff0000 !important;
    background-color: transparent !important;
    box-shadow: 0 0 0 4px #ff0000 !important;

    animation: shake 0.5s infinite;
  }
  &__wrap-mat-type {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 100%;
  }
  &__btn-mat-type {
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
    &:active,
    &:hover,
    &:focus {
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1);
    }
  }
}
@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5px, 0); }
  50% { transform: translate(5px, 0); }
  75% { transform: translate(-5px, 0); }
  100% { transform: translate(5px, 0); }
}
.transition-modal-form-enter-active,
.transition-modal-form-leave-active {
  @include transition
}

.transition-modal-form-enter,
.transition-modal-form-leave-to {
  opacity: 0;
}
</style>
