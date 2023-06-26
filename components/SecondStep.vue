<template>
  <div class="second">
    <div class="second__wrap-info">
      <div class="second__info-text">
        Граница минимума: {{ getMin }}
      </div>
      <div class="second__info-text">
        Граница максимума: {{ getMax }}
      </div>
      <div class="second__info-text">
        Критический перепад: {{ getJump }}
      </div>
    </div>
    <div
      class="second__chart"
      :class="{
        'second__chart_warning': warning,
        'second__chart_error': error
      }"
    >
      <div v-if="!startTime" class="second__chart-plug" @click="startChart">
        <div class="second__chart-plug-text">
          Программа готова к старту
        </div>
      </div>
      <h3 class="second__title">
        <span v-if="warning">
          Критический перепад!
        </span>
        <span v-if="error">
          !!!! ВЫХОД ЗА ГРАНИЦЫ !!!!
        </span>
        <span v-if="!warning && !error">
          Штатная работа
        </span>
      </h3>
      <client-only>
        <VueApexCharts
          ref="chart"
          :width="getChartWidth()"
          type="line"
          :options="chartOptions"
          :series="series"
        />
      </client-only>
    </div>
    <div class="second__wrap-btn">
      <button v-ripple class="second__btn btn" :class="{'second__btn_active': running} " @click="startChart">
        <div v-if="running">
          Прошедшее время: {{ elapsedTime }}
        </div>
        <span v-else>
          Запустить график
        </span>
      </button>
      <button v-ripple class="second__btn btn" :class="{'second__btn_active': !running && startTime}" @click="stopChart">
        Остановить график
      </button>
      <button v-ripple class="second__btn btn" @click="reset">
        Сбросить
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },
  data () {
    return {
      running: false,
      startTime: null,
      elapsedTime: '',
      error: false,
      warning: false,
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          toolbar: {
            show: false // Скрыть кнопки управления в верхнем левом углу
          }
        },
        legend: {
          show: false // Скрыть легенду
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          min: this.getMin,
          max: this.getMax,
          forceNiceScale: true,
          tickAmount: 4,
          labels: {
            formatter: function (value) {
              return value.toFixed(0)
            }
          },
          annotations: {
            yaxis: [
              {
                y: this.getMin,
                borderColor: '#FF0000',
                borderWidth: 1,
                label: {
                  text: 'Минимальное значение'
                }
              },
              {
                y: this.getMax,
                borderColor: '#FF0000',
                borderWidth: 1,
                label: {
                  text: 'Максимальное значение'
                }
              }
            ]
          }
        },
        stroke: {
          curve: 'smooth',
          colors: ['#109CF8', '#FF0000', '#FF0000']
        },
        markers: {
          size: 0
        },
        dataLabels: {
          enabled: false // Скрыть метки данных на графике
        },
        tooltip: {
          enabled: false // Скрыть всплывающие подсказки
        }
      },
      series: [
        {
          name: '',
          data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        },
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        }
      ],
      timeArr: [],
      interval: null
    }
  },
  computed: {
    ...mapGetters(['getMin', 'getMax', 'getJump'])
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    generateRandomValue (previousValue) {
      const delta = (this.getMax * 1.1 - this.getMin * 0.8) / 2
      if (!previousValue) {
        return Math.round(this.getMin + delta)
      }

      const probability = Math.random()
      let randomValue

      if (probability < 0.6) {
        // Вероятность 80% для изменения значения не более чем на 5%
        const minChange = previousValue - 0.05 * previousValue
        const maxChange = previousValue + 0.05 * previousValue
        randomValue = Math.random() * (maxChange - minChange) + minChange
      } else {
        // Вероятность 20% для полностью случайного значения
        const minValue = Math.max(this.getMax * 1.1, previousValue - 0.1 * delta)
        const maxValue = Math.min(this.getMin * 0.8, previousValue + 0.1 * delta)
        randomValue = Math.random() * (maxValue - minValue) + minValue
      }

      return Math.round(randomValue)
    },
    updateChart () {
      let index = 2
      let value = this.series[0].data[this.series[0].data.length - index]
      while (!value) {
        index++
        value = this.series[0].data[this.series[0].data.length - index]
        if (index > 19) { index = 2; break }
      }
      const newValue = this.generateRandomValue(value)
      this.series[0].data = [...this.series[0].data.filter(data => data !== ''), newValue]

      // проверка на изменения
      const oldValue = this.series[0].data.filter(data => data !== '')[this.series[0].data.filter(data => data !== '').length - 2]
      console.log(newValue > this.getMax)
      console.log(newValue < this.getMin)
      if (newValue > this.getMax || newValue < this.getMin) {
        this.error = true
      } else if (oldValue && Math.abs(newValue - oldValue) > this.getJump) {
        this.error = false
        this.warning = true
      } else {
        this.error = false
        this.warning = false
      }

      const newData = ['', ...this.series[0].data, '']
      this.timeArr.push(this.getElapsedTime())
      const newCategories = this.timeArr
      this.timeArr = this.timeArr.slice(-19)
      while (newData.length < 20) {
        newData.push('')
      }
      this.series = [
        {
          name: '',
          data: newData.slice(-19)
        },
        {
          name: '',
          data: Array(20).fill(this.getMin)
        },
        {
          name: '',
          data: Array(20).fill(this.getMax)
        }
      ]
      this.chartOptions = {
        ...this.chartOptions,
        yaxis: {
          ...this.chartOptions.yaxis,
          min: Math.floor(Number(this.getMin) * 0.8),
          max: Math.ceil(Number(this.getMax) * 1.1)
        },
        xaxis: {
          categories: ['', ...newCategories, '']
        }
      }
      this.elapsedTime = this.getElapsedTime()

      this.$nextTick(() => {
        this.$refs.chart.updateOptions(this.chartOptions, false)
        this.$refs.chart.updateSeries(this.series, false)
      })
    },
    getElapsedTime () {
      const currentTime = new Date().getTime()
      const elapsedTime = currentTime - this.startTime
      const minutes = Math.floor(elapsedTime / 60000)
      const seconds = Math.floor((elapsedTime % 60000) / 1000)
      return `${this.padNumber(minutes)}:${this.padNumber(seconds)}`
    },
    padNumber (number) {
      return number.toString().padStart(2, '0')
    },
    startChart () {
      this.running = true
      if (!this.startTime) {
        this.startTime = new Date().getTime()
      }
      this.updateChart()

      this.interval = setInterval(() => {
        this.updateChart()
      }, 1000)
    },
    stopChart () {
      this.running = false
      clearInterval(this.interval)
    },
    reset () {
      clearInterval(this.interval)
      this.running = false
      this.startTime = null
      this.elapsedTime = ''
      this.error = false
      this.warning = false
      this.chartOptions = {
        chart: {
          id: 'vuechart-example',
          toolbar: {
            show: false // Скрыть кнопки управления в верхнем левом углу
          }
        },
        legend: {
          show: false // Скрыть легенду
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          min: this.getMin,
          max: this.getMax,
          forceNiceScale: true,
          tickAmount: 4,
          labels: {
            formatter: function (value) {
              return value.toFixed(0)
            }
          },
          annotations: {
            yaxis: [
              {
                y: this.getMin,
                borderColor: '#FF0000',
                borderWidth: 1,
                label: {
                  text: 'Минимальное значение'
                }
              },
              {
                y: this.getMax,
                borderColor: '#FF0000',
                borderWidth: 1,
                label: {
                  text: 'Максимальное значение'
                }
              }
            ]
          }
        },
        stroke: {
          curve: 'smooth',
          colors: ['#109CF8', '#FF0000', '#FF0000']
        },
        markers: {
          size: 0
        },
        dataLabels: {
          enabled: false // Скрыть метки данных на графике
        },
        tooltip: {
          enabled: false // Скрыть всплывающие подсказки
        }
      }
      this.series = [
        {
          name: '',
          data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        },
        {
          name: '',
          data: []
        },
        {
          name: '',
          data: []
        }
      ]
      this.timeArr = []
      this.interval = null
    },
    getChartWidth () {
      const parentElement = document.querySelector('.second__chart')
      if (parentElement) {
        const parentWidth = parentElement.getBoundingClientRect().width
        return `${parentWidth}px`
      }
      return '500' // Возвращаем значение по умолчанию, если элемент не найден
    }
  }
}
</script>

