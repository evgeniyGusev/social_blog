<template>
  <header class="header">
    <div class="main-container">
      <div class="logo">
        <UIcon name="i-custom-full-logo" class="main-logo" />

        <h1 class="main-title">ShareSpace</h1>
      </div>

      <UserHeaderState />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  padding: 1rem 0;
  border-bottom: 1px solid $color-secondary;
  background-color: #fff;
  z-index: 1;

  .main-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .main-logo {
        width: 2.5rem;
        height: 2.5rem;
      }

      .main-title {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
  }
}
</style>
