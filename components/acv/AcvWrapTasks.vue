<template>
  <div class="wrap-tasks">
    <div class="wrap-tasks__title">
      Задачи:
    </div>
    <div v-if="tasks" class="wrap-tasks__wrap">
      <AcvTaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AcvWrapTasks',
  data () {
    return {
      preload: false
    }
  },
  computed: {
    tasks () {
      return this.$store.getters['acv/getTasks']
    }
  },
  mounted () {
  },
  methods: {
    getBunker (id) {
      return this.bunkers.bunkersArr.find(e => e.id === id)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-tasks {
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--color-border-1);
  padding: 6px;
  width: 100%;
  height: 100%;
  font-size: sizeIncr(12, 14);
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    width: 100%;
  }
  &__title {
    display: flex;
    gap: 10px;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 20px;
    color: var(--color-text-1);
  }
}
</style>
