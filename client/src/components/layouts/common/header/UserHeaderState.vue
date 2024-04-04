<template>
  <div class="user-state">
    <ui-button> Создать аккаунт </ui-button>
    <ui-button template="secondary">Войти</ui-button>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/ui_button/UiButton.vue';
</script>

<style scoped lang="scss">
.user-state {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
