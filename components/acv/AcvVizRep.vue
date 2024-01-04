<template>
  <div v-if="bunkers" class="wrap-viz">
    <AcvBunkersFirst :bunkers="bunkers.bunkersFirst" class="wrap-viz__sub-wrap wrap-viz__sub-wrap_bunkers-first">
      <!-- Бункера первого уровня -->
    </AcvBunkersFirst>
    <AcvBunkerSecond :bunkers="bunkers.bunkersSecond" class="wrap-viz__sub-wrap wrap-viz__sub-wrap_bunkers-second">
      <!-- Бункера второго уровня -->
    </AcvBunkerSecond>
    <div class="wrap-viz__sub-wrap wrap-viz__sub-wrap_conveyor">
      <!-- Маленькая строка конвейера визуального -->
      <div class="wrap-viz__conveyor">
        <div class="wrap-viz__conveyor-item" />
        <div class="wrap-viz__conveyor-item" />
      </div>
    </div>
    <AcvWrapTasks class="wrap-viz__sub-wrap wrap-viz__sub-wrap_tasks">
      <!-- Обертка для задач -->
    </AcvWrapTasks>
    <AcvBunkerThird :bunkers="bunkers.bunkersThird" class="wrap-viz__sub-wrap wrap-viz__sub-wrap_bunkers-third">
      <!-- Бункера 3 уровня -->
    </AcvBunkerThird>
    <AcvBunkerFourth :bunkers="bunkers.bunkersFourth" class="wrap-viz__sub-wrap wrap-viz__sub-wrap_bunkers-fourth">
      <!-- Бункера 4 уровня -->
    </AcvBunkerFourth>
    <div class="wrap-viz__sub-wrap wrap-viz__sub-wrap_trays">
      Место под Дополнительные лотки
    </div>
    <AcvSKImage class="wrap-viz__sub-wrap wrap-viz__sub-wrap_ladle">
      <!-- сталеразливочный ковш -->
    </AcvSKImage>
    <div class="wrap-viz__sub-wrap wrap-viz__sub-wrap_save">
      Временно свободное место
    </div>
  </div>
  <div v-else class="wrap-viz__pre-loaded ">
    <PreLoaded />
  </div>
</template>
<script>
export default {
  name: 'AcvVizRep',
  computed: {
    bunkers () {
      return this.$store.getters['acv/getBunkers']
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.wrap-viz {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 0.2fr 1fr 1fr 2.4fr;
  gap: 0px 0px;
  grid-template-areas:
    "first first first first first first first"
    "second second second second tasks tasks tasks"
    "conveyor conveyor conveyor conveyor tasks tasks tasks"
    "third third third third tasks tasks tasks"
    "fourth fourth fourth fourth tasks tasks tasks"
    "trays ladle ladle save tasks tasks tasks";
  width: 100%;
  height: calc(100vh - var(--height-header) - 20px);
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  font-size: sizeIncr(12, 14);
  &__sub-wrap {
    width: 100%;
    height: 100%;
    &_bunkers-first { grid-area: first;}
    &_bunkers-second { grid-area: second;}
    &_conveyor {
      grid-area: conveyor;
      padding: 3px;
      border-top: 2px solid var(--color-border-1);
      border-bottom: 2px solid var(--color-border-1);
    }
    &_tasks { grid-area: tasks; }
    &_bunkers-third { grid-area: third; }
    &_bunkers-fourth {
      border-top: 2px solid var(--color-border-1);
      grid-area: fourth;
    }
    &_ladle { grid-area: ladle;}
    &_trays {
      grid-area: trays;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 18px;
      overflow: hidden;
      text-align: center;
      background-color: grey;
    }
    &_save {
      grid-area: save;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 18px;
      overflow: hidden;
      text-align: center;
      background-color: grey;
     }
  }
  &__pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  &__conveyor {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    width: 100%;
    height: 100%;
    border: 2px solid var(--color-border-2);
    border-radius: 100px;
    width: 100%;
    height: 100%;
  }
  &__conveyor-item {
    border: 2px solid var(--color-border-2);
    border-radius: 100px;
    height: 10px;
    width: 10px;
  }
}
</style>
