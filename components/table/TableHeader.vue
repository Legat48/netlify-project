<template>
  <div class="header">
    <TableSwitch class="header__switch" />
    <div class="header__wrap-select">
      <!-- <TableSelect v-if="optionsUnits && switchTable === 0" v-model="selectedUnits" :title="'Агрегат:'" :options="optionsUnits" class="header__select" /> -->
      <!-- <TableSelect v-if="optionsUnitMaterials && switchTable === 1" v-model="selectedUnitMaterials" :title="'Группа агрегатов:'" :options="optionsUnitMaterials" class="header__select" /> -->
      <TableSelect v-if="optionsMatType" v-model="selectedMatType" :title="'Тип материала:'" :options="optionsMatType" class="header__select" />
      <TableSelect v-if="optionsStatus && switchTable === 0" v-model="selectedStatus" :title="'Статус:'" :options="optionsStatus" class="header__select" />
      <TableSelect v-if="optionsUsage && switchTable === 1" v-model="selectedUsage" :title="'Признак использования:'" :options="optionsUsage" class="header__select" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableHeader',
  computed: {
    switchTable () {
      return this.$store.getters.getSwitch
    },
    selectedUnits: {
      get () {
        return this.$store.getters.getSelectedUnits
      },
      set (value) {
        this.$store.commit('updateSelectedUnits', value)
      }
    },
    selectedMatType: {
      get () {
        return this.$store.getters.getSelectedMatTypes
      },
      set (value) {
        this.$store.commit('updateSelectedMatType', value)
      }
    },
    selectedStatus: {
      get () {
        return this.$store.getters.getSelectedStatus
      },
      set (value) {
        this.$store.commit('updateSelectedStatus', value)
      }
    },
    selectedUsage: {
      get () {
        return this.$store.getters.getSelectedUsage
      },
      set (value) {
        this.$store.commit('updateSelectedUsage', value)
      }
    },
    selectedUnitMaterials: {
      get () {
        return this.$store.getters.getSelectedUnitMaterials
      },
      set (value) {
        this.$store.commit('updateSelectedUnitMaterials', value)
      }
    },
    optionsUnits () { return this.$store.getters.getOptionsUnits },
    optionsUnitMaterials () { return [{ id: 0, name: 'Все' }, ...this.$store.getters.getUnitMaterials] },
    optionsMatType () { return this.$store.getters.getOptionsMatType },
    optionsUsage () { return this.$store.getters.getOptionsUsage },
    optionsStatus () { return this.$store.getters.getOptionsStatus }

  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: sizeIncr(110, 140);
  border-bottom: 2px solid var(--color-border-1);
  &__wrap-select {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 20px;
  }
}
</style>
