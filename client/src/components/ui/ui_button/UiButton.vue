<template>
  <button
    v-bind="$attrs"
    type="button"
    :class="[
      'ui-button',
      {
        'ui-button--small': size === 'small',
        'ui-button--medium': size === 'medium',
        'ui-button--large': size === 'large',
        'ui-button--primary': template === 'primary',
        'ui-button--secondary': template === 'secondary',
        'ui-button--danger': template === 'danger',
        'ui-button--tertiary': template === 'tertiary',
        'ui-button--disabled': disabled,
        'ui-button--rounded': rounded,
      },
    ]"
    :disabled="disabled"
  >
    <slot name="icon"></slot>
    <slot v-if="!iconOnly"></slot>
  </button>
</template>

<script setup lang="ts">
import { IUiButtonProps } from './interface';

withDefaults(defineProps<IUiButtonProps>(), {
  size: 'medium',
  template: 'primary',
});
</script>

<style scoped lang="scss">
.ui-button {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:not(:disabled):not(.ui-button--tertiary):hover {
    box-shadow: 0 0 7px 1px $color-red-main;
  }

  &:not(.ui-button--rounded):focus {
    outline: #000 solid 3px;
  }

  &--small {
    padding: 0.25rem 0.5rem;
  }

  &--large {
    padding: 0.75rem 1.5rem;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background-color: $color-primary;
    color: #fff;
  }

  &--secondary {
    background-color: #fff;
    color: $color-primary;
    border-color: $color-primary;
  }

  &--tertiary {
    background-color: #fff;
    color: $color-primary;
    border-color: transparent;
    transition: text-shadow 0.2s ease-in-out;

    &:hover {
      text-shadow: 0 0 5px $color-red-main;
    }
  }

  &--rounded {
    border-radius: 100%;
    padding: 0.5rem;
  }
}
</style>