<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <div class="content__wrap">
      <div class="content__wrap-link">
        <!-- <nuxt-link class="content__link" :to="'/json-info/smelting'">
          JSON по плавке
        </nuxt-link>
        <nuxt-link class="content__link" :to="'/json-info/scheme'">
          JSON схема
        </nuxt-link>
        <nuxt-link class="content__link" :to="'/json-info/status'">
          JSON статус оборудования
        </nuxt-link>
        <nuxt-link class="content__link" :to="'/user-stat/info'">
          JSON Статистика по пользователям
        </nuxt-link> -->
        <div class="data-hab">
          <div class="data-hab__top-wrap" :class="{'data-hab__top-wrap_open': openBase}">
            <div v-for="(item, key) of json" :key="key" class="data-hab__card">
              <button :key="key" class="btn data-hab__btn" @click="openStatusWrap(item)">
                <div class="label">
                  <div class="label__title">
                    Метод:
                  </div>
                  <div class="label__input">
                    {{ item.methodName }}
                  </div>
                </div>
              </button>
              <div class="data-hab__description">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    store.commit('header/setHeaderTitle', 'JSON схемы')
  },
  data () {
    return {
      openBase: false
    }
  },
  computed: {
    json () {
      return this.$store.getters['smelting/getBaseScheme']
    }
  },
  async mounted () {
    await this.$store.dispatch('smelting/fetchScheme')
    this.$store.commit('setLoading', false)
  },
  methods: {
    openStatusWrap () {
      this.openBase = true
      // this.$router.push({
      //   name: 'status-wrap',
      //   params: { methodName: item.methodName }
      // })
    }
  }
}
</script>
