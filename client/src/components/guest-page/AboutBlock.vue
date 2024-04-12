<template>
  <div class="about-wrapper">
    <div class="main-container about-content">
      <h2 class="about-title">Здесь вы можете:</h2>

      <ul class="about-list">
        <li class="about-list-item">- Делиться своими мыслями</li>
        <li class="about-list-item">- Читать, о чем думают другие пользователи</li>
        <li class="about-list-item">- Комментировать свои и чужие мысли</li>
        <li class="about-list-item">- Отмечать понравившиеся мысли</li>
        <li class="about-list-item">И многое другое</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.about-wrapper {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 2rem 0;
  background-color: $color-primary;

  * {
    color: #fff;
  }

  .about-title {
    margin-bottom: 1rem;
    font-size: 3rem;
    color: inherit;
  }

  .about-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .about-list-item {
      font-size: 1.5rem;
    }
  }
}
</style>
