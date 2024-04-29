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
        'ui-button--is-loading': isLoading,
      },
    ]"
    :disabled="disabled"
  >
    <div class="ui-button-text">
      <slot></slot>
    </div>
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
  position: relative;
  overflow: hidden;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1rem;
  border: 1px solid transparent;
  border-radius: $default-radius;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:not(.ui-button--rounded):focus {
    outline: #000 solid 3px;
  }

  .ui-button-text {
    display: flex;
    align-items: center;
  }

  &--disabled {
    .ui-button-text {
      opacity: 0.3;
    }
  }

  &-spinner {
    position: absolute;
    top: 50%;
    left: 42%;
    transform: translate(-50%, -42%);
  }

  &--small {
    padding: 0.25rem 0.5rem;
  }

  &--large {
    padding: 1rem 1.5rem;
  }

  &--primary {
    background-color: $color-primary;

    .ui-button-text {
      color: #fff;
    }

    &:not(:disabled):hover {
      background-color: $color-light;

      .ui-button-text {
        color: $color-primary;
      }
    }

    &.ui-button--disabled {
      background-color: $color-light;
      cursor: not-allowed;
    }
  }

  &--secondary {
    background-color: #fff;
    border-color: $color-primary;

    &:not(:disabled):hover {
      background-color: $color-light;
      border-color: transparent;
    }

    &.ui-button--disabled {
      border-color: $color-light;
      cursor: not-allowed;
    }
  }

  &--tertiary {
    background-color: #fff;
    border-color: transparent;
    transition: background-color 0.2s ease-in-out;

    &:not(:disabled):hover {
      background-color: $color-light;
    }

    &.ui-button--disabled {
      cursor: not-allowed;
    }
  }

  &--link {
    padding: 0;
    background-color: transparent;
    border-color: transparent;
    text-decoration: underline;
    text-decoration-color: $color-primary;
    transition: text-decoration-color 0.2s ease-in-out;

    &:not(:disabled):hover {
      text-decoration-color: $color-light;
    }

    &.ui-button--disabled {
      text-decoration-color: $color-secondary;
      cursor: not-allowed;
    }
  }

  &--rounded {
    border-radius: 100%;
    padding: 0;

    .ui-button-spinner {
      left: 25%;
    }
  }

  &--is-loading {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 24px;
      margin: -12px 0 0 -12px;
      border: 4px solid transparent;
      border-top: 4px solid $color-primary;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
      box-sizing: border-box;
      transform-origin: 50% 50%;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
