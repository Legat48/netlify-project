<template>
  <div class="test">
    <canvas ref="chartCanvas" />
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  data () {
    return {
      chart: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Values',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
          }
        ]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.createChart()
      this.startSimulation()
    })
  },
  methods: {
    createChart () {
      const ctx = this.$refs.chartCanvas.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.chartOptions
      })
    },
    startSimulation () {
      setInterval(() => {
        const newValue = this.generateValue()
        this.updateChart(newValue)
        this.checkConditions(newValue)
      }, 2000)
    },
    generateValue () {
      const { min, max, jump } = this.$store.state
      const random = Math.random()
      let newValue

      if (random < 0.8) {
        newValue = Math.random() * (max - min) + min
      } else if (random < 0.9) {
        newValue = Math.random() * (max - jump - min) + (max - jump)
      } else {
        newValue = Math.random() * (jump - min) + min
      }

      return newValue
    },
    updateChart (newValue) {
      const time = new Date().toLocaleTimeString()
      this.chart.data.labels.push(time)
      this.chart.data.datasets[0].data.push(newValue)
      this.chart.update()
    },
    checkConditions (newValue) {
      const { min, max, jump } = this.$store.state

      if (Math.abs(newValue - min) > jump || Math.abs(newValue - max) > jump) {
        console.error('Warning: Value exceeded jump range')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
}
</style>
