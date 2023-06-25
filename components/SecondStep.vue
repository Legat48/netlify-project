<template>
  <div>
    <button v-if="!running" @click="startChart">
      Запустить график
    </button>
    <button v-if="running" @click="stopChart">
      Остановить график
    </button>
    <client-only>
      <div>
        <VueApexCharts
          ref="chart"
          width="500"
          type="line"
          :options="chartOptions"
          :series="series"
        />
      </div>
    </client-only>
    <div v-if="running">
      Прошедшее время: {{ elapsedTime }}
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
      chartOptions: {
        chart: {
          id: 'vuechart-example',
          toolbar: {
            show: false // Скрыть кнопки управления в верхнем левом углу
          }
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
          name: 'Данные',
          data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        },
        {
          name: 'min',
          data: []
        },
        {
          name: 'max',
          data: []
        }
      ],
      timeArr: [],
      interval: null
    }
  },
  computed: {
    ...mapGetters(['getMin', 'getMax'])
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    generateRandomValue (previousValue) {
      const delta = (this.getMax * 1.1 - this.getMin * 0.8) / 2
      if (!previousValue) {
        return this.getMin + delta
      }

      const probability = Math.random()
      let randomValue

      if (probability < 0.8) {
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
        if (index > 19) { break }
      }
      this.series[0].data = [...this.series[0].data.filter(data => data !== ''), this.generateRandomValue(value)]
      const newData = ['', ...this.series[0].data, '']
      this.timeArr.push(this.getElapsedTime())
      const newCategories = this.timeArr
      this.timeArr = this.timeArr.slice(-19)
      while (newData.length < 20) {
        newData.push('')
      }
      this.series = [
        {
          name: 'Данные',
          data: newData.slice(-19)
        },
        {
          name: 'min-boundary',
          data: Array(20).fill(this.getMin)
        },
        {
          name: 'max-boundary',
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
      this.startTime = new Date().getTime()
      this.updateChart()

      this.interval = setInterval(() => {
        this.updateChart()
      }, 1000)
    },
    stopChart () {
      this.running = false
      clearInterval(this.interval)
    }
  }
}
</script>
