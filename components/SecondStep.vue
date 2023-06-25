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
          curve: 'smooth'
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
          name: 'series-1',
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
    generateData () {
      const range = this.getMax * 0.9 - this.getMin * 1.1
      const randomValue = Math.random() * range + this.getMin * 1.1
      const shouldExceedMax = Math.random() < 0.9

      if (shouldExceedMax) {
        return Math.floor(Math.min(randomValue, this.getMax))
      } else {
        return Math.ceil(Math.max(randomValue, this.getMin))
      }
    },
    updateChart () {
      const newData = [null, ...this.series[0].data.filter(data => data !== null), this.generateData(), null]
      this.timeArr.push(this.getElapsedTime())
      const newCategories = this.timeArr
      this.timeArr = this.timeArr.slice(-19)

      this.series = [
        {
          name: 'series-1',
          data: newData.slice(-19)
        }
      ]
      this.chartOptions = {
        ...this.chartOptions,
        yaxis: {
          ...this.chartOptions.yaxis,
          min: Math.floor(Number(this.getMin) * 0.8),
          max: Math.ceil(Number(this.getMax) * 1.2),
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
