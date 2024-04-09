<template>
  <div :class="['file-input-wrapper', rounded && '_rounded', fileImage && '_image']" @click="inputClick">
    <input type="file" ref="inputRef" :accept @change="setFile($event)" />

    <slot v-if="!file" />

    <img v-else-if="fileImage" :src="fileImage" :alt="file.name" class="avatar" />

    <pre v-else>{{ file.name }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{ rounded?: boolean; accept: string }>(), {
  accept: '*',
});

const file = defineModel();

const inputRef = ref<HTMLInputElement>();
const fileImage = ref<string | null>(null);

function inputClick(): void {
  if (inputRef.value) {
    inputRef.value.click();
  }
}

function setFile(event: Event): void {
  const settedFile = event.target?.files?.[0];

  file.value = settedFile;

  if (settedFile?.type?.includes('image')) {
    fileImage.value = URL.createObjectURL(settedFile);
  }
}
</script>

<style scoped lang="scss">
.file-input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 2px dashed $color-secondary;
  border-radius: $default-radius;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &._rounded {
    border-radius: 100%;
    aspect-ratio: 1 / 1;
  }

  &._image {
    padding: 0;
    border-color: transparent;
  }

  &:hover {
    border-color: $color-primary;
  }

  input[type*='file'] {
    display: none;
  }

  .avatar {
    border-radius: 100%;
    width: 100%;
    object-fit: fill;
  }
}
</style>
