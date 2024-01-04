<template>
  <transition name="transition-modal-form">
    <div v-if="dialogOpen && dialogObg" class="modal-form">
      <div v-if="!loaded" class="modal-form__wrap">
        <div class="modal-form__header">
          <div class="modal-form__title-wrap">
            <svg
              v-if="dialogObg.icon === 'add'"
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
            <svg
              v-if="dialogObg.icon === 'edit'"
              class="modal-form__title-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
            >
              <path d="M5.875 33.7813V41.125H13.2188L34.8779 19.4658L27.5342 12.1221L5.875 33.7813ZM40.5571 13.7867C41.3208 13.0229 41.3208 11.7892 40.5571 11.0254L35.9746 6.44293C35.2108 5.67918 33.9771 5.67918 33.2133 6.44293L29.6296 10.0267L36.9733 17.3704L40.5571 13.7867Z" fill="#3FA6FA" />
            </svg>
            <svg
              v-if="dialogObg.icon === 'copy'"
              v-ripple
              class="modal-form__title-icon"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="copyBatchesModal(row)"
            >
              <path d="M19 4H7C5.9 4 5 4.9 5 6V20H7V6H19V4ZM22 8H11C9.9 8 9 8.9 9 10V24C9 25.1 9.9 26 11 26H22C23.1 26 24 25.1 24 24V10C24 8.9 23.1 8 22 8ZM22 24H11V10H22V24Z" fill="#3FA6FA" />
            </svg>
            <h2 class="modal-form__title">
              {{ dialogObg.title }}
            </h2>
          </div>
          <button
            v-ripple
            class="modal-form__close"
            @click.prevent="dialogOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M28 2L2.00004 28" stroke="#3FA6FA" stroke-width="3.29174" stroke-linecap="round" />
              <path d="M2 2L28 28" stroke="#3FA6FA" stroke-width="3.29174" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <template v-if="dialogObg.icon === 'add' && !choiseMatType">
          <div class="modal-form__wrap-mat-type">
            <button v-for="item of choiseMatTypeArr" :key="item.id" v-ripple class="modal-form__btn-mat-type btn" @click="choiseMatType = item.id">
              {{ item.name }}
            </button>
          </div>
        </template>
        <template v-else>
          <div class="modal-form__wrap-buttons">
            <TableButtons
              v-if="dialogObg.obgUnit.buttonsMaterial"
              v-model="selectedMaterial"
              :title="`Материал (${choiseMatType ? choiseMatTypeArr.find(e => e.id === choiseMatType).name : 'тип не выбран'}):`"
              :options="optionsMaterial"
              class="modal-form__buttons"
            />
            <TableButtons
              v-if="dialogObg.obgUnit.buttonsMatType"
              v-model="type_id"
              :title="'Тип материала*:'"
              :options="optionsMatType"
              class="modal-form__buttons"
            />
          </div>
          <div v-if="dialogObg.obgUnit" class="modal-form__wrap-select">
            <TableSelect
              v-if="dialogObg.obgUnit.optionsAggregate"
              v-model="selectedUnits"
              :title="'Агрегат:'"
              :options="optionsUnits"
              class="modal-form__select"
            />
            <TableSelect
              v-if="dialogObg.obgUnit.optionsMatType"
              v-model="type_id"
              :title="'Тип материала*:'"
              :options="optionsMatType"
              class="modal-form__select"
            />
            <!-- <TableSelect
              v-if="dialogObg.obgUnit.optionsMaterial && dialogObg.icon === 'add'"
              v-model="selectedMaterial"
              :title="'Материал:'"
              :options="optionsMaterial"
              class="modal-form__select"
            /> -->
            <div
              v-if="dialogObg.obgUnit.optionsMaterial && (dialogObg.icon === 'edit' || dialogObg.icon === 'copy')"
              class="modal-form__subselect"
            >
              <div class="modal-form__select-title">
                Материал:
              </div>
              <div class="modal-form__select-text">
                {{ optionsMaterial.find(e => e.id === selectedMaterial).name }}
              </div>
            </div>
            <TableSelect
              v-if="dialogObg.obgUnit.optionsStatus"
              v-model="selectedStatus"
              :title="'Статус:'"
              :options="optionsStatus"
              class="modal-form__select"
            />
            <TableSelect
              v-if="dialogObg.obgUnit.optionsUsageTag"
              v-model="selectedUsageTag"
              :title="'Признак использования:'"
              :options="optionsUsageTag"
              class="modal-form__select"
            />
            <TableSelect
              v-if="dialogObg.obgUnit.optionsPathArr"
              v-model="selectedPath"
              :title="'Шаблон партии:'"
              :options="optionsBatches"
              class="header__select"
            />
          </div>
          <div v-if="dialogObg.obgUnit" class="modal-form__wrap-label">
            <BaseLabel
              v-if="dialogObg.obgUnit.inputPathNumber"
              v-model="batch_no"
              :title="'Номер партии*'"
              :placeholder="'12345L'"
              :help="'Введите номер партии'"
              :rules="!!batch_no && batch_no.length > 1"
              :text-error="'Обязательно введите номер партии'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputMaterialName"
              v-model="abbr"
              :title="'Имя материала'"
              :placeholder="'Проволка М'"
              :help="'Введите имя материала'"
              :rules="!!abbr && abbr.length > 3"
              :text-error="'Обязательно имя материала'"
              :error="errorNumberPart"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputMaterialFullName"
              v-model="name"
              :title="'Полное имя материала*'"
              :placeholder="'медь####'"
              :help="'Введите полное имя материала'"
              :rules="true"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputBatchLength && choiseMatType === 2"
              v-model="len"
              :title="'Длина бухты, м.'"
              :placeholder="'м.'"
              :help="'Длина всей партии'"
              :rules="!len || /^[0-9.,]+$/.test(len)"
              :text-error="'Вводите только цифры'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputPathWeight && choiseMatType !== 3"
              v-model="wght"
              :title="'Вес'"
              :placeholder="'кг'"
              :help="'Введите общий вес партии'"
              :rules="!wght || /^[0-9.,]+$/.test(wght)"
              :text-error="'Вводите только цифры'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputWeightMeterWire && choiseMatType === 2"
              v-model="run_meter_wght"
              :title="'Масса погонного метра проволоки, кг/м'"
              :placeholder="'кг/м'"
              :help="'Введите массу погонного метра проволоки, кг/м'"
              :rules="!run_meter_wght || /^[0-9.,]+$/.test(run_meter_wght)"
              :text-error="'Вводите только цифры'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputWeightMeterFiller && choiseMatType === 2"
              v-model="run_meter_wght_fill"
              :title="'Масса погонного метра наполнителя, кг/м'"
              :placeholder="'кг/м'"
              :help="'Введите массу погонного метра наполнителя, кг/м'"
              :rules="!run_meter_wght_fill || /^[0-9.,]+$/.test(run_meter_wght_fill)"
              :text-error="'Вводите только цифры'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputWeightMeterMin && choiseMatType === 2"
              v-model="run_meter_wght_min"
              :title="'Мин. масса погонного метра кг/м'"
              :placeholder="'кг/м'"
              :help="'Введите минимальную массу погонного метра, кг/м'"
              :rules="!run_meter_wght_min || /^[0-9.,]+$/.test(run_meter_wght_min)"
              :text-error="'Вводите только цифры'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputWeightMeterMax && choiseMatType === 2"
              v-model="run_meter_wght_max"
              :title="'Макс. масса погонного метра, кг/м'"
              :placeholder="'кг/м'"
              :help="'Введите максимальную массу погонного метра, кг/м'"
              :rules="!run_meter_wght_max || /^[0-9.,]+$/.test(run_meter_wght_max)"
              :text-error="'Вводите только цифры'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputFillingFactor && choiseMatType === 2"
              v-model="fill_factor"
              :title="'Коэффициент наполнения, %'"
              :placeholder="'%'"
              :help="'Укажите коэффициент наполнения, %'"
              :rules="!fill_factor || /^[0-9.,]+$/.test(fill_factor)"
              :text-error="'Вводите только цифры'"
            />
            <BaseLabel
              v-if="dialogObg.obgUnit.inputСost"
              v-model="cost"
              :title="'Цена за единицу'"
              :placeholder="''"
              :help="'Укажите цену'"
              :rules="!cost || /^[0-9.,]+$/.test(cost)"
              :text-error="'Вводите только цифры'"
            />
          </div>
          <BaseLabel
            v-if="dialogObg.obgUnit.inputComment"
            v-model="comment"
            :title="'Примечание'"
            :placeholder="'Комментарии'"
            :help="'Введите дополнительную информацию'"
            :textarea="true"
          />
          <div class="modal-form__footer">
            <button ref="submitButton" v-ripple class="modal-form__btn btn" :class="{'modal-form__btn_disabled': !valid }" @click="submit()">
              Применить
            </button>
            <button v-ripple class="modal-form__btn modal-form__btn_cancel btn" @click.prevent="dialogOpen = false">
              Отменить
            </button>
          </div>
        </template>
      </div>
      <PreLoaded v-else />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalForm',
  data () {
    return {
      choiseMatType: false,
      choiseMatTypeArr: [
        {
          id: 1,
          name: 'Сыпучие'
        },
        {
          id: 2,
          name: 'Проволока'
        },
        {
          id: 3,
          name: 'Газ'
        }],
      loaded: true,
      idBatch: null,
      idMaterial: null,
      batch_no: null,
      wght: null,
      len: null,
      run_meter_wght: null,
      run_meter_wght_fill: null,
      fill_factor: null,
      comment: '',
      type_id: null,
      name: '',
      abbr: '',
      cost: '',
      id_level3: null,
      run_meter_wght_min: null,
      run_meter_wght_max: null,
      usage_tag: 0,
      hdl_type_id: null,
      packaged_output: null,
      errorIdMaterial: '',
      selectedUnits: 0,
      selectedMatType: 2,
      selectedUsage: 0,
      selectedStatus: 1,
      selectedMaterial: 0,
      selectedPath: 0,
      selectedUsageTag: 1,
      optionsUsageTag: [{ id: 0, name: 'Не используется' }, { id: 1, name: 'Используется' }],
      errorNumberPart: ''
    }
  },
  computed: {
    dialogObg () {
      return this.$store.getters.getDialogObg
    },
    dialogOpen: {
      get () {
        return this.$store.getters.getDialogOpen
        // return true
      },
      set () {
        this.$store.commit('closeDialog')
      }
    },
    optionsUnits () { return this.$store.getters.getOptionsUnits },
    optionsMatType () { return this.$store.getters.getOptionsMatType },
    optionsUsage () { return this.$store.getters.getOptionsUsage },
    optionsMaterial () {
      if (this.choiseMatType) {
        return this.$store.getters.getMaterials.filter(e => e.type_id === this.choiseMatType)
      }
      return this.$store.getters.getMaterials
    },
    optionsStatus () { return [{ id: 1, name: 'Используется', text: 'I' }, { id: 2, name: 'Израсходована', text: 'C' }, { id: 3, name: 'Отменена', text: 'F' }] },
    optionsBatches () {
      return [{ id: 0, name: 'Нет' }, ...this.$store.getters.getBatches.map((e) => {
        return {
          ...e,
          name: e.batch_no
        }
      })]
    },
    // валидация кнопки применить, такие же условия в поле передаются
    valid () {
      let ans = true
      if (!!this.dialogObg.obgUnit.inputFillingFactor && this.choiseMatType === 2 && !/^[0-9.,]+$/.test(this.fill_factor)) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputWeightMeterMax && this.choiseMatType === 2 && !/^[0-9.,]+$/.test(this.run_meter_wght_max)) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputWeightMeterMin && this.choiseMatType === 2 && !/^[0-9.,]+$/.test(this.run_meter_wght_min)) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputWeightMeterFiller && this.choiseMatType === 2 && !/^[0-9.,]+$/.test(this.run_meter_wght_fill)) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputWeightMeterWire && this.choiseMatType === 2 && !/^[0-9.,]+$/.test(this.run_meter_wght)) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputPathWeight && this.choiseMatType !== 3 && !/^[0-9.,]+$/.test(this.wght)) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputBatchLength && this.choiseMatType === 2 && !/^[0-9.,]+$/.test(this.len)) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputMaterialFullName && !this.name) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputMaterialName && !this.abbr && this.abbr?.length < 3) {
        ans = false
      }
      if (!!this.dialogObg.obgUnit.inputPathNumber && !this.batch_no && this.batch_no?.length < 1) {
        ans = false
      }
      return ans
    }
  },
  watch: {
    selectedPath (newVal) {
      this.copyBatch(newVal)
    },
    // блокировка скролла страницы
    dialogOpen (newVal) {
      if (newVal) {
        this.updateInfoForm(this.$store.getters.getDialogObg)
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        this.disableScroll()
      } else {
        setTimeout(this.enableScroll, 300)
        this.restoreScrollPosition()
      }
    }
  },
  mounted () {
    this.loaded = false
    // console.count('openForm')
  },
  methods: {
    async submit () {
      const data = {}
      let result = false
      if (this.$store.getters.getDialogObg.type === 'material') {
        data.id = Number(this.idMaterial)
        if (data.id === 0) {
          data.id = null
        }
        data.type_id = Number(this.type_id) && Number(this.type_id) > 0 ? Number(this.type_id) : null
        data.name = `${this.name}`
        data.abbr = `${this.abbr}`
        data.cost = Number(this.cost) && Number(this.cost) > 0 ? Number(this.cost) : null
        data.id_level3 = Number(this.id_level3) && Number(this.id_level3) > 0 ? Number(this.id_level3) : null
        data.run_meter_wght_min = Number(this.run_meter_wght_min) && Number(this.run_meter_wght_min) > 0 ? Number(this.run_meter_wght_min) : null
        data.run_meter_wght_max = Number(this.run_meter_wght_max) && Number(this.run_meter_wght_max) > 0 ? Number(this.run_meter_wght_max) : null
        data.usage_tag = Number(this.selectedUsageTag) && Number(this.selectedUsageTag) > 0 ? Number(this.selectedUsageTag) : null
        data.hdl_type_id = Number(this.hdl_type_id) && Number(this.hdl_type_id) > 0 ? Number(this.hdl_type_id) : null
        data.packaged_output = Number(this.packaged_output) && Number(this.packaged_output) > 0 ? Number(this.packaged_output) : null
        result = await this.$store.dispatch('submitFormMaterial', data)
      } else if (this.$store.getters.getDialogObg.type === 'batch') {
        data.id = Number(this.idBatch) && Number(this.idBatch) > 0 ? Number(this.idBatch) : null
        data.type_id = Number(this.selectedMaterial) && Number(this.selectedMaterial) > 0 ? Number(this.selectedMaterial) : null
        data.batch_no = `${this.batch_no}`
        data.mat_id = this.selectedMaterial > 0 ? Number(this.selectedMaterial) : null
        data.unit_id = this.selectedUnits > 0 ? Number(this.selectedUnits) : null
        data.name = `${this.name}`
        data.wght = Number(this.wght) && Number(this.wght) > 0 ? Number(this.wght) : null
        data.len = Number(this.len) && Number(this.len) > 0 ? Number(this.len) : null
        data.status = this.optionsStatus.find((item) => {
          return item.id === this.selectedStatus
        }).text
        data.run_meter_wght = Number(this.run_meter_wght) && Number(this.run_meter_wght) > 0 ? Number(this.run_meter_wght) : null
        data.run_meter_wght_fill = Number(this.run_meter_wght_fill) && Number(this.run_meter_wght_fill) > 0 ? Number(this.run_meter_wght_fill) : null
        data.fill_factor = Number(this.fill_factor) && Number(this.fill_factor) > 0 ? Number(this.fill_factor) / 100 : null
        data.comment = `${this.comment}`
        result = await this.$store.dispatch('submitFormBatch', data)
      }
      if (result) {
        this.$store.commit('setLoading', true)
        await this.$store.dispatch('fetchCatalogs')
        await this.$store.dispatch('fetchMatBatchList')
        this.dialogOpen = false
        this.$store.commit('setLoading', false)
      } else {
        this.$refs.submitButton.classList.add('error')
        setTimeout(() => {
          this.$refs.submitButton.classList.remove('error')
        }, 1000)
      }
    },
    // синхронизация полей с входящими данными открытия формы
    updateInfoForm (newInfo) {
      this.choiseMatType = false
      this.loaded = true
      this.idBatch = ''
      this.idMaterial = ''
      this.batch_no = ''
      this.wght = ''
      this.len = ''
      this.run_meter_wght = ''
      this.run_meter_wght_fill = ''
      this.fill_factor = ''
      this.comment = ''
      this.id = ''
      this.type_id = 0
      this.name = ''
      this.abbr = ''
      this.cost = ''
      this.id_level3 = ''
      this.usage_tag = ''
      this.hdl_type_id = ''
      this.packaged_output = ''
      this.errorIdMaterial = ''
      this.selectedUnits = 0
      this.selectedMatType = 0
      this.selectedUsage = 0
      this.selectedPath = 0
      this.selectedUsageTag = 0

      this.errorNumberPart = ''

      if (newInfo.type === 'material') {
        console.log('newInfo.type', newInfo.type)
        if (newInfo.icon === 'copy') { // в случае если мы копируем какой то существующий материал) {
          this.copyMaterial(newInfo.id)
        } else if (newInfo.icon === 'edit') {
          this.editMaterial(newInfo.id)
        }
      } else if (newInfo.type === 'batch') {
        console.log('newInfo.type', newInfo.type)
        if (newInfo.icon === 'copy') { // в случае если мы копируем какой то существующий материал) {
          this.copyBatch(newInfo.id)
        } else if (newInfo.icon === 'edit') {
          this.editBatch(newInfo.id)
        }
      }
      this.loaded = false
    },
    copyMaterial (id) {
      const material = this.$store.getters.getMaterials.find(e => e.id === id)
      this.choiseMatType = material.type_id
      this.idMaterial = ''
      this.type_id = material.type_id
      this.name = material.name
      this.abbr = material.abbr
      this.cost = material.cost
      this.id_level3 = material.id_level3
      this.run_meter_wght_min = `${material.run_meter_wght_min ? material.run_meter_wght_min : ''}`
      this.run_meter_wght_max = `${material.run_meter_wght_max ? material.run_meter_wght_max : ''}`
      this.selectedUsageTag = material.usage_tag
      this.hdl_type_id = material.hdl_type_id
      this.packaged_output = material.hdl_type_id
    },
    editMaterial (id) {
      const material = this.$store.getters.getMaterials.find(e => e.id === id)
      this.choiseMatType = material.type_id
      this.idMaterial = material.id
      this.type_id = material.type_id
      this.name = material.name
      this.abbr = material.abbr
      this.cost = material.cost
      this.id_level3 = material.id_level3
      this.run_meter_wght_min = `${material.run_meter_wght_min ? material.run_meter_wght_min : ''}`
      this.run_meter_wght_max = `${material.run_meter_wght_max ? material.run_meter_wght_max : ''}`
      this.selectedUsageTag = material.usage_tag
      this.hdl_type_id = material.hdl_type_id
      this.packaged_output = material.hdl_type_id
    },
    copyBatch (id) {
      const batch = this.$store.getters.getBatches.find(e => e.id === id)
      this.choiseMatType = batch.type_id
      this.idBatch = ''
      this.selectedMaterial = batch.mat_id
      this.batch_no = batch.batch_no
      this.selectedUnits = batch.unit_id ? batch.unit_id : 0
      this.wght = batch.wght
      this.selectedStatus = this.optionsStatus.find(item => item.text === batch.status).id
      this.len = `${batch.len ? batch.len : ''}`
      this.run_meter_wght = `${batch.run_meter_wght ? batch.run_meter_wght : ''}`
      this.run_meter_wght_fill = `${batch.run_meter_wght_fill ? batch.run_meter_wght : ''}`
      this.fill_factor = `${batch.fill_factor ? Number(batch.fill_factor) * 100 : ''}`
      this.comment = `${batch.comment ? batch.comment : ''}`
    },
    editBatch (id) {
      const batch = this.$store.getters.getBatches.find(e => e.id === id)
      this.choiseMatType = batch.type_id
      this.idBatch = batch.id
      this.selectedMaterial = batch.mat_id
      this.batch_no = batch.batch_no
      this.selectedUnits = batch.unit_id ? batch.unit_id : 0
      this.wght = batch.wght
      this.selectedStatus = this.optionsStatus.find(item => item.text === batch.status).id
      this.len = `${batch.len ? batch.len : ''}`
      this.run_meter_wght = `${batch.run_meter_wght ? batch.run_meter_wght : ''}`
      this.run_meter_wght_fill = `${batch.run_meter_wght_fill ? batch.run_meter_wght : ''}`
      this.fill_factor = `${batch.fill_factor ? Number(batch.fill_factor) * 100 : ''}`
      this.comment = `${batch.comment ? batch.comment : ''}`
    },
    disableScroll () {
      // document.body.style.overflow = 'visible'
      // document.body.style.position = 'fixed'
      // document.body.style.top = `-${this.scrollPosition}px`
      // document.body.style.width = '100%'
    },
    // rgb(0, 143, 251)
    // rgb(0, 227, 150)
    // rgb(254, 176, 25)
    // rgb(255, 69, 96)
    // rgb(119, 93, 208)

    // rgb(51, 178, 223)
    // rgb(84, 110, 122)
    // rgb(212, 82, 110)
    // rgb(19, 216, 170)
    // rgb(165, 151, 139)
    // rgb(43, 144, 143)
    // rgb(249, 163, 164)
    // rgb(144, 238, 126)
    // rgb(244, 128, 36)
    // rgb(105, 210, 231)

    enableScroll () {
      // document.body.style.overflow = ''
      // document.body.style.position = ''
      // document.body.style.top = ''
      // document.body.style.width = ''
    },
    restoreScrollPosition () {
      setTimeout(() => {
        window.scrollTo(0, this.scrollPosition)
      }, 0)
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
  &__subselect {
    display: flex;
    flex-direction: column;
    gap: sizeIncr(5, 10);
    padding: sizeIncr(10, 15);
    border-radius: 9px;
    width: sizeIncr(150, 270);
    color: var(--color-text-1);
    background-color: var(--color-bg-2);
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.15);
  }
  &__select-title {
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
