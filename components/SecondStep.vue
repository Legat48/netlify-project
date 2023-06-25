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
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          min: 0,
          max: 100
        },
        markers: {
          size: 0
        }
      },
      series: [
        {
          name: 'series-1',
          data: []
        }
      ],
      interval: null
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  methods: {
    generateData () {
      return Math.floor(Math.random() * 101)
    },
    updateChart () {
      const newData = [...this.series[0].data, this.generateData()]
      const newCategories = [...this.chartOptions.xaxis.categories, this.getElapsedTime()]
      this.series = [
        {
          name: 'series-1',
          data: newData.slice(-8)
        }
      ]
      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          categories: newCategories.slice(-8)
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
      }, 3000)
    },
    stopChart () {
      this.running = false
      clearInterval(this.interval)
    }
  }
}
</script>