<style lang='scss' scoped>
.second {
  display: flex;
  flex-direction: column;
  padding: 0 sizeIncr(0, 128);
  width: 100%;
  &__title {
    margin: sizeIncr(5, 15);
    word-spacing: sizeIncr(2, 5);
    width: 100%;
    text-align: center;
    font-family: 'DelaGothicOne';
    font-size: sizeIncr(12, 20);
    line-height: 140%;
    text-transform: uppercase;
    color: var(--color-text-1) !important;
  }
  &__wrap-info {
    display: flex;
    flex-wrap: wrap;
  }
  &__info-text {
    margin-bottom: 10px;
    &:not(:last-child) {
      margin-right: sizeIncr(5, 10);
    }
  }
  &__chart {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    background-color: transparent;
    @media (min-width: 768px) {
      @include transition;
      &_warning {
        animation-name: shake;
        animation-duration: 1s;
        animation-iteration-count: 3;
      }
      &_error {
        animation: shake 0.5s infinite;
      }
    }
    &_warning {
      background-color: var(--color-warning);
    }
    &_error {
      background-color: var(--color-alert);
    }
  }
  &__chart-plug {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid var(--color-border-1);
    background-color: var(--color-bg-white-1);
  }
  &__chart-plug-text {
    word-spacing: sizeIncr(2, 5);
    width: 100%;
    text-align: center;
    font-family: 'DelaGothicOne';
    font-size: sizeIncr(20, 26);
    line-height: 140%;
    text-transform: uppercase;
  }
  &__wrap-btn {
    display: flex;
    flex-wrap: wrap;
  }
  &__btn {
    display: flex;
    margin-bottom: sizeIncr(13, 20);
    width: 100%;
    padding: 0 20px;
    border-radius: 5px;
    width: auto;
    height: 56px;
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    @include transition;
    align-items: center;
    &:not(:last-child) {
      margin-right: sizeIncr(13, 20);
    }
    &_active {
      background-color: var(--color-btn-2);
    }
  }
  @keyframes shake {
    0% { transform: translate(0, 0); }
    25% { transform: translate(-5px, 0); }
    50% { transform: translate(5px, 0); }
    75% { transform: translate(-5px, 0); }
    100% { transform: translate(5px, 0); }
  }
}
</style>
