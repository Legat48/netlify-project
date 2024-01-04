<template>
  <svg
    v-ripple
    class="btn"
    width="323"
    height="303"
    viewBox="0 0 323 303"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    @click="addTack()"
  >
    <path d="M55.312 98.1973H263.018C263.018 98.1973 258.204 245.266 255.077 265.717C251.95 286.168 161.544 311.829 67.0282 274.864C53.3116 264.942 55.312 98.1973 55.312 98.1973Z" :fill="active? '#E3582C' : '#E3582C'" :stroke="active? '#E3582C' :'#E3582C'" stroke-width="2" stroke-miterlimit="10" />
    <path d="M285.28 2.1145H270.074L267.019 12.4803L255.077 268.395C255.077 268.395 238.833 283.865 161.545 283.86C69.7377 283.433 66.9625 271.517 66.9625 271.517L51.6192 9.78494L49.7452 1.39014L35.6714 1.41821L38.5125 10.0882L57.0212 268.541C57.0212 268.541 57.3949 286.645 87.2242 288.537C119.455 292.502 115.119 293.321 162.814 292.311C210.509 291.3 266.728 283.725 266.728 268.788C266.728 253.852 282.346 11.7615 282.346 11.7615L285.28 2.1145Z" :fill="active? '#55c553' :'#864821'" :stroke="active? '#55c553' :'#864821'" stroke-width="2" stroke-miterlimit="10" />
    <path d="M301.876 89.2014L302.107 76.4043L302.354 69.3459H286.907L290.957 25.7042L292.66 11.2954L296.062 2.14258L285.285 2.1145L282.356 11.7615L278.823 68.0881L273.536 169.949L266.733 268.788C266.733 268.788 265.804 277.891 234.777 284.281C215.944 287.757 187.203 292.221 161.544 292.322C121.521 292.226 90.5541 288.504 72.6444 285.303C60.7853 283.287 57.7078 274.218 57.0264 268.536C56.3449 262.853 50.778 170.387 50.778 170.387L43.4361 69.3403L38.5122 10.0825L35.671 1.4126L27.0267 1.39014L30.4833 11.0989L36.6163 69.3459H20.5531V88.5388H1.5498V117.222H20.5531L20.9872 129.8L21.4214 170.392H42.8426C42.8426 170.392 49.7889 266.076 49.9262 269.232C50.0636 272.388 52.5751 289.121 67.2479 291.659C90.9443 297.606 128.61 301.553 161.555 301.385C201.309 300.228 230.309 293.86 251.966 287.903C273.624 281.945 273.184 269.232 273.184 269.232L280.614 169.949H302.052L302.118 129.794V117.923H321.55V89.1958H301.876V89.2014Z" :fill="active? '#55c553' : '#C6C5C1'" :stroke="active? '#55c553' : '#8F9098'" stroke-width="2" stroke-miterlimit="10" />
    <path d="M286.907 69.3457L281.763 169.949" :stroke="active? '#55c553' : '#8F9098'" stroke-width="2" stroke-miterlimit="10" />
    <path d="M36.6162 69.3457L42.8318 170.392" :stroke="active? '#55c553' : '#8F9098'" stroke-width="2" stroke-miterlimit="10" />
    <path d="M301.876 89.2017L302.107 117.924" :stroke="active? '#55c553' : '#8F9098'" stroke-width="2" stroke-miterlimit="10" />
    <path d="M20.5532 88.5391V117.222" :stroke="active? '#55c553' : '#8F9098'" stroke-width="2" stroke-miterlimit="10" />
  </svg>
</template>

<script>
export default {
  name: 'AcvSKImage',
  data () {
    return {
    }
  },
  computed: {
    active () {
      if (this.$store.getters['acv/getActiveTasks'].idStart === 51 || this.$store.getters['acv/getActiveTasks'].idStart === 52) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    addTack () {
      if (this.$store.getters['acv/getActiveTasks'].idStart === 51 || this.$store.getters['acv/getActiveTasks'].idStart === 52) {
        const data = {}
        data.idStart = this.$store.getters['acv/getActiveTasks'].idStart
        data.idEnd = 61

        data.substanceArr = this.$store.getters['acv/getBunkers'].bunkersFourth.bunkersArr.find(e => e.id === data.idStart).substanceArr
        this.$store.dispatch('acvModal/setDialogAddTaskObg', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .converter {
//   width: 639px;
//   height: 622px;
// }
</style>
