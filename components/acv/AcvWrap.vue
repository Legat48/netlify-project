<template>
  <div v-if="!preload" class="wrap">
    <AcvBunkersFirst :bunkers="bunkers.bunkersFirst" class="wrap__sub-wrap wrap__sub-wrap_bunkers-first">
      <!-- Бункера первого уровня -->
    </AcvBunkersFirst>
    <AcvBunkerSecond :bunkers="bunkers.bunkersSecond" class="wrap__sub-wrap wrap__sub-wrap_bunkers-second">
      <!-- Бункера второго уровня -->
    </AcvBunkerSecond>
    <div class="wrap__sub-wrap wrap__sub-wrap_conveyor">
      <!-- Маленькая строка конвейера визуального -->
      <div class="wrap__conveyor">
        <div class="wrap__conveyor-item" />
        <div class="wrap__conveyor-item" />
      </div>
    </div>
    <AcvWrapTasks class="wrap__sub-wrap wrap__sub-wrap_tasks">
      <!-- Обертка для задач -->
    </AcvWrapTasks>
    <AcvBunkerThird :bunkers="bunkers.bunkersThird" class="wrap__sub-wrap wrap__sub-wrap_bunkers-third">
      <!-- Бункера 3 уровня -->
    </AcvBunkerThird>
    <AcvBunkerFourth :bunkers="bunkers.bunkersFourth" class="wrap__sub-wrap wrap__sub-wrap_bunkers-fourth">
    <!-- Бункера 4 уровня -->
    </AcvBunkerFourth>
    <div class="wrap__sub-wrap wrap__sub-wrap_trays">
      Место под Дополнительные лотки
    </div>
    <AcvSKImage class="wrap__sub-wrap wrap__sub-wrap_ladle">
    <!-- сталеразливочный ковш -->
    </AcvSKImage>
    <div class="wrap__sub-wrap wrap__sub-wrap_static">
      Какая то статистика
    </div>
    <div class="wrap__sub-wrap wrap__sub-wrap_table">
      Место под таблицу или другую информацию
    </div>
    <div class="wrap__sub-wrap wrap__sub-wrap_chart">
      График
    </div>
    <div class="wrap__sub-wrap wrap__sub-wrap_system-info">
      Информация от системы
    </div>
    <div class="wrap__sub-wrap wrap__sub-wrap_nav">
      ACV demo  навигация
    </div>
    <AcvModalForm />
  </div>
  <div v-else class="wrap__pre-loaded ">
    <PreLoaded />
  </div>
</template>
<script>
export default {
  name: 'AcvWrap',
  props: {
    type: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data () {
    return {
      preload: false
    }
  },
  computed: {
    bunkers () {
      return this.$store.getters['acv/getBunkers']
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  display: grid;
  display: grid;
  grid-template-columns: 1.9fr 1.1fr 1fr 01fr 1.1fr 1.9fr;
  grid-template-rows: 1.25fr 1fr 0.15fr 1.2fr 1.1fr 1.5fr 0.5fr;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  color: var(--color-text-1);
  background-color: var(--color-bg-white-1);
  font-size: sizeIncr(12, 14);
  grid-template-areas:
    "first first first first first first"
    "table second second second second tasks"
    "table conveyor conveyor conveyor conveyor tasks"
    "info third third third third tasks"
    "info trays fourth fourth static tasks"
    "chart chart ladle ladle static tasks"
    "nav nav ladle ladle static tasks";
  &__sub-wrap {
    width: 100%;
    height: 100%;
    &_bunkers-first {
      grid-area: first;
    }
    &_bunkers-second {
      grid-area: second;
    }

    &_conveyor {
      grid-area: conveyor;
      padding: 0 6px;
    }

    &_tasks {
      grid-area: tasks;
    }

    &_bunkers-third {
      grid-area: third;
    }

    &_bunkers-fourth {
      grid-area: fourth;
    }

    &_ladle {
      grid-area: ladle;
    }

    &_static {
      grid-area: static;
      background-color: grey;
    }

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
    &_chart {
      grid-area: chart;
      background-color: rgb(170, 170, 170);
    }
    &_system-info {
      grid-area: info;
      background-color: rgb(202, 201, 201);
    }
    &_nav {
      grid-area: nav;
      background: rgb(84, 116, 187);
    }
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
    height: 13px;
    width: 13px;
  }
}

  </style>
