<template>
  <div class="json-list">
    <div class="json-list__title">
      Древо json
    </div>
    <v-treeview :items="treeData" open-on-click>
      <template #label="{ item }">
        {{ item.name }}: {{ item.value }}
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  props: {
    json: {
      type: [Object, Array],
      required: true
    }
  },
  data () {
    return {
      treeData: []
    }
  },
  watch: {
    json: {
      handler (newVal) {
        this.treeData = Array.isArray(newVal)
          ? newVal.map((item, index) => this.buildTree(index.toString(), item))
          : [this.buildTree('root', newVal)]
      },
      immediate: true
    }
  },
  methods: {
    buildTree (name, obj) {
      if (typeof obj !== 'object' || obj === null) {
        return { name, value: obj, open: false }
      }

      if (Array.isArray(obj)) {
        return {
          name,
          value: 'Array',
          open: false,
          children: obj.map((item, index) => this.buildTree(index.toString(), item))
        }
      }

      return {
        name,
        value: 'Object',
        open: false,
        children: Object.keys(obj).map(key => this.buildTree(key, obj[key]))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.json-list {
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 24px;
    color: var(--color-text-1);
  }
  &__title-icon {
    width: 30px;
    height: 30px;
  }
}
@keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-5px, 0); }
  50% { transform: translate(5px, 0); }
  75% { transform: translate(-5px, 0); }
  100% { transform: translate(5px, 0); }
}
</style>
