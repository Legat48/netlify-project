<template>
  <div class="task">
    <div class="task__title">
      Задача № {{ task.id }}
    </div>
    <div class="task__text">
      Из бункера {{ task.idStart }}
    </div>
    <div class="task__text">
      Перегрузить {{ task.weight }}кг
    </div>
    <!-- <div class="task__text">
      Материала  {{ task.substanceName }}
    </div> -->
    <div class="task__text">
      В бункер {{ task.idEnd }}
    </div>
    <v-btn class="task__btn-icon" icon text @click="delTask()">
      <v-icon class="task__icon">
        mdi mdi-trash-can-outline
      </v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'AcvTaskCard',
  props: {
    task: {
      type: Object,
      require: true,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    delTask () {
      this.$store.commit('acv/delTask', this.task.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-border-1);
  border-radius: 7px;
  padding: 6px;
  font-size: sizeIncr(12, 14);
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  &__title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 20px;
    color: var(--color-text-1);
  }
  &__text {
    font-size: sizeIncr(14, 18);
    font-weight: 400;
  }
  &__btn-icon {
    position: absolute;
    inset: 0 0 auto auto;
  }
  &__icon {
    color: var(--color-text-4) !important;
  }
}
</style>
