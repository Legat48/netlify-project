<template>
  <div class="wrap">
    <div class="wrap__bg">
      <div v-for="item in [1,2,3,4]" :key="item" class="wrap__bg-item" />
    </div>
    <div class="wrap__sub-wrap">
      Ручей {{ info.id }}
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="#323232" />
      </svg> -->
    </div>
    <!-- <v-menu
      transition="scale-transition"
    >
      <template #activator="{ props }">
        <button
          color="primary"
          v-bind="props"
          class="btn"
        >
          Scale Transition
      </button>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </div>
</template>

<script>
export default {
  name: 'UdmWF',
  props: {
    info: {
      type: Object,
      default: null,
      require: true
    }
  },
  data () {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  border-radius: 12px;
  &__bg {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    pointer-events: none;
  }
  &__bg-item {
    height: 5%;
    width: 80%;
    border: 2px solid #000;
    border-radius: 1000px;
    opacity: 0.3;
    background-color: var(--color-bg-2);
    transform: rotate(4deg);
  }
  &__sub-wrap {
    position: relative;
    top: 10px;
    z-index: 2;
  }
}
.btn {
    height: 36px;
    width: 180px;
    border: none;
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);
    inset: 47px 0 0 9px;
    font-weight: 700;
    @include transition;
    background-color: var(--color-btn-1);
    &:hover {
      background-color: var(--color-active);
      box-shadow: 0 0 0 3px var(--color-btn-1);
    }
    &:active {
      background-color: var(--color-active);
      box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.15);

}}
</style>
