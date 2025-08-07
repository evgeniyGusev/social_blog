<template>
  <div class="spinner_container" aria-label="Loading...">
    <i class="spinner_item spinner_item--warning"></i>
    <i class="spinner_item spinner_item--warning"></i>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    color?: string;
  }>(),
  {
    width: '1rem',
    height: '1rem',
    color: '$color-orange-main',
  }
);
</script>

<style scoped lang="scss">
.spinner_container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: v-bind(width);
  height: v-bind(height);
}

.spinner_item:first-child {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  animation: spinner-spin 1s ease infinite;
  border-style: solid;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-width: 3px;
  border-bottom-color: v-bind(color);
}

.spinner_item {
  z-index: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  opacity: 0.8;
  animation: spinner-spin 1s ease 0.1s infinite;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-width: 3px;
  border-style: dotted;
  border-bottom-color: v-bind(color);
}

@keyframes spinner-spin {
  0% {
    transform: rotate(0turn);
  }

  100% {
    transform: rotate(1turn);
  }
}

.spinner_item:first-child,
.spinner_item {
  border-bottom-color: v-bind(color);
}
</style>
