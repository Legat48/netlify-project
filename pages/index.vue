<!-- eslint-disable vue/html-indent -->
<template>
  <div v-if="!$store.getters.getLoading" class="content">
    <div class="content__wrap-link">
      <nuxt-link class="content__link" :to="'/mnlz'">
        Таблица для МНЛЗ
      </nuxt-link>
      <nuxt-link class="content__link" :to="'/mnlz/en'">
        Table for CCM
      </nuxt-link>
      <!-- <nuxt-link class="content__link" :to="'/table-eq'">
        Материалы ВПО
      </nuxt-link>
      <nuxt-link class="content__link" :to="'/user-stat'">
        Статистика по пользователям
      </nuxt-link>
      <nuxt-link class="content__link" :to="'/json-info'">
        Методы для получения данных из ОДС
      </nuxt-link> -->
    </div>
  </div>
  <div v-else class="content content_pre-loaded ">
    <PreLoaded />
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    store.commit('header/setHeaderTitle', 'Главная страница')
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    this.$store.commit('setLoading', false)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 25px 39px;
  width: 100%;
  height: calc(100vh - var(--height-header));
  background-color: var(--color-bg-1);

  &_pre-loaded {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__wrap-link {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  &__link {
    font-weight: 500;
    font-size: 18px;
    color: var(--color-text-2);
    text-decoration: underline;
  }
}
</style>
