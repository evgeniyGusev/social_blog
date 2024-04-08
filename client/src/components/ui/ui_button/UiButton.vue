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
        'ui-button--tertiary': template === 'tertiary',
        'ui-button--link': template === 'link',
        'ui-button--danger': template === 'danger',
        'ui-button--disabled': disabled,
        'ui-button--rounded': rounded,
      },
    ]"
    :disabled="disabled"
  >
    <slot></slot>
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
  padding: 0.65rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:not(.ui-button--rounded):focus {
    outline: #000 solid 3px;
  }

  &--small {
    padding: 0.25rem 0.5rem;
  }

  &--large {
    padding: 1rem 1.5rem;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background-color: $color-primary;
    color: #fff;

    &:not(:disabled):hover {
      background-color: $color-light;
      color: #000;
    }
  }

  &--secondary {
    background-color: #fff;
    color: $color-primary;
    border-color: $color-primary;

    &:not(:disabled):hover {
      background-color: $color-light;
      border-color: transparent;
    }
  }

  &--tertiary {
    background-color: #fff;
    color: $color-primary;
    border-color: transparent;
    transition: background-color 0.2s ease-in-out;

    &:not(:disabled):hover {
      background-color: $color-light;
    }
  }

  &--link {
    padding: 0;
    background-color: transparent;
    color: $color-primary;
    border-color: transparent;
    text-decoration: underline;
    text-decoration-color: $color-primary;
    transition: text-decoration-color 0.2s ease-in-out;

    &:not(:disabled):hover {
      text-decoration-color: $color-light;
    }
  }

  &--rounded {
    border-radius: 100%;
    padding: 0;
  }
}
</style>
