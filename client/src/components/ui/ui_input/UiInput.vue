<template>
  <div :class="['input-wrapper', isFocused && '_focused', state === 'error' && '_error']">
    <span class="label">{{ label }}</span>

    <input
      v-model="model"
      :type="type === 'password' ? localType : type"
      class="ui-input-input"
      name="ui-input"
      v-bind="$attrs"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <small v-if="state === 'error'" class="error-field">{{ error }}</small>

    <ui-button v-if="type === 'password'" template="tertiary" class="eye-button" rounded @click.stop="setLocalType">
      <component :is="localType === 'password' ? EyeOpenIcon : EyeCloseIcon" />
    </ui-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import EyeOpenIcon from '@/assets/icons/eye-open.svg?component';
import EyeCloseIcon from '@/assets/icons/eye-close.svg?component';

const props = withDefaults(
  defineProps<{
    type?: string;
    label?: string;
    state?: 'default' | 'error';
    error?: string;
  }>(),
  {
    type: 'text',
    label: 'Писать тут',
    state: 'default',
    error: 'Ообязательно для заполнения',
  }
);

const model = defineModel();

const isFocused = ref(false);
const localType = ref(props.type);

function setLocalType(): void {
  localType.value = localType.value === 'password' ? 'text' : 'password';
}
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  padding: 0.7rem 0.5rem;
  border: 1px solid $color-secondary;
  border-radius: $default-radius;
  outline: 0 solid transparent;
  transition: ouline 0.2s;

  &._focused {
    outline: 2px solid $color-primary;
  }

  &._error {
    border-color: $color-red-main;

    .label {
      color: $color-red-main;
    }
  }

  .label {
    position: absolute;
    top: -0.6rem;
    left: 0.2rem;
    padding: 0 0.25rem;
    background-color: #fff;
    font-size: 1rem;
  }

  input {
    width: 100%;
    border: none;
    outline: none;

    &::placeholder {
      color: $color-secondary;
    }
  }

  .error-field {
    position: absolute;
    bottom: -0.35rem;
    right: 0.2rem;
    padding: 0 0.25rem;
    font-size: 0.8rem;
    background-color: #fff;
    color: $color-red-main;
  }

  .eye-button {
    position: absolute;
    top: 0.52rem;
    right: 0.5rem;
    width: 1.3rem;
    height: 1.3rem;
  }
}
</style>
