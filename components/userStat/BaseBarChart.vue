<template>
  <div class="chart">
    <div v-if="loaded" class="chart__wrap">
      <client-only>
        <!-- Столбчатый график для отображения данных по каждому ручью -->
        <div class="chart__wrap-chart chart__wrap-chart_bar1">
          <div class="chart__chart-title">
            {{ title }}
          </div>
          <VueApexCharts
            class="chart__chart "

            type="bar"
            :options="deviceChartOptions"
            :series="deviceSeries"
            :height="500"
            :width="1050"
          />
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    VueApexCharts: process.client ? () => import('vue-apexcharts') : undefined
  },
  props: {
    title: {
      type: String,
      default: 'График',
      require: true
    },
    width: {
      type: Number,
      default: 1050
    },
    height: {
      type: Number,
      default: 500
    },
    // eslint-disable-next-line vue/require-default-prop
    options: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      loaded: false,
      deviceSeries: [],
      deviceChartOptions: []
    }
  },

  computed: {
  },
  watch: {
    options (data) {
      if (data) {
        this.update(data)
      }
    }
  },
  mounted () {
    if (this.options && this.options.length > 0) {
      this.update(this.options)
    }
  },
  methods: {
    update (data) {
      this.loaded = false
      this.deviceSeries = data
      this.deviceChartOptions = {
        chart: {
          stacked: false,
          toolbar: {
            show: false
          }
        },
        colors: ['#47dc68', '#167ffb', '#e00000'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '90%',
            borderRadius: 0
          }
        },
        xaxis: {
          // categories: baseInfo?.deviceChartData.map(item => `${item.device_name}`),
          labels: {
            style: {
              colors: ['#000'],
              cssClass: 'custom-x-axis-labels'
            },
            offsetY: 1
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return `${val}`
            }
          }
        },
        fill: {
          opacity: 1
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'middle',
          offsetX: 10
        }
      }
      this.loaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  overflow-x: auto;
  overflow-y: hidden;
  &__wrap {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
    "bar1 donut1"
    "bar1 donut2";
    padding: 10px;
  }
  &__wrap-chart {
    &_donut1 {
      grid-area: donut1;
    }
    &_donut2 {
      grid-area: donut2;
    }
    &_bar1 {
      grid-area: bar1;
    }
  }
  &__chart-title {
    margin-bottom: 30px;
    font-size: 18px;
    font-weight: 700;
  }
}
.apexcharts-xaxis-label {
  font-size: 16px;
  fill: #121212;
}
</style>
