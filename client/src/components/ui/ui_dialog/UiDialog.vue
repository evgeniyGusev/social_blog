<template>
  <teleport to="body">
    <transition name="dialog">
      <div v-if="modelValue" class="dialog" @click="closeDialog($event)" @keyup.esc="$emit('update:modelValue', false)">
        <div class="dialog-content">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const closeDialog = (event: Event) => {
  if (event?.target?.className !== 'dialog') {
    return;
  }

  emit('update:modelValue', false);
};
</script>

<style>
:root {
  --dialog-content-max-width: 400px;
}
</style>

<style scoped lang="scss">
.dialog {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(0.3rem);

  &-content {
    min-width: 364px;
    max-width: var(--dialog-content-max-width);
    padding: 2rem;
    background-color: #fff;
    border-radius: $default-radius;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }
}
</style>
