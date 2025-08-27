<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-item">
        <UIcon name="i-custom-github" class="icon" />

        <a href="https://github.com/evgeniyGusev" class="link" target="_blank" rel="noopener noreferrer">
          github.com/evgeniyGusev
        </a>
      </div>

      <div class="footer-item">
        <UIcon name="i-custom-email-white" class="icon" />

        <a
          href="mailto:shchelkalinevgeniy@gmail.com"
          class="link link__email"
          target="_blank"
          rel="noopener noreferrer"
        >
          shchelkalinevgeniy@gmail.com
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped lang="scss">
.footer {
  background-color: #111;
  color: #ccc;
  padding: 1rem;
  font-size: 0.9rem;
  border-top: 1px solid #333;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.footer-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.icon {
  width: 2rem;
  height: 2rem;
}

.link {
  color: #aaa;
  text-decoration: none;
  transition: color 0.2s ease;
}

.link__email {
  margin-left: 0.25rem;
}

.link:hover {
  color: #fff;
}
</style>
