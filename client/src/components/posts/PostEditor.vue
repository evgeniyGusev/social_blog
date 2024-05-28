<template>
  <div>
    <post-editor v-model="model" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel();
</script>

<style scoped lang="scss"></style>
